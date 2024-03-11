import { FormikProps, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { BsFillPersonFill } from "react-icons/bs";

import { useAppSelector } from "../../../../store/hooks";

import useStyles from "./contactForm.styles";
import Button from "../../../fundamentalComponents/button";
import { IPost } from "../../../../store/slices/postSlice";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import extractContentFromHtml from "../../../../utils/extractContentFromHtml";
import useSendMail from "../../../../hooks/apiHooks/useSendMail";
import { IEmailSendCommand, ITheme } from "roottypes";
import FormikInput from "../../../fundamentalComponents/formikInputs/formikInput";

interface IContactFormFormik {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

interface IContactFormProps {
  post?: IPost;
}

const ContactForm: React.FunctionComponent<
  React.PropsWithChildren<IContactFormProps>
> = (props: React.PropsWithChildren<IContactFormProps>) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.contact
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { sendMail, loading } = useSendMail();

  const formik: FormikProps<IContactFormFormik> = useFormik<IContactFormFormik>(
    {
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      },
      onSubmit: async (values: IContactFormFormik) => {
        const command: IEmailSendCommand = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          address: values.address,
          message: values.message,
        };

        await sendMail(command);
      },
      validationSchema: Yup.object().shape({
        firstName: Yup.string().required(
          getTranslatedText(staticText?.firstNameRequired)
        ),
        lastName: Yup.string().required(
          getTranslatedText(staticText?.lastNameRequired)
        ),
        address: Yup.string().required(
          getTranslatedText(staticText?.addressRequired)
        ),
        email: Yup.string()
          .email(getTranslatedText(staticText?.mustBeValidEmail))
          .required(getTranslatedText(staticText?.emailRequired)),
        message: Yup.string().required(
          getTranslatedText(staticText?.messageRequired)
        ),
      }),
    }
  );

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={styles.contactFormContainer}
      {...props}
    >
      <h2 className={styles.title}>
        {getTranslatedText(props.post?.title) ||
          getTranslatedText(staticText?.getInTouch)}
      </h2>
      <p className={styles.description}>
        {extractContentFromHtml(getTranslatedText(props.post?.content || ""))}
      </p>
      <FormikInput
        theme={theme}
        Icon={BsFillPersonFill}
        label={getTranslatedText(staticText?.firstName)}
        formik={formik}
        inputProps={{ placeholder: getTranslatedText(staticText?.firstName) }}
        name="firstName"
      />

      <FormikInput
        theme={theme}
        Icon={BsFillPersonFill}
        label={getTranslatedText(staticText?.lastName)}
        formik={formik}
        inputProps={{ placeholder: getTranslatedText(staticText?.lastName) }}
        name="lastName"
      />

      <FormikInput
        theme={theme}
        Icon={BsFillPersonFill}
        label={getTranslatedText(staticText?.email)}
        formik={formik}
        inputProps={{ placeholder: getTranslatedText(staticText?.email) }}
        name="email"
      />

      <FormikInput
        theme={theme}
        Icon={BsFillPersonFill}
        label={getTranslatedText(staticText?.phone)}
        formik={formik}
        inputProps={{ placeholder: getTranslatedText(staticText?.phone) }}
        name="phone"
      />

      <FormikInput
        theme={theme}
        Icon={BsFillPersonFill}
        label={getTranslatedText(staticText?.address)}
        formik={formik}
        inputProps={{ placeholder: getTranslatedText(staticText?.address) }}
        name="address"
      />

      <FormikInput
        theme={theme}
        Icon={BsFillPersonFill}
        label={getTranslatedText(staticText?.message)}
        formik={formik}
        inputProps={{ placeholder: getTranslatedText(staticText?.message) }}
        name="message"
      />

      <br />

      <Button theme={theme} disabled={loading}>
        {getTranslatedText(staticText?.submit)}
      </Button>
    </form>
  );
};

export default ContactForm;
