import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  fieldIframe: {},
  "@media (max-width: 850px)": {},
}));

export default useStyles;
