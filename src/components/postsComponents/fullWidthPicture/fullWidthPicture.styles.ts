import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  fullWidthPictureContainer: {
    minWidth: "95%",
    minHeight: 800,
    height: 400,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    margin: 10,
    boxSizing: "border-box",
  },
}));

export default useStyles;
