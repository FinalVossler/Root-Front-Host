import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  userPostsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.lightTextColor,
    padding: 20,
    borderRadius: 10,
  },
  userPost: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: theme.contentBackgroundColor,
    padding: 20,
    borderRadius: 10,
    boxSizing: "border-box",
  },
  postFiles: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    flexDirection: "row",
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
    flex: 1,
  },
  postImage: {
    width: 200,
    height: 200,
    marginRight: 10,
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
  },
  "@media (max-width: 850px)": {
    userPostsContainer: {
      width: "100%",
    },
  },
}));

export default useStyles;
