import React from "react";
import { BiAddToQueue } from "react-icons/bi";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";
import { IFieldEditor } from "../editors/fieldEditor/FieldEditor";

import useStyles from "./elements.styles";

interface IElements {
  Editor: React.FunctionComponent<IFieldEditor>;
}

const Elements: React.FunctionComponent<IElements> = (props: IElements) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

  const styles = useStyles({ theme });

  const handleOpenEditor = () => setEditorOpen(true);
  const handleCloseEditor = () => setEditorOpen(false);

  return (
    <div className={styles.elementsContainer}>
      <div className={styles.buttonsContainer}>
        <BiAddToQueue
          className={styles.addIcon}
          color={theme.primary}
          onClick={handleOpenEditor}
        />

        <props.Editor open={editorOpen} setOpen={setEditorOpen} />
      </div>
    </div>
  );
};

export default Elements;
