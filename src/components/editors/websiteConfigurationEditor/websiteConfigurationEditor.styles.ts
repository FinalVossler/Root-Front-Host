import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  websiteConfigurationModalContainer: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 15,
    maxHeight: "calc(100vh - 200px)",
    position: "relative",
    overflow: "auto",
    paddingRight: 45,
    width: "65vw",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingBottom: 15,
    borderBottom: "1px solid " + theme.borderColor,
    marginBottom: "10px",
  },
  title: {
    color: theme.lightTextColor,
  },
  closeButton: {
    cursor: "pointer",
    position: "absolute",
    top: 3,
    right: 5,
    color: theme.lightTextColor,
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
    color: theme.primary,
    paddingBottom: 10,
    borderBottom: "2px solid " + theme.primary,
  },
  defaultButton: {
    fontSize: 15,
    backgroundColor: theme.primary,
    color: theme.lightTextColor,
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
