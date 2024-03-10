import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { BsHandIndexFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useSortable } from "@dnd-kit/sortable";

import { useAppSelector } from "../../../../../../store/hooks";
import useGetTranslatedText from "../../../../../../hooks/useGetTranslatedText";

import { IModelField } from "../../../../../../store/slices/modelSlice";

import useStyles from "./sortableModel.styles";
import { BiPlus } from "react-icons/bi";
import InputSelect from "../../../../../fundamentalComponents/inputs/inputSelect";
import { InputSelectOptionEnum } from "../../../../../fundamentalComponents/inputs/inputSelect/InputSelect";
import { MdDelete, MdTextFields } from "react-icons/md";
import Input from "../../../../../fundamentalComponents/inputs/input";
import Checkbox from "../../../../../fundamentalComponents/inputs/checkbox";
import ExtendSection from "../../../../../fundamentalComponents/extendSection";
import {
  FieldTypeEnum,
  IFieldReadDto,
  IModelFieldConditionReadDto,
  IModelFieldReadDto,
  IModelReadDto,
  IModelStateReadDto,
  ITheme,
  ModelFieldConditionTypeEnum,
} from "roottypes";

interface ISortableModelFieldProps {
  modelField: IModelField;
  handleDeleteModelField: (modelFieldIndex: number) => void;
  modelFieldIndex: number;
  language?: string;
  selectedModelFields: IModelField[];
  setSelectedModelFields: (modelFields: IModelField[]) => any;
  model?: IModelReadDto;
}

