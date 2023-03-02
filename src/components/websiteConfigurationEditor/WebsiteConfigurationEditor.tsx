import React from "react";
import { AxiosResponse } from "axios";
import { FormikProps, useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ReactLoading from "react-loading";
import { AiOutlineBgColors } from "react-icons/ai";

import { Theme } from "../../config/theme";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import useStyles from "./websiteConfigurationEditor.styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import WebsiteConfigurationUpdateCommand from "../../globalTypes/commands/WebsiteConfigurationUpdateCommand";
import Modal from "../modal";
import Input from "../input";
import { MdTitle } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Button from "../button";
import {
  IWebsiteConfiguration,
  websiteConfigurationSlice,
} from "../../store/slices/websiteConfigurationSlice";
import Checkbox from "../checkbox";
import InputLanguages from "../inputLanguages";

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

    const [loading, setLoading] = React.useState<boolean>(false);
    const [configurationModalOpen, setConfigurationModalOpen] =
      React.useState<boolean>(false);

    const theme: Theme = useAppSelector(
      (state) => state.websiteConfiguration.theme
    );
    const styles = useStyles({ theme });
    const axios = useAuthorizedAxios();
    const dispatch = useAppDispatch();

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
        onSubmit: (values: IConfigurationForm) => {
          setLoading(true);

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

          axios
            .request<AxiosResponse<WebsiteConfigurationUpdateCommand>>({
              url:
                process.env.REACT_APP_BACKEND_URL +
                "/websiteConfigurations/update",
              method: "POST",
              data: command,
            })
            .then((res) => {
              dispatch(
                websiteConfigurationSlice.actions.setConfiguration(
                  res.data.data
                )
              );
              toast.success("Welcome back :)");
            })
            .finally(() => setLoading(false));
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

            <h2 className={styles.themeTitle}>Theme: </h2>

            <Input
              name="darkTextColor"
              label="darkTextColor"
              formik={formik}
              inputProps={{ placeholder: "darkTextColor" }}
              Icon={AiOutlineBgColors}
            />

            <Input
              name="lightTextColor"
              label="lightTextColor"
              formik={formik}
              inputProps={{ placeholder: "lightTextColor" }}
              Icon={AiOutlineBgColors}
            />

            <Input
              name="primary"
              label="primary"
              formik={formik}
              Icon={AiOutlineBgColors}
              inputProps={{ placeholder: "primary" }}
            />

            <Input
              name="darkerPrimary"
              label="darkerPrimary"
              formik={formik}
              Icon={AiOutlineBgColors}
              inputProps={{ placeholder: "darkerPrimary" }}
            />

            <Input
              name="lighterPrimary"
              label="lighterPrimary"
              formik={formik}
              Icon={AiOutlineBgColors}
              inputProps={{ placeholder: "lighterPrimary" }}
            />

            <Input
              name="secondary"
              label="secondary"
              formik={formik}
              Icon={AiOutlineBgColors}
              inputProps={{ placeholder: "secondary" }}
            />

            <Input
              name="errorColor"
              label="errorColor"
              formik={formik}
              inputProps={{ placeholder: "errorColor" }}
              Icon={AiOutlineBgColors}
            />

            <Input
              name="borderColor"
              label="borderColor"
              formik={formik}
              inputProps={{ placeholder: "borderColor" }}
              Icon={AiOutlineBgColors}
            />

            <Input
              name="formMaxWidth"
              label="formMaxWidth"
              formik={formik}
              Icon={AiOutlineBgColors}
              inputProps={{ placeholder: "formMaxWidth" }}
            />

            <Input
              name="backgroundColor"
              label="backgroundColor"
              formik={formik}
              inputProps={{ placeholder: "backgroundColor" }}
              Icon={AiOutlineBgColors}
            />

            <Input
              name="contentBackgroundColor"
              label="contentBackgroundColor"
              formik={formik}
              inputProps={{ placeholder: "contentBackgroundColor" }}
              Icon={AiOutlineBgColors}
            />

            <Input
              name="boxColor"
              label="boxColor"
              formik={formik}
              inputProps={{ placeholder: "boxColor" }}
              Icon={AiOutlineBgColors}
            />

            <Input
              name="transparentBackground"
              label="transparentBackground"
              formik={formik}
              inputProps={{ placeholder: "transparentBackground" }}
              Icon={AiOutlineBgColors}
            />

            <Input
              name="subContentBackgroundColor"
              label="subContentBackgroundColor"
              formik={formik}
              inputProps={{ placeholder: "subContentBackgroundColor" }}
              Icon={AiOutlineBgColors}
            />

            <Input
              name="boxShadow"
              label="boxShadow"
              formik={formik}
              Icon={AiOutlineBgColors}
              inputProps={{ placeholder: "boxShadow" }}
            />

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
