import { createUseStyles } from "react-jss";

import { ITheme } from "../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  spacingContainer: {
    width: "100%",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