const SortableModelField: React.FunctionComponent<ISortableModelFieldProps> = (
  props: ISortableModelFieldProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.fields
  );

  const [showConditions, setShowConditions] = React.useState<boolean>(false);
  const [showStatesConfiguration, setShowStatesConfiguration] =
    React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: props.modelField.uuid as string,
  });
  const getTranslatedText = useGetTranslatedText();

  //#region Event listeners
  const handleAddCondition = () => {
    const newCondition: IModelFieldConditionReadDto = {
      conditionType: ModelFieldConditionTypeEnum.Equal,
      field: undefined,
      value: "",
      modelState: undefined,
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
    conditionType: ModelFieldConditionTypeEnum,
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
                (modelField: IModelField) =>
                  (modelField.field as IFieldReadDto)._id === fieldId
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
  const handleCheckOrUncheckMainField = (mainField: boolean) => {
    const newSelectedModelFields = props.selectedModelFields.map(
      (modelField: IModelField, index: number) => {
        if (index === props.modelFieldIndex) {
          modelField.mainField = mainField;
        }
        return modelField;
      }
    );

    props.setSelectedModelFields(newSelectedModelFields);
  };
  const handleCheckOrUncheckStickInTable = (stickInTable: boolean) => {
    const newSelectedModelFields = props.selectedModelFields.map(
      (modelField: IModelField, index: number) => {
        if (index === props.modelFieldIndex) {
          modelField.stickInTable = stickInTable;
        }
        return modelField;
      }
    );

    props.setSelectedModelFields(newSelectedModelFields);
  };
  const handleSelectConditionStates = (
    modelStateOption: InputSelectOptionEnum,
    conditionIndex: number
  ) => {
    const newSelectedModelFields = props.selectedModelFields.map(
      (modelField: IModelField, index: number) => {
        if (index === props.modelFieldIndex) {
          if (
            modelField.conditions &&
            modelField.conditions?.length > conditionIndex
          ) {
            modelField.conditions[conditionIndex].modelState = (
              props.model?.states as IModelStateReadDto[]
            )?.find(
              (state) =>
                state._id.toString() === modelStateOption.value.toString()
            );
          }
        }
        return modelField;
      }
    );

    props.setSelectedModelFields(newSelectedModelFields);
  };
  const handleTriggerStateForField = (modelState: IModelStateReadDto) => {
    const newSelectedModelFields = props.selectedModelFields.map(
      (modelField: IModelField, index: number) => {
        if (index === props.modelFieldIndex) {
          const modelStateExists: boolean = Boolean(
            (modelField.states as IModelStateReadDto[])?.find(
              (state) => state._id === modelState._id
            )
          );
          if (modelStateExists) {
            return {
              ...modelField,
              states:
                (modelField.states as IModelStateReadDto[])?.filter(
                  (state) => state._id !== modelState._id
                ) || [],
            };
          } else {
            return {
              ...modelField,
              states: [...(modelField.states || []), modelState],
            };
          }
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
  const conditionsOptions: InputSelectOptionEnum[] = [
    {
      label: getTranslatedText(staticText?.equal),
      value: ModelFieldConditionTypeEnum.Equal,
    },
    {
      label: getTranslatedText(staticText?.inferiorTo),
      value: ModelFieldConditionTypeEnum.InferiorTo,
    },
    {
      label: getTranslatedText(staticText?.superiorTo),
      value: ModelFieldConditionTypeEnum.SuperiorTo,
    },
    {
      label: getTranslatedText(staticText?.inferiorOrEqualTo),
      value: ModelFieldConditionTypeEnum.InferiorOrEqualTo,
    },
    {
      label: getTranslatedText(staticText?.superiorOrEqualTo),
      value: ModelFieldConditionTypeEnum.SuperiorOrEqualTo,
    },
    {
      label: getTranslatedText(
        staticText?.valueInferiorOrEqualToCurrentYearPlusValueOfFieldAndSuperiorOrEqualToCurrentYear
      ),
      value:
        ModelFieldConditionTypeEnum.ValueInferiorOrEqualToCurrentYearPlusValueOfFieldAndSuperiorOrEqualToCurrentYear,
    },
    {
      label: getTranslatedText(staticText?.fieldShowWhenStateIsAchieved),
      value: ModelFieldConditionTypeEnum.StateConditionsMet,
    },
  ];
  // Add the year condition option if it's a field of type table
  if ((props.modelField.field as IFieldReadDto)?.type === FieldTypeEnum.Table) {
    conditionsOptions.push({
      label: getTranslatedText(
        staticText?.ifYearTableThenNumberOfYearsInTheFutureIsEqualToValueOfField
      ),
      value:
        ModelFieldConditionTypeEnum.IfYearTableThenNumberOfYearsInTheFutureIsEqualToValueOfField,
    });
  }

  const fieldsOptions: InputSelectOptionEnum[] = props.selectedModelFields
    .filter(
      (selectedModelField: IModelField) =>
        (selectedModelField.field as IFieldReadDto)._id !==
        (props.modelField.field as IFieldReadDto)._id
    )
    .map((selectedModelField) => {
      return {
        label: getTranslatedText(
          (selectedModelField.field as IFieldReadDto).name
        ),
        value: (selectedModelField.field as IFieldReadDto)._id,
      };
    });
  const modelStatesOptions: InputSelectOptionEnum[] =
    (props.model?.states as IModelStateReadDto[])?.map((modelState) => ({
      label: getTranslatedText(modelState.name),
      value: getTranslatedText(modelState._id.toString()),
    })) || [];
  //#endregion View

  return (
    <div
      ref={setNodeRef}
      style={sorteStyles}
      className={styles.singleModelFieldContainer}
      data-cy={
        "sortableModelFieldForField" +
        (props.modelField.field as IFieldReadDto)._id
      }
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
        {getTranslatedText(
          ((props.modelField as IModelFieldReadDto).field as IFieldReadDto)
            .name,
          props.language
        )}
      </span>

      <div className={styles.fieldConfigurationContainer}>
        <Checkbox
          label={getTranslatedText(staticText?.required)}
          checked={Boolean(props.modelField.required)}
          onChange={handleCheckOrUncheckRequired}
        />
        <Checkbox
          label={getTranslatedText(staticText?.mainField)}
          checked={Boolean(props.modelField.mainField)}
          onChange={handleCheckOrUncheckMainField}
        />
        <Checkbox
          label={getTranslatedText(staticText?.stickInTable)}
          checked={Boolean(props.modelField.stickInTable)}
          onChange={handleCheckOrUncheckStickInTable}
        />
      </div>

      <ExtendSection
        onClick={() => setShowConditions(!showConditions)}
        title={getTranslatedText(staticText?.conditions)}
        isSectionShown={showConditions}
        dataCy={
          "modelFieldExtendConditionsForField" +
          (props.modelField.field as IFieldReadDto)._id.toString()
        }
      />
      {showConditions && (
        <div
          className={styles.conditionsContainer}
          data-cy={
            "modelFieldConditionsForField" +
            (props.modelField.field as IFieldReadDto)._id.toString()
          }
        >
          <div
            onClick={handleAddCondition}
            className={styles.conditionsTitleContainer}
            data-cy={
              "addConditionForModelField" +
              (props.modelField.field as IFieldReadDto)._id.toString()
            }
          >
            <span className={styles.conditionsTitle}>
              {getTranslatedText(staticText?.addCondition)}
            </span>
            <div className={styles.conditionButtons}>
              <BiPlus className={styles.conditionAdd} />
            </div>
          </div>

          {(props.modelField.conditions as IModelFieldConditionReadDto[])?.map(
            (condition: IModelFieldConditionReadDto, conditionIndex) => {
              return (
                <div
                  key={conditionIndex}
                  className={styles.singleCondition}
                  data-cy={
                    "condition" +
                    conditionIndex +
                    "ForField" +
                    (props.modelField.field as IFieldReadDto)._id.toString()
                  }
                >
                  <MdDelete
                    className={styles.deleteConditionIcon}
                    onClick={() => handleDeleteCondition(conditionIndex)}
                  />
                  <InputSelect
                    label={getTranslatedText(staticText?.field)}
                    value={fieldsOptions.find(
                      (option) =>
                        option.value === (condition.field as IFieldReadDto)?._id
                    )}
                    options={fieldsOptions}
                    onChange={(option) =>
                      handleChangeConditionField(option.value, conditionIndex)
                    }
                    selectorClassName={
                      "conditionFieldSelectorForCondition" +
                      conditionIndex +
                      "AndModelField" +
                      (props.modelField?.field as IFieldReadDto)._id
                    }
                  />
                  <InputSelect
                    label={getTranslatedText(staticText?.conditionType)}
                    value={conditionsOptions.find(
                      (option) => option.value === condition.conditionType
                    )}
                    options={conditionsOptions}
                    onChange={(option: InputSelectOptionEnum) =>
                      handleChangeConditionType(
                        option.value as ModelFieldConditionTypeEnum,
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
                    inputDataCy={
                      "conditionValueForCondition" +
                      conditionIndex +
                      "AndModelField" +
                      (props.modelField.field as IFieldReadDto)._id.toString()
                    }
                  />
                  {condition.conditionType ===
                    ModelFieldConditionTypeEnum.StateConditionsMet && (
                    <InputSelect
                      label={getTranslatedText(
                        staticText?.fieldShowWhenStateIsAchieved
                      )}
                      value={modelStatesOptions.find(
                        (option) =>
                          option.value.toString() ===
                          (
                            condition.modelState as IModelStateReadDto
                          )?._id.toString()
                      )}
                      options={modelStatesOptions}
                      onChange={(option) =>
                        handleSelectConditionStates(option, conditionIndex)
                      }
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
      )}

      <ExtendSection
        onClick={() => setShowStatesConfiguration(!showStatesConfiguration)}
        title={getTranslatedText(staticText?.statesContributions)}
        isSectionShown={showStatesConfiguration}
      />

      {showStatesConfiguration &&
        props.model?.states &&
        props.model?.states?.length > 0 && (
          <div className={styles.modelFieldStatesConfigurationContainer}>
            <h3 className={styles.statesConfigurationHint}>
              {getTranslatedText(staticText?.statesConfigurationHint)}
            </h3>
            {(props.model?.states as IModelStateReadDto[])?.map(
              (state, stateIndex) => {
                return (
                  <Checkbox
                    key={stateIndex}
                    label={getTranslatedText(state.name)}
                    onChange={() => handleTriggerStateForField(state)}
                    labelStyles={{
                      width: 250,
                    }}
                    checked={Boolean(
                      (props.modelField.states as IModelStateReadDto[])?.find(
                        (el) => el._id === state._id
                      )
                    )}
                  />
                );
              }
            )}
          </div>
        )}
      {showStatesConfiguration &&
        props.model?.subStates &&
        props.model?.subStates?.length > 0 && (
          <div className={styles.modelFieldStatesConfigurationContainer}>
            <h3 className={styles.statesConfigurationHint}>
              {getTranslatedText(staticText?.subStatesConfigurationHint)}
            </h3>
            {(props.model?.subStates as IModelStateReadDto[] | undefined)?.map(
              (state, stateIndex) => {
                return (
                  <Checkbox
                    key={stateIndex}
                    label={getTranslatedText(state.name)}
                    onChange={() => handleTriggerStateForField(state)}
                    labelStyles={{
                      width: 250,
                    }}
                    checked={Boolean(
                      (
                        props.modelField.states as
                          | IModelStateReadDto[]
                          | undefined
                      )?.find((el) => el._id === state._id)
                    )}
                  />
                );
              }
            )}
          </div>
        )}
    </div>
  );
};

export default React.memo(SortableModelField);
