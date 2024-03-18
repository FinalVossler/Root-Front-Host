import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  createPageModalContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    paddingRight: 10,
    paddingBottom: 15,
    width: "65vw",
    boxSizing: "border-box",
    paddingLeft: 5,
    height: "100%",
  },
  createPageHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingBottom: 15,
    borderBottom: "1px solid " + theme.borderColor,
    marginBottom: "10px",
  },
  createPageTitle: {
    color: theme.darkTextColor,
  },
  closeButton: {
    cursor: "pointer",
    position: "absolute",
    top: 3,
    right: 15,
    color: theme.darkTextColor,
    fontSize: 25,
    borderRadius: 10,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.primary,
    color: theme.lightTextColor,
    padding: 10,
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: "bold",
  },
  titleInput: {
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: theme.lightTextColor,
    border: "none",
    placeholder: "title",
    borderRadius: 20,
    padding: 5,
    height: 30,
    textAlign: "center",
    color: theme.darkTextColor,
    fontSize: 26,
  },
  loading: {
    margin: "auto",
    marginTop: 10,
  },
  "@media (max-width: 850px)": {
    createPageModalContainer: {
      width: "80vw",
    },
  },
}));

export default useStyles;
