import React from "react";
import { useTheme } from "react-jss";
import { FaDirections } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";
import { IPage } from "../../store/slices/pageSlice";
import PageEditor from "../pageEditor";
import useStyles from "./pages.styles";

interface IPageProps {}

const Pages: React.FunctionComponent<IPageProps> = (props: IPageProps) => {
  const pages = useAppSelector((state) => state.page.pages);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });

  return (
    <div className={styles.pagesContainer}>
      {pages.map((page: IPage, i: number) => {
        return (
          <div
            className={
              i === pages.length - 1
                ? styles.lastPageContainer
                : styles.pageContainer
            }
          >
            <span className={styles.pageTitle}>{page.title}</span>

            <AiFillEdit className={styles.editIcon} />
            <a href={"/" + page.slug} target="_blank" className={styles.goIcon}>
              <FaDirections color={theme.secondary} />
            </a>
          </div>
        );
      })}
      <br />

      <PageEditor />
    </div>
  );
};

export default React.memo(Pages);
