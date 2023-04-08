import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdTitle } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FormikProps, useFormik } from "formik";
import ReactLoading from "react-loading";

import Modal from "../../modal";
import { Theme } from "../../../config/theme";
import Button from "../../button";
import { useAppSelector } from "../../../store/hooks";
import Input from "../../input";
import useCreateRole, {
  RoleCreateCommand,
} from "../../../hooks/apiHooks/useCreateRole";
import useUpdateRole, {
  RoleUpdateCommand,
} from "../../../hooks/apiHooks/useUpdateRole";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import InputSelect from "../../inputSelect";
import getLanguages from "../../../utils/getLanguages";
import { IRole, Permission } from "../../../store/slices/roleSlice";
import useStyles from "./roleEditor.styles";
import { Option } from "../../inputSelect/InputSelect";
import lowerCaseFirstLetter from "../../../utils/lowerCaseFirstLetter";

export interface IRoleEditor {
  role?: IRole;
  open?: boolean;
  setOpen?: (boolean) => void;
}

interface IRoleForm {
  name: string;
  language: string;
  permissions: Permission[];
}

const RoleEditor = (props: IRoleEditor) => {
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.roles
  );

  //#region Local state
  const [roleModalOpen, setRoleModalOpen] = React.useState<boolean>(false);
  //#endregion Local state

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { createRole, loading: createLoading } = useCreateRole();
  const { updateRole, loading: updateLoading } = useUpdateRole();
  const formik: FormikProps<IRoleForm> = useFormik<IRoleForm>({
    initialValues: {
      name: "",
      language,
      permissions: Object.values(Permission),
    },
    onSubmit: async (values: IRoleForm) => {
      if (props.role) {
        const command: RoleUpdateCommand = {
          _id: props.role._id,
          name: values.name,
          language: values.language,
          permissions: values.permissions,
        };

        await updateRole(command);
      } else {
        const command: RoleCreateCommand = {
          name: values.name,
          language: values.language,
          permissions: values.permissions,
        };

        await createRole(command);
      }

      if (props.setOpen) {
        props.setOpen(false);
      }
    },
  });

  //#region Effects
  React.useEffect(() => {
    if (props.open !== undefined) {
      setRoleModalOpen(props.open);
    }
  }, [props.open]);

  React.useEffect(() => {
    // Initialize the form based on the language and the passed role to update
    formik.resetForm({
      values: {
        name: getTranslatedText(props.role?.name, formik.values.language),
        language: formik.values.language,
        permissions: props.role?.permissions || formik.values.permissions,
      },
    });
  }, [props.role, formik.values.language]);

  //#endregion Effects

  //#region Event listeners
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleCloseModal = () => {
    if (props.setOpen) {
      props.setOpen(false);
    } else setRoleModalOpen(false);
  };
  //#endregion Event listeners

  const loading = props.role ? updateLoading : createLoading;
  const permissionsOptions: Option[] = Object.values(Permission).map(
    (permission) => {
      return {
        label: getTranslatedText(
          staticText?.[lowerCaseFirstLetter(permission)]
        ),
        value: permission,
      };
    }
  );

  return (
    <Modal handleClose={handleCloseModal} open={roleModalOpen}>
      <form onSubmit={handleSubmit} className={styles.createRoleModalContainer}>
        <div className={styles.createRoleHeader}>
          <h2 className={styles.createRoleTitle}>
            {props.role
              ? getTranslatedText(staticText?.updateRole)
              : getTranslatedText(staticText?.createRole)}
          </h2>

          <ImCross onClick={handleCloseModal} className={styles.closeButton} />
        </div>

        <Input
          Icon={MdTitle}
          formik={formik}
          name="name"
          inputProps={{
            placeholder: getTranslatedText(staticText?.namePlaceholder),
          }}
        />

        <InputSelect
          label={getTranslatedText(staticText?.language)}
          name="language"
          formik={formik}
          options={getLanguages()}
          value={
            getLanguages().find((el) => el.value === formik.values.language) ||
            getLanguages()[0]
          }
        />

        <InputSelect
          label={getTranslatedText(staticText?.permissions)}
          name="permissions"
          formik={formik}
          options={permissionsOptions}
          isMulti
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

export default React.memo(RoleEditor);
