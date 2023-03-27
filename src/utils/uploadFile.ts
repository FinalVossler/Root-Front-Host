import { UploadcareFile, UploadClient } from "@uploadcare/upload-client";
import IFile from "../globalTypes/IFile";

const uploadFile = async (file: File): Promise<IFile | undefined> => {
  const client = new UploadClient({
    //@ts-ignore
    publicKey: process.env.REACT_APP_UPLOAD_CARE_PUBLIC_KEY,
  });

  const uploadResult: UploadcareFile = await client.uploadFile(file);

  console.log("cdn url", uploadResult.cdnUrl);
  if (uploadResult.cdnUrl) {
    return {
      url: uploadResult.cdnUrl,
      uuid: uploadResult.uuid,
      isImage: uploadResult.isImage || false,
      name: uploadResult.name,
    };
  } else {
    return undefined;
  }
};

export default uploadFile;
