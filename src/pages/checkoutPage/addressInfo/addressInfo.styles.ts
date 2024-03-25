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
  editButton: {
    position: "absolute",
    right: 5,
    top: 5,
    padding: 5,
    cursor: "pointer",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: theme.primary,
      color: theme.lightTextColor,
    },
  },

  select: {
    position: "absolute",
    right: 35,
    top: 5,
    padding: 5,
    cursor: "pointer",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: theme.primary,
      color: theme.lightTextColor,
    },
  },
}));

export default useStyles;
