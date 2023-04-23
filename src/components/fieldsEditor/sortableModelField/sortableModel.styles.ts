import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
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
    color: theme.lightTextColor,
  },
  sortModelFieldHandle: {
    extend: "deleteModelFieldButton",
    right: 30,
  },
  conditionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  conditionsTitleContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    color: theme.lightTextColor,
    backgroundColor: theme.primary,
    flex: 1,
    paddingLeft: 10,
    boxSizing: "border-box",
    cursor: "pointer",
    borderRadius: 5,
    position: "relative",
    justifyContent: "space-between",
    padding: 5,
  },
  conditionsTitle: {
    display: "flex",
    color: theme.lightTextColor,
    marginRight: 10,
  },
  conditionAdd: {
    color: theme.lightTextColor,
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
  "@media (max-width: 850px)": {},
}));

export default useStyles;
