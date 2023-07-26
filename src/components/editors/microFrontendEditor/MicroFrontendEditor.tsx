import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdTitle } from "react-icons/md";
import ReactLoading from "react-loading";
import { AiFillDelete, AiOutlineAppstoreAdd } from "react-icons/ai";

import useStyles from "./microFrontendEditor.styles";
import Modal from "../../modal";
import { Theme } from "../../../config/theme";
import Button from "../../button";
import { useAppSelector } from "../../../store/hooks";
import Input from "../../input";
import { ImCross } from "react-icons/im";
import { FormikProps, useFormik } from "formik";
import { IMicroFrontend } from "../../../store/slices/microFrontendSlice";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import { BiLabel } from "react-icons/bi";
import useUpdateMicroFrontend, {
  MicroFrontendComponentUpdateCommand,
  MicroFrontendUpdateCommand,
} from "../../../hooks/apiHooks/useUpdateMicroFrontend";
import useCreateMicroFrontend, {
  MicroFrontendCreateCommand,
} from "../../../hooks/apiHooks/useCreateMicroFrontend";

export interface IMicroFrontendEditor {
  microFrontend?: IMicroFrontend;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export interface IMicroFrontendForm {
  name: string;
  remoteEntry: string;
  components: MicroFrontendComponentUpdateCommand[];
}

const MicroFrontendEditor = (props: IMicroFrontendEditor) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.microFrontends
  );

  //#region Local state
  const [microFrontendModalOpen, setMicroFrontendModalOpen] =
    React.useState<boolean>(false);
  //#endregion Local state

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { createMicroFrontend, loading: createLoading } =
    useCreateMicroFrontend();
  const { updateMicroFrontend, loading: updateLoading } =
    useUpdateMicroFrontend();
  const formik: FormikProps<IMicroFrontendForm> = useFormik<IMicroFrontendForm>(
    {
      initialValues: {
        name: "",
        remoteEntry: "",
        components: [],
      },
      onSubmit: async (values: IMicroFrontendForm) => {
        if (props.microFrontend) {
          const command: MicroFrontendUpdateCommand = {
            _id: props.microFrontend._id,
            name: values.name,
            remoteEntry: values.remoteEntry,
            components: values.components,
          };

          await updateMicroFrontend(command);
        } else {
          const command: MicroFrontendCreateCommand = {
            name: values.name,
            remoteEntry: values.remoteEntry,
            components: values.components,
          };

          await createMicroFrontend(command);
        }

        if (props.setOpen) {
          props.setOpen(false);
        }
      },
    }
  );

  //#region Effects
  React.useEffect(() => {
    if (props.open !== undefined) {
      setMicroFrontendModalOpen(props.open);
    }
  }, [props.open]);

  React.useEffect(() => {
    // Initialize the form based on the language and the passed microFrontend to update
    formik.resetForm({
      values: {
        name: props.microFrontend?.name || "",
        remoteEntry: props.microFrontend?.remoteEntry || "",
        components: props.microFrontend?.components || [],
      },
    });
  }, [props.microFrontend]);
  //#endregion Effects

  //#region Event listeners

  const handleAddComponent = () => {
    const newComponent: MicroFrontendComponentUpdateCommand = {
      name: "",
      _id: undefined,
    };
    formik.setFieldValue("components", [
      ...formik.values.components,
      newComponent,
    ]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleCloseModal = () => {
    if (props.setOpen) {
      props.setOpen(false);
    } else setMicroFrontendModalOpen(false);
  };

  const handleDeleteComponent = (componentIndex: number) => {
    const newComponents = [...formik.values.components];
    newComponents.splice(componentIndex, 1);
    formik.setFieldValue("components", newComponents);
  };
  //#endregion Event listeners

  const loading = props.microFrontend ? updateLoading : createLoading;
  return (
    <Modal handleClose={handleCloseModal} open={microFrontendModalOpen}>
      <form
        onSubmit={handleSubmit}
        className={styles.createMicroFrontendModalContainer}
      >
        <h2 className={styles.microFrontendsWarning}>
          {getTranslatedText(staticText?.warning)}
        </h2>
        <div className={styles.createMicroFrontendHeader}>
          <h2 className={styles.createMicroFrontendTitle}>
            {props.microFrontend
              ? getTranslatedText(staticText?.updateMicroFrontend)
              : getTranslatedText(staticText?.createMicroFrontend)}
          </h2>

          <ImCross onClick={handleCloseModal} className={styles.closeButton} />
        </div>

        <Input
          Icon={MdTitle}
          formik={formik}
          name="name"
          inputProps={{
            placeholder: getTranslatedText(staticText?.name),
          }}
        />

        <Input
          Icon={MdTitle}
          formik={formik}
          name="remoteEntry"
          inputProps={{
            placeholder: getTranslatedText(staticText?.remoteEntry),
          }}
        />

        <div className={styles.componentsContainer}>
          <span
            className={styles.addComponentButton}
            onClick={handleAddComponent}
          >
            <AiOutlineAppstoreAdd className={styles.addComponentIcon} />{" "}
            {getTranslatedText(staticText?.addComponent)}
          </span>

          {formik.values.components.map((component, componentIndex) => {
            return (
              <div
                key={componentIndex}
                className={styles.singleComponentContainer}
              >
                <AiFillDelete
                  className={styles.deleteComponentButton}
                  onClick={() => handleDeleteComponent(componentIndex)}
                />
                <Input
                  label={getTranslatedText(staticText?.componentName)}
                  value={component.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik.setFieldValue(
                      "components",
                      formik.values.components.map((component, i) =>
                        i !== componentIndex
                          ? component
                          : {
                              ...component,
                              name: e.target.value,
                            }
                      )
                    );
                  }}
                  Icon={BiLabel}
                />
              </div>
            );
          })}
        </div>

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

export default React.memo(MicroFrontendEditor);
