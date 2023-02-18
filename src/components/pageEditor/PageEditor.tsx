import React from "react";
import { useTheme } from "react-jss";
import { ImCross } from "react-icons/im";
import { AxiosResponse } from "axios";
import ReactLoading from "react-loading";

import useStyles from "./pageEditor.styles";
import WritePostButton from "../write-post-button";
import Modal from "../modal";
import { Theme } from "../../config/theme";
import Button from "../button";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IPost, postSlice } from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";

interface IPageEditor {}

const PageEditor = (props: IPageEditor) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [postModalOpen, setPageModalOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const command = {};

    axios
      .request<AxiosResponse<IPost>>({
        url: "/pages",
        method: "POST",
        data: command,
      })
      .then((res) => {
        const post: IPost = res.data.data;
        dispatch(postSlice.actions.addUserPost({ post, user }));
        setTitle("");
        setPageModalOpen(false);
      })
      .finally(() => setLoading(false));
  };

  //#region Event listeners
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  //#endregion Event listeners

  return (
    <div className={styles.pageEditorContainer}>
      <WritePostButton onClick={() => setPageModalOpen(true)} />

      <Modal handleClose={() => setPageModalOpen(false)} open={postModalOpen}>
        <form
          onSubmit={handleSubmit}
          className={styles.createPageModalContainer}
        >
          <div className={styles.createPageHeader}>
            <h2 className={styles.createPageTitle}>Create Page</h2>

            <ImCross
              onClick={() => setPageModalOpen(false)}
              className={styles.closeButton}
            />
          </div>

          <input
            className={styles.titleInput}
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
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
