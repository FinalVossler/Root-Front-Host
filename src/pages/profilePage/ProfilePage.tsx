import React from "react";
import { BsFillGearFill } from "react-icons/bs";
import { ErrorBoundary } from "react-error-boundary";

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
const Pestel = React.lazy(() => import("pestel/Pestel"));

enum ActiveForm {
  Register = "Register",
  Login = "Login",
  ForgotPassword = "ForgotPassword",
}

interface IProfilePage {}
const ProfilePage: React.FunctionComponent<IProfilePage> = (
  props: IProfilePage
) => {
  const { userId } = useParams();

  const currentUser: IUser = useAppSelector<IUser>((state) => state.user.user);
  const withRegistration: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withRegistration
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.profile
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [fetchedUser, setFetchedUser] = React.useState<IUser | null>(null);
  const [activeForm, setActiveForm] = React.useState<ActiveForm>(
    ActiveForm.Register
  );
  const [showProfileForm, setShowProfileForm] = React.useState(false);

  const styles = useStyles({ theme });
  const isLoggedIn: boolean = useIsLoggedIn();
  const { getUser, loading: getUserLoading } = useGetUser();

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

          {/* <ErrorBoundary fallback={<div>Pestel Micro-Frontend Errored</div>}> */}
          <React.Suspense fallback={<div>loading</div>}>
            <Pestel
              theme={{
                borderColor: theme.borderColor,
                cancelButtonColor: theme.lightTextColor,
                cancelButtonTextColor: theme.darkTextColor,
                confirmButtonLeftColor: theme.darkerPrimary,
                confirmButtonRightColor: theme.primary,
                confirmButtonTextColor: theme.lightTextColor,
                dotColor: "#3BCBB2",
                downloadReportButtonColor: "#E59010",
                downloadReportTextColor: theme.lightTextColor,
                textColor: theme.darkTextColor,
                titleTextColor: theme.darkTextColor,
                buttonBoxShadow: theme.boxShadow,
              }}
              cancelButtonText="Back"
              confirmButtonText="Confirm"
              title="PESTEL Analysis"
              data={[
                { score: 8, text: "Political" },
                { score: 4, text: "Economic" },
                { score: 10, text: "Social" },
                { score: 6, text: "Technological" },
                { score: 9, text: "Environmental" },
                { score: 2, text: "Legal" },
              ]}
              downloadReportButtonText="Download Report"
              maxScore={12}
              onCancel={() => {}}
              onConfirm={() => {}}
              productText="Product Name: Product A"
              countryText="Country: France"
            />
          </React.Suspense>
          <br />
          <br />
          <br />
          <br />
          {/* </ErrorBoundary> */}
          <UserPosts user={actualUser} />
        </div>
      </div>
    </div>
  );
};

export default withWrapper(withChat(React.memo(ProfilePage)), {
  withSideMenu: true,
});
