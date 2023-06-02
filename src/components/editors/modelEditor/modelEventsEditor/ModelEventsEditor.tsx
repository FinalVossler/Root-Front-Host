import React from "react";
import { FormikProps } from "formik";
import { AiFillApi } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { Theme } from "../../../../config/theme";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import {
  IModelEvent,
  ModelEventTriggerEnum,
  ModelEventTypeEnum,
} from "../../../../store/slices/modelSlice";
import Button from "../../../button";
import Checkbox from "../../../checkbox";
import Input from "../../../input";
import { IModelForm } from "../ModelEditor";

import useStyles from "./modelEventsEditor.styles";
import Textarea from "../../../textarea/Textarea";

interface IModelEventsEditor {
  formik: FormikProps<IModelForm>;
}

const ModelEventsEditor: React.FunctionComponent<IModelEventsEditor> = (
  props: IModelEventsEditor
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.models
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  //#region Event listeners
  const handleAddEvent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newModelEvent: IModelEvent = {
      eventTrigger: ModelEventTriggerEnum.OnCreate,
      eventType: ModelEventTypeEnum.Redirection,
      redirectionToSelf: false,
      redirectionUrl: "",
      requestMethod: "POST",
      requestUrl: "",
      requestDataIsCreatedEntity: true,
      requestData: "",
    };
    props.formik.setFieldValue("modelEvents", [
      ...props.formik.values.modelEvents,
      newModelEvent,
    ]);
  };
  const handleDeleteEvent = (index) => {
    const newModelEvents = [...props.formik.values.modelEvents];

    newModelEvents.splice(index, 1);
    props.formik.setFieldValue("modelEvents", newModelEvents);
  };

  const handleTriggerChange = (
    index: number,
    eventTrigger: ModelEventTriggerEnum
  ) => {
    const newModelEvents = props.formik.values.modelEvents.map(
      (modelEvent: IModelEvent, i) => {
        return {
          ...modelEvent,
          eventTrigger: index === i ? eventTrigger : modelEvent.eventTrigger,
        };
      }
    );
    props.formik.setFieldValue("modelEvents", newModelEvents);
  };

  const handleEventTypeChange = (
    index: number,
    eventType: ModelEventTypeEnum
  ) => {
    const newModelEvents = props.formik.values.modelEvents.map(
      (modelEvent: IModelEvent, i) => {
        return {
          ...modelEvent,
          eventType: index === i ? eventType : modelEvent.eventType,
        };
      }
    );
    props.formik.setFieldValue("modelEvents", newModelEvents);
  };

  return (
    <div className={styles.modelEventsEditorContainer}>
      <span className={styles.eventsTitle}>
        {getTranslatedText(staticText?.events)}
      </span>

      {props.formik.values.modelEvents.map(
        (modelEvent: IModelEvent, index: number) => {
          return (
            <div key={index} className={styles.singleModelEvent}>
              <MdDelete
                onClick={(e) => handleDeleteEvent(index)}
                className={styles.deleteIcon}
              />

              <span className={styles.eventTriggerTitle}>
                {getTranslatedText(staticText?.eventTrigger)}:
              </span>
              <Checkbox
                label={getTranslatedText(staticText?.onCreate)}
                checked={
                  modelEvent.eventTrigger === ModelEventTriggerEnum.OnCreate
                }
                onChange={() =>
                  handleTriggerChange(index, ModelEventTriggerEnum.OnCreate)
                }
                labelStyles={{ width: 100 }}
              />
              <Checkbox
                label={getTranslatedText(staticText?.onUpdate)}
                checked={
                  modelEvent.eventTrigger === ModelEventTriggerEnum.OnUpdate
                }
                onChange={() =>
                  handleTriggerChange(index, ModelEventTriggerEnum.OnUpdate)
                }
                labelStyles={{ width: 100 }}
              />

              <span className={styles.eventTypeTitle}>
                {getTranslatedText(staticText?.eventType)}:
              </span>
              <Checkbox
                label={getTranslatedText(staticText?.apiCall)}
                checked={modelEvent.eventType === ModelEventTypeEnum.ApiCall}
                onChange={() =>
                  handleEventTypeChange(index, ModelEventTypeEnum.ApiCall)
                }
                labelStyles={{ width: 100 }}
              />
              <Checkbox
                label={getTranslatedText(staticText?.redirection)}
                checked={
                  modelEvent.eventType === ModelEventTypeEnum.Redirection
                }
                onChange={() =>
                  handleEventTypeChange(index, ModelEventTypeEnum.Redirection)
                }
                labelStyles={{ width: 100 }}
              />

              {modelEvent.eventType === ModelEventTypeEnum.ApiCall && (
                <div className={styles.confContainer}>
                  <span className={styles.apiTitle}>
                    {getTranslatedText(staticText?.apiCall)}
                  </span>

                  <Input
                    Icon={AiFillApi}
                    value={modelEvent.requestMethod}
                    inputProps={{
                      placeholder: getTranslatedText(staticText?.requestMethod),
                    }}
                    debounce
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newModelEvents =
                        props.formik.values.modelEvents.map((el, i) => {
                          return {
                            ...el,
                            requestMethod:
                              index == i ? e.target.value : el.requestMethod,
                          };
                        });

                      props.formik.setFieldValue("modelEvents", newModelEvents);
                    }}
                    label={getTranslatedText(staticText?.requestMethod)}
                  />
                  <Input
                    value={modelEvent.requestUrl}
                    Icon={AiFillApi}
                    inputProps={{
                      placeholder: getTranslatedText(staticText?.requestUrl),
                    }}
                    debounce
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newModelEvents =
                        props.formik.values.modelEvents.map((el, i) => {
                          return {
                            ...el,
                            requestUrl:
                              index == i ? e.target.value : el.requestUrl,
                          };
                        });

                      props.formik.setFieldValue("modelEvents", newModelEvents);
                    }}
                    label={getTranslatedText(staticText?.requestUrl)}
                  />
                  <Textarea
                    label={getTranslatedText(staticText?.requestData)}
                    value={modelEvent.requestData}
                    textareaProps={{
                      placeholder: getTranslatedText(staticText?.requestData),
                    }}
                    debounce
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      const newModelEvents =
                        props.formik.values.modelEvents.map((el, i) => {
                          return {
                            ...el,
                            requestData:
                              index == i ? e.target.value : el.requestData,
                          };
                        });

                      props.formik.setFieldValue("modelEvents", newModelEvents);
                    }}
                  />
                  <Checkbox
                    label={getTranslatedText(
                      staticText?.requestDataIsCreatedEntity
                    )}
                    checked={modelEvent.requestDataIsCreatedEntity === true}
                    onChange={(checked: boolean) => {
                      const newModelEvents =
                        props.formik.values.modelEvents.map((el, i) => {
                          return {
                            ...el,
                            requestDataIsCreatedEntity:
                              index == i
                                ? checked
                                : el.requestDataIsCreatedEntity,
                          };
                        });

                      props.formik.setFieldValue("modelEvents", newModelEvents);
                    }}
                  />
                </div>
              )}
              {modelEvent.eventType === ModelEventTypeEnum.Redirection && (
                <div className={styles.confContainer}>
                  <span className={styles.redirectionTitle}>
                    {getTranslatedText(staticText?.redirection)}
                  </span>

                  <Input
                    Icon={AiFillApi}
                    value={modelEvent.redirectionUrl}
                    inputProps={{
                      placeholder: getTranslatedText(
                        staticText?.redirectionUrl
                      ),
                    }}
                    debounce
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newModelEvents =
                        props.formik.values.modelEvents.map((el, i) => {
                          return {
                            ...el,
                            redirectionUrl:
                              index == i ? e.target.value : el.redirectionUrl,
                          };
                        });

                      props.formik.setFieldValue("modelEvents", newModelEvents);
                    }}
                    label={getTranslatedText(staticText?.redirectionUrl)}
                  />
                  <Checkbox
                    checked={modelEvent.redirectionToSelf}
                    onChange={(checked: boolean) => {
                      const newModelEvents =
                        props.formik.values.modelEvents.map((el, i) => {
                          return {
                            ...el,
                            redirectionToSelf:
                              index === i ? checked : el.redirectionToSelf,
                          };
                        });

                      props.formik.setFieldValue("modelEvents", newModelEvents);
                    }}
                    label={getTranslatedText(staticText?.redirectionToSelf)}
                  />
                </div>
              )}
            </div>
          );
        }
      )}

      <Button onClick={handleAddEvent}>
        {getTranslatedText(staticText?.addEvent)}{" "}
        <BiPlus className={styles.plusButton} />
      </Button>
    </div>
  );
};

export default React.memo(ModelEventsEditor);
