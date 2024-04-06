import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  sectionsCreatorContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    gap: 10,
    marginBottom: 10,
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid " + theme.borderColor,
    gap: 10,
    padding: 10,
  },
  sectionConfiguration: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },
  childSectionsContainer: {
    display: "flex",
    gap: 10,
  },
  confButton: {
    color: theme.darkTextColor,
    backgroundColor: theme.lightTextColor,
    background: "none",
    padding: "1px 5px",
    cursor: "pointer",
    borderRadius: 10,

    transitionDelay: 0,
    "&:hover": {
      backgroundColor: theme.primary,
      color: theme.lightTextColor + "!important",

      "& > svg": {
        color: theme.lightTextColor + "!important",
      },
    },

    "&svg": {
      color: theme.lightTextColor,
    },
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
