import React from "react";
import { IAddressReadDto, ITheme } from "roottypes";
import { MdOutlineEdit } from "react-icons/md";
import Loading from "react-loading";

import { useAppSelector } from "../../../store/hooks";

import useStyles from "./addressInfo.styles";
import AddressForm from "../addressForm/AddressForm";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import useDeleteAddresses from "../../../hooks/apiHooks/useDeleteAddresses";

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
  const { deleteAddresses, loading: deleteAddressLoading } =
    useDeleteAddresses();

  const handleEditClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setIsEditing(true);
  };
  const handleSelect = () => {
    props.onSelect();
  };
  const handleDelete = () => {
    deleteAddresses([props.address._id.toString()]);
  };
  const handleSubmit = () => {
    setIsEditing(false);
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
      {deleteAddressLoading && <Loading color={theme.primary} />}
      {!isEditing && !deleteAddressLoading && (
        <React.Fragment>
          <div className={styles.addressActionsContainer}>
            <span className={styles.actionButton} onClick={handleDelete}>
              {getTranslatedText(staticText?.delete)}
            </span>
            {!props.isSelected && (
              <span className={styles.actionButton} onClick={handleSelect}>
                {getTranslatedText(staticText?.select)}
              </span>
            )}
            <MdOutlineEdit
              onClick={handleEditClick}
              className={styles.editButton}
            />
          </div>

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

      {isEditing && !deleteAddressLoading && (
        <React.Fragment>
          <AddressForm
            address={props.address}
            onCancelClick={() => setIsEditing(false)}
            onSubmit={handleSubmit}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default AddressInfo;
