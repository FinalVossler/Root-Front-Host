import { ITheme } from "roottypes";

import useStyles from "./unauthorized.styles";

interface IUnauthorizedProps {
  theme: ITheme;
}
const Unauthorized: React.FunctionComponent<IUnauthorizedProps> = (
  props: IUnauthorizedProps
) => {
  const styles = useStyles({ theme: props.theme });

  return (
    <div className={styles.unauthorizedContainer}>
      <h1 className={styles.title}>Unauthorized</h1>
    </div>
  );
};

export default Unauthorized;
