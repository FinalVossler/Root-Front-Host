import React from "react";
import { useTheme } from "react-jss";
import { ImCross } from "react-icons/im";
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { MdTitle } from "react-icons/md";
import { AxiosResponse } from "axios";
import ReactLoading from "react-loading";
import * as Yup from "yup";

import useStyles from "./pageEditor.styles";
import Modal from "../modal";
import { Theme } from "../../config/theme";
import Button from "../button";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { useAppSelector } from "../../store/hooks";
import { IPost, PostVisibility } from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";
import PageCreateCommand from "../../globalTypes/commands/PageCreateCommand";
import { FormikProps, useFormik } from "formik";
import Input from "../input";
import SearchInput from "../searchInput";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { IPage } from "../../store/slices/pageSlice";
import PostsSearchCommand from "../../globalTypes/commands/PostsSearchCommand";
import PaginationCommand from "../../globalTypes/PaginationCommand";
import Post from "../post";

interface IPageEditorForm {
  title: string;
  orderedPosts: string[];
}

interface IPageEditor {}

const PageEditor = (props: IPageEditor) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [postModalOpen, setPageModalOpen] = React.useState<boolean>(false);
  const [selectedPosts, setSelectedPosts] = React.useState<IPost[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  React.useEffect(() => {
    formik.setFieldValue(
      "orderedPosts",
      selectedPosts.map((post) => post._id)
    );
  }, [selectedPosts]);

  const formik: FormikProps<IPageEditorForm> = useFormik<IPageEditorForm>({
    initialValues: {
      orderedPosts: [],
      title: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      const command: PageCreateCommand = {
        orderedPosts: values.orderedPosts,
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

  const handleSelectPost = (post: IPost) => {
    setSelectedPosts([...selectedPosts, post]);
  };
  const handleDeletePost = (index: number) => {
    let newSelectedPosts = [...selectedPosts];
    newSelectedPosts.splice(index, 1);
    setSelectedPosts(newSelectedPosts);
  };
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
            onElementClick={handleSelectPost}
          />

          <div className={styles.postsContainer}>
            {selectedPosts.map((post: IPost, postIndex: number) => {
              return (
                <div key={postIndex} className={styles.singlePostContainer}>
                  <AiFillDelete
                    color={theme.primary}
                    className={styles.deletePostButton}
                    onClick={() => handleDeletePost(postIndex)}
                  />
                  <Post post={post} />
                </div>
              );
            })}
          </div>

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
