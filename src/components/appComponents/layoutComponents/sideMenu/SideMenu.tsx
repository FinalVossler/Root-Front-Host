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
import { FaLuggageCart } from "react-icons/fa";
import { BiTask } from "react-icons/bi";

import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { userPreferenceSlice } from "../../../../store/slices/userPreferencesSlice";

import useStyles from "./sideMenu.styles";
import SideMenuOption from "./sideMenuOption";
import useIsLoggedIn from "../../../../hooks/useIsLoggedIn";
import { FaPager } from "react-icons/fa";
import { RiPagesLine, RiUserStarFill } from "react-icons/ri";
import useHasPermission from "../../../../hooks/useHasPermission";
import {
  IEntityPermissionReadDto,
  IFileReadDto,
  IModelReadDto,
  IPageReadDto,
  IRoleReadDto,
  ITheme,
  IUserReadDto,
  PermissionEnum,
  EntityStaticPermissionEnum,
  SuperRoleEnum,
} from "roottypes";
import {
  EditorTypeEnum,
  editorSlice,
} from "../../../../store/slices/editorSlice";

interface ISideMenuProps {}

const SideMenu: React.FunctionComponent<ISideMenuProps> = (
  props: ISideMenuProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const title: string | undefined = useAppSelector(
    (state) => state.websiteConfiguration.title
  );
  const websiteLogo2: string | IFileReadDto | undefined = useAppSelector(
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
  const models: IModelReadDto[] = useAppSelector((state) => state.model.models);
  const sideMenuExtendedModels: boolean = useAppSelector(
    (state) => state.userPreferences.sideMenuExtendedModels
  );
  const sideMenuExtendedUserRoles: boolean = useAppSelector(
    (state) => state.userPreferences.sideMenuExtendedUserRoles
  );
  const currentUser: IUserReadDto = useAppSelector((state) => state.user.user);
  const pages: IPageReadDto[] = useAppSelector((state) => state.page.pages);
  const roles: IRoleReadDto[] = useAppSelector((state) => state.role.roles);
  const withEcommerce = useAppSelector(
    (state) => state.websiteConfiguration.withEcommerce
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const dispatch = useAppDispatch();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { hasPermission } = useHasPermission();

  //#region Event listeners
  const handleToggleMenuOpen = () =>
    dispatch(userPreferenceSlice.actions.toggleSideMenu());
  //#endregion Event listeners

  if (!isLoggedIn) return null;

  const modelsSubOptions = React.useMemo(
    () =>
      models
        .filter(
          (m) =>
            // the super adming has access to everything
            (currentUser.superRole === SuperRoleEnum.SuperAdmin ||
              // If the user has read access to all models
              (currentUser.role &&
                (currentUser.role as IRoleReadDto).permissions.indexOf(
                  PermissionEnum.ReadModel
                ) !== -1) ||
              // The owner of a said model has access to his own model if he has ReadOwnModel permission
              (currentUser.role &&
                (currentUser.role as IRoleReadDto).permissions.indexOf(
                  PermissionEnum.ReadOwnModel
                ) !== -1 &&
                m.owner &&
                (m.owner as IUserReadDto)._id.toString() ===
                  currentUser._id.toString()) ||
              // If somebody has an entity permission with READ Static permission on the model, then he has access to the model
              (
                (currentUser.role as IRoleReadDto)?.entityPermissions as
                  | IEntityPermissionReadDto[]
                  | undefined
              )
                ?.find((e) => (e.model as IModelReadDto)._id === m._id)
                ?.permissions.find(
                  (p) => p === EntityStaticPermissionEnum.Read
                )) &&
            (m.showInSideMenu === undefined || m.showInSideMenu === true)
        )
        .map((model) => ({
          Icon: SiElement,
          link: "/entities/" + model._id,
          title: getTranslatedText(model.name),
          handleOpenEditor: () => {
            dispatch(
              editorSlice.actions.addEditor({
                editorType: EditorTypeEnum.Entity,
                element: undefined,
                modelId: model._id,
              })
            );
          },
          dataCy: "sideMenuEntityOptionForModel" + model._id,
        })),
    [
      currentUser.superRole,
      (currentUser.role as IRoleReadDto)?.entityPermissions,
      models,
    ]
  );

  return (
    <div
      className={
        isSideMenuOpen ? styles.openSideMenuContainer : styles.sideMenuContainer
      }
      data-cy="sideMenu"
    >
      {isSideMenuOpen && (
        <div className={styles.sideMenuContent}>
          {websiteLogo2 && (
            <img
              src={(websiteLogo2 as IFileReadDto).url}
              className={styles.websiteLogo2}
            />
          )}
          {!websiteLogo2 && <span className={styles.appName}>{title}</span>}
          {pages.map((page: IPageReadDto) => {
            if (!page.showInSideMenu) return null;
            return (
              <SideMenuOption
                key={page._id}
                Icon={RiPagesLine}
                title={getTranslatedText(page.title)}
                link={"/dynamicPage/" + page.slug}
              />
            );
          })}
          {hasPermission(PermissionEnum.EditConfiguration) && (
            <SideMenuOption
              Icon={BsFillGearFill}
              title={getTranslatedText(staticText?.configuration)}
              onClick={() => {
                dispatch(
                  editorSlice.actions.addEditor({
                    editorType: EditorTypeEnum.WebsiteConfiguration,
                  })
                );
              }}
              dataCy="sideMenuWebsiteConfigurationOption"
            />
          )}
          <SideMenuOption
            Icon={CgProfile}
            title={getTranslatedText(staticText?.profile)}
            link={"/profile/" + currentUser._id}
          />
          {withTaskManagement && (
            <SideMenuOption
              Icon={BiTask}
              title={getTranslatedText(staticText?.tasksManagement)}
              link={"/tasks/"}
            />
          )}
          {hasPermission(PermissionEnum.ReadPage) && (
            <SideMenuOption
              Icon={FaPager}
              title={getTranslatedText(staticText?.pages)}
              link="/pages"
            />
          )}
          {(hasPermission(PermissionEnum.ReadField) ||
            hasPermission(PermissionEnum.ReadOwnField)) && (
            <SideMenuOption
              Icon={MdTextFields}
              title={getTranslatedText(staticText?.fields)}
              link="/fields"
              dataCy="sideMenuFieldOption"
            />
          )}
          {(hasPermission(PermissionEnum.ReadModel) ||
            hasPermission(PermissionEnum.ReadOwnModel)) && (
            <SideMenuOption
              link="/models"
              Icon={SiThemodelsresource}
              title={getTranslatedText(staticText?.models)}
              extended={sideMenuExtendedModels}
              triggerExtended={() =>
                dispatch(userPreferenceSlice.actions.triggerExtendModels())
              }
              subOptions={modelsSubOptions}
              dataCy="sideMenuModelOption"
            />
          )}
          {!hasPermission(PermissionEnum.ReadModel) &&
            !hasPermission(PermissionEnum.ReadOwnModel) &&
            (
              (currentUser.role as IRoleReadDto)?.entityPermissions as
                | IEntityPermissionReadDto[]
                | undefined
            )?.map((entityPermission, entityPermissionIndex) => {
              if (
                (entityPermission.model as IModelReadDto).showInSideMenu ===
                false
              )
                return null;
              if (
                entityPermission.permissions.indexOf(
                  EntityStaticPermissionEnum.Read
                ) !== -1
              ) {
                return (
                  <SideMenuOption
                    key={entityPermissionIndex}
                    title={getTranslatedText(
                      (entityPermission.model as IModelReadDto).name
                    )}
                    link={
                      "/entities/" +
                      (entityPermission.model as IModelReadDto)._id
                    }
                    Icon={SiElement}
                  />
                );
              } else {
                return null;
              }
            })}
          {hasPermission(PermissionEnum.ReadUser) && (
            <SideMenuOption
              link="/users"
              Icon={BsPerson}
              title={getTranslatedText(staticText?.users)}
              extended={sideMenuExtendedUserRoles}
              triggerExtended={() =>
                dispatch(userPreferenceSlice.actions.triggerExtendedUserRoles())
              }
              subOptions={
                currentUser.superRole === SuperRoleEnum.SuperAdmin ||
                (currentUser.role as IRoleReadDto)?.permissions.indexOf(
                  PermissionEnum.ReadRole
                ) !== -1
                  ? roles.map((role) => {
                      return {
                        Icon: AiOutlineUsergroupDelete,
                        link: "/users/" + role._id.toString(),
                        title: getTranslatedText(role.name),
                      };
                    })
                  : []
              }
              dataCy="sideMenuUsersOption"
            />
          )}
          {hasPermission(PermissionEnum.ReadRole) && (
            <SideMenuOption
              link="/roles"
              Icon={RiUserStarFill}
              title={getTranslatedText(staticText?.roles)}
              dataCy="sideMenuRoleOption"
            />
          )}

          {withEcommerce && (
            <SideMenuOption
              Icon={FaLuggageCart}
              title={getTranslatedText(staticText?.myOrders)}
              link={"/orders/" + currentUser._id.toString()}
            />
          )}
          {withEcommerce && (
            <SideMenuOption
              Icon={FaLuggageCart}
              title={getTranslatedText(staticText?.mySales)}
              link={"/sales/" + currentUser._id.toString()}
            />
          )}
          {hasPermission(PermissionEnum.ReadPaymentMethod) && withEcommerce && (
            <SideMenuOption
              Icon={MdTextFields}
              title={getTranslatedText(staticText?.paymentMethods)}
              link="/paymentMethods"
            />
          )}

          {hasPermission(PermissionEnum.ReadShippingMethod) &&
            withEcommerce && (
              <SideMenuOption
                Icon={MdTextFields}
                title={getTranslatedText(staticText?.shippingMethods)}
                link="/shippingMethods"
              />
            )}
          {hasPermission(PermissionEnum.ReadMicroFrontend) && (
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
