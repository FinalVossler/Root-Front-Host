import { toast } from "react-toastify";
import { IEntityReadDto, IFieldReadDto, IModelReadDto } from "roottypes";

const validateProductQuantity = (params: {
  product: IEntityReadDto;
  quantity: number;
  model: IModelReadDto;
  unknownQuantityErrorText: string;
  notEnoughQuantityErrorText;
}): boolean => {
  const quantityFieldId = params.model.quantityField as string;

  const maxQuantity = params.product.entityFieldValues
    .find(
      (efv) => (efv.field as IFieldReadDto)._id.toString() === quantityFieldId
    )
    ?.value.at(0)?.text;

  if (!maxQuantity) {
    toast.error(params.unknownQuantityErrorText);
    return false;
  }
  if (parseInt(maxQuantity) < params.quantity) {
    toast.error(params.notEnoughQuantityErrorText);

    return false;
  }

  return true;
};

export default validateProductQuantity;
