import React from "react";

import Elements from "../../components/elements";
import { ITheme } from "../../config/theme";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useHasPermission from "../../hooks/useHasPermission";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./pagesPage.styles";
import { LocalStorageConfNameEnum } from "../../utils/localStorage";
import PageEditor from "../../components/editors/pageEditor";
import useDeletePages from "../../hooks/apiHooks/useDeletePages";
import { FaDirections } from "react-icons/fa";
import { IPageReadDto, PermissionEnum } from "roottypes";

interface IPagesPageProps {}

const PagesPage: React.FunctionComponent<IPagesPageProps> = (
  props: IPagesPageProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.pages
  );
  const { pages } = useAppSelector((state) => state.page);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deletePages, loading: deleteLoading } = useDeletePages();
  const { hasPermission } = useHasPermission();

  if (!isLoggedIn) return null;

  if (!hasPermission(PermissionEnum.ReadPage)) return null;

  return (
    <div className={styles.pagesPageContainer} data-cy="pagesPage">
      <Elements
        Editor={({ element, ...props }) => (
          <PageEditor {...props} page={element as IPageReadDto} />
        )}
        columns={[
          {
            label: getTranslatedText(staticText?.title),
            name: "title",
          },
          {
            label: getTranslatedText(staticText?.showInHeader),
            name: "showInHeader",
          },
          {
            label: getTranslatedText(staticText?.showInSideMenu),
            name: "showInSideMenu",
          },
          {
            label: getTranslatedText(staticText?.visit),
            name: "visit",
            RenderComponent: ({ element }) => {
              return (
                <a
                  href={"/dynamicPage/" + (element as IPageReadDto).slug}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.goIcon}
                >
                  <FaDirections />
                </a>
              );
            },
          },
        ]}
        elements={pages}
        loading={false}
        withPagination={false}
        deletePromise={deletePages}
        deleteLoading={deleteLoading}
        getElementName={(field: any) => getTranslatedText(field.name)}
        canCreate={hasPermission(PermissionEnum.CreateField)}
        canUpdate={hasPermission(PermissionEnum.UpdateField)}
        canDelete={hasPermission(PermissionEnum.DeleteField)}
        elementsLocalStorageConfName={LocalStorageConfNameEnum.FIELDS}
        tableDataCy="pagesPage"
      />
    </div>
  );
};

export default React.memo(PagesPage);
