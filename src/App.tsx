import { ThemeProvider } from "react-jss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";

import theme from "./config/theme";
import useGetAndSetTokenFromLocalStorage from "./hooks/useGetAndSetTokenFromLocalStorage";
import useGetAndSetUser from "./hooks/useGetAndSetUser";
import PaymentPage from "./pages/paymentPage";

const stripePromise = loadStripe(
  // @ts-ignore
  process.env.REACT_APP_STRIPE_PUBLISHABLE_SECRET
);

function App() {
  useGetAndSetTokenFromLocalStorage();
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
  ]);
  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <ThemeProvider theme={theme}>
        <ToastContainer hideProgressBar />

        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </Elements>
  );
}

export default App;
