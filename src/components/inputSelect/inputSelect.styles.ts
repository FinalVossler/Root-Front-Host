import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  inputSelectContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    marginBottom: 10,
    alignItems: "center",
  },
  selectLabel: {
    color: theme.darkTextColor,
    marginRight: 10,
    width: 170,

    textAlign: "start",
  },
  select: {
    flex: 1,
    backgroundColor: theme.lightTextColor,
    "& .react-select__control": {
      border: "none",
      boxShadow: theme.boxShadow,
      minHeight: 47,
    },

    "& .select__indicator": {
      color: theme.darkTextColor,
    },

    "& .react-select__indicator-separator": {
      backgroundColor: theme.darkTextColor,
    },

    "& input": {
      "&:focus-visible": {
        outline: "2px solid " + theme.secondary,
      },
    },
  },
  dislabedSelect: {
    extend: "select",

    "& .react-select__control": {
      backgroundColor: theme.secondary + "!important",
    },
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
