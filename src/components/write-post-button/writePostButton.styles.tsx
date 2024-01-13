import { createUseStyles } from "react-jss";

import { ITheme } from "../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  writePostButtonContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  placeholder: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.darkerPrimary,
    height: 40,
    padding: 15,
    opacity: 0.7,
    marginLeft: 10,
    borderRadius: 20,
    flex: 1,
    cursor: "pointer",
    boxShadow: theme.boxShadow,
    color: theme.lightTextColor,

    "&:hover": {
      opacity: ".9",
    },
  },
  "@media (max-width: 850px)": {
    writePostButtonContainer: {
      flexDirection: "column",
    },
    placeholder: {
      marginTop: 15,
      width: "80%",
      marginLeft: 0,
    },
  },
}));

export default useStyles;
