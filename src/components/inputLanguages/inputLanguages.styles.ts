import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  inputLanguagesContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: 20,
  },
  selectedLanguagesContainer: {
    display: "flex",
    alignItems: "center",
    borderBottom: "2px solid " + theme.primary,
    paddingBottom: 10,
  },
  extendIcon: {
    cursor: "pointer",
    fontSize: 30,
    marginRight: 10,

    "&: hover": {
      backgroundColor: theme.secondary,
    },
  },
  selectedLanguage: {},
  languagesContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  singleLanguageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 100,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
