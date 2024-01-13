import { createUseStyles } from "react-jss";

import { ITheme } from "../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  big: {
    position: "relative",
    height: 100,
    width: 100,
    borderRadius: "50%",
    borderColor: theme.darkerPrimary,
    borderWidth: 5,
    borderStyle: "solid",
    cursor: "pointer",
    transitionDuration: "350ms",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

    backgroundSize: "cover",
    backgroundBlendMode: "screen",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "inherit",
    "&:hover": {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
      color: theme.lightTextColor,
    },

    "&:hover $defaultAvatar": {
      color: theme.lighterPrimary,
    },
  },
  veryBig: {
    extend: "big",
    height: 150,
    width: 150,
  },
  average: {
    extend: "big",
    height: 70,
    width: 70,
  },
  small: {
    extend: "big",
    height: 40,
    width: 40,
    minWidth: 39,
    borderWidth: 3,
  },
  verySmall: {
    extend: "big",
    height: 15,
    width: 15,
    minWidth: 9,
    borderWidth: 1,
  },
  defaultAvatar: {
    color: theme.primary,
  },
}));

export default useStyles;
