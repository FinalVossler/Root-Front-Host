import React from "react";
import { useTheme } from "react-jss";
import { AiFillPicture } from "react-icons/ai";

import { Theme } from "../../config/theme";

import useStyles from "./postEditorFiles.styles";
import readAsBase64 from "../../utils/readAsBase64";

interface IPostEditorFiles {
  setFiles: (files: File[]) => void;
}

const PostEditor = (props: IPostEditorFiles) => {
  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    React.useRef<HTMLInputElement>(null);
  const [base64s, setBase64s] = React.useState<string[]>([]);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: File[] = Array.from(e.target.files);
      props.setFiles(newFiles);

      const newBase64s: string[] = [];

      for (let i = 0; i < newFiles.length; i++) {
        const file: File = newFiles[i];
        if (
          ["image/png", "image/gif", "image/jpeg"].indexOf(file.type) !== -1
        ) {
          const base64: string = await readAsBase64(newFiles[i]);
          newBase64s.push(base64);
        }
      }

      setBase64s(newBase64s);
    } else {
      props.setFiles([]);
    }
  };

  return (
    <div className={styles.postEditorFilesContainer}>
      <div className={styles.filesContainer}>
        <div className={styles.imagesContainer}>
          {base64s.map((base64, i) => {
            return (
              <img
                key={i}
                className={styles.singleImage}
                style={{
                  backgroundImage: "url(" + base64 + ")",
                }}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <AiFillPicture onClick={handleIconClick} className={styles.icon} />
        <input
          onChange={handleFileChange}
          ref={inputRef as React.RefObject<HTMLInputElement>}
          hidden
          type="file"
          multiple
        />
      </div>
    </div>
  );
};

export default React.memo(PostEditor);
