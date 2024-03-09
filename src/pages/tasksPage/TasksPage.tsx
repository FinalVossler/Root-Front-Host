import React from "react";

import { useAppSelector } from "../../store/hooks";
import TasksByModel from "./taskByModel";

import useStyles from "./tasksPage.styles";
import { IModelReadDto, ITheme } from "roottypes";

interface ITasksPageProps {}

const TasksPage: React.FunctionComponent<ITasksPageProps> = (
  props: ITasksPageProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const models: IModelReadDto[] = useAppSelector((state) => state.model.models);

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
