import React from "react";

import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";

import useStyles from "./person.styles";

interface IPerson {
  name?: string;
  occupation?: string;
  description?: string;
  cvLink?: string;
  picture?: string;
}

const Person: React.FunctionComponent<IPerson> = (props: IPerson) => {
  const theme: Theme = useAppSelector(
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