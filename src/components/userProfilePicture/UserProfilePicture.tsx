import React from "react";
import { GoPerson } from "react-icons/go";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./userProfilePicture.styles";

export enum SizeEnum {
  VeryBig = "VeryBig",
  Big = "big",
  Average = "average",
  Small = "small",
}

interface IUserProfilePicture {
  url: string | undefined;
  size: SizeEnum;
  onClick?: any;
}

const UserProfilePicture = (props: IUserProfilePicture) => {
  const styles = useStyles();
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  // Create an empty object if the profile picture name is undefined or null
  const styleObject = props.url
    ? {
        backgroundImage: "url(" + props.url + ")",
      }
    : {};

  let containerClassName = styles.average;
  switch (props.size) {
    case SizeEnum.Big:
      containerClassName = styles.big;
      break;
    case SizeEnum.Average:
      containerClassName = styles.average;
      break;
    case SizeEnum.Small:
      containerClassName = styles.small;
      break;
    case SizeEnum.VeryBig:
      containerClassName = styles.verBig;
      break;
  }
  return (
    <div
      onClick={props.onClick}
      className={containerClassName}
      style={styleObject}
    >
      {!props.url && (
        <GoPerson
          size={
            {
              [SizeEnum.Big]: 100,
              [SizeEnum.Average]: 70,
              [SizeEnum.Small]: 40,
              [SizeEnum.VeryBig]: 150,
            }[props.size]
          }
          color={theme.primary}
        />
      )}
    </div>
  );
};

export default React.memo(UserProfilePicture);
