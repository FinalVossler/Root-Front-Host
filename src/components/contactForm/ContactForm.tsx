import { FormikProps, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { BsFillPersonFill } from "react-icons/bs";

import { Theme } from "../../config/theme";
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

interface IContactFormProps extends React.PropsWithChildren {
  post?: IPost;
}

const ContactForm: React.FunctionComponent<IContactFormProps> = (
  props: IContactFormProps
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
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
      firstName: Yup.string().required("Firstname is required"),
      lastName: Yup.string().required("Lastname is required"),
      address: Yup.string().required("Email Address is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={styles.contactFormContainer}
      {...props}
    >
      <h2 className={styles.title}>
        {getTranslatedText(props.post?.title) || "Get in touch"}
      </h2>
      <p className={styles.description}>
        {extractContentFromHtml(getTranslatedText(props.post?.content || ""))}
      </p>
      <Input
        Icon={BsFillPersonFill}
        label="Firstname: "
        formik={formik}
        inputProps={{ placeholder: "Firstname" }}
        name="firstName"
      />

      <Input
        Icon={BsFillPersonFill}
        label="Lastname: "
        formik={formik}
        inputProps={{ placeholder: "Lastname" }}
        name="lastName"
      />

      <Input
        Icon={BsFillPersonFill}
        label="Email: "
        formik={formik}
        inputProps={{ placeholder: "Email" }}
        name="email"
      />

      <Input
        Icon={BsFillPersonFill}
        label="phone: "
        formik={formik}
        inputProps={{ placeholder: "Phone" }}
        name="phone"
      />

      <Input
        Icon={BsFillPersonFill}
        label="Address: "
        formik={formik}
        inputProps={{ placeholder: "Address" }}
        name="address"
      />

      <Input
        Icon={BsFillPersonFill}
        label="Message: "
        formik={formik}
        inputProps={{ placeholder: "Message" }}
        name="message"
      />

      <br />

      <Button disabled={loading}>Submit</Button>
    </form>
  );
};

export default ContactForm;
