import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { userSlice } from "../../../../store/slices/userSlice";
import useIsLoggedIn from "../../../../hooks/useIsLoggedIn";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import InputSelect from "../../../fundamentalComponents/inputs/inputSelect";
import { userPreferenceSlice } from "../../../../store/slices/userPreferencesSlice";
import { IInputSelectOption } from "../../../fundamentalComponents/inputs/inputSelect/InputSelect";
import HeaderInbox from "../../chatComponents/headerInbox";
import HeaderNotifications from "../../headerNotifications";

import useStyles from "./header.styles";
import { IPageReadDto, ITheme } from "roottypes";
import HeaderCart from "../../headerCart";

interface IHeaderProps {
  scrolledDown: boolean;
}
const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  const pages = useAppSelector<IPageReadDto[]>((state) => state.page.pages);
  const websiteTitle: string | undefined = useAppSelector(
    (state) => state.websiteConfiguration.title
  );
  const withChat: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withChat
  );
  const withRegistration: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withRegistration
  );
  const withEcommerce: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withEcommerce
  );
  const mainLanguages: string[] | undefined = useAppSelector(
    (state) => state.websiteConfiguration.mainLanguages
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.header
  );
  const userPreferenceLanguage: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const isSideMenuOpen: boolean = useAppSelector(
    (state) => state.userPreferences.isSideMenuOpen
  );
  const cart = useAppSelector((state) => state.cart.cart);

  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const isLoggedIn: boolean = useIsLoggedIn();
  const getTranslatedText = useGetTranslatedText();
  const location = useLocation();
  const navigate = useNavigate();

  //#region Event listeners
  const handleLogout = () => {
    dispatch(userSlice.actions.logout());
    navigate("/auth");
  };
  const handleChangeLanguage = (option: IInputSelectOption) => {
    dispatch(userPreferenceSlice.actions.setLanguage(option.value));
  };
  const handleTriggerShowMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  //#endregion Event listeners

  return (
    <div
      className={
        props.scrolledDown
          ? styles.headerContainerScrolled
          : styles.headerContainer
      }
      style={{
        backgroundColor: theme.transparentBackground,
        left: isSideMenuOpen ? 300 : 0,
        right: cart?.products && cart?.products.length > 0 ? 130 : 0,
      }}
    >
      <div className={styles.left}>
        <NavLink to="/" className={styles.headerTitle}>
          {websiteTitle || "Socionics with Hamza Khalifa"}
        </NavLink>
      </div>

      {!isSideMenuOpen && (
        <span
          className={styles.triggerMenuButton}
          onClick={handleTriggerShowMobileMenu}
        >
          {getTranslatedText(staticText?.menu)}
        </span>
      )}

      <div className={styles.right}>
        <ul
          className={
            showMobileMenu ? styles.mobileOptionsList : styles.optionsList
          }
        >
          <InputSelect
            theme={theme}
            options={
              mainLanguages?.map((language) => ({
                label: language.toUpperCase(),
                value: language,
              })) || [
                { label: "EN", value: "en" },
                { label: "FR", value: "fr" },
              ]
            }
            label={getTranslatedText(staticText?.language)}
            value={{
              label: userPreferenceLanguage.toUpperCase(),
              value: userPreferenceLanguage,
            }}
            onChange={handleChangeLanguage}
            style={{ marginBottom: 0 }}
            selectorClassName="mainLanguageSelector"
          />

          {pages.map((page) => {
            if (page.showInHeader === false) return null;
            if (getTranslatedText(page.title) === "") return null;
            return (
              <li key={page._id} className={styles.option}>
                <NavLink
                  className={styles.optionATag}
                  to={"/dynamicPage/" + page.slug}
                >
                  {getTranslatedText(page.title)}
                </NavLink>
              </li>
            );
          })}

          <li className={styles.option}>
            <NavLink className={styles.optionATag} to="/">
              {getTranslatedText(staticText?.home)}
            </NavLink>
          </li>

          {withChat && isLoggedIn && (
            <li className={styles.option}>
              <NavLink className={styles.optionATag} to="/chat">
                {getTranslatedText(staticText?.chat)}
              </NavLink>
            </li>
          )}

          {withChat && isLoggedIn && location.pathname !== "/chat" && (
            <HeaderInbox />
          )}

          {withEcommerce && isLoggedIn && <HeaderCart />}

          {withRegistration && isLoggedIn && <HeaderNotifications />}

          {withRegistration && !isLoggedIn && (
            <li className={styles.option + " " + styles.headerIcon}>
              <NavLink className={styles.optionATag} to={"/auth"}>
                <CgProfile />
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li className={styles.option + " " + styles.headerIcon}>
              <NavLink
                onClick={handleLogout}
                className={styles.optionATag}
                to="/auth"
              >
                <AiOutlineLogout />
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(Header);
