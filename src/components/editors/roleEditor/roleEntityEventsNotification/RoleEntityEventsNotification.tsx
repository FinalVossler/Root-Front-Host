import { useFormik } from "formik";
import React from "react";
import { BiPlus, BiText } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { Theme } from "../../../../config/theme";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import { EventNotificationTrigger } from "../../../../store/slices/roleSlice";
import Button from "../../../button";
import Checkbox from "../../../checkbox";
import Input from "../../../input";
import Textarea from "../../../textarea/Textarea";
import { IEventNotificationForm, IRoleForm } from "../RoleEditor";

import useStyles from "./roleEntityEventsNotification.styles";

interface IRoleEntityEventsNotification {
  eventNotifications: IEventNotificationForm[];
  handleApplyEventNotifications: (
    eventNotifications: IEventNotificationForm[]
  ) => void;
}

const RoleEntityEventsNotification: React.FunctionComponent<IRoleEntityEventsNotification> =
  (props: IRoleEntityEventsNotification) => {
    const theme: Theme = useAppSelector(
      (state) => state.websiteConfiguration.theme
    );
    const staticText = useAppSelector(
      (state) => state.websiteConfiguration.staticText?.roles
    );

    const styles = useStyles({ theme });
    const getTranslatedText = useGetTranslatedText();
    const formik = useFormik<{ eventNotifications: IEventNotificationForm[] }>({
      initialValues: {
        eventNotifications: props.eventNotifications,
      },
      onSubmit: (values: {
        eventNotifications: IEventNotificationForm[];
      }) => {},
    });

    const handleFieldChange = (
      value: string | boolean,
      eventNotificationIndex: number,
      fieldName: string
    ) => {
      const newValues = formik.values.eventNotifications.map((not, index) => {
        if (index === eventNotificationIndex) {
          return { ...not, [fieldName]: value };
        } else {
          return not;
        }
      });
      formik.setFieldValue("eventNotifications", newValues);
      props.handleApplyEventNotifications(newValues);
    };

    const handleAddEvent = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const newEvent: IEventNotificationForm = {
        text: "",
        title: "",
        trigger: EventNotificationTrigger.OnCreate,
      };
      const newValues: IEventNotificationForm[] = [
        ...formik.values.eventNotifications,
        newEvent,
      ];
      formik.setFieldValue("eventNotifications", newValues);
      props.handleApplyEventNotifications(newValues);
    };

    const handleDeleteEvent = (index: number) => {
      const newValues = [...formik.values.eventNotifications.splice(1, index)];
      formik.setFieldValue("eventNotifications", newValues);
      props.handleApplyEventNotifications(newValues);
    };

    return (
      <div className={styles.roleEntityEventNotificationContainer}>
        {formik.values.eventNotifications.map(
          (eventNotification: IEventNotificationForm, index: number) => {
            return (
              <div key={index} className={styles.singleEventNotification}>
                <MdDelete
                  onClick={() => handleDeleteEvent(index)}
                  className={styles.deleteIcon}
                />
                <Checkbox
                  label={getTranslatedText(staticText?.onCreate)}
                  checked={
                    eventNotification.trigger ===
                    EventNotificationTrigger.OnCreate
                  }
                  onChange={() =>
                    handleFieldChange(
                      EventNotificationTrigger.OnCreate,
                      index,
                      "trigger"
                    )
                  }
                  labelStyles={{ width: 100 }}
                />
                <Input
                  onChange={(e) =>
                    handleFieldChange(e.target.value, index, "title")
                  }
                  label={getTranslatedText(staticText?.eventTitle)}
                  value={eventNotification.title}
                  Icon={BiText}
                />
                <Textarea
                  onChange={(e) =>
                    handleFieldChange(e.target.value, index, "text")
                  }
                  value={eventNotification.text}
                  label={getTranslatedText(staticText?.eventDescription)}
                />
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

export default React.memo(RoleEntityEventsNotification);
