import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  cartProductActionsContainer: {
    display: "flex",
    alignItems: "center",
  },
}));

export default useStyles;
