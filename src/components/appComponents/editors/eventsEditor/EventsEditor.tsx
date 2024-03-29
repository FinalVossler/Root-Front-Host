import React from "react";
import { FormikProps } from "formik";
import { AiFillApi } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { BiText } from "react-icons/bi";

import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import Button from "../../../fundamentalComponents/button";
import Checkbox from "../../../fundamentalComponents/inputs/checkbox";
import Input from "../../../fundamentalComponents/inputs/input";

import useStyles from "./eventsEditor.styles";
import Textarea from "../../../fundamentalComponents/inputs/textarea/Textarea";
import { CgAdd } from "react-icons/cg";
import { HiKey } from "react-icons/hi";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import SearchInput from "../../../fundamentalComponents/inputs/searchInput";
import useSearchMicroFrontends from "../../../../hooks/apiHooks/useSearchMicroFrontends";
import InputSelect from "../../../fundamentalComponents/inputs/inputSelect";
import { IInputSelectOption } from "../../../fundamentalComponents/inputs/inputSelect/InputSelect";
import {
  EventTriggerEnum,
  EventTypeEnum,
  IEventReadDto,
  IEventRequestHeaderReadDto,
  IMicroFrontendComponentReadDto,
  IMicroFrontendReadDto,
  ITheme,
} from "roottypes";

interface IEventsEditorProps {
  formik: FormikProps<any>;
  fieldName: string; // example: modelEvents or fieldEvents
  activeTriggers?: EventTriggerEnum[];
  defaultEventTriggerOnAdd: EventTriggerEnum;
}

