import React from "react";
import { ThemeProvider } from "react-jss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SocketProvider from "./providers/SocketProvider";

import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import ChatPage from "./pages/chatPage";

import useGetAndSetUser from "./hooks/useGetAndSetUser";
import PaymentPage from "./pages/paymentPage";

import theme from "./config/theme";
import useNotifications from "./hooks/useNotifications";
import useAxios from "./hooks/useAxios";
import { AxiosResponse } from "axios";
import { IPage, pageSlice } from "./store/slices/pageSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import DynamicPage from "./pages/dynamicPage";

const stripePromise = loadStripe(
  // @ts-ignore
  process.env.REACT_APP_STRIPE_PUBLISHABLE_SECRET
);

function App() {
  const pages: IPage[] = useAppSelector((state) => state.page.pages);

  useGetAndSetUser();
  useNotifications();
  const axios = useAxios();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    axios
      .request<AxiosResponse<IPage[]>>({
        method: "GET",
        url: "/pages/",
      })
      .then((res) => {
        dispatch(pageSlice.actions.setPages(res.data.data));
      });
  }, []);

  const stripeOptions = {
    // @ts-ignore
    // clientSecret: process.env.REACT_APP_STRIPE_CLIENT_SECRET,
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/submission",
      element: <PaymentPage />,
    },

    {
      path: "/chat",
      element: <ChatPage />,
    },

    ...pages.map((page) => ({
      path: "/" + page.slug,
      element: <DynamicPage page={page} />,
    })),
  ]);

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <SocketProvider>
        <ThemeProvider theme={theme}>
          <ToastContainer hideProgressBar position="bottom-right" />

          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </SocketProvider>
    </Elements>
  );
}

export default App;
