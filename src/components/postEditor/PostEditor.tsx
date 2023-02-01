import React from "react";
import { useTheme } from "react-jss";
import { toast } from "react-toastify";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";
import { ImCross } from "react-icons/im";

import useStyles from "./postEditor.styles";
import WritePostButton from "../write-post-button";
import Modal from "../modal";
import { Theme } from "../../config/theme";
import Button from "../button";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import SuccessResponseDto from "../../globalTypes/SuccessResponseDto";
import IFile from "../../globalTypes/IFile";
import uploadFiles from "../../utils/uploadFiles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IPost, postSlice } from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";

interface IPostEditor {}

const PostEditor = (props: IPostEditor) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [postModalOpen, setPostModalOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sunEditor, setSunEditor] =
    React.useState<SunEditorCore | undefined>(undefined);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content: string | undefined = sunEditor?.getContents(true);

    if (!content || content.trim() === "<p><br></p>")
      return toast.error("Content shouldn't be empty");

    setPostModalOpen(false);
    sunEditor?.setContents("");

    setLoading(true);

    const filedsToSend: IFile[] = await uploadFiles(files);

    axios
      .request<SuccessResponseDto<IPost>>({
        url: "/posts",
        method: "POST",
        data: {
          title,
          poster: user._id,
          content,
          files: filedsToSend,
        },
      })
      .then((res) => {
        const post: IPost = res.data.data;
        dispatch(postSlice.actions.addUserPost({ post, user }));
      })
      .finally(() => setLoading(false));
  };

  // Autofocus prop is not working. So we manually focus the editor when the modal shows
  React.useEffect(() => {
    if (postModalOpen && sunEditor && sunEditor.core) {
      sunEditor.core.focus();
    }
  }, [postModalOpen, sunEditor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className={styles.postEditorContainer}>
      <WritePostButton onClick={() => setPostModalOpen(true)} />

      <Modal handleClose={() => setPostModalOpen(false)} open={postModalOpen}>
        <form
          onSubmit={handleSubmit}
          className={styles.createPostModalContainer}
        >
          <div className={styles.createPostHeader}>
            <h2 className={styles.createPostTitle}>Create Post</h2>

            <ImCross
              onClick={() => setPostModalOpen(false)}
              className={styles.closeButton}
            />
          </div>

          <input
            className={styles.titleInput}
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
          />

          <SunEditor
            getSunEditorInstance={(sunEditor) => setSunEditor(sunEditor)}
            height="200px"
          />

          <Button type="submit" style={{}} className={styles.button}>
            Post
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default React.memo(PostEditor);
