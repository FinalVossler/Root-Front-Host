import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  writePostButtonContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  placeholder: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.primary,
    height: 40,
    padding: 15,
    opacity: ".5",
    marginLeft: "10px",
    borderRadius: "20px",
    flex: 1,
    cursor: "pointer",
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
    },
  },
}));

export default useStyles;
