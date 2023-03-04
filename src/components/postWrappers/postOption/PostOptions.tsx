import { AxiosResponse } from "axios";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "react-toastify";

import { Theme } from "../../../config/theme";
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { IPost, postSlice } from "../../../store/slices/postSlice";
import { IUser } from "../../../store/slices/userSlice";
import ConfirmationModal from "../../confirmationModal";

import useStyles from "./postOptions.styles";

interface IPostOptions {
  post: IPost;
}

const PostWrapper: React.FunctionComponent<IPostOptions> = (
  props: IPostOptions
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const user: IUser = useAppSelector((state) => state.user.user);

  const [optionsOpen, setOptionsOpen] = React.useState<boolean>(false);
  const [deletePostLoading, setDeletePostLoading] =
    React.useState<boolean>(false);
  const [deletePostModalOpen, setDeletePostModalOpen] =
    React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const optionsRef = React.useRef<HTMLDivElement>();
  useOnClickOutside(optionsRef, () => setOptionsOpen(false));
  const dispatch = useAppDispatch();

  //#region Event listeners
  const handleDeletePost = () => {
    axios
      .request<AxiosResponse<void>>({
        method: "DELETE",
        url: "/posts",
        params: {
          postId: props.post._id,
        },
      })
      .then(() => {
        dispatch(postSlice.actions.removeUserPost({ post: props.post, user }));
        toast.success("Post has been deleted");
      });
  };
  const handlePostOptionsOpen = () => {
    setOptionsOpen(!optionsOpen);
  };
  //#endregion Event listeners

  return (
    <div className={styles.postOptionsContainer}>
      <BsThreeDots
        color={theme.lightTextColor}
        onClick={handlePostOptionsOpen}
        className={styles.postOptionsButton}
      />
      {optionsOpen && (
        <div
          ref={optionsRef as React.RefObject<HTMLDivElement>}
          className={styles.optionsContainer}
        >
          <div
            className={styles.option}
            onClick={() => setDeletePostModalOpen(true)}
          >
            Delete
          </div>
        </div>
      )}

      <ConfirmationModal
        onConfirm={handleDeletePost}
        loading={deletePostLoading}
        modalOpen={deletePostModalOpen}
        setModalOpen={setDeletePostLoading}
        title="Are you sure you sure you want to delete this post?"
        description="If you delete this post, you won't be able to recover it, and it will also be deleted from the pages where it was used"
      />
    </div>
  );
};

export default PostWrapper;
