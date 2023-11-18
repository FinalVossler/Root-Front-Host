import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  fullWidthPictureContainer: {
    display: "flex",
    alignItems: "center",
    margin: 10,
  },
  fullWidthPicture: {
    width: "80%",
    margin: "auto",
  },
}));

export default useStyles;
