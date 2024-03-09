import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  picker: {},
  pickerContainer: {
    position: "absolute",
    left: "210px",
    top: "50px",
    zIndex: 1,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
