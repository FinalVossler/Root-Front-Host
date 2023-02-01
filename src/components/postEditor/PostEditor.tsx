import React from "react";
import { useTheme } from "react-jss";
import { toast } from "react-toastify";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";

import { ImCross } from "react-icons/im";

import useStyles from "./postEditor.styles";
import WritePostButton from "../write-post-button";
import Modal from "../modal";
import { Theme } from "../../config/theme";
import Button from "../button";

interface IPostEditor {}

const PostEditor = (props: IPostEditor) => {
  const [postModalOpen, setPostModalOpen] = React.useState<boolean>(false);
  const [sunEditor, setSunEditor] =
    React.useState<SunEditorCore | undefined>(undefined);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const content: string | undefined = sunEditor?.getContents(true);

    if (!content || content.trim() === "<p><br></p>")
      return toast.error("Content shouldn't be empty");

    setPostModalOpen(false);
    console.log("content", content);
    sunEditor?.setContents("");
  };

  // Autofocus prop is not working. So we manually focus the editor when the modal shows
  React.useEffect(() => {
    if (postModalOpen && sunEditor && sunEditor.core) {
      sunEditor.core.focus();
    }
  }, [postModalOpen, sunEditor]);

  return (
    <div className={styles.postEditorContainer}>
      <WritePostButton onClick={() => setPostModalOpen(true)} />

      <Modal handleClose={() => setPostModalOpen(false)} open={postModalOpen}>
        <form
          onSubmit={handleSubmit}
          className={styles.createPostModalContainer}
        >
          <div className={styles.createPostHeader}>
            <h2 className={styles.createPostTitle}>Create Post</h2>

            <ImCross
              onClick={() => setPostModalOpen(false)}
              className={styles.closeButton}
            />
          </div>

          <SunEditor
            getSunEditorInstance={(sunEditor) => setSunEditor(sunEditor)}
            height="200px"
          />

          <Button type="submit" style={{}} className={styles.button}>
            Post
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default React.memo(PostEditor);
