import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdPassword, MdTitle } from "react-icons/md";
import ReactLoading from "react-loading";
import { FormikProps, useFormik } from "formik";
import { ImCross } from "react-icons/im";
import * as Yup from "yup";

import useStyles from "./userEditor.styles";
import Modal from "../../../fundamentalComponents/modal";
import Button from "../../../fundamentalComponents/button";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import useUpdateUser from "../../../../hooks/apiHooks/useUpdateUser";
import useCreateUser from "../../../../hooks/apiHooks/useCreateUser";
import useGetRoles from "../../../../hooks/apiHooks/useGetRoles";
import InputSelect from "../../../fundamentalComponents/inputs/inputSelect";
import {
  IRoleReadDto,
  IRolesGetCommand,
  ITheme,
  IUserCreateCommand,
  IUserReadDto,
  IUserUpdateCommand,
  SuperRoleEnum,
} from "roottypes";
import { editorSlice } from "../../../../store/slices/editorSlice";
import FormikInput from "../../../fundamentalComponents/formikInputs/formikInput";
import FormikInputSelect from "../../../fundamentalComponents/formikInputs/formikInputSelect";

interface IUserFormFormik {
  firstName: string;
  lastName: string;
  email: string;
  roleId?: string;
  password: string;
  confirmPassword: string;
  superRole: SuperRoleEnum;
}

export interface IUserEditorProps {
  user?: IUserReadDto;
  id: string;
}

const UserEditor: React.FunctionComponent<IUserEditorProps> = (
  props: IUserEditorProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.profile
  );
  const roles: IRoleReadDto[] = useAppSelector((state) => state.role.roles);
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const { createUser, loading: createLoading } = useCreateUser();
  const { updateUser, loading: updateLoading } = useUpdateUser();
  const { getRoles, loading: getRolesLoading } = useGetRoles();
  const formik: FormikProps<IUserFormFormik> = useFormik<IUserFormFormik>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      roleId: "",
      password: "",
      confirmPassword: "",
      superRole: SuperRoleEnum.Normal,
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
    onSubmit: async (values: IUserFormFormik) => {
      if (props.user) {
        const command: IUserUpdateCommand = {
          _id: props.user._id,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          roleId: values.roleId,
          superRole: values.superRole,
        };

        await updateUser(command);
      } else {
        const command: IUserCreateCommand = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          roleId: values.roleId,
          superRole: values.superRole,
        };

        await createUser(command);
      }

      dispatch(editorSlice.actions.removeEditor(props.id));
    },
  });

  //#region Effects
  React.useEffect(() => {
    const getRolesCommand: IRolesGetCommand = {
      paginationCommand: {
        limit: 999,
        page: 1,
      },
    };
    getRoles(getRolesCommand);
  }, []);

  React.useEffect(() => {
    // Initialize the form based on the passed user to update
    const role: IRoleReadDto | undefined = roles.find(
      (r) => r._id === (props.user?.role as IRoleReadDto)?._id
    );
    formik.resetForm({
      values: {
        firstName: props.user?.firstName || "",
        lastName: props.user?.lastName || "",
        email: props.user?.email || "",
        password: props.user ? "********" : "",
        confirmPassword: props.user ? "********" : "",
        roleId: (props.user?.role as IRoleReadDto)?._id,
        superRole: props.user?.superRole || SuperRoleEnum.Normal,
      },
    });
  }, [props.user, roles]);
  //#endregion Effects

  //#region Event listeners
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleCloseModal = () => {
    dispatch(editorSlice.actions.removeEditor(props.id));
  };
  //#endregion Event listeners

  //#region view
  const superRolesOptions = React.useMemo(() => {
    return [
      {
        label: getTranslatedText(staticText?.superAdmin),
        value: SuperRoleEnum.SuperAdmin,
      },
      {
        label: getTranslatedText(staticText?.normal),
        value: SuperRoleEnum?.Normal,
      },
    ];
  }, []);
  const loading =
    (props.user ? updateLoading : createLoading) || getRolesLoading;
  //#endregion view

  return (
    <Modal theme={theme} handleClose={handleCloseModal} open>
      <form
        onSubmit={handleSubmit}
        className={styles.createFieldModalContainer}
        data-cy="userForm"
      >
        <div className={styles.createFieldHeader}>
          <h2 className={styles.createFieldTitle}>
            {props.user
              ? getTranslatedText(staticText?.update)
              : getTranslatedText(staticText?.create)}
          </h2>

          <ImCross onClick={handleCloseModal} className={styles.closeButton} />
        </div>

        <FormikInput
          theme={theme}
          Icon={MdTitle}
          formik={formik}
          name="firstName"
          inputProps={{
            placeholder: getTranslatedText(staticText?.enterFirstName),
            disabled: loading,
          }}
          inputDataCy="firstNameInput"
          inputErrorDataCy="firstNameInputError"
        />

        <FormikInput
          theme={theme}
          Icon={MdTitle}
          formik={formik}
          name="lastName"
          inputProps={{
            placeholder: getTranslatedText(staticText?.enterLastName),
            disabled: loading,
          }}
          inputDataCy="lastNameInput"
          inputErrorDataCy="lastNameInputError"
        />

        <FormikInput
          theme={theme}
          Icon={MdTitle}
          formik={formik}
          name="email"
          inputProps={{
            placeholder: getTranslatedText(staticText?.enterEmail),
            disabled: loading,
            type: "email",
          }}
          inputDataCy="emailInput"
          inputErrorDataCy="emailInputError"
        />

        <InputSelect
          theme={theme}
          name="superRole"
          disabled={user.superRole !== SuperRoleEnum.SuperAdmin}
          label={getTranslatedText(staticText?.superRole)}
          value={superRolesOptions.find(
            (el) => el.value === formik.values.superRole
          )}
          options={superRolesOptions}
          onChange={(option) => formik.setFieldValue("superRole", option.value)}
        />

        <FormikInputSelect
          theme={theme}
          label={getTranslatedText(staticText?.role)}
          value={{
            label: getTranslatedText(
              roles?.find((role) => role._id === formik.values.roleId)?.name
            ),
            value: formik.values.roleId || "",
          }}
          options={roles.map((role) => ({
            label: getTranslatedText(role.name),
            value: role._id,
          }))}
          formik={formik}
          name="roleId"
        />

        <FormikInput
          theme={theme}
          Icon={MdPassword}
          formik={formik}
          name="password"
          inputProps={{
            placeholder: getTranslatedText(staticText?.password),
            disabled: loading || Boolean(props.user),
            type: "password",
          }}
          inputDataCy="passwordInput"
          inputErrorDataCy="passwordInputError"
        />

        <FormikInput
          theme={theme}
          Icon={MdPassword}
          formik={formik}
          name="confirmPassword"
          inputProps={{
            placeholder: getTranslatedText(staticText?.passwordConfirmation),
            disabled: loading || Boolean(props.user),
            type: "password",
          }}
          inputDataCy="confirmPasswordInput"
          inputErrorDataCy="confirmPasswordInputError"
        />

        {!loading && (
          <Button
            theme={theme}
            disabled={loading}
            type="submit"
            style={{}}
            className={styles.button}
            buttonDataCy="userFormSubmitButton"
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
