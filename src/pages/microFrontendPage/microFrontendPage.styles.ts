import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  microFrontendPageContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.backgroundColor,
    marginTop: 80,
  },
  loading: {
    color: theme.primary,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
