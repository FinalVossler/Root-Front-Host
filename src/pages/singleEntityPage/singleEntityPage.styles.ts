import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  singleEntityPageContainer: {
    display: "flex",
    flexDirection: "column",
    color: theme.lightTextColor,
    alignItems: "center",
    width: "90%",
    margin: "auto",
    marginBottom: 10,
    marginTop: 100,
  },
  entityValuesContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
}));

export default useStyles;
