import { IUser } from "../../store/slices/userSlice";

type UserUpdateCommand = {
  _id: string;
  firstName: IUser["firstName"];
  lastName: IUser["lastName"];
};

export default UserUpdateCommand;
