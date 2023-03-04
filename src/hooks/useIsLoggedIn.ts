import moment from "moment";

import { useAppSelector } from "../store/hooks";
import { TokenInformation } from "../store/slices/userSlice";
import { TIME_FORMAT } from "../config/constants";

const useIsLoggedIn = (): boolean => {
  const tokenInformation: TokenInformation = useAppSelector(
    (state) => state.user.tokenInformation
  );

  if (tokenInformation && tokenInformation.value?.length > 0) {
    // Computing expiration in hours
    let expriesInInHours = tokenInformation.expiresIn;
    expriesInInHours.replace("h", "");
    const expirationInHours: number = parseInt(expriesInInHours);

    // Computing expiration date as a moment object
    let expirationDate: moment.Moment = moment(
      tokenInformation.lastTokenUpdate,
      TIME_FORMAT
    );
    expirationDate.add(expirationInHours, "days");

    return moment().isBefore(expirationDate);
  } else {
    return false;
  }
};

export default useIsLoggedIn;
