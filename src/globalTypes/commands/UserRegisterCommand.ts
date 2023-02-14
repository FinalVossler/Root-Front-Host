import { IUser } from "../../store/slices/userSlice";

type UserRegisterCommand = {
  firstName: IUser["firstName"];
  lastName: IUser["lastName"];
  email: IUser["email"];
  password: string;
};

export default UserRegisterCommand;
