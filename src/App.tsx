import { ThemeProvider } from "react-jss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import ChatPage from "./pages/chatPage";

import useGetAndSetUser from "./hooks/useGetAndSetUser";
import PaymentPage from "./pages/paymentPage";

import theme from "./config/theme";

const stripePromise = loadStripe(
  // @ts-ignore
  process.env.REACT_APP_STRIPE_PUBLISHABLE_SECRET
);

function App() {
  useGetAndSetUser();

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
  ]);
  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <ThemeProvider theme={theme}>
        <ToastContainer hideProgressBar position="bottom-right" />

        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </Elements>
  );
}

export default App;
