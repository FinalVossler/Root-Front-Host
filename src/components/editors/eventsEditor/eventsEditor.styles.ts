import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  eventsEditorContainer: {
    display: "flex",
    flexDirection: "column",
  },
  eventsTitle: {
    color: theme.lighterPrimary,
    fontSize: 25,
    marginBottom: 10,

    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  singleEvent: {
    position: "relative",
    border: "1px solid " + theme.lightTextColor,
    marginBottom: 10,
    padding: 10,
    paddingTop: 45,
    display: "flex",
    flexDirection: "column",
  },
  eventIndex: {
    position: "absolute",
    top: 0,
    left: 0,
    border: "2px solid " + theme.lightTextColor,
    color: theme.lightTextColor,
    height: 15,
    textAlign: "center",
    borderBottomRightRadius: "50%",
    padding: 9,
  },
  eventTriggerTitle: {
    color: theme.primary,
    fontSize: 20,
    marginBottom: 10,
  },
  triggerArrow: {
    position: "relative",
    bottom: 2,
  },
  eventTypeTitle: {
    color: theme.primary,
    fontSize: 20,
    marginBottom: 10,
  },
  addEventButton: {
    cursor: "pointer",
  },
  confContainer: {
    margin: 10,
    border: "1px solid " + theme.lightTextColor,
    padding: 10,
  },
  apiTitle: {
    color: theme.primary,
  },
  redirectionTitle: {
    color: theme.primary,
  },
  plusButton: {},
  deleteIcon: {
    color: theme.errorColor,
    position: "absolute",
    top: 5,
    right: 5,
    fontSize: 20,
    cursor: "pointer",
  },
  eventsContainer: {
    border: "1px solid " + theme.lightTextColor,
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  headerTitle: {
    color: theme.lightTextColor,
    fontSize: 20,
    marginBottom: 15,
  },
  singleHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    border: "1px solid " + theme.lightTextColor,
    padding: 10,
    position: "relative",
    paddingTop: 40,
    marginBottom: 10,
  },
  addHeaderIcon: {
    marginLeft: 10,
  },
  headerDeleteIcon: {
    extend: "deleteIcon",
  },
}));

export default useStyles;
