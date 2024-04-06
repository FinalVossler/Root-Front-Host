import { UploadcareFile, UploadClient } from "@uploadcare/upload-client";
import { IFileReadDto } from "roottypes";

const uploadFile = async (file: File): Promise<IFileReadDto | undefined> => {
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
      name: uploadResult.name,
    };
  } else {
    return undefined;
  }
};

export default uploadFile;
