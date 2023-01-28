import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  paymentFormContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    maxWidth: theme.formMaxWidth,
    width: "70%",
    borderRadius: 20,
    padding: 40,
    paddingTop: 10,
    backgroundColor: theme.contentBackgroundColor,
    paddingBottom: 40,
  },
  paymentFormTitle: {
    fontSize: 30,
    marginBottom: 0,
    color: theme.primary,
  },
  productName: {
    margin: "0px",
    color: theme.primary,
    fontSize: 17,
  },
  inputsContainer: {
    margin: "20px 0px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  nameInput: {
    border: "1px solid " + theme.borderColor,
    padding: 15,
    borderRadius: 5,
    flex: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: theme.boxColor,
    color: theme.lightTextColor,

    "&::placeholder": {
      color: theme.lightTextColor,
    },
  },
  cardInput: {
    extend: "nameInput",
    borderTop: "none",

    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
