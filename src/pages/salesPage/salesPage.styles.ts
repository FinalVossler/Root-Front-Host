import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  salesTitle: {
    color: theme.darkTextColor,
  },
  salesPageContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 100,
    padding: "0px 50px",
  },
}));

export default useStyles;
