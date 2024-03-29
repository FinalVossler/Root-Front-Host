import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  websiteConfigurationModalContainer: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 15,
    position: "relative",
    paddingRight: 10,
    height: "100%",
    width: "65vw",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingBottom: 15,
    borderBottom: "1px solid " + theme.darkTextColor,
    marginBottom: "10px",
  },
  title: {
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
  },
  loading: {
    margin: "auto",
    marginTop: 10,
  },
  themeTitle: {
    color: theme.darkTextColor,
    paddingBottom: 10,
    borderBottom: "2px solid " + theme.darkTextColor,
  },
  defaultButton: {
    fontSize: 15,
    backgroundColor: theme.primary,
    color: theme.darkTextColor,
    padding: 10,
    fontWeight: "bold",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginBottom: 10,
  },
  "@media (max-width: 850px)": {
    websiteConfigurationModalContainer: {
      width: "70vw",
    },
  },
}));

export default useStyles;
