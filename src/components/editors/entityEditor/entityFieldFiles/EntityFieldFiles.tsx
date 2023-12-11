import React from "react";
import {
  AiOutlineFileDone,
  AiFillDelete,
  AiOutlineFileSearch,
} from "react-icons/ai";
import { FormikProps } from "formik";

import IFile from "../../../../globalTypes/IFile";
import {
  IEntityEditorFormForm,
  IEntityFieldValueForm,
} from "../EntityEditorForm";
import { IModelField } from "../../../../store/slices/modelSlice";
import { Theme } from "../../../../config/theme";
import { useAppSelector } from "../../../../store/hooks";
import useStyles from "./entityFieldFiles.styles";
import isFileAnImage from "../../../../utils/isFileAnImage";
import readAsBase64 from "../../../../utils/readAsBase64";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import ExistingFiles from "../../../existingFiles";
import { TypeOfFiles } from "../../../existingFiles/ExistingFiles";
import FilesDropZone from "../../../filesDropZone";
import { toast } from "react-toastify";

type TrackedImage = {
  base64: string;
  file: File;
};

export interface IEntityFieldFiles {
  formik: FormikProps<IEntityEditorFormForm>;
  modelField: IModelField;
  entityFieldValue?: IEntityFieldValueForm;
  disabled?: boolean;
}

