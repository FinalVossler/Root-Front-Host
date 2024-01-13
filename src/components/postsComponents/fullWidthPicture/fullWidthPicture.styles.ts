import { createUseStyles } from "react-jss";

import { ITheme } from "../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
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
