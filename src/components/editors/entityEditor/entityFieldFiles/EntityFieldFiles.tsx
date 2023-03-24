import React from "react";
import {
  AiOutlineFileDone,
  AiFillDelete,
  AiOutlineFileSearch,
  AiFillFileAdd,
} from "react-icons/ai";

import OwnFiles from "../../../ownFiles";
import { FormikProps } from "formik";
import IFile from "../../../../globalTypes/IFile";
import { IEntityEditorForm, IEntityFieldValueForm } from "../EntityEditor";
import { IModelField } from "../../../../store/slices/modelSlice";
import { Theme } from "../../../../config/theme";
import { useAppSelector } from "../../../../store/hooks";
import useStyles from "./entityFieldFiles.styles";
import isFileAnImage from "../../../../utils/isFileAnImage";
import readAsBase64 from "../../../../utils/readAsBase64";

type TrackedImage = {
  base64: string;
  file: File;
};

export interface IEntityFieldFiles {
  formik: FormikProps<IEntityEditorForm>;
  modelField: IModelField;
  entityFieldValue?: IEntityFieldValueForm;
}

// Hint: Own files are files already uploaded.
// NewFiles are the new files selected by the user in the file input
const EntityFieldFiles = (props: IEntityFieldFiles) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  //#region Local state
  const [ownFilesOpen, setOwnFilesOpen] = React.useState<boolean>(false);
  const [trackedImages, setTrackedImages] = React.useState<TrackedImage[]>([]);
  //#endregion Local state

  const styles = useStyles({ theme });
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    React.useRef<HTMLInputElement>(null);

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
    // set selected own files based on the value our entityFieldValie
    if (
      props.entityFieldValue &&
      props.entityFieldValue.selectedOwnFiles &&
      props.entityFieldValue?.selectedOwnFiles.length > 0
    ) {
      setOwnFilesOpen(true);
    }
  }, [props.entityFieldValue?.selectedOwnFiles]);
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

  const handleAddNewFilesIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSelectedOwnFilesChange = (files: IFile[]) => {
    props.formik.setFieldValue(
      "entityFieldValues",
      props.formik.values.entityFieldValues.map((entityFieldValue) => {
        if (entityFieldValue.fieldId === props.modelField.field._id) {
          return {
            ...entityFieldValue,
            selectedOwnFiles: files,
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
  //#endregion Event listeners

  return (
    <div className={styles.addFilesContainer}>
      <div className={styles.filesButtonsContainer}>
        <AiOutlineFileSearch
          className={styles.chooseFilesButton}
          onClick={() => setOwnFilesOpen(true)}
          color={theme.primary}
        />

        <AiFillFileAdd
          onClick={handleAddNewFilesIconClick}
          className={styles.icon}
        />

        <input
          onChange={handleNewFilesChange}
          ref={inputRef as React.RefObject<HTMLInputElement>}
          hidden
          type="file"
          multiple
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

      {ownFilesOpen && (
        <OwnFiles
          selectedOwnFiles={props.entityFieldValue?.selectedOwnFiles || []}
          setSelectedOwnFiles={handleSelectedOwnFilesChange}
        />
      )}
    </div>
  );
};

export default React.memo(EntityFieldFiles);
