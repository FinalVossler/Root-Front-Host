import React from "react";
import { useTheme } from "react-jss";
import { toast } from "react-toastify";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";
import { ImCross } from "react-icons/im";
import { AxiosResponse } from "axios";
import ReactLoading from "react-loading";

import useStyles from "./postEditor.styles";
import WritePostButton from "../write-post-button";
import Modal from "../modal";
import { Theme } from "../../config/theme";
import Button from "../button";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import IFile from "../../globalTypes/IFile";
import uploadFiles from "../../utils/uploadFiles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  IPost,
  PostDesign,
  postSlice,
  PostVisibility,
} from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";
import PostEditorFiles from "../postEditorFiles";
import PostCreateCommand from "../../globalTypes/commands/PostCreateCommand";

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

    if (
      (!content || content.trim() === "<p><br></p>") &&
      (!title || title.trim() === "")
    )
      return toast.error("Type something!");

    sunEditor?.setContents("");

    setLoading(true);

    const filedsToSend: IFile[] = await uploadFiles(files);

    const command: PostCreateCommand = {
      title,
      posterId: user._id,
      content,
      files: filedsToSend,
      visibility: PostVisibility.Public,
      design: PostDesign.Default,
    };

    axios
      .request<AxiosResponse<IPost>>({
        url: "/posts",
        method: "POST",
        data: command,
      })
      .then((res) => {
        const post: IPost = res.data.data;
        dispatch(postSlice.actions.addUserPost({ post, user }));
        setPostModalOpen(false);
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

          <PostEditorFiles files={files} setFiles={setFiles} />

          {!loading && (
            <Button
              disabled={loading}
              type="submit"
              style={{}}
              className={styles.button}
            >
              Post
            </Button>
          )}

          {loading && (
            <ReactLoading
              className={styles.loading}
              type={"spin"}
              color={theme.primary}
              width={36}
              height={36}
            />
          )}
        </form>
      </Modal>
    </div>
  );
};

export default React.memo(PostEditor);
