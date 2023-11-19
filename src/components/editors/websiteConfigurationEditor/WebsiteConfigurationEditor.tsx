import React from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import ReactLoading from "react-loading";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { SiShadow } from "react-icons/si";

import defaultTheme, { Theme } from "../../../config/theme";
import useStyles from "./websiteConfigurationEditor.styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Modal from "../../modal";
import Input from "../../input";
import { MdTitle } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Button from "../../button";
import {
  websiteConfigurationSlice,
  IWebsiteConfiguration,
} from "../../../store/slices/websiteConfigurationSlice";
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
import InputSelect from "../../inputSelect";
import getLanguages from "../../../utils/getLanguages";
import Textarea from "../../textarea/Textarea";
import { lang } from "moment";

interface IWebsiteConfigurationForm extends Theme {
  language?: string;
  title?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  tabTitle?: string;
  mainLanguages?: string[];
  withChat?: boolean;
  withRegistration?: boolean;
  withTaskManagement?: boolean;
  tabIcon?: IFile;
  logo1?: IFile;
  logo2?: IFile;
  tabIconAsYetToDownloadFile?: File;
  logo1AsYetToDownloadFile?: File;
  logo2AsYetToDownloadFile?: File;
}

interface IWebsiteConfigurationEditor {}

const WebsiteConfigurationEditor: React.FunctionComponent<
  IWebsiteConfigurationEditor
