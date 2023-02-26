import React from "react";
import { SocketProvider } from "socket.io-react";
import io, { Socket } from "socket.io-client";
import { IUser } from "../store/slices/userSlice";
import { useAppSelector } from "../store/hooks";

interface ISocketWrapper extends React.PropsWithChildren {}
const SocketWrapper: React.FunctionComponent<ISocketWrapper> = (
  props: ISocketWrapper
) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [socket, setSocket] = React.useState<Socket>({} as Socket);

  React.useEffect(() => {
    if (!user || user._id === "") {
      return;
    }

    const newSocket = io(
      // @ts-ignore
      process.env.REACT_APP_BACKEND_URL?.replace(/^http/, "ws"),
      {
        query: { userId: user._id },
      }
    );
    setSocket(newSocket);
  }, [user]);

  return <SocketProvider socket={socket}>{props.children}</SocketProvider>;
};

export default SocketWrapper;
