import React from "react";
import { useTheme } from "react-jss";
import { CgProfile } from "react-icons/cg";

import { Theme } from "../../config/theme";

import useStyles from "./header.styles";

interface IHeader {}
const Header: React.FunctionComponent<IHeader> = (props: IHeader) => {
  const [scrolledDown, setScrolledDown] = React.useState(window.scrollY >= 80);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });

  React.useEffect(() => {
    const handleScrollEvent = () => {
      setScrolledDown(window.scrollY >= 80);
    };

    handleScrollEvent();

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <div
      className={
        scrolledDown ? styles.headerContainerScrolled : styles.headerContainer
      }
    >
      <div className={styles.left}>
        <h2 className={styles.headerTitle}>Socionics with Hamza Khalifa</h2>
      </div>

      <div className={styles.right}>
        <ul className={styles.optionsList}>
          <li className={styles.option}>
            <a className={styles.optionATag} href="/">
              Home
            </a>
          </li>
          <li className={styles.option}>
            <a className={styles.optionATag} href="/">
              Typing
            </a>
          </li>
          <li className={styles.option}>
            <a className={styles.optionATag} href="/">
              Contact
            </a>
          </li>

          <li className={styles.option + " " + styles.headerIcon}>
            <a className={styles.optionATag} href="/profile">
              <CgProfile />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
