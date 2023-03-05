import React from "react";
import { toast } from "react-toastify";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";
import { ImCross } from "react-icons/im";
import { MdTitle } from "react-icons/md";
import { AxiosResponse } from "axios";
import ReactLoading from "react-loading";

import useStyles from "./postEditor.styles";
import WritePostButton from "../../write-post-button";
import Modal from "../../modal";
import { Theme } from "../../../config/theme";
import Button from "../../button";
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import IFile from "../../../globalTypes/IFile";
import uploadFiles from "../../../utils/uploadFiles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  IPost,
  PostDesign,
  postSlice,
  PostVisibility,
} from "../../../store/slices/postSlice";
import { IUser } from "../../../store/slices/userSlice";
import PostEditorFiles from "../../postEditorFiles";
import PostCreateCommand from "../../../globalTypes/commands/PostCreateCommand";
import InputSelect from "../../inputSelect";
import { Option } from "../../inputSelect/InputSelect";
import Input from "../../input";
import PostsEditor from "../../postsEditor";
import getNavigatorLanguage from "../../../utils/getNavigatorLanguage";
import getLanguages from "../../../utils/getLanguages";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import PostUpdateCommand from "../../../globalTypes/commands/PostUpdateCommand";

interface IPostEditor {
  post?: IPost;
  open?: boolean;
  setOpen?: (boolean) => void;
}

const PostEditor = (props: IPostEditor) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  //#region Local state
  const [postModalOpen, setPostModalOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [subTitle, setSubtTitle] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string>(
    getNavigatorLanguage()
  );
  const [children, setChildren] = React.useState<string[]>([]);
  const [visibility, setVisibility] = React.useState<PostVisibility>(
    PostVisibility.Public
  );
  const [design, setDesign] = React.useState<PostDesign>(PostDesign.Default);
  const [files, setFiles] = React.useState<File[]>([]);
  const [ownFiles, setOwnFiles] = React.useState<IFile[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sunEditor, setSunEditor] =
    React.useState<SunEditorCore | undefined>(undefined);
  //#endregion Local state

  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();

  //#region Effects
  React.useEffect(() => {
    if (props.open !== undefined) {
      setPostModalOpen(props.open);
    }
  }, [props.open]);

  React.useEffect(() => {
    if (props.post && sunEditor) {
      setTitle(getTranslatedText(props.post?.title));
      setSubtTitle(getTranslatedText(props.post.subTitle));
      setChildren(props.post.children.map((c) => c._id));
      setDesign(props.post?.design);
      setOwnFiles(props.post?.files);
      if (sunEditor)
        sunEditor?.setContents(getTranslatedText(props.post.content));
    }
  }, [props.post, sunEditor]);

  // Autofocus prop is not working. So we manually focus the editor when the modal shows
  React.useEffect(() => {
    if (postModalOpen && sunEditor && sunEditor.core) {
      sunEditor.core.focus();
    }
  }, [postModalOpen, sunEditor]);
  //#endregion Effects

  //#region Event listeners
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

    let command: PostCreateCommand | PostUpdateCommand;

    if (props.post) {
      command = {
        _id: props.post?._id,
        title,
        subTitle,
        posterId: user._id,
        content,
        files: filesToSend,
        visibility,
        design,
        children,
        language,
      };
    } else {
      command = {
        title,
        subTitle,
        posterId: user._id,
        content,
        files: filesToSend,
        visibility,
        design,
        children,
        language,
      };
    }

    axios
      .request<AxiosResponse<IPost>>({
        url: "/posts",
        method: props.post ? "PUT" : "POST",
        data: command,
      })
      .then((res) => {
        const post: IPost = res.data.data;
        if (props.post) {
          dispatch(postSlice.actions.updateUserPost({ post, user }));
        } else {
          dispatch(postSlice.actions.addUserPost({ post, user }));
          setTitle("");
          setSubtTitle("");
          setDesign(PostDesign.Default);
          setVisibility(PostVisibility.Public);
          setOwnFiles([]);
        }
        setFiles([]);
        handleCloseModal();
      })
      .finally(() => setLoading(false));
  };

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

  const handleChangeLanguage = (option: Option) => {
    setLanguage(option.value);
  };
  const handleCloseModal = () => {
    if (props.setOpen) {
      props.setOpen(false);
    } else setPostModalOpen(false);
  };
  const handleOpenModal = () => {
    if (props.setOpen) {
      props.setOpen(true);
    } else setPostModalOpen(true);
  };
  //#endregion Event listeners

  return (
    <div className={styles.postEditorContainer}>
      {!props.post && <WritePostButton onClick={handleOpenModal} />}

      <Modal handleClose={handleCloseModal} open={postModalOpen}>
        <form
          onSubmit={handleSubmit}
          className={styles.createPostModalContainer}
        >
          <div className={styles.createPostHeader}>
            <h2 className={styles.createPostTitle}>Create Post</h2>

            <ImCross
              onClick={handleCloseModal}
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
            parentPost={props.post}
          />

          <InputSelect
            label="Language"
            onChange={handleChangeLanguage}
            options={getLanguages()}
            value={
              getLanguages().find((el) => el.value === language) ||
              getLanguages()[0]
            }
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
