import React from "react";
import { useTheme } from "react-jss";
import { toast } from "react-toastify";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";
import { ImCross } from "react-icons/im";
import { MdTitle } from "react-icons/md";
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
import InputSelect from "../inputSelect";
import { Option } from "../inputSelect/InputSelect";
import Input from "../input";
import PostsEditor from "../postsEditor";

interface IPostEditor {}

const PostEditor = (props: IPostEditor) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [postModalOpen, setPostModalOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [subTitle, setSubtTitle] = React.useState<string>("");
  const [children, setChildren] = React.useState<string[]>([]);
  const [visibility, setVisibility] = React.useState<PostVisibility>(
    PostVisibility.Public
  );
  const [design, setDesign] = React.useState<PostDesign>(PostDesign.Default);
  const [files, setFiles] = React.useState<File[]>([]);
  const [ownFiles, setOwnFiles] = React.useState<IFile[]>([]);
  // TODO add own files state and pass it down to the posteditor and ownfiles for tracking
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sunEditor, setSunEditor] =
    React.useState<SunEditorCore | undefined>(undefined);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  // Autofocus prop is not working. So we manually focus the editor when the modal shows
  React.useEffect(() => {
    if (postModalOpen && sunEditor && sunEditor.core) {
      sunEditor.core.focus();
    }
  }, [postModalOpen, sunEditor]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content: string | undefined = sunEditor?.getContents(true);

    if (
      (!content || content.trim() === "<p><br></p>") &&
      (!title || title.trim() === "")
    ) {
      return toast.error("I need a title or a description");
    }

    sunEditor?.setContents("");

    setLoading(true);

    let filesToSend: IFile[] = await uploadFiles(files);
    filesToSend = filesToSend.concat(ownFiles);

    const command: PostCreateCommand = {
      title,
      subTitle,
      posterId: user._id,
      content,
      files: filesToSend,
      visibility: visibility,
      design: design,
      children: children,
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
        setTitle("");
        setSubtTitle("");
        setDesign(PostDesign.Default);
        setVisibility(PostVisibility.Public);
        setPostModalOpen(false);
        setFiles([]);
        setOwnFiles([]);
      })
      .finally(() => setLoading(false));
  };

  //#region Event listeners
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtTitle(e.target.value);
  };

  const handleVisibilityChange = (option: Option) => {
    setVisibility(option.value as PostVisibility);
  };

  const handleDesignChange = (option: Option) => {
    setDesign(option.value as PostDesign);
  };

  const handleSetSelectedPosts = React.useCallback(
    (posts: IPost[]) => {
      setChildren(posts.map((post) => post._id));
    },
    [setChildren]
  );
  //#endregion Event listeners

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

          <Input
            Icon={MdTitle}
            value={title}
            inputProps={{
              onChange: handleTitleChange,
              placeholder: "title",
            }}
          />

          <Input
            Icon={MdTitle}
            value={subTitle}
            inputProps={{
              onChange: handleSubTitleChange,
              placeholder: "subtitle",
            }}
          />

          <PostsEditor
            setSelectedPosts={handleSetSelectedPosts}
            placeholder="Add children posts"
          />

          <InputSelect
            options={Object.values(PostVisibility).map((el) => ({
              value: el,
              label: el,
            }))}
            label="Visibility"
            onChange={handleVisibilityChange}
            value={{ value: visibility, label: visibility.toString() }}
          />

          <InputSelect
            options={Object.values(PostDesign).map((el) => ({
              value: el,
              label: el,
            }))}
            label="Design"
            onChange={handleDesignChange}
            value={{ value: design, label: design.toString() }}
          />

          <SunEditor
            getSunEditorInstance={(sunEditor) => setSunEditor(sunEditor)}
            height="200px"
          />

          <PostEditorFiles
            setOwnFiles={setOwnFiles}
            ownFiles={ownFiles}
            files={files}
            setFiles={setFiles}
          />

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