> = (props: IWebsiteConfigurationEditor) => {
  //#region store
  const websiteConfiguration: IWebsiteConfiguration = useAppSelector(
    (state) => state.websiteConfiguration
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.websiteConfiguration
  );
  const configurationModelOpen: boolean = useAppSelector(
    (state) => state.websiteConfiguration.ui.websiteConfigurationEditorOpen
  );
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  //#endregion store

  //#region local state
  const [uploadingFilesLoading, setUploadingFilesLoading] =
    React.useState<boolean>(false);
  //#endregion local state

  //#region hooks
  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const handleRevertThemeToDefault = () => {
    Object.getOwnPropertyNames(theme).forEach((property) => {
      formik.setFieldValue(property, defaultTheme[property]);
    });
  };
  const { updateWebsiteConfiguration, loading } =
    useUpdateWebsiteConfiguration();
  const getTranslatedText = useGetTranslatedText();
  //#endregion hooks

  const getInitialValuesBasedOnWebsiteConfiguration = () => {
    return {
      title: websiteConfiguration.title,
      language: formik?.values?.language || language,
      description:
        getTranslatedText(
          websiteConfiguration.description,
          formik?.values?.language || language
        ) || "",
      email: websiteConfiguration.email,
      phoneNumber: websiteConfiguration.phoneNumber,
      tabTitle: websiteConfiguration.tabTitle,
      mainLanguages: websiteConfiguration.mainLanguages,
      withChat: websiteConfiguration.withChat,
      withRegistration: websiteConfiguration.withRegistration,
      withTaskManagement: websiteConfiguration.withTaskManagement,

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
      contentBackgroundColor: websiteConfiguration.theme.contentBackgroundColor,
      boxColor: websiteConfiguration.theme.boxColor,
      transparentBackground: websiteConfiguration.theme.transparentBackground,
      subContentBackgroundColor:
        websiteConfiguration.theme.subContentBackgroundColor,
      boxShadow: websiteConfiguration.theme.boxShadow,
      tabIcon: websiteConfiguration.tabIcon,
      tabIconAsYetToDownloadFile: undefined,
      logo1: websiteConfiguration.logo1,
      logo1AsYetToDownloadFile: undefined,
      logo2: websiteConfiguration.logo2,
      logo2AsYetToDownloadFile: undefined,
    };
  };

  //#region formik
  const formik: FormikProps<IWebsiteConfigurationForm> =
    useFormik<IWebsiteConfigurationForm>({
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
        withTaskManagement: Yup.boolean(),
      }),
      onSubmit: async (values: IWebsiteConfigurationForm) => {
        const filesUploadPromises: Promise<IFile | undefined>[] = [];

        setUploadingFilesLoading(true);

        filesUploadPromises.push(
          new Promise(async (resolve, reject) => {
            let tabIcon: IFile | undefined = undefined;
            if (formik.values.tabIcon) {
              tabIcon = formik.values.tabIcon;
            }

            if (formik.values.tabIconAsYetToDownloadFile) {
              tabIcon = await uploadFile(
                formik.values.tabIconAsYetToDownloadFile
              );
            }
            resolve(tabIcon);
          })
        );
        filesUploadPromises.push(
          new Promise(async (resolve, reject) => {
            let logo1: IFile | undefined = undefined;
            if (formik.values.logo1) {
              logo1 = formik.values.logo1;
            }

            if (formik.values.logo1AsYetToDownloadFile) {
              logo1 = await uploadFile(formik.values.logo1AsYetToDownloadFile);
            }
            resolve(logo1);
          })
        );

        filesUploadPromises.push(
          new Promise(async (resolve, reject) => {
            let logo2: IFile | undefined = undefined;
            if (formik.values.logo2) {
              logo2 = formik.values.logo2;
            }

            if (formik.values.logo2AsYetToDownloadFile) {
              logo2 = await uploadFile(formik.values.logo2AsYetToDownloadFile);
            }
            resolve(logo2);
          })
        );

        const [tabIcon, logo1, logo2] = await Promise.all(filesUploadPromises);
        setUploadingFilesLoading(false);

        const command: WebsiteConfigurationUpdateCommand = {
          email: values.email || "",
          phoneNumber: values.phoneNumber || "",
          title: values.title || "",
          description: values.description || "",
          tabTitle: values.tabTitle || "",
          mainLanguages: values.mainLanguages || ["en", "fr"],
          withChat: values.withChat || false,
          withRegistration: values.withRegistration || false,
          withTaskManagement: values.withTaskManagement || false,
          tabIcon,
          logo1,
          logo2,

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
          language: values.language || language,
        };

        await updateWebsiteConfiguration(command);

        formik.setFieldValue("tabIconAsYetToDownloadFile", null);
      },
    });
  //#endregion formik

  //#region effects
  React.useEffect(() => {
    formik.resetForm({
      values: getInitialValuesBasedOnWebsiteConfiguration(),
    });
  }, [websiteConfiguration, formik.values.language]);
  //#endregion effects

  //#region view
  const actualLoading = loading || uploadingFilesLoading;
  return (
    <Modal
      handleClose={() =>
        dispatch(websiteConfigurationSlice.actions.setEditorOpen(false))
      }
      open={configurationModelOpen}
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
            onClick={() =>
              dispatch(websiteConfigurationSlice.actions.setEditorOpen(false))
            }
            className={styles.closeButton}
          />
        </div>

        <h2 className={styles.themeTitle}>
          {getTranslatedText(staticText?.globalConfiguration)}:{" "}
        </h2>

        <InputSelect
          label={getTranslatedText(staticText?.language)}
          name="language"
          formik={formik}
          options={getLanguages()}
          value={
            getLanguages().find((el) => el.value === formik.values.language) ||
            getLanguages()[0]
          }
        />

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

        <Textarea
          label={getTranslatedText(staticText?.description)}
          value={formik.values.description}
          textareaProps={{
            placeholder: getTranslatedText(staticText?.description),
          }}
          name="description"
          formik={formik}
          debounce
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            formik.setFieldValue("description", e.target.value);
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

        <Checkbox
          name="withTaskManagement"
          formik={formik}
          label={getTranslatedText(staticText?.withTaskManagement)}
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

        <FilesInput
          disabled={actualLoading}
          files={
            formik.values.logo1AsYetToDownloadFile
              ? [formik.values.logo1AsYetToDownloadFile]
              : []
          }
          setFiles={(files: File[]) => {
            formik.setFieldValue(
              "logo1AsYetToDownloadFile",
              files.length > 0 ? files[0] : null
            );
            formik.setFieldValue("logo1", null);
          }}
          selectedExistingFiles={
            formik.values.logo1 ? [formik.values.logo1] : []
          }
          setSelectedExistingFiles={(existingFiles: IFile[]) => {
            formik.setFieldValue(
              "logo1",
              existingFiles.length > 0
                ? existingFiles[existingFiles.length - 1]
                : null
            );
            formik.setFieldValue("logo1AsYetToDownloadFile", null);
          }}
          allowMany={false}
          label={getTranslatedText(staticText?.logo1)}
          typeOfFiles={TypeOfFiles.UnownedFiles}
        />

        <FilesInput
          disabled={actualLoading}
          files={
            formik.values.logo2AsYetToDownloadFile
              ? [formik.values.logo2AsYetToDownloadFile]
              : []
          }
          setFiles={(files: File[]) => {
            formik.setFieldValue(
              "logo2AsYetToDownloadFile",
              files.length > 0 ? files[0] : null
            );
            formik.setFieldValue("logo2", null);
          }}
          selectedExistingFiles={
            formik.values.logo2 ? [formik.values.logo2] : []
          }
          setSelectedExistingFiles={(existingFiles: IFile[]) => {
            formik.setFieldValue(
              "logo2",
              existingFiles.length > 0
                ? existingFiles[existingFiles.length - 1]
                : null
            );
            formik.setFieldValue("logo2AsYetToDownloadFile", null);
          }}
          allowMany={false}
          label={getTranslatedText(staticText?.logo2)}
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
            placeholder: getTranslatedText(staticText?.contentBackgroundColor),
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
  //#endregion view
};

export default React.memo(WebsiteConfigurationEditor);
