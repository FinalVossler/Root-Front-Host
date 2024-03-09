import { IFileReadDto } from "roottypes";

export enum FileTypeEnum {
  Image = "Image",
  JSON = "JSON",
  PDF = "PDF",
  Unknown = "Unknown",
}

const getFileType = (file: IFileReadDto): FileTypeEnum => {
  if (file.isImage) {
    return FileTypeEnum.Image;
  }

  if (/^.*\.json$/.test(file.name || "")) {
    return FileTypeEnum.JSON;
  }

  if (/^.*\.pdf$/.test(file.name || "")) {
    return FileTypeEnum.PDF;
  }

  return FileTypeEnum.Unknown;
};

export default getFileType;
