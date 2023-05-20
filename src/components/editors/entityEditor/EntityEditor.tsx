import React from "react";
import "suneditor/dist/css/suneditor.min.css";

import Modal from "../../modal";
import { IEntity } from "../../../store/slices/entitySlice";
import { useParams } from "react-router-dom";
import EntityEditorForm from "./EntityEditorForm";

export interface IEntityEditor {
  entity?: IEntity;
  open?: boolean;
  setOpen?: (boolean) => void;
  // This one is used for when we use the entity editor as a post (the editor could exist in any page)
  modelId?: string;
}

const EntityEditor = (props: IEntityEditor) => {
  const { modelId } = useParams();
  const actualModelId = props.modelId ?? modelId;

  //#region Local state
  const [modelModalOpen, setModelModalOpen] = React.useState<boolean>(false);
  //#endregion Local state

  //#region Effects
  React.useEffect(() => {
    if (props.open !== undefined && modelModalOpen !== props.open) {
      setModelModalOpen(props.open);
    }
  }, [props.open]);
  //#endregion Effects

  //#region Event listeners
  const handleCloseModal = () => {
    if (props.setOpen) {
      props.setOpen(false);
    } else setModelModalOpen(false);
  };
  //#endregion Event listeners

  return (
    <Modal handleClose={handleCloseModal} open={modelModalOpen}>
      <EntityEditorForm
        modelId={actualModelId}
        open={props.open}
        setOpen={props.setOpen}
      />
    </Modal>
  );
};

export default React.memo(EntityEditor);
