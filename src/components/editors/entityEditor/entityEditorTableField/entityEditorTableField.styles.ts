import { createUseStyles } from "react-jss";

import { Theme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  entityEditorTableFieldContainer: {
    color: theme.lightTextColor,
    marginTop: 10,
    marginBottom: 20,
  },
  tableTd: {
    border: "1px solid " + theme.lightTextColor,
    height: 50,
    padding: 13,
  },
  inputTd: {
    extend: "tableTd",
    paddingBottom: 0,
  },
}));

export default useStyles;
