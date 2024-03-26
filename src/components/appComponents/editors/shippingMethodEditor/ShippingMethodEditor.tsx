import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdTitle } from "react-icons/md";
import ReactLoading from "react-loading";
import {
  IShippingMethodCreateCommand,
  IShippingMethodReadDto,
  IShippingMethodUpdateCommand,
  ITheme,
} from "roottypes";
import * as Yup from "yup";

import Modal from "../../../fundamentalComponents/modal";
import Button from "../../../fundamentalComponents/button";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ImCross } from "react-icons/im";
import { FormikProps, useFormik } from "formik";
import { editorSlice } from "../../../../store/slices/editorSlice";
import FormikInput from "../../../fundamentalComponents/formikInputs/formikInput";

import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import useCreateShippingMethod from "../../../../hooks/apiHooks/useCreateShippingMethod";
import useUpdateShippingMethod from "../../../../hooks/apiHooks/useUpdateShippingMethod";

import useStyles from "./shippingMethodEditor.styles";

export interface IShippingMethodFormFormik {
  name: string;
  price: number | undefined;
  language: string;
}

export interface IShippingMethodEditorProps {
  shippingMethod?: IShippingMethodReadDto;
  id: string;
}

const ShippingMethodEditor: React.FunctionComponent<
  IShippingMethodEditorProps
> = (props: IShippingMethodEditorProps) => {
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.shippingMethods
  );

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const { createShippingMethod, loading: createLoading } =
    useCreateShippingMethod();
  const { updateShippingMethod, loading: updateLoading } =
    useUpdateShippingMethod();
  const formik: FormikProps<IShippingMethodFormFormik> =
    useFormik<IShippingMethodFormFormik>({
      initialValues: {
        name: "",
        price: undefined,
        language,
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().required(getTranslatedText(staticText?.required)),
        price: Yup.number().required(getTranslatedText(staticText?.required)),
      }),
      onSubmit: async (values: IShippingMethodFormFormik) => {
        if (props.shippingMethod) {
          const command: IShippingMethodUpdateCommand = {
            _id: props.shippingMethod._id,
            name: values.name,
            price: values.price || 0,
            language: values.language,
          };

          await updateShippingMethod(command);
        } else {
          const command: IShippingMethodCreateCommand = {
            name: values.name,
            price: values.price || 0,
            language: values.language,
          };

          await createShippingMethod(command);
        }

        dispatch(editorSlice.actions.removeEditor(props.id));
      },
    });

  //#region Effects

  React.useEffect(() => {
    // Initialize the form based on the language and the passed payment method to update
    formik.resetForm({
      values: {
        name: getTranslatedText(
          props.shippingMethod?.name,
          formik.values.language
        ),
        price: props.shippingMethod?.price,
        language: formik.values.language,
      },
    });
  }, [props.shippingMethod, formik.values.language]);
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

  const loading = props.shippingMethod ? updateLoading : createLoading;

  return (
    <Modal theme={theme} handleClose={handleCloseModal} open>
      <form
        onSubmit={handleSubmit}
        className={styles.createShippingMethoddModalContainer}
        data-cy="shippingMethodForm"
      >
        <div className={styles.createShippingMethodHeader}>
          <h2 className={styles.createShippingMethodTitle}>
            {props.shippingMethod
              ? getTranslatedText(staticText?.updateShippingMethod)
              : getTranslatedText(staticText?.createShippingMethod)}
          </h2>

          <ImCross onClick={handleCloseModal} className={styles.closeButton} />
        </div>

        <FormikInput
          theme={theme}
          Icon={MdTitle}
          formik={formik}
          name="name"
          inputProps={{
            placeholder: getTranslatedText(staticText?.namePlaceholder),
          }}
          label={getTranslatedText(staticText?.namePlaceholder)}
          inputDataCy="shippingMethodNameInput"
        />
        <FormikInput
          theme={theme}
          Icon={MdTitle}
          formik={formik}
          name="price"
          inputProps={{
            placeholder: getTranslatedText(staticText?.pricePlaceholder),
            type: "number",
          }}
          label={getTranslatedText(staticText?.pricePlaceholder)}
          inputDataCy="shippingMethodNameInput"
        />

        {!loading && (
          <Button
            theme={theme}
            disabled={loading}
            type="submit"
            style={{}}
            className={styles.button}
            buttonDataCy="submitFieldButton"
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

export default React.memo(ShippingMethodEditor);
