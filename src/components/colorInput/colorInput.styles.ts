import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
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
