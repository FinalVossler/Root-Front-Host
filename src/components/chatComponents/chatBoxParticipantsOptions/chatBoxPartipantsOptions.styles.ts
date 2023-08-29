import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatBoxParticipantsOptionsContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.lightTextColor,
    boxShadow: theme.boxShadow,
    color: theme.primary,
    zIndex: 100,

    position: "absolute",
    left: -335,
    top: 20,
    borderRadius: 5,
    width: 300,
  },
  option: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 5,
    height: 30,
    paddingLeft: 10,
  },
  chatOptionIcon: {
    color: theme.primary,
    marginRight: 10,
    fontSize: 20,
  },
  selectedOption: {
    extend: "option",
    color: theme.lightTextColor,
    backgroundColor: theme.primary,

    "& svg": {
      color: theme.lightTextColor,
    },
  },
  groupCreationContainer: {
    display: "flex",
    flexDirection: "column",
  },
  searchContactsLabel: {
    marginTop: 10,
    marginBottom: 10,
  },
  newGroupParticipant: {
    marginTop: 5,
    marginBottom: 5,
    color: theme.darkerPrimary,
  },
  addConversationButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 5,
    boxShadow: theme.boxShadow,
    padding: 5,
  },
  addConversationButton: {
    fontSize: 30,
    cursor: "pointer",
  },
}));

export default useStyles;
