import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  fullWidthPictureContainer: {
    width: "80%",
    height: 400,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    margin: 10,
    boxSizing: "border-box",
  },
}));

export default useStyles;
