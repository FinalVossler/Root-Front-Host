import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  addressFormContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  addressTitle: {},
  section: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
}));

export default useStyles;
