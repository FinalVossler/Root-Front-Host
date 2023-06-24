import React from "react";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { SiThemodelsresource } from "react-icons/si";
import { BsFillGearFill, BsPerson } from "react-icons/bs";
import { MdTextFields } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { SiElement } from "react-icons/si";

import { Theme } from "../../config/theme";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { userPreferenceSlice } from "../../store/slices/userPreferencesSlice";
import WebsiteConfigurationEditor from "../editors/websiteConfigurationEditor";

import useStyles from "./sideMenu.styles";
import SideMenuOption from "./sideMenuOption";
import useGetModels, {
  ModelsGetCommand,
} from "../../hooks/apiHooks/useGetModels";
import { IModel } from "../../store/slices/modelSlice";
import { IUser, SuperRole } from "../../store/slices/userSlice";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { FaPager } from "react-icons/fa";
import { RiPagesLine, RiUserStarFill } from "react-icons/ri";
import useHasPermission from "../../hooks/useHasPermission";
import { Permission, StaticPermission } from "../../store/slices/roleSlice";
import { IPage } from "../../store/slices/pageSlice";
import { useNavigate } from "react-router-dom";

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
  const models: IModel[] = useAppSelector((state) => state.model.models);
  const sideMenuExtendedModels: boolean = useAppSelector(
    (state) => state.userPreferences.sideMenuExtendedModels
  );
  const user: IUser = useAppSelector((state) => state.user.user);
  const pages: IPage[] = useAppSelector((state) => state.page.pages);

  const [configurationModalOpen, setConfigurationModalOpen] =
    React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const dispatch = useAppDispatch();
  const { getModels } = useGetModels();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { hasPermission } = useHasPermission();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (models.length === 0) {
      const command: ModelsGetCommand = {
        paginationCommand: {
          limit: 99999,
          page: 1,
        },
      };
      getModels(command);
    }
  }, []);

  //#region Event listeners
  const handleToggleMenuOpen = () =>
    dispatch(userPreferenceSlice.actions.toggleSideMenu());
  //#endregion Event listeners

  if (!isLoggedIn) return null;

  return (
    <div
      className={
        isSideMenuOpen ? styles.openSideMenuContainer : styles.sideMenuContainer
      }
    >
      {hasPermission(Permission.EditConfiguration) && (
        <WebsiteConfigurationEditor
          setConfigurationModalOpen={setConfigurationModalOpen}
          configurationModelOpen={configurationModalOpen}
        />
      )}

      {isSideMenuOpen && (
        <div className={styles.sideMenuContent}>
          <span className={styles.appName}>{title}</span>
          {pages.map((page: IPage) => {
            if (!page.showInSideMenu) return null;
            return (
              <SideMenuOption
                key={page._id}
                Icon={RiPagesLine}
                title={getTranslatedText(page.title)}
                link={"/" + page.slug}
              />
            );
          })}
          {hasPermission(Permission.EditConfiguration) && (
            <SideMenuOption
              Icon={BsFillGearFill}
              title={getTranslatedText(staticText?.configuration)}
              onClick={() => setConfigurationModalOpen(!configurationModalOpen)}
            />
          )}
          <SideMenuOption
            Icon={CgProfile}
            title={getTranslatedText(staticText?.profile)}
            link={"/profile/" + user._id}
          />
          {hasPermission(Permission.ReadPage) && (
            <SideMenuOption
              Icon={FaPager}
              title={getTranslatedText(staticText?.pages)}
              link="/pages"
            />
          )}
          {hasPermission(Permission.ReadField) && (
            <SideMenuOption
              Icon={MdTextFields}
              title={getTranslatedText(staticText?.fields)}
              link="/fields"
            />
          )}
          <SideMenuOption
            link="/models"
            Icon={SiThemodelsresource}
            title={getTranslatedText(staticText?.models)}
            extended={sideMenuExtendedModels}
            triggerExtended={() =>
              dispatch(userPreferenceSlice.actions.triggerExtendModels())
            }
            subOptions={models
              .filter(
                (m) =>
                  user.superRole === SuperRole.SuperAdmin ||
                  user.role?.entityPermissions
                    .find((e) => e.model._id === m._id)
                    ?.permissions.find((p) => p === StaticPermission.Read)
              )
              .map((model) => ({
                Icon: SiElement,
                link: "/entities/" + model._id,
                title: getTranslatedText(model.name),
              }))}
          />
          {hasPermission(Permission.ReadUser) && (
            <SideMenuOption
              link="/users"
              Icon={BsPerson}
              title={getTranslatedText(staticText?.users)}
            />
          )}
          {hasPermission(Permission.ReadRole) && (
            <SideMenuOption
              link="/roles"
              Icon={RiUserStarFill}
              title={getTranslatedText(staticText?.roles)}
            />
          )}
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
