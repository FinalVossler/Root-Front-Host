import React from "react";
import { IAddressReadDto, ITheme } from "roottypes";
import { MdOutlineEdit } from "react-icons/md";

import { useAppSelector } from "../../../store/hooks";

import useStyles from "./addressInfo.styles";
import AddressForm from "../addressForm/AddressForm";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";

interface IAddressInfoProps {
  address: IAddressReadDto;
  isSelected: boolean;
  onSelect: () => void;
}

const AddressInfo: React.FunctionComponent<IAddressInfoProps> = (
  props: IAddressInfoProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  const handleEditClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setIsEditing(true);
  };
  const handleSelect = () => {
    props.onSelect();
  };

  return (
    <div
      className={
        props.isSelected
          ? styles.selectedAddressInfoContainer
          : styles.addressInfoContainer
      }
    >
      {!isEditing && (
        <React.Fragment>
          <MdOutlineEdit
            onClick={handleEditClick}
            className={styles.editButton}
          />
          {!props.isSelected && (
            <span className={styles.select} onClick={handleSelect}>
              {getTranslatedText(staticText?.select)}
            </span>
          )}

          {props.address.addressLine1 ||
            (props.address.addressLine2 && (
              <span>
                {props.address.addressLine1 || props.address.addressLine2}
              </span>
            ))}
          {props.address.addressLine1 && props.address.addressLine2 && (
            <span>{props.address.addressLine2}</span>
          )}
          <div className={styles.horizontalDetails}>
            <span>{props.address.city}, </span>
            <span className={styles.horizontalInfo}>
              {props.address.postalCode}{" "}
            </span>
            {props.address.region && (
              <span className={styles.horizontalInfo}>
                {props.address.region}
              </span>
            )}
            {props.address.country && (
              <span className={styles.horizontalInfo}>
                {props.address.country}
              </span>
            )}
          </div>
        </React.Fragment>
      )}

      {isEditing && (
        <React.Fragment>
          <AddressForm
            address={props.address}
            onCancelClick={() => setIsEditing(false)}
            onSubmit={() => setIsEditing(false)}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default AddressInfo;
