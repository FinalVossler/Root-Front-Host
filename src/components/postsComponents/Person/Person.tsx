import React from "react";

import { useAppSelector } from "../../../store/hooks";

import useStyles from "./person.styles";
import { ITheme } from "roottypes";

interface IPersonProps {
  name?: string;
  occupation?: string;
  description?: string;
  cvLink?: string;
  picture?: string;
}

const Person: React.FunctionComponent<IPersonProps> = (props: IPersonProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  return (
    <div className={styles.personContainer} {...props}>
      <div
        className={styles.picture}
        style={{
          backgroundImage:
            "url(" + (props.picture || "/assets/images/hamza.jpeg") + ")",
        }}
      ></div>

      <span className={styles.name}>{props.name || "Hamza Khalifa"}</span>
      <span className={styles.occupation}>
        {props.occupation || "Software Engineer"}
      </span>

      <a
        target="_blank"
        rel="noreferrer"
        href={props.cvLink || ""}
        className={styles.cvButton}
        download
      >
        Télécharger le CV
      </a>
    </div>
  );
};

export default Person;
