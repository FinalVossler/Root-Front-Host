import FieldEditor from "../../components/editors/fieldEditor";
import Elements from "../../components/elements";
import { Theme } from "../../config/theme";
import withWrapper from "../../hoc/wrapper";
import { useAppSelector } from "../../store/hooks";
import { IPage } from "../../store/slices/pageSlice";

import useStyles from "./fieldsPage.styles";

interface IFieldsPage {
  page: IPage;
}

const FieldsPage: React.FunctionComponent<IFieldsPage> = (
  props: IFieldsPage
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });
  return (
    <div className={styles.fieldsPageContainer}>
      <Elements Editor={FieldEditor} />
    </div>
  );
};

export default withWrapper(FieldsPage, { withFooter: false });
