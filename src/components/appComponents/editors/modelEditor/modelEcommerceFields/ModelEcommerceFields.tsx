import { FormikProps } from "formik";
import { toast } from "react-toastify";
import { FieldTypeEnum, IFieldReadDto, IModelReadDto } from "roottypes";

import { IModelForm } from "../ModelEditor";
import useGetTranslatedText from "../../../../../hooks/useGetTranslatedText";
import SearchInput from "../../../../fundamentalComponents/inputs/searchInput";
import { useAppSelector } from "../../../../../store/hooks";
import useSearchFields from "../../../../../hooks/apiHooks/useSearchFields";

import useStyles from "./modelEditor.styles";
import { IoIosRemoveCircleOutline } from "react-icons/io";

interface IModelEcommerceFieldsProps {
  formik: FormikProps<IModelForm>;
  model: IModelReadDto | undefined;
}

const ModelEcommerceFields: React.FunctionComponent<
  IModelEcommerceFieldsProps
> = (props: IModelEcommerceFieldsProps) => {
  const theme = useAppSelector((state) => state.websiteConfiguration.theme);
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.models
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { handleSearchFieldsPromise } = useSearchFields(props.model);

  return (
    <div>
      {!props.formik.values.priceField && (
        <SearchInput
          theme={theme}
          inputProps={{
            placeholder: getTranslatedText(staticText?.priceField),
          }}
          searchPromise={handleSearchFieldsPromise}
          getElementTitle={(field: IFieldReadDto) =>
            getTranslatedText(field.name)
          }
          onElementClick={(priceField: IFieldReadDto) => {
            if (priceField.type !== FieldTypeEnum.Number) {
              return toast.error(
                getTranslatedText(staticText?.priceFieldShouldBeOfTypeNumber)
              );
            }
            props.formik.setFieldValue("priceField", priceField);
          }}
        />
      )}

      {props.formik.values.priceField && (
        <div className={styles.ecommerceFieldContainer}>
          {getTranslatedText(staticText?.priceField)}:{" "}
          {getTranslatedText(props.formik.values.priceField.name)}
          <IoIosRemoveCircleOutline
            className={styles.removeEcommerceFieldIcon}
            onClick={() => props.formik.setFieldValue("priceField", undefined)}
          />
        </div>
      )}

      {!props.formik.values.quantityField && (
        <SearchInput
          theme={theme}
          inputProps={{
            placeholder: getTranslatedText(staticText?.quantityField),
          }}
          searchPromise={handleSearchFieldsPromise}
          getElementTitle={(field: IFieldReadDto) =>
            getTranslatedText(field.name)
          }
          onElementClick={(quantityField: IFieldReadDto) => {
            if (quantityField.type !== FieldTypeEnum.Number) {
              return toast.error(
                getTranslatedText(staticText?.quantityFieldShouldBeOfTypeNumber)
              );
            }
            props.formik.setFieldValue("quantityField", quantityField);
          }}
        />
      )}
      {props.formik.values.quantityField && (
        <div className={styles.ecommerceFieldContainer}>
          {getTranslatedText(staticText?.quantityField)}:{" "}
          {getTranslatedText(props.formik.values.quantityField.name)}
          <IoIosRemoveCircleOutline
            className={styles.removeEcommerceFieldIcon}
            onClick={() =>
              props.formik.setFieldValue("quantityField", undefined)
            }
          />
        </div>
      )}

      {!props.formik.values.imageField && (
        <SearchInput
          theme={theme}
          inputProps={{
            placeholder: getTranslatedText(staticText?.imageField),
          }}
          searchPromise={handleSearchFieldsPromise}
          getElementTitle={(field: IFieldReadDto) =>
            getTranslatedText(field.name)
          }
          onElementClick={(imageField: IFieldReadDto) => {
            if (imageField.type !== FieldTypeEnum.File) {
              return toast.error(
                getTranslatedText(staticText?.imageFieldShouldBeOfTypeFile)
              );
            }
            props.formik.setFieldValue("imageField", imageField);
          }}
        />
      )}
      {props.formik.values.imageField && (
        <div className={styles.ecommerceFieldContainer}>
          {getTranslatedText(staticText?.imageField)}:{" "}
          {getTranslatedText(props.formik.values.imageField.name)}
          <IoIosRemoveCircleOutline
            className={styles.removeEcommerceFieldIcon}
            onClick={() => props.formik.setFieldValue("imageField", undefined)}
          />
        </div>
      )}
    </div>
  );
};

export default ModelEcommerceFields;
