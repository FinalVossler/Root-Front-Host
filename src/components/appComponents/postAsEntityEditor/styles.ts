import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  postAsEntityEditorContainer: {
    display: "flex",
  },
  addIcon: {
    color: theme.lightTextColor,
  },
}));

export default useStyles;
