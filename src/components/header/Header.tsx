import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink } from "react-router-dom";

import { Theme } from "../../config/theme";

import useStyles from "./header.styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { userSlice } from "../../store/slices/userSlice";
import { IPage } from "../../store/slices/pageSlice";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import InputSelect from "../inputSelect";
import { userPreferenceSlice } from "../../store/slices/userPreferencesSlice";
import { Option } from "../inputSelect/InputSelect";

interface IHeader {
  scrolledDown: boolean;
}
const Header: React.FunctionComponent<IHeader> = (props: IHeader) => {
  const pages = useAppSelector<IPage[]>((state) => state.page.pages);
  const websiteTitle: string | undefined = useAppSelector(
    (state) => state.websiteConfiguration.title
  );
  const withChat: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withChat
  );
  const withRegistration: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withRegistration
  );
  const mainLanguages: string[] | undefined = useAppSelector(
    (state) => state.websiteConfiguration.mainLanguages
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText
  );
  const userPreferenceLanguage: string = useAppSelector(
    (state) => state.userPreferences.language
  );

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const isLoggedIn: boolean = useIsLoggedIn();
  const getTranslatedText = useGetTranslatedText();

  //#region Event listeners
  const handleLogout = () => {
    dispatch(userSlice.actions.logout());
  };
  const handleChangeLanguage = (option: Option) => {
    dispatch(userPreferenceSlice.actions.setLanguage(option.value));
  };
  //#endregion Event listeners

  return (
    <div
      className={
        props.scrolledDown
          ? styles.headerContainerScrolled
          : styles.headerContainer
      }
    >
      <div className={styles.left}>
        <NavLink to="/" className={styles.headerTitle}>
          {websiteTitle || "Socionics with Hamza Khalifa"}
        </NavLink>
      </div>

      <div className={styles.right}>
        <ul className={styles.optionsList}>
          <InputSelect
            options={
              mainLanguages?.map((language) => ({
                label: language,
                value: language,
              })) || [
                { label: "en", value: "en" },
                { label: "fr", value: "fr" },
              ]
            }
            label={getTranslatedText(staticText?.header.language)}
            value={{
              label: userPreferenceLanguage,
              value: userPreferenceLanguage,
            }}
            onChange={handleChangeLanguage}
            style={{ marginBottom: 0 }}
          />
          {pages.map((page) => {
            return (
              <li key={page._id} className={styles.option}>
                <NavLink className={styles.optionATag} to={"/" + page.slug}>
                  {getTranslatedText(page.title)}
                </NavLink>
              </li>
            );
          })}

          <li className={styles.option}>
            <NavLink className={styles.optionATag} to="/">
              Accueil
            </NavLink>
          </li>

          {withChat && (
            <li className={styles.option}>
              <NavLink className={styles.optionATag} to="/chat">
                Chat
              </NavLink>
            </li>
          )}

          {(withRegistration || isLoggedIn) && (
            <li className={styles.option + " " + styles.headerIcon}>
              <NavLink className={styles.optionATag} to="/profile">
                <CgProfile />
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li className={styles.option + " " + styles.headerIcon}>
              <NavLink
                onClick={handleLogout}
                className={styles.optionATag}
                to="#"
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

export default Header;
