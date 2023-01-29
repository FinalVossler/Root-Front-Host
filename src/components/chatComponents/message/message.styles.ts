import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.secondary,
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    marginLeft: 20,
  },
  otherMessageContainer: {
    extend: "messageContainer",
    backgroundColor: theme.primary,
    alignSelf: "flex-end",
    marginRight: 20,
  },
  filesContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },
  singleFileContainer: {
    margin: 5,
  },
  file: {
    width: "100%",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
