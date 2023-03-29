import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdPassword, MdTitle } from "react-icons/md";
import ReactLoading from "react-loading";
import * as Yup from "yup";

import useStyles from "./userEditor.styles";
import Modal from "../../modal";
import { Theme } from "../../../config/theme";
import Button from "../../button";
import { useAppSelector } from "../../../store/hooks";
import Input from "../../input";
import { ImCross } from "react-icons/im";
import { FormikProps, useFormik } from "formik";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import { IUser } from "../../../store/slices/userSlice";
import useUpdateUser, {
  UserUpdateCommand,
} from "../../../hooks/apiHooks/useUpdateUser";
import useCreateUser, {
  UserCreateCommand,
} from "../../../hooks/apiHooks/useCreateUser";

export interface IUserEditor {
  user?: IUser;
  open?: boolean;
  setOpen?: (boolean) => void;
}

interface IUserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const UserEditor = (props: IUserEditor) => {
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.profile
  );

  //#region Local state
  const [userModalOpen, setUserModalOpen] = React.useState<boolean>(false);
  //#endregion Local state

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { createUser, loading: createLoading } = useCreateUser();
  const { updateUser, loading: updateLoading } = useUpdateUser();
  const formik: FormikProps<IUserForm> = useFormik<IUserForm>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email()
        .required(getTranslatedText(staticText?.emailIsRequired)),
      firstName: Yup.string().required(
        getTranslatedText(staticText?.firstNameIsRequired)
      ),
      lastName: Yup.string().required(
        getTranslatedText(staticText?.lastNameIsRequired)
      ),
      password: Yup.string().required(
        getTranslatedText(staticText?.passwordIsRequired)
      ),
      confirmPassword: Yup.string().test(
        "testMatchingPasswords",
        getTranslatedText(staticText?.passwordsDontMatch),
        (confirmPassword) => confirmPassword === formik.values.password
      ),
    }),
    onSubmit: async (values: IUserForm) => {
      if (props.user) {
        const command: UserUpdateCommand = {
          _id: props.user._id,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        };

        await updateUser(command);
      } else {
        const command: UserCreateCommand = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        };

        await createUser(command);
      }

      if (props.setOpen) {
        props.setOpen(false);
      }
    },
  });

  //#region Effects
  React.useEffect(() => {
    if (props.open !== undefined) {
      setUserModalOpen(props.open);
    }
  }, [props.open]);

  React.useEffect(() => {
    // Initialize the form based on the passed user to update
    formik.resetForm({
      values: {
        firstName: props.user?.firstName || "",
        lastName: props.user?.lastName || "",
        email: props.user?.email || "",
        password: props.user ? "********" : "",
        confirmPassword: props.user ? "********" : "",
      },
    });
  }, [props.user]);
  //#endregion Effects

  //#region Event listeners
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleCloseModal = () => {
    if (props.setOpen) {
      props.setOpen(false);
    } else setUserModalOpen(false);
  };
  //#endregion Event listeners

  const loading = props.user ? updateLoading : createLoading;
  return (
    <Modal handleClose={handleCloseModal} open={userModalOpen}>
      <form
        onSubmit={handleSubmit}
        className={styles.createFieldModalContainer}
      >
        <div className={styles.createFieldHeader}>
          <h2 className={styles.createFieldTitle}>
            {props.user
              ? getTranslatedText(staticText?.update)
              : getTranslatedText(staticText?.create)}
          </h2>

          <ImCross onClick={handleCloseModal} className={styles.closeButton} />
        </div>

        <Input
          Icon={MdTitle}
          formik={formik}
          name="firstName"
          inputProps={{
            placeholder: getTranslatedText(staticText?.enterFirstName),
            disabled: loading,
          }}
        />

        <Input
          Icon={MdTitle}
          formik={formik}
          name="lastName"
          inputProps={{
            placeholder: getTranslatedText(staticText?.enterLastName),
            disabled: loading,
          }}
        />

        <Input
          Icon={MdTitle}
          formik={formik}
          name="email"
          inputProps={{
            placeholder: getTranslatedText(staticText?.enterEmail),
            disabled: loading,
            type: "email",
          }}
        />

        <Input
          Icon={MdPassword}
          formik={formik}
          name="password"
          inputProps={{
            placeholder: getTranslatedText(staticText?.password),
            disabled: loading || Boolean(props.user),
            type: "password",
          }}
        />

        <Input
          Icon={MdPassword}
          formik={formik}
          name="confirmPassword"
          inputProps={{
            placeholder: getTranslatedText(staticText?.passwordConfirmation),
            disabled: loading || Boolean(props.user),
            type: "password",
          }}
        />

        {!loading && (
          <Button
            disabled={loading}
            type="submit"
            style={{}}
            className={styles.button}
          >
            {getTranslatedText(staticText?.submit)}
          </Button>
        )}

        {loading && (
          <ReactLoading
            className={styles.loading}
            type={"spin"}
            color={theme.primary}
            width={36}
            height={36}
          />
        )}
      </form>
    </Modal>
  );
};

export default React.memo(UserEditor);
