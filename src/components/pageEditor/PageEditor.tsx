import React from "react";
import { useTheme } from "react-jss";
import { ImCross } from "react-icons/im";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdTitle } from "react-icons/md";
import { AxiosResponse } from "axios";
import ReactLoading from "react-loading";
import * as Yup from "yup";

import useStyles from "./pageEditor.styles";
import Modal from "../modal";
import { Theme } from "../../config/theme";
import Button from "../button";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IPost, postSlice, PostVisibility } from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";
import PageCreateCommand from "../../globalTypes/commands/PageCreateCommand";
import { FormikProps, useFormik } from "formik";
import Input from "../input";
import SearchInput from "../searchInput";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { IPage } from "../../store/slices/pageSlice";
import PostsSearchCommand from "../../globalTypes/commands/PostsSearchCommand";
import PaginationCommand from "../../globalTypes/PaginationCommand";

interface IPageEditorForm {
  title: string;
  posts: string[];
}

interface IPageEditor {}

const PageEditor = (props: IPageEditor) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [postModalOpen, setPageModalOpen] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const formik: FormikProps<IPageEditorForm> = useFormik<IPageEditorForm>({
    initialValues: {
      posts: [],
      title: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      const command: PageCreateCommand = {
        orderedPosts: values.posts,
        title: values.title,
      };

      axios
        .request<AxiosResponse<IPage>>({
          url: "/pages",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const page: IPage = res.data.data;
          setPageModalOpen(false);
        })
        .finally(() => setLoading(false));
    },
  });

  //#region Event listeners
  const handleSearchPosts = (
    title: string,
    paginationCommand: PaginationCommand
  ) =>
    new Promise<PaginationResponse<IPost>>((resolve, reject) => {
      const command: PostsSearchCommand = {
        paginationCommand: paginationCommand,
        posterId: user._id,
        title,
        visibilities: Object.values(PostVisibility),
      };

      axios
        .request<AxiosResponse<PaginationResponse<IPost>>>({
          url: "/posts/searchPosts",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve(res.data.data);
        });
    });
  //#endregion Event listeners

  return (
    <div className={styles.pageEditorContainer}>
      <div
        onClick={() => setPageModalOpen(true)}
        className={styles.createPageButtonContainer}
      >
        <AiFillPlusCircle
          color={theme.primary}
          className={styles.pageEditorPlusIcon}
        />{" "}
        <span className={styles.addPageText}>Add Page</span>
      </div>

      <Modal handleClose={() => setPageModalOpen(false)} open={postModalOpen}>
        <form
          onSubmit={formik.handleSubmit}
          className={styles.createPageModalContainer}
        >
          <div className={styles.createPageHeader}>
            <h2 className={styles.createPageTitle}>Create Page</h2>

            <ImCross
              onClick={() => setPageModalOpen(false)}
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

          <SearchInput
            inputProps={{
              placeholder: "Search Post",
            }}
            searchPromise={handleSearchPosts}
            getElementTitle={(post: IPost) => post.title || ""}
          />

          {!loading && (
            <Button
              disabled={loading}
              type="submit"
              style={{}}
              className={styles.button}
            >
              Create Page
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
