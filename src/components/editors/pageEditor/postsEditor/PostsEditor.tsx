import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { BsHandIndexFill } from "react-icons/bs";

import { ITheme } from "../../../../config/theme";
import { useAppSelector } from "../../../../store/hooks";
import { IPost } from "../../../../store/slices/postSlice";
import SearchInput from "../../../searchInput";
import { AiFillDelete } from "react-icons/ai";
import Post from "../../../post";
import useSearchPosts from "../../../../hooks/apiHooks/useSearchPosts";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";

import useStyles from "./postsEditor.styles";
import { IPageReadDto, IUserReadDto } from "roottypes";

interface IPostsEditor {
  setSelectedPosts: (posts: IPost[]) => any;
  placeholder?: string;
  page?: IPageReadDto;
  parentPost?: IPost;
}

const PostsEditor = (props: IPostsEditor) => {
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

  const getTranslatedText = useGetTranslatedText();

  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  const {
    selectedPosts,
    setSelectedPosts,
    handleSearchPostsPromise,
    handleDeletePost,
    handleSelectPost,
  } = useSearchPosts(user, props.page, props.parentPost);

  React.useEffect(() => {
    props.setSelectedPosts(selectedPosts);
  }, [selectedPosts]);

  //#region Event listeners
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = selectedPosts
        .map((post) => post.uuid)
        .indexOf(active.id as string);
      const newIndex = selectedPosts
        .map((post) => post.uuid)
        .indexOf(over.id as string);

      const newSelectedPosts = arrayMove(selectedPosts, oldIndex, newIndex);

      setSelectedPosts(newSelectedPosts);
    }
  }
  //#endregion Event listeners

  return (
    <div className={styles.postsEditorContainer}>
      <SearchInput
        inputProps={{
          placeholder: props.placeholder || "Search Posts",
        }}
        searchPromise={handleSearchPostsPromise}
        getElementTitle={(post: IPost) => getTranslatedText(post.title)}
        onElementClick={handleSelectPost}
      />

      <div className={styles.postsContainer}>
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={selectedPosts.map((post) => post.uuid)}>
            {selectedPosts.map((post: IPost, postIndex: number) => {
              return (
                <SortablePost
                  key={postIndex}
                  handleDeletePost={handleDeletePost}
                  post={post}
                  postIndex={postIndex}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

interface ISortablePost {
  post: IPost;
  handleDeletePost: (postIndex: number) => void;
  postIndex: number;
}

const SortablePost: React.FunctionComponent<ISortablePost> = (
  props: ISortablePost
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: props.post.uuid,
  });

  const sorteStyles = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={sorteStyles}
      className={styles.singlePostContainer}
    >
      <BsHandIndexFill
        color={theme.primary}
        className={styles.sortPostHandle}
        {...attributes}
        {...listeners}
      />
      <AiFillDelete
        color={theme.primary}
        className={styles.deletePostButton}
        onClick={() => props.handleDeletePost(props.postIndex)}
      />
      <Post post={props.post} />
    </div>
  );
};

export default React.memo(PostsEditor);
