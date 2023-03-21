import React from "react";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { MdTextFields } from "react-icons/md";
import { Link } from "react-router-dom";

import { Theme } from "../../config/theme";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./sideMenu.styles";
import SideMenuOption from "./sideMenuOption";

interface ISideMenu {}

const SideMenu: React.FunctionComponent<ISideMenu> = (props: ISideMenu) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const title: string | undefined = useAppSelector(
    (state) => state.websiteConfiguration.title
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.sideMenu
  );

  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  const handleToggleMenuOpen = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div
      className={
        isMenuOpen ? styles.openSideMenuContainer : styles.sideMenuContainer
      }
    >
      {isMenuOpen && (
        <div className={styles.sideMenuContent}>
          <span className={styles.appName}>{title}</span>

          <Link to="/fields">
            <SideMenuOption
              Icon={MdTextFields}
              title={getTranslatedText(staticText?.fields)}
            />
          </Link>
        </div>
      )}

      {isMenuOpen && (
        <AiOutlineMenuFold
          className={isMenuOpen ? styles.menuIconMenuOpen : styles.menuIcon}
          color={theme.primary}
          onClick={handleToggleMenuOpen}
        />
      )}
      {!isMenuOpen && (
        <AiOutlineMenuUnfold
          className={isMenuOpen ? styles.menuIconMenuOpen : styles.menuIcon}
          color={theme.primary}
          onClick={handleToggleMenuOpen}
        />
      )}
    </div>
  );
};

export default SideMenu;
