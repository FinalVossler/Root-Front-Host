import { createUseStyles } from "react-jss";
import { Theme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  fieldTableEditorContainer: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid " + theme.lightTextColor,
    padding: 10,
  },
  fieldTableEditorTable: {
    marginTop: 10,
  },
  columnOrRow: {
    position: "relative",
  },
  sortHandle: {
    color: theme.primary,
    cursor: "pointer",
    position: "absolute",
    right: 0,
    zIndex: 1,
    top: 1,
  },
}));

export default useStyles;
