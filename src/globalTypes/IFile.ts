interface IFile {
  _id?: string;
  url: string;
  uuid: string;
  isImage: boolean;
  name: string | null;
}

export default IFile;