// Hint: Own files are files already uploaded.
// NewFiles are the new files selected by the user in the file input
const EntityFieldFiles = (props: IEntityFieldFiles) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.files
  );

  //#region Local state
  const [existingFilesOpen, setExistingFilesOpen] =
    React.useState<boolean>(false);
  const [trackedImages, setTrackedImages] = React.useState<TrackedImage[]>([]);
  //#endregion Local state

  const styles = useStyles({ theme });
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    React.useRef<HTMLInputElement>(null);
  const getTranslatedText = useGetTranslatedText();

  //#region Effects
  React.useEffect(() => {
    // update tracked images (base6) when the entityFieldValue new files change
    const updateTrackedImages = async () => {
      if (props.entityFieldValue && props.entityFieldValue.newFiles) {
        const newTrackedImages: TrackedImage[] = [];
        const images = props.entityFieldValue?.newFiles.filter((file) =>
          isFileAnImage(file)
        );
        const promises: Promise<string>[] = [];

        images.forEach(async (image: File) => {
          const promise = new Promise<string>(async (resolve, reject) => {
            const base64 = await readAsBase64(image);
            newTrackedImages.push({
              base64,
              file: image,
            });
            resolve(base64);
          });
          promises.push(promise);
        });

        await Promise.all(promises);

        setTrackedImages(newTrackedImages);
      }
    };

    updateTrackedImages();
  }, [props.entityFieldValue?.newFiles]);

  React.useEffect(() => {
    // set selected own files based on the value of our entityFieldValie
    if (
      props.entityFieldValue &&
      props.entityFieldValue.selectedExistingFiles &&
      props.entityFieldValue?.selectedExistingFiles.length > 0
    ) {
      setExistingFilesOpen(true);
    }
  }, [props.entityFieldValue?.selectedExistingFiles]);
  //#endregion Effects

  //#region Event listeners
  const handleNewFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: File[] = Array.from(e.target.files);
      if (newFiles.length === 0) return;

      props.formik.setFieldValue(
        "entityFieldValues",
        props.formik.values.entityFieldValues.map((entityFieldValue) => {
          if (entityFieldValue.fieldId === props.modelField.field._id) {
            return {
              ...entityFieldValue,
              newFiles,
            };
          } else {
            return entityFieldValue;
          }
        }) || []
      );
    }
  };

  const handleSelectedExistingFilesChange = (files: IFile[]) => {
    props.formik.setFieldValue(
      "entityFieldValues",
      props.formik.values.entityFieldValues.map((entityFieldValue) => {
        if (entityFieldValue.fieldId === props.modelField.field._id) {
          return {
            ...entityFieldValue,
            selectedExistingFiles: files,
          };
        } else {
          return entityFieldValue;
        }
      }) || []
    );
  };

  const handleDeleteNewFile = (file: File) => {
    props.formik.setFieldValue(
      "entityFieldValues",
      props.formik.values.entityFieldValues.map((entityFieldValue) => {
        if (entityFieldValue.fieldId === props.modelField.field._id) {
          return {
            ...entityFieldValue,
            newFiles: entityFieldValue?.newFiles?.filter((f) => f !== file),
          };
        } else {
          return entityFieldValue;
        }
      }) || []
    );

    if (isFileAnImage(file)) {
      const newTrackedImages = trackedImages.filter(
        (trackedImage) => trackedImage.file !== file
      );
      setTrackedImages(newTrackedImages);
    }
  };

  const handleDropFiles = (files: File[]) => {
    if (props.disabled) {
      return toast.error(
        getTranslatedText(staticText?.readAccessOnlyErrorMessage)
      );
    }
    props.formik.setFieldValue(
      "entityFieldValues",
      props.formik.values.entityFieldValues.map((entityFieldValue) => {
        if (entityFieldValue.fieldId === props.modelField.field._id) {
          return {
            ...entityFieldValue,
            newFiles: [...(entityFieldValue.newFiles || []), ...files],
          };
        } else {
          return entityFieldValue;
        }
      }) || []
    );
  };
  //#endregion Event listeners

  return (
    <div
      className={
        props.disabled
          ? styles.disabledAddFilesContainer
          : styles.addFilesContainer
      }
    >
      <span className={styles.label}>
        {getTranslatedText(props.modelField.field.name)}:
      </span>
      <div className={styles.filesButtonsContainer}>
        {(props.modelField.field.canChooseFromExistingFiles ||
          (props.entityFieldValue?.files &&
            props.entityFieldValue?.files?.length > 0)) && (
          <AiOutlineFileSearch
            className={styles.chooseFilesButton}
            onClick={() => setExistingFilesOpen(true)}
            id={"selectFromExistingFilesForEntityButton"}
          />
        )}

        <FilesDropZone onDrop={handleDropFiles} disabled={props.disabled} />

        <input
          onChange={handleNewFilesChange}
          ref={inputRef as React.RefObject<HTMLInputElement>}
          hidden
          type="file"
          multiple
          disabled={props.disabled}
        />
      </div>

      {/* new files that aren't images */}
      <div className={styles.newFilesContainer}>
        {props.entityFieldValue &&
          props.entityFieldValue.newFiles &&
          props.entityFieldValue?.newFiles
            .filter((f) => !isFileAnImage(f))
            .map((file: File, index: number) => {
              return (
                <div key={index} className={styles.singleFileContainer}>
                  <AiOutlineFileDone className={styles.fileIcon} />
                  <span className={styles.fileName}>{file.name}</span>

                  <AiFillDelete
                    onClick={() => handleDeleteNewFile(file)}
                    className={styles.deleteIcon}
                  />
                </div>
              );
            })}

        {/* new files that are images (they are kept in a trackedImages array every time the formik value changes) */}
        {trackedImages.map((trackedImage: TrackedImage, index: number) => {
          return (
            <div
              key={index}
              className={styles.trackedImage}
              style={{ backgroundImage: "url(" + trackedImage.base64 + ")" }}
            >
              <AiFillDelete
                onClick={() => handleDeleteNewFile(trackedImage.file)}
                className={styles.deleteIcon}
              />
            </div>
          );
        })}
      </div>

      {existingFilesOpen && (
        <ExistingFiles
          selectedExistingFiles={
            props.entityFieldValue?.selectedExistingFiles || []
          }
          setSelectedExistingFiles={handleSelectedExistingFilesChange}
          typeOfFiles={TypeOfFiles.UnownedFiles}
          disabled={props.disabled}
        />
      )}
    </div>
  );
};

export default React.memo(EntityFieldFiles);
