import React from "react";
import { useTheme } from "react-jss";

import useStyles from "./postsEditor.styles";
import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";
import { IPost } from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";
import SearchInput from "../searchInput";
import { AiFillDelete } from "react-icons/ai";
import Post from "../post";
import useSearchPosts from "../../hooks/useSearchPosts";

interface IPostsEditor {
  setSelectedPosts: (posts: IPost[]) => any;
  placeholder?: string;
}

const PostsEditor = (props: IPostsEditor) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });

  const {
    selectedPosts,
    handleSearchPostsPromise,
    handleDeletePost,
    handleSelectPost,
  } = useSearchPosts(user);

  React.useEffect(() => {
    props.setSelectedPosts(selectedPosts);
  }, [selectedPosts]);

  return (
    <div className={styles.postsEditorContainer}>
      <SearchInput
        inputProps={{
          placeholder: props.placeholder || "Search Posts",
        }}
        searchPromise={handleSearchPostsPromise}
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
    </div>
  );
};

export default React.memo(PostsEditor);
