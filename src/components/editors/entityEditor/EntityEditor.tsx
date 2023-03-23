import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import ReactLoading from "react-loading";
import * as Yup from "yup";

import useStyles from "./entityEditor.styles";
import Modal from "../../modal";
import { Theme } from "../../../config/theme";
import Button from "../../button";
import { useAppSelector } from "../../../store/hooks";
import { ImCross } from "react-icons/im";
import { FormikProps, useFormik } from "formik";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import InputSelect from "../../inputSelect";
import getLanguages from "../../../utils/getLanguages";
import { IEntity } from "../../../store/slices/entitySlice";
import useUpdateEntity, {
  EntityUpdateCommand,
} from "../../../hooks/apiHooks/useUpdateEntity";
import useCreateEntity, {
  EntityCreateCommand,
} from "../../../hooks/apiHooks/useCreateEntity";

export interface IEntityEditor {
  entity?: IEntity;
  open?: boolean;
  setOpen?: (boolean) => void;
}

interface IEntityFieldValueForm {
  field: string;
  value: string;
}

interface IEntityForm {
  model: string;
  entityFieldValues: IEntityFieldValueForm[];
  language: string;
}

const EntityEditor = (props: IEntityEditor) => {
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.entities
  );

  //#region Local state
  const [modelModalOpen, setModelModalOpen] = React.useState<boolean>(false);
  //#endregion Local state

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { createEntity, loading: createLoading } = useCreateEntity();
  const { updateEntity, loading: updateLoading } = useUpdateEntity();
  const formik: FormikProps<IEntityForm> = useFormik<IEntityForm>({
    initialValues: {
      model: "",
      entityFieldValues: [],
      language,
    },
    validationSchema: Yup.object().shape({}),
    onSubmit: async (values: IEntityForm) => {
      if (props.entity) {
        const command: EntityUpdateCommand = {
          _id: props.entity._id,
          entityFieldValues: values.entityFieldValues,
          language: values.language,
          model: values.model,
        };

        await updateEntity(command);
      } else {
        const command: EntityCreateCommand = {
          entityFieldValues: values.entityFieldValues,
          language: values.language,
          model: values.model,
        };

        await createEntity(command);
      }

      if (props.setOpen) {
        props.setOpen(false);
      }
    },
  });

  //#region Effects
  React.useEffect(() => {
    if (props.open !== undefined) {
      setModelModalOpen(props.open);
    }
  }, [props.open]);

  React.useEffect(() => {
    formik.resetForm({
      values: {
        entityFieldValues:
          props.entity?.entityFieldValues.map((entityFieldValue) => {
            const entityFieldValueForm: IEntityFieldValueForm = {
              field: entityFieldValue.field._id,
              value: getTranslatedText(
                entityFieldValue.value,
                formik.values.language
              ),
            };
            return entityFieldValueForm;
          }) || [],
        model: props.entity?.model._id || "",
        language: formik.values.language,
      },
    });
  }, [props.entity, formik.values.language]);
  //#endregion Effects

  //#region Event listeners
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleCloseModal = () => {
    if (props.setOpen) {
      props.setOpen(false);
    } else setModelModalOpen(false);
  };
  //#endregion Event listeners

  const loading = props.entity ? updateLoading : createLoading;
  return (
    <Modal handleClose={handleCloseModal} open={modelModalOpen}>
      <form
        onSubmit={handleSubmit}
        className={styles.createEntityModalContainer}
      >
        <div className={styles.createEntityHeader}>
          <h2 className={styles.createEntityTitle}>
            {props.entity
              ? getTranslatedText(staticText?.updateEntity)
              : getTranslatedText(staticText?.createEntity)}
          </h2>

          <ImCross onClick={handleCloseModal} className={styles.closeButton} />
        </div>

        {/* <Input
          Icon={MdTitle}
          formik={formik}
          name="name"
          inputProps={{
            placeholder: getTranslatedText(staticText?.namePlaceholder),
          }}
        /> */}

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

export default React.memo(EntityEditor);