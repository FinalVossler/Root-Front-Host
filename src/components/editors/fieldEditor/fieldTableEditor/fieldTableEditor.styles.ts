import { createUseStyles } from "react-jss";
import { ITheme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
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
