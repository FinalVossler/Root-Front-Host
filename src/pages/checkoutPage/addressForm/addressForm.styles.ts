import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  addressFormContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: theme.lightTextColor,
    padding: 20,
    paddingTop: 0,
    boxSizing: "border-box",
    borderRadius: 5,
    boxShadow: theme.boxShadow,
  },
  addressTitle: {},
  section: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    marginTop: 15,
  },
}));

export default useStyles;
