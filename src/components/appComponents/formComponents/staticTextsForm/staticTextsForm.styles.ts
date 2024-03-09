import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  staticTextsFormContainer: {
    display: "flex",
    flexDirection: "column",
  },
  staticTextsSectionTexts: {
    display: "flex",
    flexDirection: "column",
  },
  hr: {
    width: "100%",
  },
}));

export default useStyles;
