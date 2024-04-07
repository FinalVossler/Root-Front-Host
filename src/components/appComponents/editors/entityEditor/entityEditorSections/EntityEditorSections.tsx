import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdTextFields } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import {
  FieldTypeEnum,
  IEntityReadDto,
  IFieldReadDto,
  IModelReadDto,
  IRoleReadDto,
  IUserReadDto,
  IEntityPermissionReadDto,
  SuperRoleEnum,
  IMicroFrontendComponentReadDto,
  EntityStaticPermissionEnum,
  EventTriggerEnum,
  EventTypeEnum,
  IEventReadDto,
  IMicroFrontendReadDto,
  ITheme,
  IModelFieldReadDto,
  IModelSection,
  ModelSectionDirectionEnum,
} from "roottypes";

import Button from "../../../../fundamentalComponents/button";
import { useAppSelector } from "../../../../../store/hooks";
import useGetTranslatedText from "../../../../../hooks/useGetTranslatedText";
import InputSelect from "../../../../fundamentalComponents/inputs/inputSelect";
import EntityFieldFiles from "../entityFieldFiles";
import useAxios from "../../../../../hooks/useAxios";
import areEntityFieldConditionsMet from "../../../../../utils/areEntityFieldConditionsMet";

import sendEventApiCall from "../../../../../utils/sendEventApiCall";
import EntityEditorTableField from "../entityEditorTableField";
import isValidUrl from "../../../../../utils/isValidUrl";
import Input from "../../../../fundamentalComponents/inputs/input";
import Textarea from "../../../../fundamentalComponents/inputs/textarea/Textarea";
import useGenerateVariations from "../../../../../hooks/apiHooks/useGenerateVariations";
import {
  IEntityEditorFormFormik,
  IEntityFieldValueForm,
  IErroredField,
} from "../EntityEditorForm";
import { IInputSelectOption } from "../../../../fundamentalComponents/inputs/inputSelect/InputSelect";

import useStyles from "./entityEditorSections.styles";
import EntityEditorField from "../entityEditorField";

export interface IEntityEditorSectionsProps {
  formik: FormikProps<IEntityEditorFormFormik>;
  entity?: IEntityReadDto;
  modelId?: string;
  readOnly?: boolean;
  handleCloseEditor?: () => void;
  erroredFields: IErroredField[];
}

const EntityEditorSections: React.FunctionComponent<
  IEntityEditorSectionsProps
> = (props: IEntityEditorSectionsProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const model: IModelReadDto | undefined = useAppSelector((state) =>
    state.model.models.find((m) => m._id === props.modelId)
  );
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

  //#region Local state
  //#endregion Local state

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const axios = useAxios();
  const navigate = useNavigate();
  useGenerateVariations();

  //#region Effects

  //#endregion Effects
  if (!model) return null;

  return (
    <div className={styles.entityEditorSectionsContainer}>
      {model.sections.map((section) => {
        return (
          <EntityEditorSection
            key={section.uuid}
            section={section}
            erroredFields={props.erroredFields}
            formik={props.formik}
            entity={props.entity}
            handleCloseEditor={props.handleCloseEditor}
            modelId={props.modelId}
            readOnly={props.readOnly}
          />
        );
      })}
    </div>
  );
};

interface IEntityEditorSectionProps {
  section: IModelSection;

  formik: FormikProps<IEntityEditorFormFormik>;
  entity?: IEntityReadDto;
  modelId?: string;
  readOnly?: boolean;
  handleCloseEditor?: () => void;
  erroredFields: IErroredField[];
}

const EntityEditorSection: React.FunctionComponent<
  IEntityEditorSectionProps
> = (props: IEntityEditorSectionProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const model: IModelReadDto | undefined = useAppSelector((state) =>
    state.model.models.find((m) => m._id === props.modelId)
  );

  const styles = useStyles({ theme });

  if (!model) {
    return null;
  }
  if (props.section.children.length === 0 && !props.section.customData) {
    return null;
  }

  const modelField = model?.modelFields.find(
    (modelField) =>
      (modelField.field as IFieldReadDto)._id.toString() ===
      props.section.customData?.fieldId
  );

  const fieldedSection = props.section.children.length === 0 && modelField;
  const childrenedSection = props.section.children.length > 0;

  return (
    <div
      className={styles.entityEditorSectionContainer}
      style={{
        flexDirection:
          props.section.direction === ModelSectionDirectionEnum.Horizontal
            ? "row"
            : "column",
      }}
    >
      {childrenedSection &&
        props.section.children.map((childSection) => {
          return (
            <EntityEditorSection
              key={childSection.uuid}
              {...props}
              section={childSection}
            />
          );
        })}

      {fieldedSection && (
        <EntityEditorField
          erroredFields={props.erroredFields}
          formik={props.formik}
          modelField={modelField}
          entity={props.entity}
          handleCloseEditor={props.handleCloseEditor}
          modelId={props.modelId}
          readOnly={props.readOnly}
        />
      )}
    </div>
  );
};

export default React.memo(EntityEditorSections);
