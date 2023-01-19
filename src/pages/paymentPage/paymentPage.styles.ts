import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  paymentPageContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
}));

export default useStyles;
