import { ThemeProvider } from "react-jss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";

import theme from "./config/theme";
import useGetAndSetTokenFromLocalStorage from "./hooks/useGetAndSetTokenFromLocalStorage";
import useGetAndSetUser from "./hooks/useGetAndSetUser";

function App() {
  useGetAndSetTokenFromLocalStorage();
  useGetAndSetUser();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },

    {
      path: "/profile",
      element: <ProfilePage />,
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer hideProgressBar />

      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
