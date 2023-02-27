import React from "react";
import { AxiosResponse } from "axios";
import { FormikProps, useFormik } from "formik";
import { useTheme } from "react-jss";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ReactLoading from "react-loading";

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

interface IConfigurationForm {
  title?: string;
  email?: string;
  phoneNumber?: string;
  tabTitle?: string;
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

    const theme: Theme = useTheme();
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
          withChat: websiteConfiguration.withChat,
          withRegistration: websiteConfiguration.withRegistration,
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
            withChat: values.withChat || false,
            withRegistration: values.withRegistration || false,
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

            <Input
              Icon={MdTitle}
              name={"title"}
              formik={formik}
              inputProps={{
                placeholder: "title",
              }}
            />

            <Input
              Icon={MdTitle}
              name={"email"}
              formik={formik}
              inputProps={{
                placeholder: "email",
              }}
            />

            <Input
              Icon={MdTitle}
              name={"phoneNumber"}
              formik={formik}
              inputProps={{
                placeholder: "phone number",
              }}
            />

            <Input
              Icon={MdTitle}
              name={"tabTitle"}
              formik={formik}
              inputProps={{
                placeholder: "Tab Title",
              }}
            />

            <Checkbox name="withChat" formik={formik} label="With Chat" />
            <Checkbox
              name="withRegistration"
              formik={formik}
              label="With Registration"
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
