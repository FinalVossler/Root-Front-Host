import React from "react";
import {
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
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
import {
  IRole,
  Permission,
  StaticPermission,
} from "../../store/slices/roleSlice";
import { IPage } from "../../store/slices/pageSlice";
import { BiTask } from "react-icons/bi";
import IFile from "../../globalTypes/IFile";
import useGetRoles, { RolesGetCommand } from "../../hooks/apiHooks/useGetRoles";
import { websiteConfigurationSlice } from "../../store/slices/websiteConfigurationSlice";

interface ISideMenu {}

const SideMenu: React.FunctionComponent<ISideMenu> = (props: ISideMenu) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const title: string | undefined = useAppSelector(
    (state) => state.websiteConfiguration.title
  );
  const websiteLogo2: IFile | undefined = useAppSelector(
    (state) => state.websiteConfiguration.logo2
  );
  const withTaskManagement: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withTaskManagement
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
  const sideMenuExtendedUserRoles: boolean = useAppSelector(
    (state) => state.userPreferences.sideMenuExtendedUserRoles
  );
  const user: IUser = useAppSelector((state) => state.user.user);
  const pages: IPage[] = useAppSelector((state) => state.page.pages);
  const roles: IRole[] = useAppSelector((state) => state.role.roles);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const dispatch = useAppDispatch();
  const { getModels } = useGetModels();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { hasPermission } = useHasPermission();
  const { getRoles, loading: getRolesLoading } = useGetRoles();

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

  // Get the roles in order to show users by roles
  React.useEffect(() => {
    if (
      user.superRole === SuperRole.SuperAdmin ||
      user.role?.permissions.indexOf(Permission.ReadRole)
    ) {
      const command: RolesGetCommand = {
        paginationCommand: {
          limit: 9999,
          page: 1,
        },
      };
      getRoles(command);
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
        <WebsiteConfigurationEditor />
      )}

      {isSideMenuOpen && (
        <div className={styles.sideMenuContent}>
          {websiteLogo2 && (
            <img src={websiteLogo2.url} className={styles.websiteLogo2} />
          )}
          {!websiteLogo2 && <span className={styles.appName}>{title}</span>}
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
              onClick={() =>
                dispatch(websiteConfigurationSlice.actions.setEditorOpen(true))
              }
            />
          )}
          <SideMenuOption
            Icon={CgProfile}
            title={getTranslatedText(staticText?.profile)}
            link={"/profile/" + user._id}
          />
          {withTaskManagement && (
            <SideMenuOption
              Icon={BiTask}
              title={getTranslatedText(staticText?.tasksManagement)}
              link={"/tasks/"}
            />
          )}
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
          {hasPermission(Permission.ReadModel) && (
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
          )}
          {!hasPermission(Permission.ReadModel) &&
            user.role?.entityPermissions.map(
              (entityPermission, entityPermissionIndex) => {
                if (
                  entityPermission.permissions.indexOf(
                    StaticPermission.Read
                  ) !== -1
                ) {
                  return (
                    <SideMenuOption
                      key={entityPermissionIndex}
                      title={getTranslatedText(entityPermission.model.name)}
                      link={"/entities/" + entityPermission.model._id}
                      Icon={SiElement}
                    />
                  );
                } else {
                  return null;
                }
              }
            )}
          {hasPermission(Permission.ReadUser) && (
            <SideMenuOption
              link="/users"
              Icon={BsPerson}
              title={getTranslatedText(staticText?.users)}
              extended={sideMenuExtendedUserRoles}
              triggerExtended={() =>
                dispatch(userPreferenceSlice.actions.triggerExtendedUserRoles())
              }
              subOptions={
                user.superRole === SuperRole.SuperAdmin ||
                user.role?.permissions.indexOf(Permission.ReadRole) !== -1
                  ? roles.map((role) => {
                      return {
                        Icon: AiOutlineUsergroupDelete,
                        link: "/users/" + role._id.toString(),
                        title: getTranslatedText(role.name),
                      };
                    })
                  : []
              }
            />
          )}
          {hasPermission(Permission.ReadRole) && (
            <SideMenuOption
              link="/roles"
              Icon={RiUserStarFill}
              title={getTranslatedText(staticText?.roles)}
            />
          )}
          {hasPermission(Permission.ReadMicroFrontend) && (
            <SideMenuOption
              Icon={MdTextFields}
              title={getTranslatedText(staticText?.microFrontends)}
              link="/microFrontends"
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
