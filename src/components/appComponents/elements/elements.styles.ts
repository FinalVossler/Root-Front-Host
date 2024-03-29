import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  elementsContainer: {
    width: "100%",
    boxSizing: "border-box",
    padding: "0px 50px",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    display: "flex",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
    position: "sticky",
    left: 0,
    height: 57,
  },
  actionIcon: {
    fontSize: 30,
    cursor: "pointer",
    margin: 10,
    color: theme.darkTextColor,
  },
  addButton: {
    extend: "actionIcon",
  },
  deleteIcon: {
    extend: "actionIcon",
  },
  copyIcon: {
    extend: "actionIcon",
    color: theme.primary,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
