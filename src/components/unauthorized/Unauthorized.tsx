import { useTheme } from "react-jss";

import { Theme } from "../../config/theme";

import useStyles from "./unauthorized.styles";

interface IUnauthorized {}
const Unauthorized: React.FunctionComponent<IUnauthorized> = (
  props: IUnauthorized
) => {
  const theme: Theme = useTheme();

  const styles = useStyles({ theme });
  return (
    <div className={styles.unauthorizedContainer}>
      <h1 className={styles.title}>Unauthorized</h1>
    </div>
  );
};

export default Unauthorized;
