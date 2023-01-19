import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  paymentFormContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    maxWidth: 500,
    width: "70%",
    borderRadius: 20,
    padding: 40,
    paddingTop: 10,
    boxShadow: "0.1px 0.01px 30px 0.3px #e4e4e4",
    paddingBottom: 40,
  },
  paymentFormTitle: {
    fontSize: 30,
    marginBottom: 0,
    color: theme.primary,
  },
  productName: {
    margin: "0px",
    color: theme.subtleColor,
    fontSize: 15,
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
