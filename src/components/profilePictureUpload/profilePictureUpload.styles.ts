import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  profilePictureUploadContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    cursor: "pointer",
    color: theme.primary,
    marginBottom: 10,
  },
  defaultIcon: {
    extend: "profilePicture",
  },
  loading: {
    extend: "profilePicture",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
