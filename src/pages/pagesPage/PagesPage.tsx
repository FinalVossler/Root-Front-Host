import React from "react";
import { FaDirections } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Loading from "react-loading";

import { Theme } from "../../config/theme";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IPage, pageSlice } from "../../store/slices/pageSlice";
import PageEditor from "../../components/editors/pageEditor";
import useStyles from "./pagesPage.styles";
import ConfirmationModal from "../../components/confirmationModal";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import withWrapper from "../../hoc/wrapper";
import withChat from "../../hoc/withChat";
import useHasPermission from "../../hooks/useHasPermission";
import { Permission } from "../../store/slices/roleSlice";

interface IPagesPageProps {}

const PagesPage: React.FunctionComponent<IPagesPageProps> = (
  props: IPagesPageProps
) => {
  const pages = useAppSelector((state) => state.page.pages);
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.pages
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [selectedPageId, setSelectedPageId] = React.useState("");

  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const { hasPermission } = useHasPermission();

  const handleDeleteModalConfirm = () => {
    setDeleteLoading(true);
    axios
      .request({
        url: "/pages",
        method: "DELETE",
        params: {
          pageId: selectedPageId,
        },
      })
      .then(() => {
        toast.success("Deleted");
        dispatch(pageSlice.actions.deletePage(selectedPageId));

        setDeleteModalOpen(false);
        setSelectedPageId("");
      })
      .finally(() => setDeleteLoading(false));
  };

  const handleDeleteIconClick = (page: IPage) => {
    setSelectedPageId(page._id);
    setDeleteModalOpen(true);
  };

  if (!hasPermission(Permission.ReadPage)) return null;

  return (
    <div className={styles.pagesPageContainer}>
      <ConfirmationModal
        onConfirm={handleDeleteModalConfirm}
        description={getTranslatedText(staticText?.deletePageMessage)}
        title="Delete page"
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        loading={deleteLoading}
      />

      {deleteLoading && <Loading color={theme.primary} />}

      {!deleteLoading &&
        pages.map((page: IPage, i: number) => {
          return (
            <div
              key={i}
              className={
                i === pages.length - 1
                  ? styles.lastPageContainer
                  : styles.pageContainer
              }
            >
              <span className={styles.pageTitle}>
                {getTranslatedText(page.title)}
              </span>

              {hasPermission(Permission.DeletePage) && (
                <span
                  className={styles.deleteIcon}
                  onClick={() => handleDeleteIconClick(page)}
                >
                  <AiFillDelete />
                </span>
              )}

              <a
                href={"/" + page.slug}
                target="_blank"
                rel="noreferrer"
                className={styles.goIcon}
              >
                <FaDirections />
              </a>

              {hasPermission(Permission.UpdatePage) && (
                <div className={styles.pageEditorContainer}>
                  <PageEditor page={page} />
                </div>
              )}
            </div>
          );
        })}
      <br />

      <PageEditor />
    </div>
  );
};

export default withWrapper(withChat(React.memo(PagesPage)), {
  withFooter: false,
  withSideMenu: true,
});
