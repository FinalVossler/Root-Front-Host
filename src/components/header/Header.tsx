import React from "react";
import { useTheme } from "react-jss";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";

import { Theme } from "../../config/theme";

import useStyles from "./header.styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { userSlice } from "../../store/slices/userSlice";
import { IPage } from "../../store/slices/pageSlice";

interface IHeader {}
const Header: React.FunctionComponent<IHeader> = (props: IHeader) => {
  const pages = useAppSelector<IPage[]>((state) => state.page.pages);

  const [scrolledDown, setScrolledDown] = React.useState(window.scrollY >= 80);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();

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

  const handleLogout = () => {
    dispatch(userSlice.actions.logout());
  };

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
          {pages.map((page) => {
            return (
              <li className={styles.option}>
                <a className={styles.optionATag} href={"/" + page.slug}>
                  {page.title}
                </a>
              </li>
            );
          })}
          <li className={styles.option}>
            <a className={styles.optionATag} href="/">
              Home
            </a>
          </li>
          <li className={styles.option}>
            <a className={styles.optionATag} href="/submission">
              Typing
            </a>
          </li>
          <li className={styles.option}>
            <a className={styles.optionATag} href="/chat">
              Chat
            </a>
          </li>

          <li className={styles.option + " " + styles.headerIcon}>
            <a className={styles.optionATag} href="/profile">
              <CgProfile />
            </a>
          </li>

          <li className={styles.option + " " + styles.headerIcon}>
            <a onClick={handleLogout} className={styles.optionATag} href="#">
              <AiOutlineLogout />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
