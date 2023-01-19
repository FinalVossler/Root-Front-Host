import React from "react";
import { useTheme } from "react-jss";
import { BsInstagram, BsFacebook, BsYoutube, BsLinkedin } from "react-icons/bs";

import { Theme } from "../../config/theme";

import useStyles from "./footer.styles";

interface IFooter {}
const Footer: React.FunctionComponent<IFooter> = (props: IFooter) => {
  const theme: Theme = useTheme();
  const styles = useStyles({ theme });

  return (
    <div className={styles.footerContainer}>
      <div className={styles.top}>
        <div className={styles.socialMedia}>
          <span className={styles.socialMediaTitle}>Get closer to us</span>
          <div className={styles.socialMediaIcons}>
            <a target={"_blank"} href="https://instagram.com">
              <BsInstagram className={styles.socialMediaIcon} color="white" />
            </a>
            <a target={"_blank"} href="https://instagram.com">
              <BsFacebook className={styles.socialMediaIcon} color="white" />
            </a>
            <a target={"_blank"} href="https://instagram.com">
              <BsYoutube className={styles.socialMediaIcon} color="white" />
            </a>
            <a target={"_blank"} href="https://instagram.com">
              <BsLinkedin className={styles.socialMediaIcon} color="white" />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.year}>
        © 2022-2023 Humanitarian Socionics. To quote materials from SHS - only
        according to the copyright rules!
      </div>
    </div>
  );
};

export default Footer;
