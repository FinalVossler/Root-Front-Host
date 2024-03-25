import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdTitle } from "react-icons/md";
import ReactLoading from "react-loading";
import {
  IPaymentMethodCreateCommand,
  IPaymentMethodReadDto,
  IPaymentMethodUpdateCommand,
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

import useStyles from "./paymentMethodEditor.styles";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import useCreatePaymentMethod from "../../../../hooks/apiHooks/useCreatePaymentMethod";
import useUpdatePaymentMethod from "../../../../hooks/apiHooks/useUpdatePaymentMethod";

export interface IPaymentMethodFormFormik {
  name: string;
  slug: string;
  language: string;
}

export interface IPaymentMethodEditorProps {
  paymentMethod?: IPaymentMethodReadDto;
  id: string;
}

const PaymentMethodEditor: React.FunctionComponent<
  IPaymentMethodEditorProps
> = (props: IPaymentMethodEditorProps) => {
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.paymentMethods
  );

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const { createPaymentMethod, loading: createLoading } =
    useCreatePaymentMethod();
  const { updatePaymentMethod, loading: updateLoading } =
    useUpdatePaymentMethod();
  const formik: FormikProps<IPaymentMethodFormFormik> =
    useFormik<IPaymentMethodFormFormik>({
      initialValues: {
        name: "",
        slug: "",
        language,
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().required(getTranslatedText(staticText?.required)),
        slug: Yup.string().required(getTranslatedText(staticText?.required)),
      }),
      onSubmit: async (values: IPaymentMethodFormFormik) => {
        if (props.paymentMethod) {
          const command: IPaymentMethodUpdateCommand = {
            _id: props.paymentMethod._id,
            name: values.name,
            slug: values.slug,
            language: values.language,
          };

          await updatePaymentMethod(command);
        } else {
          const command: IPaymentMethodCreateCommand = {
            name: values.name,
            slug: values.slug,
            language: values.language,
          };

          await createPaymentMethod(command);
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
          props.paymentMethod?.name,
          formik.values.language
        ),
        slug: props.paymentMethod?.slug || "",
        language: formik.values.language,
      },
    });
  }, [props.paymentMethod, formik.values.language]);
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

  const loading = props.paymentMethod ? updateLoading : createLoading;
  return (
    <Modal theme={theme} handleClose={handleCloseModal} open>
      <form
        onSubmit={handleSubmit}
        className={styles.createPaymentMethoddModalContainer}
        data-cy="paymentMethodForm"
      >
        <div className={styles.createPaymentMethodHeader}>
          <h2 className={styles.createPaymentMethodTitle}>
            {props.paymentMethod
              ? getTranslatedText(staticText?.updatePaymentMethod)
              : getTranslatedText(staticText?.createPaymentMethod)}
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
          inputDataCy="paymentMethodNameInput"
        />
        <FormikInput
          theme={theme}
          Icon={MdTitle}
          formik={formik}
          name="slug"
          inputProps={{
            placeholder: getTranslatedText(staticText?.slugPlaceholder),
          }}
          inputDataCy="paymentMethodNameInput"
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

export default React.memo(PaymentMethodEditor);
