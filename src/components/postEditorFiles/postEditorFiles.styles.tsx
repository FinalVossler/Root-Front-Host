import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  postEditorFilesContainer: {
    width: "100%",
    marginTop: 10,
  },
  icon: {
    cursor: "pointer",
    color: theme.primary,
    fontSize: 40,
  },
  buttonsContainer: {
    justifyContent: "flex-start",
    display: "flex",
    alignItems: "center",
  },
  filesContainer: {
    justifyContent: "flex-start",
    display: "flex",
    alignItems: "center",
  },
  imagesContainer: {
    justifyContent: "flex-start",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  singleImage: {
    width: 100,
    height: 100,
    backgroundSize: "cover",
    backgroundBlendMode: "screen",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "inherit",
    border: "none",
    margin: 5,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
