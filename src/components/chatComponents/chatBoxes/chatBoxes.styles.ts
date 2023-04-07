import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatBoxesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "fixed",
    bottom: 0,
    padding: 10,
    maxWidth: "100%",
    zIndex: 7,
    right: 0,
    top: "calc(100vh - 510px)",
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
