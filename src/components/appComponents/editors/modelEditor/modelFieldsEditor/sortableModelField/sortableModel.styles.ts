import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  singleModelFieldContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    border: "1px solid " + theme.primary,
    marginBottom: 10,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    width: "100%",
    boxSizing: "border-box",
  },
  deleteModelFieldButton: {
    position: "absolute",
    top: 5,
    right: 5,
    fontSize: 20,
    cursor: "pointer",
    zIndex: 3,
  },
  fieldName: {
    color: theme.darkTextColor,
    fontSize: 20,
  },
  sortModelFieldHandle: {
    extend: "deleteModelFieldButton",
    right: 30,
  },
  fieldConfigurationContainer: {
    width: "100%",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  conditionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  conditionsTitleContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    color: theme.primary,
    backgroundColor: theme.lightTextColor,
    border: "1px solid " + theme.primary,
    flex: 1,
    paddingLeft: 10,
    boxSizing: "border-box",
    cursor: "pointer",
    borderRadius: 5,
    position: "relative",
    justifyContent: "space-between",
    padding: 5,
    transition: "all .1s ease-in-out",

    "&:hover": {
      color: theme.lightTextColor,
      backgroundColor: theme.primary,
    },
  },
  conditionsTitle: {
    display: "flex",
    marginRight: 10,
  },
  conditionAdd: {
    fontSize: 25,
  },
  conditionButtons: {
    display: "flex",
    alignItems: "center",
  },
  singleCondition: {
    marginTop: 10,
    border: "1px solid " + theme.lightTextColor,
    width: "100%",
    padding: 10,
    paddingTop: 30,
    boxSizing: "border-box",
    borderRadius: 5,
    position: "relative",
  },
  deleteConditionIcon: {
    cursor: "pointer",
    position: "absolute",
    top: 5,
    right: 5,
    color: theme.errorColor,
    fontSize: 20,
    zIndex: 10,
  },
  modelFieldStatesConfigurationContainer: {
    display: "flex",
    marginTop: -20,
    flexDirection: "column",
    width: "100%",
  },
  statesConfigurationHint: {
    color: theme.darkTextColor,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
