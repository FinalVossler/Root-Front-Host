import { FormikProps, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { BsFillPersonFill } from "react-icons/bs";

import { ITheme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";
import Input from "../input";

import useStyles from "./contactForm.styles";
import Button from "../button";
import { IPost } from "../../store/slices/postSlice";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import extractContentFromHtml from "../../utils/extractContentFromHtml";
import useSendMail, {
  EmailSendCommand,
} from "../../hooks/apiHooks/useSendMail";

interface IContactForm {
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

  const formik: FormikProps<IContactForm> = useFormik<IContactForm>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    },
    onSubmit: async (values: IContactForm) => {
      const command: EmailSendCommand = {
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
  });

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
      <Input
        Icon={BsFillPersonFill}
        label={getTranslatedText(staticText?.firstName)}
        formik={formik}
        inputProps={{ placeholder: getTranslatedText(staticText?.firstName) }}
        name="firstName"
      />

      <Input
        Icon={BsFillPersonFill}
        label={getTranslatedText(staticText?.lastName)}
        formik={formik}
        inputProps={{ placeholder: getTranslatedText(staticText?.lastName) }}
        name="lastName"
      />

      <Input
        Icon={BsFillPersonFill}
        label={getTranslatedText(staticText?.email)}
        formik={formik}
        inputProps={{ placeholder: getTranslatedText(staticText?.email) }}
        name="email"
      />

      <Input
        Icon={BsFillPersonFill}
        label={getTranslatedText(staticText?.phone)}
        formik={formik}
        inputProps={{ placeholder: getTranslatedText(staticText?.phone) }}
        name="phone"
      />

      <Input
        Icon={BsFillPersonFill}
        label={getTranslatedText(staticText?.address)}
        formik={formik}
        inputProps={{ placeholder: getTranslatedText(staticText?.address) }}
        name="address"
      />

      <Input
        Icon={BsFillPersonFill}
        label={getTranslatedText(staticText?.message)}
        formik={formik}
        inputProps={{ placeholder: getTranslatedText(staticText?.message) }}
        name="message"
      />

      <br />

      <Button disabled={loading}>
        {getTranslatedText(staticText?.submit)}
      </Button>
    </form>
  );
};

export default ContactForm;
