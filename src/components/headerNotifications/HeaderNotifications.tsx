import React from "react";
import Loading from "react-loading";
import { TbMoodEmpty } from "react-icons/tb";

import { Theme } from "../../config/theme";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import UserProfilePicture from "../userProfilePicture";
import { SizeEnum } from "../userProfilePicture/UserProfilePicture";
import { IUser } from "../../store/slices/userSlice";
import Pagination from "../pagination";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import {
  INotification,
  notificationSlice,
} from "../../store/slices/notificationSlice";
import useGetNotifications, {
  NotificationsGetCommand,
} from "../../hooks/apiHooks/useGetNotifications";
import { MdNotifications } from "react-icons/md";
import useSetNotificationToClicked from "../../hooks/apiHooks/useSetNotificationToClicked";
import HeaderOptionNotificationSignal from "../headerOptionNotificationSignal";

import useStyles from "./headerNotifications.styles";
import withNotifications from "../../hoc/withNotifications";
import { Link } from "react-router-dom";

interface IHeaderNotifications {}

const LIMIT = 99;

const HeaderNotifications: React.FunctionComponent<IHeaderNotifications> = (
  props: IHeaderNotifications
) => {
  //#region Store
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );
  const total = useAppSelector((state) => state.notification.total);
  const user: IUser = useAppSelector((state) => state.user.user);
  const totalUnclicked: number = useAppSelector(
    (state) => state.notification.totalUnclicked
  );
  //#endregion Store

  const [notificationsOpen, setNotificationsOpen] =
    React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const notificationsRef = React.useRef<HTMLDivElement>();
  useOnClickOutside(notificationsRef, () => {
    setNotificationsOpen(false);
  });
  const { getNotifications, loading } = useGetNotifications();
  const { setNotificationToClicked } = useSetNotificationToClicked();

  //#region Hooks
  React.useEffect(() => {
    // Reset everything when the component has just loaded to not have a snapping event
    if (notificationsOpen) {
      dispatch(
        notificationSlice.actions.setNotifications({
          notifications: [],
          total: 0,
          totalUnclicked,
        })
      );
    }
  }, [notificationsOpen]);

  // Load notifications on component mount
  React.useEffect(() => {
    if (user._id) {
      const command: NotificationsGetCommand = {
        paginationCommand: {
          limit: LIMIT,
          page,
        },
        userId: user._id.toString(),
      };
      getNotifications(command);
    }
  }, [notificationsOpen, page, user]);
  //#endregion Hooks

  //#region Event listeners
  const handleOpenNotifications = () =>
    setNotificationsOpen(!notificationsOpen);

  const handlePageChange = (page: number) => setPage(page);
  const handleClickNotification = (notification: INotification) => {
    setNotificationsOpen(false);
    if (!notification.clicked) {
      setNotificationToClicked({ notificationId: notification._id });
    }
  };
  //#endregion Event listeners

  return (
    <div
      className={styles.headerNotificationContainer}
      ref={notificationsRef as React.RefObject<HTMLDivElement>}
      {...props}
    >
      <MdNotifications
        onClick={handleOpenNotifications}
        className={styles.notificationIcon}
      />

      <HeaderOptionNotificationSignal numberOfNotifications={totalUnclicked} />

      {notificationsOpen && (
        <div className={styles.notificationPopup}>
          {loading && <Loading className={styles.headerNotificationLoading} />}
          {!loading &&
            notifications.map((notification: INotification, index: number) => {
              let linkArray = notification.link
                .replace("https://", "")
                ?.replace("http://", "")
                ?.split("/");
              linkArray.shift();
              let link: string = linkArray.join("/") || "";

              return (
                <Link
                  key={index}
                  to={"/" + link}
                  onClick={() => handleClickNotification(notification)}
                >
                  <div
                    key={index}
                    className={
                      notification.clicked
                        ? styles.notificationContainer
                        : styles.notificationContainerUnclicked
                    }
                  >
                    {notification.image?.url && (
                      <UserProfilePicture
                        url={notification.image?.url}
                        size={SizeEnum.Small}
                      />
                    )}

                    <div className={styles.notificationText}>
                      {getTranslatedText(notification?.text)}
                    </div>
                  </div>
                </Link>
              );
            })}

          {!loading && notifications.length === 0 && <TbMoodEmpty />}
          <Pagination
            total={total}
            page={page}
            onPageChange={handlePageChange}
            limit={LIMIT}
          />
        </div>
      )}
    </div>
  );
};

export default withNotifications(HeaderNotifications);
