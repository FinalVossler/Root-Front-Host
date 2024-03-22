import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/homePage";
import LoginOrRegistrationPage from "./pages/loginOrRegistrationPage";

import useGetAndSetUser from "./hooks/apiHooks/useGetAndSetUser";

import useNotifications from "./hooks/useNotifications";
import DynamicPage from "./pages/dynamicPage";
import useGetPages from "./hooks/apiHooks/useGetPages";
import useGetWebwiteConfiguration from "./hooks/apiHooks/useGetWebsiteConfiguration";
import ForgotPasswordChangePasswordPage from "./pages/forgotPasswordChangePassworwPage";

import AuthenticatedApp from "./AuthenticatedApp";
import useIsLoggedIn from "./hooks/useIsLoggedIn";
import { useAppSelector } from "./store/hooks";
import { IPageReadDto } from "roottypes";

import "./index.css";

function App() {
  const homePage: IPageReadDto | undefined = useAppSelector(
    (state) => state.page.pages
  ).find((page) => page.slug.length === 0);

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
    <React.Fragment>
      <ToastContainer hideProgressBar position="bottom-right" />

      <BrowserRouter>
        <Routes>
          {isLoggedIn && (
            <Route path="*" element={<AuthenticatedApp />}></Route>
          )}

          {!isLoggedIn && (
            <React.Fragment>
              {!homePage && <Route path="/" element={<HomePage />}></Route>}
              {homePage && <Route path="/" element={<DynamicPage />}></Route>}
              <Route
                path="/dynamicPage/:pageSlug"
                element={<DynamicPage />}
              ></Route>

              <Route path="/auth" element={<LoginOrRegistrationPage />}></Route>
              <Route
                path="/changePassword/:token"
                element={<ForgotPasswordChangePasswordPage />}
              ></Route>
            </React.Fragment>
          )}
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
