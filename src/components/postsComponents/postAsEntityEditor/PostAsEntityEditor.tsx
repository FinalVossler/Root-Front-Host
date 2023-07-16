import React from "react";
import { BiPlus } from "react-icons/bi";

import { Theme } from "../../../config/theme";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../store/hooks";
import { IModel } from "../../../store/slices/modelSlice";
import { IPost } from "../../../store/slices/postSlice";
import Button from "../../button";
import EntityEditor from "../../editors/entityEditor";

import useStyles from "./styles";

interface IPostAsEntityEditor {
  post: IPost;
}

const PostAsEntityEditor: React.FunctionComponent<IPostAsEntityEditor> = (
  props: IPostAsEntityEditor
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const model: IModel | undefined = useAppSelector(
    (state) => state.model.models
  ).find((m) => m._id === props.post.code);

  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  const handleOpenEditor = () => setEditorOpen(true);

  if (!model) return null;

  return (
    <div className={styles.postAsEntityEditorContainer}>
      <Button onClick={handleOpenEditor}>
        {props.post.title
          ? getTranslatedText(props.post.title)
          : getTranslatedText(model.name)}{" "}
        <BiPlus className={styles.addIcon} />
      </Button>

      <EntityEditor
        open={editorOpen}
        setOpen={setEditorOpen}
        modelId={props.post.code}
      />
    </div>
  );
};

export default PostAsEntityEditor;
