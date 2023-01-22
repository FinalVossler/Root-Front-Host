export type Theme = {
  darkTextColor: string;
  lightTextColor: string;
  primary: string;
  secondary: string;
  subtleColor: string;
  errorColor: string;
  linkColor: string;
  borderColor: string;
  formMaxWidth: string;
  chatBackground: string;
  chatContentBackground: string;
  chatImportantText: string;
  chatContentBoxColor: string;
  chatButtonColor: string;
  chatInputBorderColor: string;
  chatContactsColor: string;
  chatSelectContactBoxColor: string;
  chatCurrentUserColor: string;
  chatInputBackgroundColor: string;
  chatOwnMessageColor: string;
  chatOtherMessageColor: string;
};

const theme: Theme = {
  darkTextColor: "#4c4c4d",
  lightTextColor: "white",

  primary: "#e68a91",
  secondary: "#c4656c",
  subtleColor: "#b8b9b8",
  errorColor: "red",
  linkColor: "blue",
  borderColor: "#e0e0e0",
  formMaxWidth: "400px",

  chatBackground: "#131222",
  chatContentBackground: "#0a0b13",
  chatImportantText: "#3c01ce",
  chatContentBoxColor: "#3f3c51",
  chatButtonColor: "#9885ec",
  chatInputBorderColor: "#27125e",
  chatContactsColor: "#08041e",
  chatSelectContactBoxColor: "#9086ee",
  chatCurrentUserColor: "#080925",
  chatInputBackgroundColor: "#3f3c51",
  chatOwnMessageColor: "#100b30",
  chatOtherMessageColor: "#1a092f",
};

export default theme;
