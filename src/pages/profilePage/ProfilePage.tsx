import React from "react";
import { BsFillGearFill } from "react-icons/bs";

import ProfileForm from "../../components/profileForm";

import { Theme } from "../../config/theme";

import withWrapper from "../../hoc/wrapper";

import useStyles from "./profilePage.styles";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import PostEditor from "../../components/editors/postEditor";
import UserPosts from "../../components/userPosts";
import { useAppSelector } from "../../store/hooks";
import { IUser } from "../../store/slices/userSlice";
import { useParams } from "react-router-dom";
import useGetUser from "../../hooks/apiHooks/useGetUser";
import UserProfilePicture from "../../components/userProfilePicture";
import { SizeEnum } from "../../components/userProfilePicture/UserProfilePicture";
import withChat from "../../hoc/withChat";

interface IProfilePage {}
const ProfilePage: React.FunctionComponent<IProfilePage> = (
  props: IProfilePage
) => {
  const { userId } = useParams();

  const currentUser: IUser = useAppSelector<IUser>((state) => state.user.user);
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [fetchedUser, setFetchedUser] = React.useState<IUser | null>(null);
  const [showProfileForm, setShowProfileForm] = React.useState(false);

  const styles = useStyles({ theme });
  const isLoggedIn: boolean = useIsLoggedIn();
  const { getUser } = useGetUser();

  React.useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const newFetchedUser: IUser = await getUser(userId);
        setFetchedUser(newFetchedUser);
      }
    };

    if (userId !== currentUser._id && userId) {
      fetchUser();
    }
  }, [userId]);

  const handleTriggerShowProfileForm = () =>
    setShowProfileForm(!showProfileForm);

  const actualUser =
    userId === undefined || userId === currentUser._id
      ? currentUser
      : fetchedUser;

  if (!isLoggedIn || !actualUser) return null;

  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.connectedUserContainer}>
        {actualUser._id === currentUser._id && (
          <BsFillGearFill
            onClick={handleTriggerShowProfileForm}
            className={styles.configurationIcon}
          />
        )}
        {showProfileForm && actualUser._id === currentUser._id && (
          <div className={styles.profileAndPages}>
            <ProfileForm />
          </div>
        )}
        <div className={styles.postsAndEditor}>
          {actualUser._id === currentUser._id && <PostEditor />}
          {actualUser._id !== currentUser._id && (
            <div className={styles.userProfilePicAndName}>
              <UserProfilePicture
                size={SizeEnum.Big}
                url={actualUser.profilePicture?.url}
              />
              <span className={styles.userFullName}>
                {actualUser.firstName + " " + actualUser.lastName}
              </span>
            </div>
          )}
          <UserPosts user={actualUser} />
        </div>
      </div>
    </div>
  );
};

export default withWrapper(React.memo(ProfilePage), {
  withSideMenu: true,
});
