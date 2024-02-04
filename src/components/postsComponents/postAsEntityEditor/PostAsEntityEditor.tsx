import React from "react";
import { BiPlus } from "react-icons/bi";

import { ITheme } from "../../../config/theme";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { IPost } from "../../../store/slices/postSlice";
import Button from "../../button";

import useStyles from "./styles";
import { EditorTypeEnum, editorSlice } from "../../../store/slices/editorSlice";
import { IModelReadDto } from "roottypes";

interface IPostAsEntityEditorProps {
  post: IPost;
}

const PostAsEntityEditor: React.FunctionComponent<IPostAsEntityEditorProps> = (
  props: IPostAsEntityEditorProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const model: IModelReadDto | undefined = useAppSelector(
    (state) => state.model.models
  ).find((m) => m._id === props.post.code);

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();

  const handleOpenEntityEditor = () => {
    dispatch(
      editorSlice.actions.addEditor({
        editorType: EditorTypeEnum.Entity,
        modelId: props.post.code,
      })
    );
  };

  if (!model) return null;

  return (
    <div className={styles.postAsEntityEditorContainer}>
      <Button
        onClick={handleOpenEntityEditor}
        buttonDataCy={"postOfTypeModelFormButtonForModel" + props.post.code}
      >
        {props.post.title
          ? getTranslatedText(props.post.title)
          : getTranslatedText(model.name)}{" "}
        <BiPlus className={styles.addIcon} />
      </Button>
    </div>
  );
};

export default PostAsEntityEditor;
