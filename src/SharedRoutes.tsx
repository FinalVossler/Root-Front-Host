import React from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/homePage";
import LoginOrRegistrationPage from "./pages/loginOrRegistrationPage";

import useGetAndSetUser from "./hooks/apiHooks/useGetAndSetUser";

import useNotifications from "./hooks/useNotifications";
import DynamicPage from "./pages/dynamicPage";
import useGetPages from "./hooks/apiHooks/useGetPages";
import useGetWebwiteConfiguration from "./hooks/apiHooks/useGetWebsiteConfiguration";
import ForgotPasswordChangePasswordPage from "./pages/forgotPasswordChangePassworwPage";

import useIsLoggedIn from "./hooks/useIsLoggedIn";
import { useAppSelector } from "./store/hooks";
import { IPageReadDto } from "roottypes";

import "./index.css";
import { DynamicPageForLoggedIn } from "./pages/dynamicPage/DynamicPage";

function SharedRoutes() {
  const isLoggedIn: boolean = useIsLoggedIn();
  useGetAndSetUser();
  useNotifications();
  const { getPages, finished: finishedFetchingPages } = useGetPages();
  const {
    getWebsiteConfiguration,
    finished: finishedFetchingWebsiteConfiguration,
  } = useGetWebwiteConfiguration();

  React.useEffect(() => {
    getPages();
    getWebsiteConfiguration();
  }, []);

  if (!finishedFetchingPages || !finishedFetchingWebsiteConfiguration)
    return null;

  return (
    <Routes>
      {!isLoggedIn && (
        <Route path="/dynamicPage/:pageSlug" element={<DynamicPage />}></Route>
      )}

      {isLoggedIn && (
        <Route
          path="/dynamicPage/:pageSlug"
          element={<DynamicPageForLoggedIn />}
        ></Route>
      )}

      <Route path="/auth" element={<LoginOrRegistrationPage />}></Route>
      <Route
        path="/changePassword/:token"
        element={<ForgotPasswordChangePasswordPage />}
      ></Route>
    </Routes>
  );
}

export default SharedRoutes;
