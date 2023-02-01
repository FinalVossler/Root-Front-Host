import uploadFile from "./uploadFile";
import IFile from "../globalTypes/IFile";

const uploadFiles = async (files: File[]): Promise<IFile[]> => {
  const filesToSend: IFile[] = [];
  const promises = files.map((file: File) => {
    return uploadFile(file);
  });

  if (promises.length > 0) {
    await Promise.all(promises).then((files: (IFile | null)[]) => {
      files.forEach((file) => {
        if (file?.url) filesToSend.push(file);
      });
    });
  }

  return filesToSend;
};

export default uploadFiles;
