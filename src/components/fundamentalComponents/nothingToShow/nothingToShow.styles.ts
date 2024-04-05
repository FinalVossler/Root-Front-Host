import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  nothingToShowContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  nothingToShowLogo: {
    fontSize: 50,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
