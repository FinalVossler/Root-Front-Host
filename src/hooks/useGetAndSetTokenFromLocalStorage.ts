import React from "react";
import { toast } from "react-toastify";

import { LOCAL_STORAGE_TOKEN_ITEM_NAME as LOCAL_STORAGE_TOKEN_ITEM_NAME } from "../config/constants";
import { useAppDispatch } from "../store/hooks";
import { TokenInformation, userSlice } from "../store/slices/userSlice";

const useGetAndSetTokenFromLocalStorage = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // Initializing the token from local storage
    let tokenInformationInStorage: TokenInformation | null = null;

    let tokenInformationInStorageAsString = localStorage.getItem(
      LOCAL_STORAGE_TOKEN_ITEM_NAME
    );

    // If we have something stored in the local storage, then we update the state
    if (tokenInformationInStorageAsString) {
      try {
        tokenInformationInStorage = JSON.parse(
          tokenInformationInStorageAsString
        );

        // Setting the token information
        if (tokenInformationInStorage) {
          dispatch(
            userSlice.actions.setTokenInformation(tokenInformationInStorage)
          );
        }
      } catch (e) {
        // Oh somebody messed with the our local storage manually (HACKER!)
        toast.error(
          "Failed getting a stored token in local storage. Someone messed with your local storage!"
        );
      }
    }
  }, []);
};

export default useGetAndSetTokenFromLocalStorage;
