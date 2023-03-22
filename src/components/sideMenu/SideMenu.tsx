import React from "react";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { SiThemodelsresource } from "react-icons/si";
import { BsFillGearFill } from "react-icons/bs";
import { MdTextFields } from "react-icons/md";
import { Link } from "react-router-dom";

import { Theme } from "../../config/theme";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { userPreferenceSlice } from "../../store/slices/userPreferencesSlice";
import WebsiteConfigurationEditor from "../editors/websiteConfigurationEditor";

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
  const isSideMenuOpen: boolean = useAppSelector(
    (state) => state.userPreferences.isSideMenuOpen
  );

  const [configurationModalOpen, setConfigurationModalOpen] =
    React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const dispatch = useAppDispatch();

  const handleToggleMenuOpen = () =>
    dispatch(userPreferenceSlice.actions.toggleSideMenu());

  return (
    <div
      className={
        isSideMenuOpen ? styles.openSideMenuContainer : styles.sideMenuContainer
      }
    >
      <WebsiteConfigurationEditor
        setConfigurationModalOpen={setConfigurationModalOpen}
        configurationModelOpen={configurationModalOpen}
      />
      {isSideMenuOpen && (
        <div className={styles.sideMenuContent}>
          <span className={styles.appName}>{title}</span>

          <SideMenuOption
            Icon={BsFillGearFill}
            title={getTranslatedText(staticText?.configuration)}
            onClick={() => setConfigurationModalOpen(!configurationModalOpen)}
          />

          <Link to="/fields">
            <SideMenuOption
              Icon={MdTextFields}
              title={getTranslatedText(staticText?.fields)}
            />
          </Link>

          <Link to="/models">
            <SideMenuOption
              Icon={SiThemodelsresource}
              title={getTranslatedText(staticText?.models)}
            />
          </Link>
        </div>
      )}

      {isSideMenuOpen && (
        <AiOutlineMenuFold
          className={isSideMenuOpen ? styles.menuIconMenuOpen : styles.menuIcon}
          color={theme.primary}
          onClick={handleToggleMenuOpen}
        />
      )}
      {!isSideMenuOpen && (
        <AiOutlineMenuUnfold
          className={isSideMenuOpen ? styles.menuIconMenuOpen : styles.menuIcon}
          color={theme.primary}
          onClick={handleToggleMenuOpen}
        />
      )}
    </div>
  );
};

export default SideMenu;
