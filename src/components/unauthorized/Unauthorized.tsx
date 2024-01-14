import { ITheme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./unauthorized.styles";

interface IUnauthorizedProps {}
const Unauthorized: React.FunctionComponent<IUnauthorizedProps> = (
  props: IUnauthorizedProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });
  return (
    <div className={styles.unauthorizedContainer}>
      <h1 className={styles.title}>Unauthorized</h1>
    </div>
  );
};

export default Unauthorized;
