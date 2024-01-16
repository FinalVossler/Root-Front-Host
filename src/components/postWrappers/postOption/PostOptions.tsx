import { AxiosResponse } from "axios";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "react-toastify";

import { ITheme } from "../../../config/theme";
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { IPost, postSlice } from "../../../store/slices/postSlice";
import ConfirmationModal from "../../confirmationModal";
import PostEditor from "../../editors/postEditor";

import useStyles from "./postOptions.styles";
import { IUserReadDto } from "roottypes";

interface IPostOptionsProps {
  post: IPost;
}

const PostWrapper: React.FunctionComponent<IPostOptionsProps> = (
  props: IPostOptionsProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

  const [optionsOpen, setOptionsOpen] = React.useState<boolean>(false);
  const [deletePostLoading, setDeletePostLoading] =
    React.useState<boolean>(false);
  const [deletePostModalOpen, setDeletePostModalOpen] =
    React.useState<boolean>(false);
  const [editPostModalOpen, setEditPostModalOpen] =
    React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const optionsRef = React.useRef<HTMLDivElement>();
  useOnClickOutside(optionsRef, () => setOptionsOpen(false));
  const dispatch = useAppDispatch();

  //#region Event listeners
  const handleDeletePost = () => {
    setDeletePostLoading(true);
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
      })
      .finally(() => setDeletePostLoading(false));
  };
  const handlePostOptionsOpen = () => {
    setOptionsOpen(!optionsOpen);
  };
  //#endregion Event listeners

  if (props.post.poster.toString() !== user._id.toString()) {
    return null;
  }

  return (
    <div className={styles.postOptionsContainer}>
      <BsThreeDots
        onClick={handlePostOptionsOpen}
        className={styles.postOptionsButton}
        data-cy={"postOptionsForButtonForPost" + props.post._id}
      />
      {optionsOpen && (
        <div
          ref={optionsRef as React.RefObject<HTMLDivElement>}
          className={styles.optionsContainer}
        >
          <div
            className={styles.option}
            onClick={() => setDeletePostModalOpen(true)}
            style={{ marginBottom: 5 }}
            data-cy={"deleteButtonForPost" + props.post._id}
          >
            Delete
          </div>
          <div
            className={styles.option}
            onClick={() => setEditPostModalOpen(true)}
            data-cy={"editButtonForPost" + props.post._id}
          >
            Edit
          </div>
        </div>
      )}

      <ConfirmationModal
        onConfirm={handleDeletePost}
        loading={deletePostLoading}
        modalOpen={deletePostModalOpen}
        setModalOpen={setDeletePostModalOpen}
        title="Are you sure you sure you want to delete this post?"
        description="If you delete this post, you won't be able to recover it, and it will also be deleted from the pages where it was used"
      />

      <PostEditor
        post={props.post}
        open={editPostModalOpen}
        setOpen={setEditPostModalOpen}
      />
    </div>
  );
};

export default PostWrapper;
