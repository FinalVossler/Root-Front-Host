import React from "react";
import { useParams } from "react-router-dom";
import "suneditor/dist/css/suneditor.min.css";

import Modal from "../../modal";
import EntityEditorForm from "./EntityEditorForm";
import { IEntityReadDto } from "roottypes";
import { useAppDispatch } from "../../../store/hooks";
import { editorSlice } from "../../../store/slices/editorSlice";

export interface IEntityEditorProps {
  entity?: IEntityReadDto;
  modelId?: string;
  id: string;
}

const EntityEditor: React.FunctionComponent<IEntityEditorProps> = (
  props: IEntityEditorProps
) => {
  const dispatch = useAppDispatch();
  const { modelId } = useParams();
  const actualModelId = React.useMemo(
    () => props.modelId ?? modelId,
    [modelId, props.modelId]
  );

  //#region Event listeners
  const handleCloseEditor = () => {
    dispatch(editorSlice.actions.removeEditor(props.id));
  };
  //#endregion Event listeners

  return (
    <Modal handleClose={handleCloseEditor} open>
      <EntityEditorForm
        entity={props.entity}
        modelId={actualModelId}
        handleCloseEditor={handleCloseEditor}
      />
    </Modal>
  );
};

export default React.memo(EntityEditor);
