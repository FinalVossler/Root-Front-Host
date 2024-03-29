import React from "react";
import { GoPerson } from "react-icons/go";
import { ITheme } from "roottypes";

import useStyles from "./userProfilePicture.styles";

export enum SizeEnum {
  VeryBig = "VeryBig",
  Big = "big",
  Average = "average",
  Small = "small",
  VerySmall = "verySmall",
}

interface IUserProfilePictureProps {
  url: string | undefined;
  size: SizeEnum;
  onClick?: any;
  theme: ITheme;
}

const UserProfilePicture: React.FunctionComponent<IUserProfilePictureProps> = (
  props: IUserProfilePictureProps
) => {
  const styles = useStyles({ theme: props.theme });

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
      containerClassName = styles.veryBig;
      break;
    case SizeEnum.VerySmall:
      containerClassName = styles.verySmall;
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
              [SizeEnum.VeryBig]: 150,
              [SizeEnum.Big]: 100,
              [SizeEnum.Average]: 70,
              [SizeEnum.Small]: 40,
              [SizeEnum.VerySmall]: 10,
            }[props.size]
          }
          className={styles.defaultAvatar}
        />
      )}
    </div>
  );
};

export default React.memo(UserProfilePicture);
