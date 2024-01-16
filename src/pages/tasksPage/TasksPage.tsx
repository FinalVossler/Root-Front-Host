import React from "react";

import { ITheme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";
import { IModelReadDto } from "../../store/slices/modelSlice";
import TasksByModel from "./taskByModel";

import useStyles from "./tasksPage.styles";

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
