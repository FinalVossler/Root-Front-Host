import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdTitle } from "react-icons/md";
import ReactLoading from "react-loading";
import { AiFillDelete, AiOutlineAppstoreAdd } from "react-icons/ai";
import * as Yup from "yup";

import useStyles from "./microFrontendEditor.styles";
import Modal from "../../../fundamentalComponents/modal";
import Button from "../../../fundamentalComponents/button";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import Input from "../../../fundamentalComponents/inputs/input";
import { ImCross } from "react-icons/im";
import { FormikProps, useFormik } from "formik";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { BiLabel } from "react-icons/bi";
import useUpdateMicroFrontend from "../../../../hooks/apiHooks/useUpdateMicroFrontend";
import useCreateMicroFrontend from "../../../../hooks/apiHooks/useCreateMicroFrontend";
import {
  IMicroFrontendComponentReadDto,
  IMicroFrontendComponentUpdateCommand,
  IMicroFrontendCreateCommand,
  IMicroFrontendReadDto,
  IMicroFrontendUpdateCommand,
  ITheme,
} from "roottypes";
import { editorSlice } from "../../../../store/slices/editorSlice";
import FormikInput from "../../../fundamentalComponents/formikInputs/formikInput";

export interface IMicroFrontendForm {
  name: string;
  remoteEntry: string;
  components: IMicroFrontendComponentUpdateCommand[];
}

export interface IMicroFrontendEditorProps {
  microFrontend?: IMicroFrontendReadDto;
  id: string;
}

const MicroFrontendEditor: React.FunctionComponent<
  IMicroFrontendEditorProps
> = (props: IMicroFrontendEditorProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.microFrontends
  );

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
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
      validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        remoteEntry: Yup.string().required(),
      }),
      onSubmit: async (values: IMicroFrontendForm) => {
        if (props.microFrontend) {
          const command: IMicroFrontendUpdateCommand = {
            _id: props.microFrontend._id,
            name: values.name,
            remoteEntry: values.remoteEntry,
            components: values.components,
          };

          await updateMicroFrontend(command);
        } else {
          const command: IMicroFrontendCreateCommand = {
            name: values.name,
            remoteEntry: values.remoteEntry,
            components: values.components,
          };

          await createMicroFrontend(command);
        }

        dispatch(editorSlice.actions.removeEditor(props.id));
      },
    }
  );

  //#region Effects
  React.useEffect(() => {
    // Initialize the form based on the language and the passed microFrontend to update
    formik.resetForm({
      values: {
        name: props.microFrontend?.name || "",
        remoteEntry: props.microFrontend?.remoteEntry || "",
        components:
          (props.microFrontend?.components as
            | IMicroFrontendComponentReadDto[]
            | undefined) || [],
      },
    });
  }, [props.microFrontend]);
  //#endregion Effects

  //#region Event listeners

  const handleAddComponent = () => {
    const newComponent: IMicroFrontendComponentUpdateCommand = {
      name: "",
      _id: "",
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
    dispatch(editorSlice.actions.removeEditor(props.id));
  };

  const handleDeleteComponent = (componentIndex: number) => {
    const newComponents = [...formik.values.components];
    newComponents.splice(componentIndex, 1);
    formik.setFieldValue("components", newComponents);
  };
  //#endregion Event listeners

  const loading = props.microFrontend ? updateLoading : createLoading;
  return (
    <Modal handleClose={handleCloseModal} open>
      <form
        onSubmit={handleSubmit}
        className={styles.createMicroFrontendModalContainer}
      >
        {/* <h2 className={styles.microFrontendsWarning}>
          {getTranslatedText(staticText?.warning)}
        </h2> */}
        <div className={styles.createMicroFrontendHeader}>
          <h2 className={styles.createMicroFrontendTitle}>
            {props.microFrontend
              ? getTranslatedText(staticText?.updateMicroFrontend)
              : getTranslatedText(staticText?.createMicroFrontend)}
          </h2>

          <ImCross onClick={handleCloseModal} className={styles.closeButton} />
        </div>

        <FormikInput
          Icon={MdTitle}
          formik={formik}
          name="name"
          inputProps={{
            placeholder: getTranslatedText(staticText?.name),
          }}
        />

        <FormikInput
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
