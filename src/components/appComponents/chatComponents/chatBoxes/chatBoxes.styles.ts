import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  chatBoxesContainer: {
    display: "flex",
    flexDirection: "row",
    position: "fixed",
    bottom: 0,
    padding: 10,
    maxWidth: "calc(100% - 355px)",
    overflow: "auto",
    zIndex: 11,
    right: 0,
    top: "calc(100vh - 510px)",
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
