import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  elementsContainer: {
    width: "90%",
    marginTop: 100,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    display: "flex",
  },
  addIcon: {
    fontSize: 30,
    cursor: "pointer",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
