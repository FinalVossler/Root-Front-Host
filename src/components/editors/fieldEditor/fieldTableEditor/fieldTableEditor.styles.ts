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
}));

export default useStyles;
