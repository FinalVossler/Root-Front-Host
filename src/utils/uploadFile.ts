import { UploadcareFile, UploadClient } from "@uploadcare/upload-client";
import IFile from "../globalTypes/IFile";

const uploadFile = async (file: File): Promise<IFile | null> => {
  const client = new UploadClient({
    //@ts-ignore
    publicKey: process.env.REACT_APP_UPLOAD_CARE_PUBLIC_KEY,
  });

  const uploadResult: UploadcareFile = await client.uploadFile(file);

  if (uploadResult.cdnUrl) {
    return {
      url: uploadResult.cdnUrl,
      uuid: uploadResult.uuid,
      isImage: uploadResult.isImage || false,
    };
  } else {
    return null;
  }
};

export default uploadFile;
