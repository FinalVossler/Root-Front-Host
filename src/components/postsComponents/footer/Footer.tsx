import React from "react";
import { BsInstagram, BsFacebook, BsYoutube, BsLinkedin } from "react-icons/bs";

import { ITheme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import { IWebsiteConfiguration } from "../../../store/slices/websiteConfigurationSlice";

import useStyles from "./footer.styles";

interface IFooterProps {
  title?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  description?: string;
}

const Footer: React.FunctionComponent<IFooterProps> = (props: IFooterProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const title: string | undefined = useAppSelector(
    (state) => state.websiteConfiguration.title
  );
  const conf: IWebsiteConfiguration = useAppSelector(
    (state) => state.websiteConfiguration
  );

  const styles = useStyles({ theme });

  return (
    <div className={styles.footerContainer}>
      <div className={styles.top}>
        <div className={styles.socialMedia}>
          <span className={styles.socialMediaTitle}>
            {props.title || title || "Get closer to us"}
          </span>
          <div className={styles.socialMediaIcons}>
            {props.instagram && (
              <a target={"_blank"} href={props.instagram}>
                <BsInstagram className={styles.socialMediaIcon} color="white" />
              </a>
            )}
            {props.facebook && (
              <a target={"_blank"} href={props.facebook}>
                <BsFacebook className={styles.socialMediaIcon} color="white" />
              </a>
            )}
            {props.youtube && (
              <a target={"_blank"} href={props.youtube}>
                <BsYoutube className={styles.socialMediaIcon} color="white" />
              </a>
            )}
            {props.linkedin && (
              <a target={"_blank"} href={props.linkedin}>
                <BsLinkedin className={styles.socialMediaIcon} color="white" />
              </a>
            )}
          </div>
        </div>
      </div>

      {conf.phoneNumber && (
        <span className={styles.phoneNumberOrEmail}>
          Téléphone: {conf.phoneNumber}
        </span>
      )}
      {conf.email && (
        <span className={styles.phoneNumberOrEmail}>Email: {conf.email}</span>
      )}

      <div className={styles.year}>
        {props.description ||
          "© 2022-2023 Humanitarian Socionics. To quote materials from SHS - only according to the copyright rules!"}
      </div>
    </div>
  );
};

export default Footer;
