import React from "react";
import Loading from "react-loading";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbMoodEmpty } from "react-icons/tb";

import { ITheme } from "../../config/theme";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import UserProfilePicture from "../userProfilePicture";
import { SizeEnum } from "../userProfilePicture/UserProfilePicture";
import Pagination from "../pagination";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { notificationSlice } from "../../store/slices/notificationSlice";
import useGetNotifications from "../../hooks/apiHooks/useGetNotifications";
import useSetNotificationToClickedBy from "../../hooks/apiHooks/useSetNotificationToClickedBy";
import HeaderOptionNotificationSignal from "../headerOptionNotificationSignal";

import useStyles from "./headerNotifications.styles";
import withNotifications from "../../hoc/withNotifications";
import { Link } from "react-router-dom";
import Button from "../button";
import useMarkAllUserNotificationsAsClicked from "../../hooks/apiHooks/useMarkAllUserNotificationsAsClicked";
import {
  IFileReadDto,
  INotificationReadDto,
  INotificationsGetCommand,
  IUserReadDto,
} from "roottypes";

interface IHeaderNotificationsProps {}

const LIMIT = 99;

const HeaderNotifications: React.FunctionComponent<
  IHeaderNotificationsProps
> = (props: IHeaderNotificationsProps) => {
  //#region Store
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );
  const total = useAppSelector((state) => state.notification.total);
  const user: IUserReadDto = useAppSelector((state) => state.user.user);
  const totalUnclicked: number = useAppSelector(
    (state) => state.notification.totalUnclicked
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.header
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
  const { setNotificationToClickedBy } = useSetNotificationToClickedBy();
  const { markAllUserNotificationAsClicked, loading: markAllAsReadLoading } =
    useMarkAllUserNotificationsAsClicked();

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
      const command: INotificationsGetCommand = {
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
  const handleClickNotification = (notification: INotificationReadDto) => {
    setNotificationsOpen(false);
    if (notification.clickedBy.indexOf(user._id) === -1) {
      setNotificationToClickedBy({
        notificationId: notification._id,
        currentUser: user,
      });
    }
  };
  const handleMarkAllUserNotificationAsClicked = () => {
    markAllUserNotificationAsClicked();
  };
  //#endregion Event listeners

  return (
    <div
      className={styles.headerNotificationContainer}
      ref={notificationsRef as React.RefObject<HTMLDivElement>}
      {...props}
    >
      <div
        className={styles.notificationIconContainer}
        onClick={handleOpenNotifications}
        data-cy="headerNotificationsButton"
      >
        <IoMdNotificationsOutline className={styles.notificationIcon} />

        <HeaderOptionNotificationSignal
          numberOfNotifications={totalUnclicked}
        />
      </div>

      {notificationsOpen && (
        <div
          className={styles.notificationPopup}
          data-cy="headerNotificationsContainer"
        >
          {(loading || markAllAsReadLoading) && (
            <Loading
              color={theme.primary}
              className={styles.headerNotificationLoading}
            />
          )}

          {totalUnclicked > 0 && !markAllAsReadLoading && (
            <Button
              style={{ marginBottom: 10 }}
              onClick={handleMarkAllUserNotificationAsClicked}
            >
              {getTranslatedText(staticText?.markAllUserNotificationAsClicked)}
            </Button>
          )}

          {!loading &&
            notifications.map(
              (notification: INotificationReadDto, index: number) => {
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
                        notification.clickedBy.indexOf(user._id) !== -1
                          ? styles.notificationContainer
                          : styles.notificationContainerUnclicked
                      }
                      data-cy={"headerNotification"}
                    >
                      {(notification.image as IFileReadDto)?.url && (
                        <UserProfilePicture
                          url={(notification.image as IFileReadDto)?.url}
                          size={SizeEnum.Small}
                        />
                      )}

                      <div className={styles.notificationText}>
                        {getTranslatedText(notification?.text)}
                      </div>
                    </div>
                  </Link>
                );
              }
            )}

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

export default withNotifications(React.memo(HeaderNotifications));
