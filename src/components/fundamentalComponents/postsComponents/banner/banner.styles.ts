import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  bannerContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    background: "transparent",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: 100,
  },
  bannerImage: {
    backgroundImage: 'url("assets/images/banner.jpeg")',
    height: "100%",
    width: "100%",
    backgroundSize: "cover",
    position: "absolute",
    right: "0px",
    top: "0px",
    opacity: 0.7,
  },
  bannerLayer: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    opacity: 0.7,
    position: "absolute",
    right: "0px",
    top: "0px",
  },
  bannerTitle: {
    fontSize: 40,
    color: theme.lightTextColor,
    zIndex: 1,
    margin: 0,
    marginTop: 140,
    textAlign: "center",
  },
  bannerDescription: {
    fontSize: 20,
    color: theme.lightTextColor,
    zIndex: 1,
    textAlign: "center",
    marginBottom: 100,
    marginRight: 20,
    marginLeft: 20,
  },
  "@media (max-width: 800px)": {
    bannerTitle: {
      fontSize: 30,
      marginRight: 10,
      marginLeft: 10,
    },
    bannerDescription: {
      fontSize: 15,
    },
  },
}));

export default useStyles;
