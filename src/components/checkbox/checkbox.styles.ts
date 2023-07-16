import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    marginBottom: 10,
    alignItems: "center",
  },
  input: {
    border: "none",
    padding: 20,
    fontSize: 17,
    color: theme.darkTextColor,
    backgroundColor: theme.boxColor,
    borderRadius: 5,
    width: 20,
    height: 20,
    cursor: "pointer",
  },
  label: {
    marginRight: 10,
    color: theme.darkTextColor,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
