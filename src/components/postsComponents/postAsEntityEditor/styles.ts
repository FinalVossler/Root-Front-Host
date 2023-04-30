import { createUseStyles } from "react-jss";
import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  postAsEntityEditorContainer: {
    display: "flex",
  },
  addIcon: {
    color: theme.lightTextColor,
  },
}));

export default useStyles;
