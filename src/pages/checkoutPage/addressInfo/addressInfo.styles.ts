import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  addressInfoContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.subContentBackgroundColor,
    padding: 20,
    borderRadius: 5,
    position: "relative",
    marginBottom: 10,
    boxShadow: theme.boxShadow,
  },
  selectedAddressInfoContainer: {
    extend: "addressInfoContainer",
    backgroundColor: theme.contentBackgroundColor,
  },
  horizontalDetails: {
    display: "flex",
    alignItems: "center",

    "& > span": {
      marginTop: 5,
      marginBottom: 5,
    },
  },
  horizontalInfo: {
    marginRight: 3,
  },
  addressActionsContainer: {
    display: "flex",
    alignItems: "center",

    position: "absolute",
    right: 5,
    top: 5,
  },
  editButton: {
    padding: 5,
    cursor: "pointer",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: theme.primary,
      color: theme.lightTextColor,
    },
  },

  actionButton: {
    padding: 5,
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: theme.lightTextColor,
    color: theme.primary,
    border: "1px solid " + theme.primary,
    marginLeft: 5,
    marginRight: 5,
    "&:hover": {
      backgroundColor: theme.primary,
      color: theme.lightTextColor,
    },
  },
}));

export default useStyles;
