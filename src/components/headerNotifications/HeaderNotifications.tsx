import React from "react";
import Loading from "react-loading";

import { Theme } from "../../config/theme";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import useStyles from "./headerNotifications.styles";
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

interface IHeaderNotifications {}

const LIMIT = 99;

const HeaderInbox: React.FunctionComponent<IHeaderNotifications> = (
  props: IHeaderNotifications
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );
  const total = useAppSelector((state) => state.notification.total);
  const user: IUser = useAppSelector((state) => state.user.user);

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

  React.useEffect(() => {
    // Reset everything when the component has just loaded to not have a snapping event
    if (notificationsOpen) {
      dispatch(
        notificationSlice.actions.setNotifications({
          notifications: [],
          total: 0,
          totalUnclicked: 0,
        })
      );
    }
  }, [notificationsOpen]);

  // Load notifications on component mount
  React.useEffect(() => {
    if (notificationsOpen) {
      const command: NotificationsGetCommand = {
        paginationCommand: {
          limit: LIMIT,
          page,
        },
        userId: user._id.toString(),
      };
      getNotifications(command);
    }
  }, [notificationsOpen, page]);

  const handleOpenNotifications = () =>
    setNotificationsOpen(!notificationsOpen);

  const handlePageChange = (page: number) => setPage(page);

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

      {notificationsOpen && (
        <div className={styles.notificationPopup}>
          {loading && <Loading className={styles.headerNotificationLoading} />}
          {!loading &&
            notifications.map((notification: INotification, index: number) => {
              return (
                <a target="_blank" href={notification.link}>
                  <div key={index} className={styles.notificationContainer}>
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
                </a>
              );
            })}

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

export default HeaderInbox;
