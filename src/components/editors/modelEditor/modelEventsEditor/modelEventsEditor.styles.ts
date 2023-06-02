import { createUseStyles } from "react-jss";

import { Theme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  modelEventsEditorContainer: {
    display: "flex",
    flexDirection: "column",
  },
  eventsTitle: {
    color: theme.lighterPrimary,
    fontSize: 25,
    marginBottom: 10,
  },
  singleModelEvent: {
    position: "relative",
    border: "1px solid " + theme.lightTextColor,
    marginBottom: 10,
    padding: 10,
    paddingTop: 20,
    display: "flex",
    flexDirection: "column",
  },
  eventTriggerTitle: {
    color: theme.primary,
    fontSize: 20,
    marginBottom: 10,
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
}));

export default useStyles;
