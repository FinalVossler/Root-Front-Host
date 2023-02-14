import { IUser } from "../../store/slices/userSlice";

type LoginUserCommand = {
  email: IUser["email"];
  password: string;
};

export default LoginUserCommand;
