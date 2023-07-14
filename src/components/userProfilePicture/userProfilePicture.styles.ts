import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
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

    backgroundSize: "cover",
    backgroundBlendMode: "screen",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "inherit",
    "&:hover": {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
  },
  verBig: {
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
    borderWidth: 3,
  },
}));

export default useStyles;