const EventsEditor: React.FunctionComponent<IEventsEditorProps> = (
  props: IEventsEditorProps
) => {
  //#region store
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.events
  );
  //#endregion store

  //#region state
  const [open, setOpen] = React.useState<boolean>(false);
  //#endregion state

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { handleSearchMicroFrontendsPromise } = useSearchMicroFrontends();

  //#region Event listeners
  const handleAddEvent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newEvent: IEventReadDto = {
      eventTrigger: props.defaultEventTriggerOnAdd,
      eventType: EventTypeEnum.Redirection,
      redirectionToSelf: false,
      redirectionUrl: "",
      requestMethod: "POST",
      requestUrl: "",
      requestDataIsCreatedEntity: true,
      requestData: "",
      requestHeaders: [],
    };
    props.formik.setFieldValue(props.fieldName, [
      ...props.formik.values[props.fieldName],
      newEvent,
    ]);
  };
  const handleDeleteEvent = (index) => {
    const newEvents = [...props.formik.values[props.fieldName]];

    newEvents.splice(index, 1);
    props.formik.setFieldValue(props.fieldName, newEvents);
  };

  const handleTriggerChange = (
    index: number,
    eventTrigger: EventTriggerEnum
  ) => {
    const newEvents = props.formik.values[props.fieldName].map(
      (event: IEventReadDto, i) => {
        return {
          ...event,
          eventTrigger: index === i ? eventTrigger : event.eventTrigger,
        };
      }
    );
    props.formik.setFieldValue(props.fieldName, newEvents);
  };

  const handleEventTypeChange = (index: number, eventType: EventTypeEnum) => {
    const newEvents = props.formik.values[props.fieldName].map(
      (event: IEventReadDto, i) => {
        return {
          ...event,
          eventType: index === i ? eventType : event.eventType,
        };
      }
    );
    props.formik.setFieldValue(props.fieldName, newEvents);
  };

  const handleSelectOrUnselectMicroFrontend = (
    index: number,
    microFrontend: IMicroFrontendReadDto | null
  ) => {
    const newEvents: IEventReadDto = props.formik.values[props.fieldName].map(
      (event: IEventReadDto, i) => {
        return {
          ...event,
          microFrontend: index === i ? microFrontend : event.microFrontend,
          microFrontendComponentId:
            index === i &&
            microFrontend?.components &&
            microFrontend?.components?.length > 0
              ? (microFrontend.components[0] as IMicroFrontendComponentReadDto)
                  ._id
              : event.microFrontendComponentId,
        };
      }
    );
    props.formik.setFieldValue(props.fieldName, newEvents);
  };
  const handleSelectMicroFrontendComponent = (
    index: number,
    option: IInputSelectOption
  ) => {
    const newEvents = props.formik.values[props.fieldName].map(
      (event: IEventReadDto, i): IEventReadDto => {
        return {
          ...event,
          microFrontendComponentId:
            index === i ? option.value : event.microFrontendComponentId,
        };
      }
    );
    props.formik.setFieldValue(props.fieldName, newEvents);
  };

  const handleTriggerOpenEvents = () => setOpen(!open);
  //#endregion event listeners

  return (
    <div className={styles.eventsEditorContainer}>
      <span onClick={handleTriggerOpenEvents} className={styles.eventsTitle}>
        {!open ? (
          <BsArrowDownShort className={styles.triggerArrow} />
        ) : (
          <BsArrowUpShort className={styles.triggerArrow} />
        )}{" "}
        {getTranslatedText(staticText?.events)}
      </span>

      {open &&
        props.formik.values[props.fieldName].map(
          (event: IEventReadDto, index: number) => {
            return (
              <div key={index} className={styles.singleEvent}>
                <span className={styles.eventIndex}>
                  {getTranslatedText(staticText?.event)} {index + 1}
                </span>
                <MdDelete
                  onClick={(e) => handleDeleteEvent(index)}
                  className={styles.deleteIcon}
                />

                <span className={styles.eventTriggerTitle}>
                  {getTranslatedText(staticText?.eventTrigger)}:
                </span>

                {(!props.activeTriggers ||
                  props.activeTriggers?.indexOf(EventTriggerEnum.OnCreate) !==
                    -1) && (
                  <Checkbox
                    theme={theme}
                    label={getTranslatedText(staticText?.onCreate)}
                    checked={event.eventTrigger === EventTriggerEnum.OnCreate}
                    onChange={() =>
                      handleTriggerChange(index, EventTriggerEnum.OnCreate)
                    }
                    labelStyles={{ width: 100 }}
                  />
                )}

                {(!props.activeTriggers ||
                  props.activeTriggers?.indexOf(EventTriggerEnum.OnUpdate) !==
                    -1) && (
                  <Checkbox
                    theme={theme}
                    label={getTranslatedText(staticText?.onUpdate)}
                    checked={event.eventTrigger === EventTriggerEnum.OnUpdate}
                    onChange={() =>
                      handleTriggerChange(index, EventTriggerEnum.OnUpdate)
                    }
                    labelStyles={{ width: 100 }}
                  />
                )}

                {(!props.activeTriggers ||
                  props.activeTriggers?.indexOf(EventTriggerEnum.OnClick) !==
                    -1) && (
                  <Checkbox
                    theme={theme}
                    label={getTranslatedText(staticText?.onClick)}
                    checked={event.eventTrigger === EventTriggerEnum.OnClick}
                    onChange={() =>
                      handleTriggerChange(index, EventTriggerEnum.OnClick)
                    }
                    labelStyles={{ width: 100 }}
                  />
                )}

                <span className={styles.eventTypeTitle}>
                  {getTranslatedText(staticText?.eventType)}:
                </span>
                <Checkbox
                  theme={theme}
                  label={getTranslatedText(staticText?.apiCall)}
                  checked={event.eventType === EventTypeEnum.ApiCall}
                  onChange={() =>
                    handleEventTypeChange(index, EventTypeEnum.ApiCall)
                  }
                  labelStyles={{ width: 100 }}
                />
                <Checkbox
                  theme={theme}
                  label={getTranslatedText(staticText?.redirection)}
                  checked={event.eventType === EventTypeEnum.Redirection}
                  onChange={() =>
                    handleEventTypeChange(index, EventTypeEnum.Redirection)
                  }
                  labelStyles={{ width: 100 }}
                />
                <Checkbox
                  theme={theme}
                  label={getTranslatedText(
                    staticText?.microFrontendRedirection
                  )}
                  checked={
                    event.eventType === EventTypeEnum.MicroFrontendRedirection
                  }
                  onChange={() =>
                    handleEventTypeChange(
                      index,
                      EventTypeEnum.MicroFrontendRedirection
                    )
                  }
                  labelStyles={{ width: 100 }}
                />

                {event.eventType === EventTypeEnum.ApiCall && (
                  <div className={styles.confContainer}>
                    <span className={styles.apiTitle}>
                      {getTranslatedText(staticText?.apiCall)}
                    </span>

                    <Input
                      theme={theme}
                      Icon={AiFillApi}
                      value={event.requestMethod}
                      inputProps={{
                        placeholder: getTranslatedText(
                          staticText?.requestMethod
                        ),
                      }}
                      debounce
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newEvents = props.formik.values[
                          props.fieldName
                        ].map((el, i) => {
                          return {
                            ...el,
                            requestMethod:
                              index == i ? e.target.value : el.requestMethod,
                          };
                        });

                        props.formik.setFieldValue(props.fieldName, newEvents);
                      }}
                      label={getTranslatedText(staticText?.requestMethod)}
                    />
                    <Input
                      theme={theme}
                      value={event.requestUrl}
                      Icon={AiFillApi}
                      inputProps={{
                        placeholder: getTranslatedText(staticText?.requestUrl),
                      }}
                      debounce
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newEvents = props.formik.values[
                          props.fieldName
                        ].map((el, i) => {
                          return {
                            ...el,
                            requestUrl:
                              index == i ? e.target.value : el.requestUrl,
                          };
                        });

                        props.formik.setFieldValue(props.fieldName, newEvents);
                      }}
                      label={getTranslatedText(staticText?.requestUrl)}
                    />
                    <Textarea
                      theme={theme}
                      label={getTranslatedText(staticText?.requestData)}
                      value={event.requestData}
                      textareaProps={{
                        placeholder: getTranslatedText(staticText?.requestData),
                      }}
                      debounce
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        const newEvents = props.formik.values[
                          props.fieldName
                        ].map((el, i) => {
                          return {
                            ...el,
                            requestData:
                              index == i ? e.target.value : el.requestData,
                          };
                        });

                        props.formik.setFieldValue(props.fieldName, newEvents);
                      }}
                    />
                    <Checkbox
                      theme={theme}
                      label={getTranslatedText(
                        staticText?.requestDataIsCreatedEntity
                      )}
                      checked={event.requestDataIsCreatedEntity === true}
                      onChange={(checked: boolean) => {
                        const newEvents = props.formik.values[
                          props.fieldName
                        ].map((el, i) => {
                          return {
                            ...el,
                            requestDataIsCreatedEntity:
                              index == i
                                ? checked
                                : el.requestDataIsCreatedEntity,
                          };
                        });

                        props.formik.setFieldValue(props.fieldName, newEvents);
                      }}
                    />

                    <div className={styles.eventsContainer}>
                      <span className={styles.headerTitle}>
                        {getTranslatedText(staticText?.headers)}:
                      </span>

                      {event.requestHeaders?.map(
                        (
                          header: IEventRequestHeaderReadDto,
                          headerIndex: number
                        ) => {
                          return (
                            <div className={styles.singleHeader}>
                              <MdDelete
                                onClick={(_) => {
                                  const newEvents: IEventReadDto[] = [
                                    ...props.formik.values[props.fieldName],
                                  ];
                                  newEvents[index].requestHeaders.splice(
                                    headerIndex,
                                    1
                                  );
                                  props.formik.setFieldValue(
                                    props.fieldName,
                                    newEvents
                                  );
                                }}
                                className={styles.headerDeleteIcon}
                              />

                              <Input
                                theme={theme}
                                inputProps={{
                                  placeholder: getTranslatedText(
                                    staticText?.key
                                  ),
                                }}
                                Icon={HiKey}
                                value={header.key}
                                debounce
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const newEvents = props.formik.values[
                                    props.fieldName
                                  ].map((el: IEventReadDto, i) => {
                                    return {
                                      ...el,
                                      requestHeaders:
                                        index == i
                                          ? el.requestHeaders.map(
                                              (
                                                header: IEventRequestHeaderReadDto,
                                                i: number
                                              ) => {
                                                return {
                                                  key:
                                                    i === headerIndex
                                                      ? e.target.value
                                                      : header.key,
                                                  value: header.value,
                                                };
                                              }
                                            )
                                          : el.requestHeaders,
                                    };
                                  });

                                  props.formik.setFieldValue(
                                    props.fieldName,
                                    newEvents
                                  );
                                }}
                              />
                              <Input
                                theme={theme}
                                inputProps={{
                                  placeholder: getTranslatedText(
                                    staticText?.value
                                  ),
                                }}
                                value={header.value}
                                debounce
                                Icon={BiText}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const newEvents = props.formik.values[
                                    props.fieldName
                                  ].map((el: IEventReadDto, i) => {
                                    return {
                                      ...el,
                                      requestHeaders:
                                        index == i
                                          ? el.requestHeaders.map(
                                              (
                                                header: IEventRequestHeaderReadDto,
                                                i: number
                                              ) => {
                                                return {
                                                  key: header.key,
                                                  value:
                                                    i === headerIndex
                                                      ? e.target.value
                                                      : header.value,
                                                };
                                              }
                                            )
                                          : el.requestHeaders,
                                    };
                                  });

                                  props.formik.setFieldValue(
                                    props.fieldName,
                                    newEvents
                                  );
                                }}
                              />
                            </div>
                          );
                        }
                      )}

                      <Button
                        theme={theme}
                        onClick={(
                          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => {
                          e.preventDefault();
                          const newHeader: IEventRequestHeaderReadDto = {
                            key: "",
                            value: "",
                          };
                          const newEvents = props.formik.values[
                            props.fieldName
                          ].map((el: IEventReadDto, i) => {
                            return {
                              ...el,
                              requestHeaders:
                                index == i
                                  ? [...(el.requestHeaders ?? []), newHeader]
                                  : el.requestHeaders,
                            };
                          });

                          props.formik.setFieldValue(
                            props.fieldName,
                            newEvents
                          );
                        }}
                      >
                        {getTranslatedText(staticText?.addHeader)}{" "}
                        <CgAdd className={styles.addHeaderIcon} />
                      </Button>
                    </div>
                  </div>
                )}
                {event.eventType === EventTypeEnum.Redirection && (
                  <div className={styles.confContainer}>
                    <span className={styles.redirectionTitle}>
                      {getTranslatedText(staticText?.redirection)}
                    </span>

                    <Input
                      theme={theme}
                      Icon={AiFillApi}
                      value={event.redirectionUrl}
                      inputProps={{
                        placeholder: getTranslatedText(
                          staticText?.redirectionUrl
                        ),
                      }}
                      debounce
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newEvents = props.formik.values[
                          props.fieldName
                        ].map((el, i) => {
                          return {
                            ...el,
                            redirectionUrl:
                              index == i ? e.target.value : el.redirectionUrl,
                          };
                        });

                        props.formik.setFieldValue(props.fieldName, newEvents);
                      }}
                      label={getTranslatedText(staticText?.redirectionUrl)}
                    />
                    <Checkbox
                      theme={theme}
                      checked={event.redirectionToSelf}
                      onChange={(checked: boolean) => {
                        const newEvents = props.formik.values[
                          props.fieldName
                        ].map((el, i) => {
                          return {
                            ...el,
                            redirectionToSelf:
                              index === i ? checked : el.redirectionToSelf,
                          };
                        });

                        props.formik.setFieldValue(props.fieldName, newEvents);
                      }}
                      label={getTranslatedText(staticText?.redirectionToSelf)}
                    />
                  </div>
                )}
                {event.eventType === EventTypeEnum.MicroFrontendRedirection && (
                  <SearchInput
                    theme={theme}
                    getElementTitle={(el: IMicroFrontendReadDto) => el.name}
                    searchPromise={handleSearchMicroFrontendsPromise}
                    label={getTranslatedText(staticText?.searchMicroFrontends)}
                    onElementClick={(microFrontend: IMicroFrontendReadDto) =>
                      handleSelectOrUnselectMicroFrontend(index, microFrontend)
                    }
                  />
                )}
                {event.microFrontend && (
                  <div className={styles.selectedMicroFrontendContainer}>
                    <span className={styles.microFrontendName}>
                      {(event.microFrontend as IMicroFrontendReadDto)?.name}
                    </span>
                    <MdDelete
                      className={styles.unselectMicroFrontendButton}
                      onClick={() =>
                        handleSelectOrUnselectMicroFrontend(index, null)
                      }
                    />

                    <InputSelect
                      theme={theme}
                      label={getTranslatedText(staticText?.components)}
                      options={(
                        (event.microFrontend as IMicroFrontendReadDto)
                          .components as IMicroFrontendComponentReadDto[]
                      ).map((component) => {
                        return {
                          label: component.name,
                          value: component._id,
                        };
                      })}
                      value={{
                        label:
                          (
                            (event.microFrontend as IMicroFrontendReadDto)
                              .components as IMicroFrontendComponentReadDto[]
                          ).find(
                            (el) =>
                              el._id.toString() ===
                              event.microFrontendComponentId
                          )?.name || "",
                        value:
                          (
                            (event.microFrontend as IMicroFrontendReadDto)
                              .components as IMicroFrontendComponentReadDto[]
                          ).find(
                            (el) =>
                              el._id.toString() ===
                              event.microFrontendComponentId
                          )?._id || "",
                      }}
                      onChange={(option) =>
                        handleSelectMicroFrontendComponent(index, option)
                      }
                    />
                  </div>
                )}
              </div>
            );
          }
        )}

      {open && (
        <Button theme={theme} onClick={handleAddEvent}>
          {getTranslatedText(staticText?.addEvent)}{" "}
          <BiPlus className={styles.plusButton} />
        </Button>
      )}
    </div>
  );
};

export default React.memo(EventsEditor);
