import { createUseStyles } from "react-jss";

import { ITheme } from "../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  inputSelectContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  selectLabel: {
    color: theme.darkTextColor,
    marginRight: 7,
    width: 170,

    textAlign: "start",
  },
  select: {
    backgroundColor: theme.lightTextColor,
    flex: 1,

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
    "& .react-select__option": {
      color: theme.darkTextColor,
    },
    "& .react-select__option--is-selected": {
      backgroundColor: theme.darkerPrimary,
      color: theme.lightTextColor,
    },
    "& .react-select__option--is-focused": {
      backgroundColor: theme.contentBackgroundColor,
      color: theme.darkTextColor,

      "&:active": {
        backgroundColor: theme.contentBackgroundColor,
        color: theme.darkTextColor,
      },
    },
  },
  dislabedSelect: {
    extend: "select",

    "& .react-select__control": {
      backgroundColor: theme.secondary + "!important",
    },
  },

  inputError: {
    color: theme.errorColor,
    marginTop: 5,
  },

  labelAndInputSelectContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  "@media (max-width: 800px)": {
    labelAndInputSelectContainer: {
      flexDirection: "column",
      width: "100%",
      alignItems: "flex-start",
    },
    select: {
      width: "100%",
    },
  },
}));

export default useStyles;
