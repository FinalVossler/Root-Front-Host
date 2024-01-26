import React from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import MessageFilePreview from "./components/chatComponents/message/messageFilePreview";
import { chatSlice } from "./store/slices/chatSlice";
import {
  IEntityReadDto,
  IFieldReadDto,
  IFileReadDto,
  IMicroFrontendReadDto,
  IModelReadDto,
  IPageReadDto,
  IRoleReadDto,
  IUserReadDto,
  PermissionEnum,
} from "roottypes";
import { EditorTypeEnum } from "./store/slices/editorSlice";
import FieldEditor from "./components/editors/fieldEditor";
import ModelEditor from "./components/editors/modelEditor";
import EntityEditor from "./components/editors/entityEditor";
import UserEditor from "./components/editors/userEditor";
import MicroFrontendEditor from "./components/editors/microFrontendEditor";
import RoleEditor from "./components/editors/roleEditor";
import PageEditor from "./components/editors/pageEditor";
import useHasPermission from "./hooks/useHasPermission";
import WebsiteConfigurationEditor from "./components/editors/websiteConfigurationEditor";

interface IAppModalsAndEditorsProps {}

const AppModalsAndEditors: React.FunctionComponent<
  IAppModalsAndEditorsProps
> = (props: IAppModalsAndEditorsProps) => {
  const messageFilePreviews = useAppSelector(
    (state) => state.chat.messageFilePreviews
  );
  const editors = useAppSelector((state) => state.editor.editors);

  const dispatch = useAppDispatch();
  const { hasPermission } = useHasPermission();
  return (
    <React.Fragment>
      {messageFilePreviews.map((messageFilePreview) => {
        return (
          <MessageFilePreview
            key={messageFilePreview.file?._id?.toString() || ""}
            message={messageFilePreview.message}
            file={messageFilePreview.file as IFileReadDto}
            onClose={() =>
              dispatch(
                chatSlice.actions.removeMessageFilePreviews({
                  messageId: messageFilePreview.message._id.toString(),
                })
              )
            }
          />
        );
      })}

      {hasPermission(PermissionEnum.EditConfiguration) && (
        <WebsiteConfigurationEditor />
      )}

      {editors.map((e) => {
        switch (e.editorType) {
          case EditorTypeEnum.Field:
            return (
              <FieldEditor
                key={e.id}
                id={e.id}
                field={e.element as IFieldReadDto}
              />
            );
          case EditorTypeEnum.Model:
            return (
              <ModelEditor
                key={e.id}
                id={e.id}
                model={e.element as IModelReadDto}
              />
            );

          case EditorTypeEnum.Entity:
            return (
              <EntityEditor
                key={e.id}
                id={e.id}
                entity={e.element as IEntityReadDto}
                modelId={e.modelId}
              />
            );

          case EditorTypeEnum.User:
            return (
              <UserEditor
                key={e.id}
                id={e.id}
                user={e.element as IUserReadDto}
              />
            );

          case EditorTypeEnum.Role:
            return (
              <RoleEditor
                key={e.id}
                id={e.id}
                role={e.element as IRoleReadDto}
              />
            );

          case EditorTypeEnum.MicroFrontend:
            return (
              <MicroFrontendEditor
                key={e.id}
                id={e.id}
                microFrontend={e.element as IMicroFrontendReadDto}
              />
            );

          case EditorTypeEnum.Page:
            return (
              <PageEditor
                key={e.id}
                id={e.id}
                page={e.element as IPageReadDto}
              />
            );
          default:
            return null;
        }
      })}
    </React.Fragment>
  );
};

export default AppModalsAndEditors;
