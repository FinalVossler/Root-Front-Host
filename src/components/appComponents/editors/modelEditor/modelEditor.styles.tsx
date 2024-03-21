import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  createModelModalContainer: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 15,
    position: "relative",
    paddingRight: 10,
    paddingLeft: 5,
    width: "60vw",
    height: "100%",
  },
  createModelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingBottom: 15,
    borderBottom: "1px solid " + theme.borderColor,
    marginBottom: "10px",
  },
  createModelTitle: {
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
    marginTop: 5,
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.primary,
    color: theme.lightTextColor,
    padding: 10,
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 20,
  },
  titleInput: {
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: theme.darkTextColor,
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
    createModelModalContainer: {
      width: "70vw",
    },
  },
}));

export default useStyles;
