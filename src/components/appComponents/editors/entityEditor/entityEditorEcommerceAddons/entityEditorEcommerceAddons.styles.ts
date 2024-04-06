import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  entityEditorEcommerceAddonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
}));

export default useStyles;
