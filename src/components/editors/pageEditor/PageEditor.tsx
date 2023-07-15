import React from "react";
import { ImCross } from "react-icons/im";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdTitle } from "react-icons/md";
import ReactLoading from "react-loading";
import * as Yup from "yup";

import Modal from "../../modal";
import { Theme } from "../../../config/theme";
import Button from "../../button";
import { useAppSelector } from "../../../store/hooks";
import { IPost } from "../../../store/slices/postSlice";
import { IUser } from "../../../store/slices/userSlice";
import { FormikProps, useFormik } from "formik";
import Input from "../../input";
import { IPage } from "../../../store/slices/pageSlice";
import PostsEditor from "../../postsEditor";

import useStyles from "./pageEditor.styles";
import getNavigatorLanguage from "../../../utils/getNavigatorLanguage";
import getLanguages from "../../../utils/getLanguages";
import InputSelect from "../../inputSelect";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import useCreatePage, {
  PageCreateCommand,
} from "../../../hooks/apiHooks/useCreatePage";
import useUpdatePage, {
  PageUpdateCommand,
} from "../../../hooks/apiHooks/useUpdatePage";
import useHasPermission from "../../../hooks/useHasPermission";
import { Permission } from "../../../store/slices/roleSlice";
import Checkbox from "../../checkbox";

interface IPageEditorForm {
  title: string;
  posts: string[];
  showInHeader: boolean;
  showInSideMenu: boolean;
  language: string;
}

interface IPageEditor {
  page?: IPage;
}

const PageEditor = (props: IPageEditor) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.pages
  );

  const [pageModalOpen, setPageModalOpen] = React.useState<boolean>(false);

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { createPage, loading: createLoading } = useCreatePage();
  const { updatePage, loading: updateLoading } = useUpdatePage();
  const { hasPermission } = useHasPermission();

  React.useEffect(() => {
    if (props.page)
      formik.resetForm({
        values: {
          title: getTranslatedText(props.page.title),
          posts: props.page.posts.map((post) => post._id),
          showInHeader: Boolean(props.page?.showInHeader),
          showInSideMenu: Boolean(props.page?.showInSideMenu),
          // Set the language to the navigator's language if the title contains a translated text in the same language as the navigator.
          // Else, set the language to the title's language
          language: props.page.title.find(
            (el) => el.language === getNavigatorLanguage()
          )
            ? getNavigatorLanguage()
            : props.page.title.length > 0
            ? props.page.title[0].language
            : getNavigatorLanguage(),
        },
      });
  }, [props.page]);

  const formik: FormikProps<IPageEditorForm> = useFormik<IPageEditorForm>({
    initialValues: {
      posts: [],
      title: "",
      showInHeader: true,
      showInSideMenu: false,
      language,
    },
    validationSchema: Yup.object().shape({
      // title: Yup.string().required("Title is required"),
    }),
    onSubmit: async (values) => {
      let command: PageCreateCommand | PageUpdateCommand;

      if (props.page) {
        command = {
          posts: values.posts,
          title: values.title,
          showInHeader: values.showInHeader,
          showInSideMenu: values.showInSideMenu,
          _id: props.page._id,
          language: values.language,
        };
        await updatePage(command);
      } else {
        command = {
          posts: values.posts,
          title: values.title,
          showInHeader: values.showInHeader,
          showInSideMenu: values.showInSideMenu,
          language: values.language,
        };
        await createPage(command);
      }
      setPageModalOpen(false);
    },
  });

  // Updating the title depending on the language
  React.useEffect(() => {
    formik.setFieldValue(
      "title",
      getTranslatedText(props.page?.title, formik.values.language)
    );
  }, [formik.values.language]);

  //#region Event listeners
  const handleSetSelectedPosts = React.useCallback((posts: IPost[]) => {
    formik.setFieldValue(
      "posts",
      posts.map((post) => post._id)
    );
  }, []);

  const handleOpenModal = () => {
    setPageModalOpen(true);
  };

  const handleCloseModal = () => {
    setPageModalOpen(false);
  };
  //#endregion Event listeners

  if (!hasPermission(Permission.CreatePage) && !props.page) return null;
  if (!hasPermission(Permission.UpdatePage) && props.page) return null;

  const loading = createLoading || updateLoading;
  return (
    <div className={styles.pageEditorContainer}>
      <div
        onClick={handleOpenModal}
        className={styles.createPageButtonContainer}
      >
        <AiFillPlusCircle
          color={theme.primary}
          className={styles.pageEditorPlusIcon}
        />{" "}
        <span className={styles.addPageText}>
          {props.page
            ? getTranslatedText(staticText?.updatePage)
            : getTranslatedText(staticText?.addPage)}
        </span>
      </div>

      <Modal handleClose={handleCloseModal} open={pageModalOpen}>
        <form
          onSubmit={formik.handleSubmit}
          className={styles.createPageModalContainer}
        >
          <div className={styles.createPageHeader}>
            <h2 className={styles.createPageTitle}>
              {props.page
                ? getTranslatedText(staticText?.updatePage)
                : getTranslatedText(staticText?.addPage)}
            </h2>

            <ImCross
              onClick={handleCloseModal}
              className={styles.closeButton}
            />
          </div>

          <Input
            Icon={MdTitle}
            formik={formik}
            name="title"
            inputProps={{
              placeholder: getTranslatedText(staticText?.title),
            }}
          />

          <Checkbox
            label={getTranslatedText(staticText?.showInHeader)}
            formik={formik}
            name="showInHeader"
          />

          <Checkbox
            label={getTranslatedText(staticText?.showInSideMenu)}
            formik={formik}
            name="showInSideMenu"
          />

          <InputSelect
            label={getTranslatedText(staticText?.language)}
            name="language"
            formik={formik}
            options={getLanguages()}
            value={
              getLanguages().find(
                (el) => el.value === formik.values.language
              ) || getLanguages()[0]
            }
          />

          <PostsEditor
            setSelectedPosts={handleSetSelectedPosts}
            page={props.page}
          />

          {!loading && (
            <Button
              disabled={loading}
              type="submit"
              style={{}}
              className={styles.button}
            >
              {props.page
                ? getTranslatedText(staticText?.updatePage)
                : getTranslatedText(staticText?.createPage)}
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

export default React.memo(PageEditor);
