import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import ProfilePage from "./pages/profilePage";
import ChatPage from "./pages/chatPage";

import FieldsPage from "./pages/fieldsPage";
import ModelsPage from "./pages/modelsPage";
import EntitiesPage from "./pages/entitiesPage";
import PagesPage from "./pages/pagesPage";
import UsersPage from "./pages/usersPage";
import RolesPage from "./pages/rolesPage";
import SingleEntityPage from "./pages/singleEntityPage";
import TasksPage from "./pages/tasksPage";
import MicroFrontendsPage from "./pages/microFrontendsPage/MicroFrontendsPage";
import MicroFrontendPage from "./pages/microFrontendPage";

import withWrapper from "./hoc/wrapper";
import useIsLoggedIn from "./hooks/useIsLoggedIn";
import useNotifications from "./hooks/useNotifications";
import withChat from "./hoc/withChat";
import { DynamicPageForLoggedIn } from "./pages/dynamicPage/DynamicPage";

function AuthenticatedApp() {
  useNotifications();
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route
        path="/dynamicPage/:pageSlug"
        element={<DynamicPageForLoggedIn />}
      ></Route>
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/fields" element={<FieldsPage />} />
      <Route path="/models" element={<ModelsPage />} />
      <Route path="/entities/:modelId" element={<EntitiesPage />} />
      <Route
        path="/entities/:modelId/:entityId"
        element={<SingleEntityPage />}
      />
      <Route path="/pages" element={<PagesPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:roleId" element={<UsersPage />} />
      <Route path="/roles/" element={<RolesPage />} />
      <Route path="/tasks/" element={<TasksPage />} />
      <Route
        path="/microFrontend/:microFrontendId/:entityId/:componentName/:buttonFieldId"
        element={<MicroFrontendPage />}
      />
      <Route
        path="/microFrontend/:microFrontendId/:componentName"
        element={<MicroFrontendPage />}
      />
      <Route path="/microFrontends/" element={<MicroFrontendsPage />} />
    </Routes>
  );
}

export default withChat(
  withWrapper(React.memo(AuthenticatedApp), {
    withFooter: false,
    withSideMenu: true,
  })
);
