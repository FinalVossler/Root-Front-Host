import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { BsHandIndexFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useSortable } from "@dnd-kit/sortable";

import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";

import {
  IModelField,
  IModelFieldCondition,
  ModelFieldConditionType,
} from "../../../store/slices/modelSlice";

import useStyles from "./sortableModel.styles";
import { BiPlus } from "react-icons/bi";
import InputSelect from "../../inputSelect";
import { Option } from "../../inputSelect/InputSelect";
import { MdDelete, MdTextFields } from "react-icons/md";
import Input from "../../input";
import Checkbox from "../../checkbox";

interface ISortableModelField {
  modelField: IModelField;
  handleDeleteModelField: (modelFieldIndex: number) => void;
  modelFieldIndex: number;
  language?: string;
  selectedModelFields: IModelField[];
  setSelectedModelFields: (modelFields: IModelField[]) => any;
}

const SortableModelField: React.FunctionComponent<ISortableModelField> = (
  props: ISortableModelField
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.fields
  );

  const styles = useStyles({ theme });
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: props.modelField.uuid,
  });
  const getTranslatedText = useGetTranslatedText();

  //#region Event listeners
  const handleAddCondition = () => {
    const newCondition: IModelFieldCondition = {
      conditionType: ModelFieldConditionType.Equal,
      field: undefined,
      value: "",
    };
    props.setSelectedModelFields(
      props.selectedModelFields.map((modelField, index) => {
        return {
          ...modelField,
          conditions:
            index === props.modelFieldIndex
              ? [...(modelField.conditions || []), newCondition]
              : modelField.conditions,
        };
      })
    );
  };
  const handleDeleteCondition = (conditionIndex: number) => {
    const newSelectedModelFields = props.selectedModelFields.map(
      (modelField: IModelField, index: number) => {
        if (index === props.modelFieldIndex) {
          modelField.conditions?.splice(conditionIndex, 1);
        }
        return modelField;
      }
    );

    props.setSelectedModelFields(newSelectedModelFields);
  };
  const handleChangeConditionType = (
    conditionType: ModelFieldConditionType,
    conditionIndex: number
  ) => {
    const newSelectedModelFields = props.selectedModelFields.map(
      (modelField: IModelField, index: number) => {
        if (index === props.modelFieldIndex) {
          if (
            modelField.conditions &&
            modelField.conditions?.length > conditionIndex
          ) {
            modelField.conditions[conditionIndex].conditionType = conditionType;
          }
        }
        return modelField;
      }
    );

    props.setSelectedModelFields(newSelectedModelFields);
  };
  const handleChangeConditionField = (
    fieldId: string,
    conditionIndex: number
  ) => {
    const newSelectedModelFields = props.selectedModelFields.map(
      (modelField: IModelField, index: number) => {
        if (index === props.modelFieldIndex) {
          if (
            modelField.conditions &&
            modelField.conditions?.length > conditionIndex
          ) {
            modelField.conditions[conditionIndex].field =
              props.selectedModelFields.find(
                (modelField: IModelField) => modelField.field._id === fieldId
              )?.field;
          }
        }
        return modelField;
      }
    );

    props.setSelectedModelFields(newSelectedModelFields);
  };
  const handleChangeConditionValue = (
    value: string,
    conditionIndex: number
  ) => {
    const newSelectedModelFields = props.selectedModelFields.map(
      (modelField: IModelField, index: number) => {
        if (index === props.modelFieldIndex) {
          if (
            modelField.conditions &&
            modelField.conditions?.length > conditionIndex
          ) {
            modelField.conditions[conditionIndex].value = value;
          }
        }
        return modelField;
      }
    );

    props.setSelectedModelFields(newSelectedModelFields);
  };

  const handleCheckOrUncheckRequired = (required: boolean) => {
    const newSelectedModelFields = props.selectedModelFields.map(
      (modelField: IModelField, index: number) => {
        if (index === props.modelFieldIndex) {
          modelField.required = required;
        }
        return modelField;
      }
    );

    props.setSelectedModelFields(newSelectedModelFields);
  };
  //#endregion Event listeners

  //#region View
  const sorteStyles = {
    transform: CSS.Transform.toString(transform),
  };
  const conditionsOptions: Option[] = [
    {
      label: getTranslatedText(staticText?.equal),
      value: ModelFieldConditionType.Equal,
    },
    {
      label: getTranslatedText(staticText?.inferiorTo),
      value: ModelFieldConditionType.InferiorTo,
    },
    {
      label: getTranslatedText(staticText?.superiorTo),
      value: ModelFieldConditionType.SuperiorTo,
    },
    {
      label: getTranslatedText(staticText?.inferiorOrEqualTo),
      value: ModelFieldConditionType.InferiorOrEqualTo,
    },
    {
      label: getTranslatedText(staticText?.superiorOrEqualTo),
      value: ModelFieldConditionType.SuperiorOrEqualTo,
    },
    {
      label: getTranslatedText(
        staticText?.valueInferiorOrEqualToCurrentYearPlusValueOfFieldAndSuperiorOrEqualToCurrentYear
      ),
      value:
        ModelFieldConditionType.ValueInferiorOrEqualToCurrentYearPlusValueOfFieldAndSuperiorOrEqualToCurrentYear,
    },
  ];
  const fieldsOptions: Option[] = props.selectedModelFields
    .filter(
      (selectedModelField: IModelField) =>
        selectedModelField.field._id !== props.modelField.field._id
    )
    .map((selectedModelField) => {
      return {
        label: getTranslatedText(selectedModelField.field.name),
        value: selectedModelField.field._id,
      };
    });
  //#endregion View

  return (
    <div
      ref={setNodeRef}
      style={sorteStyles}
      className={styles.singleModelFieldContainer}
    >
      <BsHandIndexFill
        color={theme.primary}
        className={styles.sortModelFieldHandle}
        {...attributes}
        {...listeners}
      />
      <AiFillDelete
        color={theme.primary}
        className={styles.deleteModelFieldButton}
        onClick={() => props.handleDeleteModelField(props.modelFieldIndex)}
      />
      <span className={styles.fieldName}>
        {getTranslatedText(props.modelField.field.name, props.language)}
      </span>

      <div className={styles.fieldConfigurationContainer}>
        <Checkbox
          label={getTranslatedText(staticText?.required)}
          checked={Boolean(props.modelField.required)}
          onChange={handleCheckOrUncheckRequired}
        />
      </div>

      <div className={styles.conditionsContainer}>
        <div className={styles.conditionsTitleContainer}>
          <span className={styles.conditionsTitle}>
            {getTranslatedText(staticText?.conditions)}
          </span>
          <div className={styles.conditionButtons}>
            <BiPlus
              className={styles.conditionAdd}
              onClick={handleAddCondition}
            />
          </div>
        </div>

        {props.modelField.conditions?.map(
          (condition: IModelFieldCondition, conditionIndex) => {
            return (
              <div key={conditionIndex} className={styles.singleCondition}>
                <MdDelete
                  className={styles.deleteConditionIcon}
                  onClick={() => handleDeleteCondition(conditionIndex)}
                />
                <InputSelect
                  label={getTranslatedText(staticText?.field)}
                  value={fieldsOptions.find(
                    (option) => option.value === condition.field?._id
                  )}
                  options={fieldsOptions}
                  onChange={(option) =>
                    handleChangeConditionField(option.value, conditionIndex)
                  }
                />
                <InputSelect
                  label={getTranslatedText(staticText?.conditionType)}
                  value={conditionsOptions.find(
                    (option) => option.value === condition.conditionType
                  )}
                  options={conditionsOptions}
                  onChange={(option: Option) =>
                    handleChangeConditionType(
                      option.value as ModelFieldConditionType,
                      conditionIndex
                    )
                  }
                />
                <Input
                  label={getTranslatedText(staticText?.value)}
                  value={condition.value}
                  onChange={(e) =>
                    handleChangeConditionValue(e.target.value, conditionIndex)
                  }
                  Icon={MdTextFields}
                  inputProps={{
                    placeholder: getTranslatedText(staticText?.value),
                  }}
                  debounce
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default React.memo(SortableModelField);
