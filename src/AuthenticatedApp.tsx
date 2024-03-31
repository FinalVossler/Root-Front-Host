import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  IModelReadDto,
  IModelsGetCommand,
  IPageReadDto,
  IRolesGetCommand,
} from "roottypes";
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
import withProtection from "./hoc/protection/index";
import { useAppSelector } from "./store/hooks";
import useGetCart from "./hooks/apiHooks/useGetCart";
import CartPage from "./pages/cartPage/CartPage";
import { HomePageForLoggedIn } from "./pages/homePage/HomePage";
import AppModalsAndEditors from "./AppModalsAndEditors";
import CheckoutPage from "./pages/checkoutPage";
import PaymentMethodsPage from "./pages/paymentMethodsPage";
import ShippingMethodsPage from "./pages/shippingMethodsPage";
import PaymentResultPage from "./pages/paymentResultPage";
import OrdersPage from "./pages/ordersPage/OrdersPage";
import SalesPage from "./pages/salesPage";
import useGetRoles from "./hooks/apiHooks/useGetRoles";
import useGetModels from "./hooks/apiHooks/useGetModels";

function AuthenticatedApp() {
  const withEcommerce: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withEcommerce
  );
  const homePage: IPageReadDto | undefined = useAppSelector(
    (state) => state.page.pages
  ).find((page) => page.slug.length === 0);
  const models: IModelReadDto[] = useAppSelector((state) => state.model.models);

  useNotifications();
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const { getCart } = useGetCart();
  const { getModels } = useGetModels();
  const { getRoles, loading: getRolesLoading } = useGetRoles();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (withEcommerce && isLoggedIn) {
      getCart();
    }
  }, [withEcommerce, isLoggedIn]);

  // Get the models. Useful for the
  // 1- The side menu
  // 2- Orders
  React.useEffect(() => {
    if (models.length === 0) {
      const command: IModelsGetCommand = {
        paginationCommand: {
          limit: 99999,
          page: 1,
        },
      };
      getModels(command);
    }
  }, []);

  // Get the roles. Always useful for these situations:
  // 1- Show the users by roles in the side menu
  // 2- For user assigned entities
  React.useEffect(() => {
    const command: IRolesGetCommand = {
      paginationCommand: {
        limit: 9999,
        page: 1,
      },
    };
    getRoles(command);
  }, []);

  return (
    <React.Fragment>
      <AppModalsAndEditors />
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
        <Route path="/paymentMethods/" element={<PaymentMethodsPage />} />
        <Route path="/shippingMethods/" element={<ShippingMethodsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/paymentResult/:orderId" element={<PaymentResultPage />} />
        <Route path="/orders/:userId" element={<OrdersPage />} />
        <Route path="/sales/:userId" element={<SalesPage />} />

        {!homePage && (
          <Route path="/" element={<HomePageForLoggedIn />}></Route>
        )}
        {homePage && (
          <Route path="/" element={<DynamicPageForLoggedIn />}></Route>
        )}

        <Route
          path="/dynamicPage/:pageSlug"
          element={<DynamicPageForLoggedIn />}
        ></Route>
      </Routes>
    </React.Fragment>
  );
}

export default withProtection(
  withChat(
    withWrapper(React.memo(AuthenticatedApp), {
      withFooter: false,
      withSideMenu: true,
    })
  )
);
