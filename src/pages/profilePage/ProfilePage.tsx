import React from "react";
import { BsFillGearFill } from "react-icons/bs";

import ProfileForm from "../../components/appComponents/formComponents/profileForm";

import { ITheme } from "../../config/theme";

import useStyles from "./profilePage.styles";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import PostEditor from "../../components/appComponents/editors/postEditor";
import UserPosts from "../../components/appComponents/userPosts";
import { useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import useGetUser from "../../hooks/apiHooks/useGetUser";
import UserProfilePicture from "../../components/fundamentalComponents/userProfilePicture";
import { SizeEnum } from "../../components/fundamentalComponents/userProfilePicture/UserProfilePicture";
import { IFileReadDto, IUserReadDto } from "roottypes";

interface IProfilePageProps {}
const ProfilePage: React.FunctionComponent<IProfilePageProps> = (
  props: IProfilePageProps
) => {
  const { userId } = useParams();

  const currentUser: IUserReadDto = useAppSelector<IUserReadDto>(
    (state) => state.user.user
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [fetchedUser, setFetchedUser] = React.useState<IUserReadDto | null>(
    null
  );
  const [showProfileForm, setShowProfileForm] = React.useState(false);

  const styles = useStyles({ theme });
  const isLoggedIn: boolean = useIsLoggedIn();
  const { getUser } = useGetUser();

  React.useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const newFetchedUser: IUserReadDto = await getUser(userId);
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
                url={(actualUser.profilePicture as IFileReadDto)?.url}
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

export default React.memo(ProfilePage);
