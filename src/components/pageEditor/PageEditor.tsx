import React from "react";
import { useTheme } from "react-jss";
import { ImCross } from "react-icons/im";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdTitle } from "react-icons/md";
import { AxiosResponse } from "axios";
import ReactLoading from "react-loading";
import * as Yup from "yup";

import Modal from "../modal";
import { Theme } from "../../config/theme";
import Button from "../button";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IPost } from "../../store/slices/postSlice";
import { IUser, Role } from "../../store/slices/userSlice";
import PageCreateCommand from "../../globalTypes/commands/PageCreateCommand";
import { FormikProps, useFormik } from "formik";
import Input from "../input";
import { IPage, pageSlice } from "../../store/slices/pageSlice";
import PostsEditor from "../postsEditor";
import PageUpdateCommand from "../../globalTypes/commands/PageUpdateCommand";

import useStyles from "./pageEditor.styles";
import getNavigatorLanguage from "../../utils/getNavigatorLanguage";
import getLanguages from "../../utils/getLanguages";
import InputSelect from "../inputSelect";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";

interface IPageEditorForm {
  title: string;
  posts: string[];
  language: string;
}

interface IPageEditor {
  page?: IPage;
}

const PageEditor = (props: IPageEditor) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [pageModalOpen, setPageModalOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();

  React.useEffect(() => {
    if (props.page)
      formik.resetForm({
        values: {
          title: getTranslatedText(props.page.title),
          posts: props.page.posts.map((post) => post._id),
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
      language: getNavigatorLanguage(),
    },
    validationSchema: Yup.object().shape({
      // title: Yup.string().required("Title is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      let command: PageCreateCommand | PageUpdateCommand;

      if (props.page) {
        command = {
          posts: values.posts,
          title: values.title,
          _id: props.page._id,
          language: values.language,
        };
      } else {
        command = {
          posts: values.posts,
          title: values.title,
          language: values.language,
        };
      }

      axios
        .request<AxiosResponse<IPage>>({
          url: "/pages",
          method: props.page ? "PUT" : "POST",
          data: command,
        })
        .then((res) => {
          const page: IPage = res.data.data;
          setPageModalOpen(false);
          if (props.page) {
            dispatch(pageSlice.actions.updatePage(page));
          } else {
            dispatch(pageSlice.actions.addPage(page));
          }
        })
        .finally(() => setLoading(false));
    },
  });

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

  if (user.role !== Role.Admin) return null;

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
          {props.page ? "Edit" : "Add Page"}
        </span>
      </div>

      <Modal handleClose={handleCloseModal} open={pageModalOpen}>
        <form
          onSubmit={formik.handleSubmit}
          className={styles.createPageModalContainer}
        >
          <div className={styles.createPageHeader}>
            <h2 className={styles.createPageTitle}>Create Page</h2>

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
              placeholder: "Title",
            }}
          />

          <InputSelect
            label="Language"
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
              {props.page ? "Update Page" : "Create Page"}
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
