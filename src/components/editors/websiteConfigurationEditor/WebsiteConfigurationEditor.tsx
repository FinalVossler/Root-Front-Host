import React from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import ReactLoading from "react-loading";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { SiShadow } from "react-icons/si";

import defaultTheme, { Theme } from "../../../config/theme";
import useStyles from "./websiteConfigurationEditor.styles";
import { useAppSelector } from "../../../store/hooks";
import Modal from "../../modal";
import Input from "../../input";
import { MdTitle } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Button from "../../button";
import { IWebsiteConfiguration } from "../../../store/slices/websiteConfigurationSlice";
import Checkbox from "../../checkbox";
import InputLanguages from "../../inputLanguages";
import ColorInput from "../../colorInput";
import useUpdateWebsiteConfiguration, {
  WebsiteConfigurationUpdateCommand,
} from "../../../hooks/apiHooks/useUpdateWebsiteConfiguration";

interface IConfigurationForm extends Theme {
  title?: string;
  email?: string;
  phoneNumber?: string;
  tabTitle?: string;
  mainLanguages?: string[];
  withChat?: boolean;
  withRegistration?: boolean;
}

interface IWebsiteConfigurationEditor {}

const WebsiteConfigurationEditor: React.FunctionComponent<IWebsiteConfigurationEditor> =
  (props: IWebsiteConfigurationEditor) => {
    const websiteConfiguration: IWebsiteConfiguration = useAppSelector(
      (state) => state.websiteConfiguration
    );

    const [configurationModalOpen, setConfigurationModalOpen] =
      React.useState<boolean>(false);

    const theme: Theme = useAppSelector(
      (state) => state.websiteConfiguration.theme
    );
    const styles = useStyles({ theme });
    const handleRevertThemeToDefault = () => {
      Object.getOwnPropertyNames(theme).forEach((property) => {
        formik.setFieldValue(property, defaultTheme[property]);
      });
    };
    const { updateWebsiteConfiguration, loading } =
      useUpdateWebsiteConfiguration();

    const formik: FormikProps<IConfigurationForm> =
      useFormik<IConfigurationForm>({
        initialValues: {
          title: websiteConfiguration.title,
          email: websiteConfiguration.email,
          phoneNumber: websiteConfiguration.phoneNumber,
          tabTitle: websiteConfiguration.tabTitle,
          mainLanguages: websiteConfiguration.mainLanguages,
          withChat: websiteConfiguration.withChat,
          withRegistration: websiteConfiguration.withRegistration,

          darkTextColor: websiteConfiguration.theme.darkTextColor,
          lightTextColor: websiteConfiguration.theme.lightTextColor,
          primary: websiteConfiguration.theme.primary,
          darkerPrimary: websiteConfiguration.theme.darkerPrimary,
          lighterPrimary: websiteConfiguration.theme.lighterPrimary,
          secondary: websiteConfiguration.theme.secondary,
          errorColor: websiteConfiguration.theme.errorColor,
          borderColor: websiteConfiguration.theme.borderColor,
          formMaxWidth: websiteConfiguration.theme.formMaxWidth,
          backgroundColor: websiteConfiguration.theme.backgroundColor,
          contentBackgroundColor:
            websiteConfiguration.theme.contentBackgroundColor,
          boxColor: websiteConfiguration.theme.boxColor,
          transparentBackground:
            websiteConfiguration.theme.transparentBackground,
          subContentBackgroundColor:
            websiteConfiguration.theme.subContentBackgroundColor,
          boxShadow: websiteConfiguration.theme.boxShadow,
        },
        validationSchema: Yup.object().shape({
          title: Yup.string().required("Title is required"),
          email: Yup.string().required("Email is required"),
          phoneNumber: Yup.string().required("Phone number is required"),
          tabTitle: Yup.string().required("Tab Title is required"),
          withChat: Yup.boolean(),
          withRegistration: Yup.boolean(),
        }),
        onSubmit: async (values: IConfigurationForm) => {
          const command: WebsiteConfigurationUpdateCommand = {
            email: values.email || "",
            phoneNumber: values.phoneNumber || "",
            title: values.title || "",
            tabTitle: values.tabTitle || "",
            mainLanguages: values.mainLanguages || ["en", "fr"],
            withChat: values.withChat || false,
            withRegistration: values.withRegistration || false,

            theme: {
              darkTextColor: values.darkTextColor,
              lightTextColor: values.lightTextColor,
              primary: values.primary,
              darkerPrimary: values.darkerPrimary,
              lighterPrimary: values.lighterPrimary,
              secondary: values.secondary,
              errorColor: values.errorColor,
              borderColor: values.borderColor,
              formMaxWidth: values.formMaxWidth,
              backgroundColor: values.backgroundColor,
              contentBackgroundColor: values.contentBackgroundColor,
              boxColor: values.boxColor,
              transparentBackground: values.transparentBackground,
              subContentBackgroundColor: values.subContentBackgroundColor,
              boxShadow: values.boxShadow,
            },
          };

          await updateWebsiteConfiguration(command);
        },
      });

    return (
      <div className={styles.websiteConfigurationEditorContainer}>
        <Button onClick={() => setConfigurationModalOpen(true)}>
          Configuration
        </Button>

        <Modal
          handleClose={() => setConfigurationModalOpen(false)}
          open={configurationModalOpen}
        >
          <form
            onSubmit={formik.handleSubmit}
            className={styles.websiteConfigurationModalContainer}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>Website Configuration</h2>

              <ImCross
                onClick={() => setConfigurationModalOpen(false)}
                className={styles.closeButton}
              />
            </div>

            <h2 className={styles.themeTitle}>Global Configuration: </h2>

            <Input
              Icon={MdTitle}
              name={"title"}
              label="Title"
              formik={formik}
              inputProps={{
                placeholder: "title",
              }}
            />

            <Input
              Icon={MdTitle}
              name={"email"}
              label="Contact Email"
              formik={formik}
              inputProps={{
                placeholder: "email",
              }}
            />

            <Input
              Icon={MdTitle}
              name={"phoneNumber"}
              label="Phone number"
              formik={formik}
              inputProps={{
                placeholder: "phone number",
              }}
            />

            <Input
              Icon={MdTitle}
              name={"tabTitle"}
              label="Tab Title"
              formik={formik}
              inputProps={{
                placeholder: "Tab Title",
              }}
            />

            <InputLanguages name={"mainLanguages"} formik={formik} />

            <Checkbox name="withChat" formik={formik} label="With Chat" />

            <Checkbox
              name="withRegistration"
              formik={formik}
              label="With Registration"
            />

            {/* Theme inputs */}

            <h2 className={styles.themeTitle}>Theme:</h2>

            <ColorInput
              name="darkTextColor"
              label="darkTextColor"
              formik={formik}
              inputProps={{ placeholder: "darkTextColor" }}
            />

            <ColorInput
              name="lightTextColor"
              label="lightTextColor"
              formik={formik}
              inputProps={{ placeholder: "lightTextColor" }}
            />

            <ColorInput
              name="primary"
              label="primary"
              formik={formik}
              inputProps={{ placeholder: "primary" }}
            />

            <ColorInput
              name="darkerPrimary"
              label="darkerPrimary"
              formik={formik}
              inputProps={{ placeholder: "darkerPrimary" }}
            />

            <ColorInput
              name="lighterPrimary"
              label="lighterPrimary"
              formik={formik}
              inputProps={{ placeholder: "lighterPrimary" }}
            />

            <ColorInput
              name="secondary"
              label="secondary"
              formik={formik}
              inputProps={{ placeholder: "secondary" }}
            />

            <ColorInput
              name="errorColor"
              label="errorColor"
              formik={formik}
              inputProps={{ placeholder: "errorColor" }}
            />

            <ColorInput
              name="borderColor"
              label="borderColor"
              formik={formik}
              inputProps={{ placeholder: "borderColor" }}
            />

            <ColorInput
              name="backgroundColor"
              label="backgroundColor"
              formik={formik}
              inputProps={{ placeholder: "backgroundColor" }}
            />

            <ColorInput
              name="contentBackgroundColor"
              label="contentBackgroundColor"
              formik={formik}
              inputProps={{ placeholder: "contentBackgroundColor" }}
            />

            <ColorInput
              name="boxColor"
              label="boxColor"
              formik={formik}
              inputProps={{ placeholder: "boxColor" }}
            />

            <ColorInput
              name="transparentBackground"
              label="transparentBackground"
              formik={formik}
              inputProps={{ placeholder: "transparentBackground" }}
            />

            <ColorInput
              name="subContentBackgroundColor"
              label="subContentBackgroundColor"
              formik={formik}
              inputProps={{ placeholder: "subContentBackgroundColor" }}
            />

            <Input
              name="boxShadow"
              label="boxShadow"
              formik={formik}
              inputProps={{ placeholder: "boxShadow" }}
              Icon={SiShadow}
            />

            <Input
              name="formMaxWidth"
              label="formMaxWidth"
              formik={formik}
              inputProps={{ placeholder: "formMaxWidth" }}
              Icon={AiOutlineColumnWidth}
            />

            <Button
              className={styles.defaultButton}
              type="button"
              onClick={handleRevertThemeToDefault}
            >
              Revert Theme configuration to default
            </Button>

            {!loading && (
              <Button
                disabled={loading}
                type="submit"
                style={{}}
                className={styles.button}
              >
                Update
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
      </div>
    );
  };

export default React.memo(WebsiteConfigurationEditor);
