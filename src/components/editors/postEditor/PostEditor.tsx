import React from "react";
import { toast } from "react-toastify";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";
import { ImCross } from "react-icons/im";
import { MdTitle } from "react-icons/md";
import ReactLoading from "react-loading";

import useStyles from "./postEditor.styles";
import WritePostButton from "../../write-post-button";
import Modal from "../../modal";
import { ITheme } from "../../../config/theme";
import Button from "../../button";
import IFile from "../../../globalTypes/IFile";
import { useAppSelector } from "../../../store/hooks";
import {
  IPost,
  PostDesign,
  PostVisibility,
} from "../../../store/slices/postSlice";
import { IUser } from "../../../store/slices/userSlice";
import InputSelect from "../../inputSelect";
import { Option } from "../../inputSelect/InputSelect";
import Input from "../../input";
import PostsEditor from "../pageEditor/postsEditor";
import getLanguages from "../../../utils/getLanguages";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import useCreatePost, {
  PostCreateCommand,
} from "../../../hooks/apiHooks/useCreatePost";
import useUpdatePost, {
  PostUpdateCommand,
} from "../../../hooks/apiHooks/useUpdatePost";
import FilesInput from "../../filesInput";
import { TypeOfFiles } from "../../existingFiles/ExistingFiles";
import { BiCode } from "react-icons/bi";
import { IPage } from "../../../store/slices/pageSlice";

interface IPostEditorProps {
  post?: IPost;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const PostEditor: React.FunctionComponent<IPostEditorProps> = (
  props: IPostEditorProps
) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  const pages: IPage[] = useAppSelector((state) => state.page.pages);
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.posts
  );
  const stateLanguage: string = useAppSelector(
    (state) => state.userPreferences.language
  );

  //#region Local state
  const [postModalOpen, setPostModalOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [subTitle, setSubtTitle] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string>(stateLanguage);
  const [children, setChildren] = React.useState<string[]>([]);
  const [visibility, setVisibility] = React.useState<PostVisibility>(
    PostVisibility.Public
  );
  const [design, setDesign] = React.useState<PostDesign>(PostDesign.Default);
  const [files, setFiles] = React.useState<File[]>([]);
  const [selectedExistingFiles, setSelectedExistingFiles] = React.useState<
    IFile[]
  >([]);
  const [sunEditor, setSunEditor] = React.useState<SunEditorCore | undefined>(
    undefined
  );
  //#endregion Local state

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { createPost, loading: createLoading } = useCreatePost();
  const { updatePost, loading: updateLoading } = useUpdatePost();

  //#region Effects
  React.useEffect(() => {
    if (props.open !== undefined) {
      setPostModalOpen(props.open);
    }
  }, [props.open]);

  // Initialize form based on post prop and language
  React.useEffect(() => {
    if (props.post && sunEditor) {
      setTitle(getTranslatedText(props.post?.title, language));
      setCode(props.post.code || "");
      setSubtTitle(getTranslatedText(props.post.subTitle, language));
      setChildren(props.post.children.map((c) => c._id));
      setDesign(props.post?.design);
      setVisibility(props.post?.visibility);
      setSelectedExistingFiles(props.post?.files);
      if (sunEditor && sunEditor.setContents) {
        sunEditor?.setContents(getTranslatedText(props.post.content, language));
      }
    } else {
      if (sunEditor && sunEditor.setContents) sunEditor?.setContents("");
    }
  }, [props.post, sunEditor, language]);

  // Destroy the suneditor after we leave
  React.useEffect(() => {
    return () => {
      sunEditor?.destroy();
    };
  }, []);

  // Autofocus prop is not working. So we manually focus the editor when the modal shows
  React.useEffect(() => {
    if (postModalOpen && sunEditor && sunEditor.core) {
      sunEditor.core.focus();
    }
    if (!postModalOpen) {
      setFiles([]);
      setSelectedExistingFiles([]);
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
      return toast.error(
        getTranslatedText(staticText?.iNeedATitleOrADescription)
      );
    }

    if (
      props.post &&
      visibility === PostVisibility.Private &&
      pages.find((page) =>
        page.posts.find(
          (post) => post._id.toString() === props.post?._id.toString()
        )
      )
    ) {
      return toast.error(
        getTranslatedText(staticText?.postUsedInPageAndCantBePrivate)
      );
    }

    if (props.post) {
      const command: PostUpdateCommand = {
        _id: props.post?._id,
        title,
        subTitle,
        content,
        files: [], // The files will get updated inside the post request
        visibility,
        design,
        children,
        language,
        code,
      };
      await updatePost(command, files, selectedExistingFiles);
    } else {
      const command: PostCreateCommand = {
        title,
        subTitle,
        posterId: user._id,
        content,
        files: [], // The files will get updated inside the post request
        visibility,
        design,
        children,
        language,
        code,
      };
      await createPost(command, files, selectedExistingFiles);
    }

    // We reinitialize the form now that the post is updated
    if (!props.post) {
      setTitle("");
      setSubtTitle("");
      setCode("");
      setDesign(PostDesign.Default);
      setVisibility(PostVisibility.Public);
      setSelectedExistingFiles([]);
    }

    setFiles([]);
    handleCloseModal();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtTitle(e.target.value);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
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

  const loading = props.post ? updateLoading : createLoading;
  return (
    <div className={styles.postEditorContainer}>
      {!props.post && <WritePostButton onClick={handleOpenModal} />}

      <Modal handleClose={handleCloseModal} open={postModalOpen}>
        <form
          onSubmit={handleSubmit}
          className={styles.createPostModalContainer}
        >
          <div className={styles.createPostHeader}>
            <h2 className={styles.createPostTitle}>
              {getTranslatedText(staticText?.createPost)}
            </h2>

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
              placeholder: getTranslatedText(staticText?.title),
            }}
          />

          <Input
            Icon={MdTitle}
            value={subTitle}
            inputProps={{
              onChange: handleSubTitleChange,
              placeholder: getTranslatedText(staticText?.subTitle),
            }}
          />

          <Input
            Icon={BiCode}
            value={code}
            inputProps={{
              onChange: handleCodeChange,
              placeholder: getTranslatedText(staticText?.code),
            }}
          />

          <PostsEditor
            setSelectedPosts={handleSetSelectedPosts}
            placeholder={getTranslatedText(staticText?.addChildrenPosts)}
            parentPost={props.post}
          />

          <InputSelect
            label={getTranslatedText(staticText?.language)}
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
            label={getTranslatedText(staticText?.visibility)}
            onChange={handleVisibilityChange}
            value={{ value: visibility, label: visibility.toString() }}
          />

          <InputSelect
            options={Object.values(PostDesign).map((el) => ({
              value: el,
              label: el,
            }))}
            label={getTranslatedText(staticText?.design)}
            onChange={handleDesignChange}
            value={{ value: design, label: design.toString() }}
          />

          <SunEditor
            getSunEditorInstance={(sunEditor) => setSunEditor(sunEditor)}
            height="200px"
          />

          <FilesInput
            setSelectedExistingFiles={setSelectedExistingFiles}
            selectedExistingFiles={selectedExistingFiles}
            files={files}
            setFiles={setFiles}
            label={getTranslatedText(staticText?.files)}
            typeOfFiles={TypeOfFiles.UserFiles}
          />

          {!loading && (
            <Button
              disabled={loading}
              type="submit"
              style={{}}
              className={styles.button}
            >
              {getTranslatedText(staticText?.submit)}
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
