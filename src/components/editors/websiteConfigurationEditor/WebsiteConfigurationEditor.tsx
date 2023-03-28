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
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import IFile from "../../../globalTypes/IFile";
import FilesInput from "../../filesInput";
import uploadFile from "../../../utils/uploadFile";
import { TypeOfFiles } from "../../existingFiles/ExistingFiles";

interface IConfigurationForm extends Theme {
  title?: string;
  email?: string;
  phoneNumber?: string;
  tabTitle?: string;
  mainLanguages?: string[];
  withChat?: boolean;
  withRegistration?: boolean;
  tabIcon?: IFile;
  tabIconAsYetToDownloadFile?: File;
}

interface IWebsiteConfigurationEditor {
  setConfigurationModalOpen: (open: boolean) => void;
  configurationModelOpen: boolean;
}

const WebsiteConfigurationEditor: React.FunctionComponent<IWebsiteConfigurationEditor> =
  (props: IWebsiteConfigurationEditor) => {
    const websiteConfiguration: IWebsiteConfiguration = useAppSelector(
      (state) => state.websiteConfiguration
    );
    const theme: Theme = useAppSelector(
      (state) => state.websiteConfiguration.theme
    );
    const staticText = useAppSelector(
      (state) => state.websiteConfiguration.staticText?.websiteConfiguration
    );

    const [uploadingTabIconLoading, setUploadingTabIconLoading] =
      React.useState<boolean>(false);

    const styles = useStyles({ theme });
    const handleRevertThemeToDefault = () => {
      Object.getOwnPropertyNames(theme).forEach((property) => {
        formik.setFieldValue(property, defaultTheme[property]);
      });
    };
    const { updateWebsiteConfiguration, loading } =
      useUpdateWebsiteConfiguration();
    const getTranslatedText = useGetTranslatedText();

    const getInitialValuesBasedOnWebsiteConfiguration = () => {
      return {
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
        transparentBackground: websiteConfiguration.theme.transparentBackground,
        subContentBackgroundColor:
          websiteConfiguration.theme.subContentBackgroundColor,
        boxShadow: websiteConfiguration.theme.boxShadow,
        tabIcon: websiteConfiguration.tabIcon,
        tabIconAsYetToDownloadFile: undefined,
      };
    };
    const formik: FormikProps<IConfigurationForm> =
      useFormik<IConfigurationForm>({
        initialValues: getInitialValuesBasedOnWebsiteConfiguration(),
        validationSchema: Yup.object().shape({
          title: Yup.string().required(
            getTranslatedText(staticText?.titleIsRequired)
          ),
          email: Yup.string().required(
            getTranslatedText(staticText?.emailIsRequired)
          ),
          phoneNumber: Yup.string().required(
            getTranslatedText(staticText?.phoneNumberIsRequired)
          ),
          tabTitle: Yup.string().required(
            getTranslatedText(staticText?.tabTitleIsRequired)
          ),
          withChat: Yup.boolean(),
          withRegistration: Yup.boolean(),
        }),
        onSubmit: async (values: IConfigurationForm) => {
          let tabIcon: IFile | undefined = undefined;
          if (formik.values.tabIcon) {
            tabIcon = formik.values.tabIcon;
          }
          if (formik.values.tabIconAsYetToDownloadFile) {
            setUploadingTabIconLoading(true);
            tabIcon = await uploadFile(
              formik.values.tabIconAsYetToDownloadFile
            );
            setUploadingTabIconLoading(false);
          }

          const command: WebsiteConfigurationUpdateCommand = {
            email: values.email || "",
            phoneNumber: values.phoneNumber || "",
            title: values.title || "",
            tabTitle: values.tabTitle || "",
            mainLanguages: values.mainLanguages || ["en", "fr"],
            withChat: values.withChat || false,
            withRegistration: values.withRegistration || false,
            tabIcon,

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

          formik.setFieldValue("tabIconAsYetToDownloadFile", null);
        },
      });

    React.useEffect(() => {
      formik.resetForm({
        values: getInitialValuesBasedOnWebsiteConfiguration(),
      });
    }, [websiteConfiguration]);

    const actualLoading = loading || uploadingTabIconLoading;
    return (
      <Modal
        handleClose={() => props.setConfigurationModalOpen(false)}
        open={props.configurationModelOpen}
      >
        <form
          onSubmit={formik.handleSubmit}
          className={styles.websiteConfigurationModalContainer}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>
              {getTranslatedText(staticText?.websiteConfiguration)}
            </h2>

            <ImCross
              onClick={() => props.setConfigurationModalOpen(false)}
              className={styles.closeButton}
            />
          </div>

          <h2 className={styles.themeTitle}>
            {getTranslatedText(staticText?.globalConfiguration)}:{" "}
          </h2>

          <Input
            Icon={MdTitle}
            name={"title"}
            label={getTranslatedText(staticText?.title)}
            formik={formik}
            inputProps={{
              placeholder: getTranslatedText(staticText?.title),
              disabled: actualLoading,
            }}
          />

          <Input
            Icon={MdTitle}
            name={"email"}
            label={getTranslatedText(staticText?.email)}
            formik={formik}
            inputProps={{
              placeholder: getTranslatedText(staticText?.email),
              disabled: actualLoading,
            }}
          />

          <Input
            Icon={MdTitle}
            name={"phoneNumber"}
            label={getTranslatedText(staticText?.phoneNumber)}
            formik={formik}
            inputProps={{
              placeholder: getTranslatedText(staticText?.phoneNumber),
              disabled: actualLoading,
            }}
          />

          <Input
            Icon={MdTitle}
            name={"tabTitle"}
            label={getTranslatedText(staticText?.tabTitle)}
            formik={formik}
            inputProps={{
              placeholder: getTranslatedText(staticText?.tabTitle),
              disabled: actualLoading,
            }}
          />

          <InputLanguages name={"mainLanguages"} formik={formik} />

          <Checkbox
            name="withChat"
            formik={formik}
            label={getTranslatedText(staticText?.withChat)}
            inputProps={{
              disabled: actualLoading,
            }}
          />

          <Checkbox
            name="withRegistration"
            formik={formik}
            label={getTranslatedText(staticText?.withRegistration)}
            inputProps={{
              disabled: actualLoading,
            }}
          />

          <FilesInput
            disabled={actualLoading}
            files={
              formik.values.tabIconAsYetToDownloadFile
                ? [formik.values.tabIconAsYetToDownloadFile]
                : []
            }
            setFiles={(files: File[]) => {
              formik.setFieldValue(
                "tabIconAsYetToDownloadFile",
                files.length > 0 ? files[0] : null
              );
              formik.setFieldValue("tabIcon", null);
            }}
            selectedExistingFiles={
              formik.values.tabIcon ? [formik.values.tabIcon] : []
            }
            setSelectedExistingFiles={(existingFiles: IFile[]) => {
              formik.setFieldValue(
                "tabIcon",
                existingFiles.length > 0
                  ? existingFiles[existingFiles.length - 1]
                  : null
              );
              formik.setFieldValue("tabIconAsYetToDownloadFile", null);
            }}
            allowMany={false}
            label={getTranslatedText(staticText?.tabIcon)}
            typeOfFiles={TypeOfFiles.UnownedFiles}
          />

          {/* Theme inputs */}

          <h2 className={styles.themeTitle}>
            {getTranslatedText(staticText?.theme)}:
          </h2>

          <ColorInput
            name="darkTextColor"
            label={getTranslatedText(staticText?.darkTextColor)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(staticText?.darkTextColor),
            }}
          />

          <ColorInput
            name="lightTextColor"
            label={getTranslatedText(staticText?.lightTextColor)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(staticText?.lightTextColor),
            }}
          />

          <ColorInput
            name="primary"
            label={getTranslatedText(staticText?.primary)}
            formik={formik}
            inputProps={{
              placeholder: getTranslatedText(staticText?.primary),
              disabled: actualLoading,
            }}
          />

          <ColorInput
            name="darkerPrimary"
            label={getTranslatedText(staticText?.darkerPrimary)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(staticText?.darkerPrimary),
            }}
          />

          <ColorInput
            name="lighterPrimary"
            label={getTranslatedText(staticText?.lighterPrimary)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(staticText?.lighterPrimary),
            }}
          />

          <ColorInput
            name="secondary"
            label={getTranslatedText(staticText?.secondary)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(staticText?.secondary),
            }}
          />

          <ColorInput
            name="errorColor"
            label={getTranslatedText(staticText?.errorColor)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(staticText?.errorColor),
            }}
          />

          <ColorInput
            name="borderColor"
            label={getTranslatedText(staticText?.borderColor)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(staticText?.borderColor),
            }}
          />

          <ColorInput
            name="backgroundColor"
            label={getTranslatedText(staticText?.backgroundColor)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(staticText?.backgroundColor),
            }}
          />

          <ColorInput
            name="contentBackgroundColor"
            label={getTranslatedText(staticText?.contentBackgroundColor)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(
                staticText?.contentBackgroundColor
              ),
            }}
          />

          <ColorInput
            name="boxColor"
            label={getTranslatedText(staticText?.boxColor)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(staticText?.boxColor),
            }}
          />

          <ColorInput
            name="transparentBackground"
            label={getTranslatedText(staticText?.transparentBackground)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(staticText?.transparentBackground),
            }}
          />

          <ColorInput
            name="subContentBackgroundColor"
            label={getTranslatedText(staticText?.subContentBackgroundColor)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(
                staticText?.subContentBackgroundColor
              ),
            }}
          />

          <Input
            name="boxShadow"
            label={getTranslatedText(staticText?.boxShadow)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(staticText?.boxShadow),
            }}
            Icon={SiShadow}
          />

          <Input
            name="formMaxWidth"
            label={getTranslatedText(staticText?.formMaxWidth)}
            formik={formik}
            inputProps={{
              disabled: actualLoading,
              placeholder: getTranslatedText(staticText?.formMaxWidth),
            }}
            Icon={AiOutlineColumnWidth}
          />

          <Button
            style={{
              fontSize: 15,
              marginBottom: 10,
            }}
            type="button"
            onClick={handleRevertThemeToDefault}
            disabled={actualLoading}
          >
            {getTranslatedText(staticText?.revertThemeConfigurationToDefault)}
          </Button>

          {!actualLoading && (
            <Button
              disabled={actualLoading}
              type="submit"
              style={{}}
              className={styles.button}
            >
              {getTranslatedText(staticText?.update)}
            </Button>
          )}

          {actualLoading && (
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

export default React.memo(WebsiteConfigurationEditor);
