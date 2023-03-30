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
import { SuperRole } from "../../store/slices/userSlice";
import withWrapper from "../../hoc/wrapper";

interface IPagesPageProps {}

const PagesPage: React.FunctionComponent<IPagesPageProps> = (
  props: IPagesPageProps
) => {
  const pages = useAppSelector((state) => state.page.pages);
  const user = useAppSelector((state) => state.user.user);
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

  if (user.superRole !== SuperRole.SuperAdmin) return null;

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

      {deleteLoading && <Loading />}

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

              <span
                className={styles.deleteIcon}
                onClick={() => handleDeleteIconClick(page)}
              >
                <AiFillDelete color={theme.secondary} />
              </span>

              <a
                href={"/" + page.slug}
                target="_blank"
                className={styles.goIcon}
              >
                <FaDirections color={theme.secondary} />
              </a>

              <div className={styles.pageEditorContainer}>
                <PageEditor page={page} />
              </div>
            </div>
          );
        })}
      <br />

      <PageEditor />
    </div>
  );
};

export default withWrapper(PagesPage, {
  withFooter: false,
  withSideMenu: true,
});
