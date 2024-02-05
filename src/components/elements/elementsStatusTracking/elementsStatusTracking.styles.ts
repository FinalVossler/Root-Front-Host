import { createUseStyles } from "react-jss";

import { ITheme } from "../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  entityCardAndStateTrackingContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 0,
  },
  "@media (max-width: 930px)": {
    entityCardAndStateTrackingContainer: {
      flexDirection: "column",
    },
  },
}));

export default useStyles;
