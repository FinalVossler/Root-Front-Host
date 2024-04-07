import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  entityEditorSectionsContainer: {
    display: "flex",
    boxSizing: "border-box",
    width: "100%",
    flexDirection: "column",
  },
  entityEditorSectionContainer: {
    boxSizing: "border-box",
    gap: 15,
    display: "flex",
    flex: 1,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
