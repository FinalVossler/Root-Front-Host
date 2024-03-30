import {
  IEntityReadDto,
  IFieldReadDto,
  IFileReadDto,
  IModelReadDto,
} from "roottypes";

const getProductImageUrl = (params: {
  product: IEntityReadDto | undefined;
  model?: IModelReadDto | undefined;
  models?: IModelReadDto[] | undefined;
}): string => {
  if (!params.product) return "";

  if (!params.model && !params.models) {
    return "";
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

  if (!model) return "";

  const imageFieldId = (model.imageField as IFieldReadDto)._id.toString();

  const imageUrl =
    (
      params.product.entityFieldValues
        .find(
          (efv) => (efv.field as IFieldReadDto)._id.toString() === imageFieldId
        )
        ?.files.at(0) as IFileReadDto
    ).url || "";

  return imageUrl;
};

export default getProductImageUrl;
