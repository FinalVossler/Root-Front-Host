import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  spacingContainer: {
    width: "100%",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
