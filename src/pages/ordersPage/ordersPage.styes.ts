import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  ordersPageContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default useStyles;
