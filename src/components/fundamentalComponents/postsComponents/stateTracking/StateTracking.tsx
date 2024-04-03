import React from "react";
import { ITheme } from "roottypes";

import useStyles from "./stateTracking.styles";
import doNothing from "../../../../utils/doNothing";

export interface IStateTrackingState {
  _id: string;
  stateName: string;
}

interface IStateTrackingProps {
  currentState: IStateTrackingState | undefined;
  states: IStateTrackingState[];
  theme: ITheme;
  clickableBullets?: boolean;
  onStateClick?: (state: IStateTrackingState) => void;
  disabled?: boolean;
}

const StateTracking: React.FunctionComponent<IStateTrackingProps> = (
  props: IStateTrackingProps
) => {
  const styles = useStyles({ theme: props.theme });

  const indexOfCurrent: number =
    props.states.findIndex((el) => el._id === props.currentState?._id) || -1;
  const numberOfLinesToHighlight = indexOfCurrent;

  const numberOfLines = props.states.length - 1;

  const percentage = numberOfLinesToHighlight / (numberOfLines / 100);
  const background =
    "linear-gradient(to right, " +
    props.theme.primary +
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
            key={stateIndex}
            className={
              stateIndex <= indexOfCurrent ? styles.activeBullet : styles.bullet
            }
            style={{ ...(props.clickableBullets ? { cursor: "pointer" } : {}) }}
            onClick={() =>
              props.onStateClick && !props.disabled
                ? props.onStateClick(state)
                : doNothing()
            }
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
