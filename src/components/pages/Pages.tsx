import React from "react";
import { useTheme } from "react-jss";
import { FaDirections } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Loading from "react-loading";

import { Theme } from "../../config/theme";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IPage, pageSlice } from "../../store/slices/pageSlice";
import PageEditor from "../pageEditor";
import useStyles from "./pages.styles";
import ConfirmationModal from "../confirmationModal";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";

interface IPageProps {}

const Pages: React.FunctionComponent<IPageProps> = (props: IPageProps) => {
  const pages = useAppSelector((state) => state.page.pages);

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [selectedPageId, setSelectedPageId] = React.useState("");

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

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

  return (
    <div className={styles.pagesContainer}>
      <ConfirmationModal
        onConfirm={handleDeleteModalConfirm}
        description="This page is going to be deleted. It won't be able to be recovered. Are you sure?"
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
              <span className={styles.pageTitle}>{page.title}</span>

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

export default React.memo(Pages);
