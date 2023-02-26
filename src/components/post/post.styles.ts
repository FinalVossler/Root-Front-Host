import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  userPost: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: theme.contentBackgroundColor,
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    boxSizing: "border-box",
  },
  postFiles: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  postTitle: {
    marginTop: 0,
    marginBottom: 0,
  },
  postContent: {
    marginTop: 10,
    marginBottom: 0,
  },
  postFileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none",
    width: 200,
    marginRight: 10,
    margin: 5,
  },
  postImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
    cursor: "pointer",

    backgroundSize: "cover",
    backgroundBlendMode: "screen",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "inherit",
  },
  postFile: {
    display: "flex",
  },
  fileIcon: {
    extend: "postImage",

    width: 200,
    height: 200,
  },
  fileName: {
    fontSize: 20,
    color: theme.primary,
    marginTop: 10,
    width: "100%",
    lineBreak: "anywhere",
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
