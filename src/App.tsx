import React from "react";
import { ThemeProvider } from "react-jss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";

import SocketProvider from "./providers/SocketProvider";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import ChatPage from "./pages/chatPage";
import LoginOrRegistrationPage from "./pages/loginOrRegistrationPage";
import { store } from "./store/store";

import useGetAndSetUser from "./hooks/apiHooks/useGetAndSetUser";

import theme from "./config/theme";
import useNotifications from "./hooks/useNotifications";
import { IPage } from "./store/slices/pageSlice";
import { useAppSelector } from "./store/hooks";
import DynamicPage from "./pages/dynamicPage";
import useGetPages from "./hooks/apiHooks/useGetPages";
import useGetWebwiteConfiguration from "./hooks/apiHooks/useGetWebsiteConfiguration";
import FieldsPage from "./pages/fieldsPage";
import ModelsPage from "./pages/modelsPage";
import EntitiesPage from "./pages/entitiesPage";
import PagesPage from "./pages/pagesPage";
import ForgotPasswordChangePasswordPage from "./pages/forgotPasswordChangePassworwPage";
import UsersPage from "./pages/usersPage";
import RolesPage from "./pages/rolesPage";
import SingleEntityPage from "./pages/singleEntityPage";
import TasksPage from "./pages/tasksPage";

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
      path: "/profile/:userId",
      element: <ProfilePage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/auth",
      element: <LoginOrRegistrationPage />,
    },
    {
      path: "/chat",
      element: <ChatPage />,
    },
    {
      path: "/fields",
      element: <FieldsPage />,
    },
    {
      path: "/models",
      element: <ModelsPage />,
    },
    {
      path: "/entities/:modelId",
      element: <EntitiesPage />,
    },
    {
      path: "/entities/:modelId/:entityId",
      element: <SingleEntityPage />,
    },
    {
      path: "/pages",
      element: <PagesPage />,
    },
    {
      path: "/changePassword/:token",
      element: <ForgotPasswordChangePasswordPage />,
    },
    {
      path: "/users/",
      element: <UsersPage />,
    },
    {
      path: "/roles/",
      element: <RolesPage />,
    },
    {
      path: "/tasks/",
      element: <TasksPage />,
    },
  ]);

  if (!finishedFetchingPages || !finishedFetchingWebsiteConfiguration)
    return null;

  return (
    <Provider store={store}>
      <SocketProvider>
        <ThemeProvider theme={theme}>
          <ToastContainer hideProgressBar position="bottom-right" />

          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </SocketProvider>
    </Provider>
  );
}

export default App;
