import React from "react";

import { ITheme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";
import { IModel } from "../../store/slices/modelSlice";
import TasksByModel from "./taskByModel";

import useStyles from "./tasksPage.styles";

interface ITasksPage {}

const TasksPage: React.FunctionComponent<ITasksPage> = (props: ITasksPage) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const models: IModel[] = useAppSelector((state) => state.model.models);

  const styles = useStyles({ theme });

  return (
    <div className={styles.tasksPageContainer}>
      {models.map((model, modelIndex: number) => {
        return <TasksByModel key={modelIndex} modelId={model._id.toString()} />;
      })}
    </div>
  );
};

export default React.memo(TasksPage);
