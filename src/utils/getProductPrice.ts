import { IEntityReadDto, IFieldReadDto, IModelReadDto } from "roottypes";

const getProductPrice = (params: {
  product: IEntityReadDto | undefined;
  model?: IModelReadDto | undefined;
  models?: IModelReadDto[] | undefined;
}): number => {
  if (!params.product) return 0;

  if (!params.model && !params.models) {
    return 0;
  }

  const model =
    params.model ||
    params.models?.find(
      (m) =>
        m._id.toString() ===
        (
          (params.product as IEntityReadDto).model as IModelReadDto
        )._id.toString()
    );

  if (!model) return 0;

  const priceFieldId = (model.priceField as IFieldReadDto)._id.toString();

  const priceValue = params.product.entityFieldValues
    .find((efv) => (efv.field as IFieldReadDto)._id.toString() === priceFieldId)
    ?.value.at(0)?.text;

  return parseInt(priceValue || "");
};

export default getProductPrice;
