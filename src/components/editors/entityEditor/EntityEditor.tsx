import React from "react";
import "suneditor/dist/css/suneditor.min.css";

import Modal from "../../modal";
import { IEntity } from "../../../store/slices/entitySlice";
import { useParams } from "react-router-dom";
import EntityEditorForm from "./EntityEditorForm";

export interface IEntityEditor {
  entity?: IEntity;
  open: boolean;
  setOpen: (boolean) => void;
  // This one is used for when we use the entity editor as a post (the editor could exist in any page)
  modelId?: string;
}

const EntityEditor = (props: IEntityEditor) => {
  const { modelId } = useParams();
  const actualModelId = React.useMemo(
    () => props.modelId ?? modelId,
    [modelId, props.modelId]
  );

  //#region Event listeners
  const handleCloseModal = () => {
    props.setOpen(false);
  };
  //#endregion Event listeners

  return (
    <Modal handleClose={handleCloseModal} open={props.open}>
      <EntityEditorForm
        entity={props.entity}
        modelId={actualModelId}
        open={props.open}
        setOpen={props.setOpen}
      />
    </Modal>
  );
};

export default React.memo(EntityEditor);
