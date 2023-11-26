import React from "react";

import useStyles from "./stateTracking.styles";
import { useAppSelector } from "../../../store/hooks";

interface IState {
  _id: string;
  stateName: string;
}

interface IStateTrackingProps {
  currentState: IState;
  states: IState[];
}

const StateTracking: React.FunctionComponent<IStateTrackingProps> = (
  props: IStateTrackingProps
) => {
  const theme = useAppSelector((state) => state.websiteConfiguration.theme);

  const styles = useStyles({ theme });

  const indexOfCurrent: number = props.states.findIndex(
    (el) => el._id === props.currentState._id
  );
  const numberOfLinesToHighlight = indexOfCurrent;

  const numberOfLines = props.states.length - 1;

  const percentage = numberOfLinesToHighlight / (numberOfLines / 100);
  const background =
    "linear-gradient(to right, " +
    theme.primary +
    " " +
    percentage +
    "%, rgb(129 129 129 / 30%) 0%)";

  return (
    <div
      className={styles.stateTrackingContainer}
      style={{
        background,
      }}
    >
      {props.states.map((state, stateIndex) => {
        return (
          <div
            className={
              stateIndex <= indexOfCurrent ? styles.activeBullet : styles.bullet
            }
            key={stateIndex}
          >
            <span
              className={
                stateIndex <= indexOfCurrent
                  ? styles.activeStateName
                  : styles.stateName
              }
            >
              {state.stateName}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StateTracking;
