import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/homePage";
import LoginOrRegistrationPage from "./pages/loginOrRegistrationPage";

import useGetAndSetUser from "./hooks/apiHooks/useGetAndSetUser";

import useNotifications from "./hooks/useNotifications";
import { IPage } from "./store/slices/pageSlice";
import { useAppSelector } from "./store/hooks";
import DynamicPage from "./pages/dynamicPage";
import useGetPages from "./hooks/apiHooks/useGetPages";
import useGetWebwiteConfiguration from "./hooks/apiHooks/useGetWebsiteConfiguration";
import ForgotPasswordChangePasswordPage from "./pages/forgotPasswordChangePassworwPage";

import AuthenticatedApp from "./AuthenticatedApp";
import withChat from "./hoc/withChat";

import "./index.css";

function App() {
  const pages: IPage[] = useAppSelector((state) => state.page.pages);

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

  const router = createBrowserRouter([
    ...pages.map((page) => ({
      path: "/" + page.slug,
      element: <DynamicPage page={page} />,
    })),
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/auth",
      element: <LoginOrRegistrationPage />,
    },
    {
      path: "/changePassword/:token",
      element: <ForgotPasswordChangePasswordPage />,
    },
    { path: "/", element: <AuthenticatedApp /> },
  ]);

  if (!finishedFetchingPages || !finishedFetchingWebsiteConfiguration)
    return null;

  return (
    <React.Fragment>
      <ToastContainer hideProgressBar position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/dynamicPage/:pageSlug"
            element={<DynamicPage />}
          ></Route>
          <Route path="/auth" element={<LoginOrRegistrationPage />}></Route>
          <Route
            path="/changePassword/:token"
            element={<ForgotPasswordChangePasswordPage />}
          ></Route>
          <Route path="*" element={<AuthenticatedApp />}></Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default withChat(App);
