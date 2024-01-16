import { IUserReadDto, SuperRoleEnum } from "roottypes";

export const adminUser: IUserReadDto = {
  firstName: "Hamza",
  lastName: "Khalifa",
  _id: "640bf999128f95fd4cffa409",
  email: "hk.kh.pro@gmail.com",
  superRole: SuperRoleEnum.SuperAdmin,
  profilePicture: {
    isImage: true,
    url: "",
    uuid: "",
  },
};
