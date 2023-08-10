import React from "react";
//@ts-ignore
import { SocketProvider } from "socket.io-react";
import io, { Socket } from "socket.io-client";
import { IUser } from "../store/slices/userSlice";
import { useAppSelector } from "../store/hooks";

interface ISocketWrapper {}
const SocketWrapper: React.FunctionComponent<
  React.PropsWithChildren<ISocketWrapper>
> = (props: React.PropsWithChildren<ISocketWrapper>) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [socket, setSocket] = React.useState<Socket | null>(null);

  React.useEffect(() => {
    if (!user || user._id === "") {
      if (socket && typeof (socket as Socket).disconnect === "function") {
        (socket as Socket).disconnect();
      }
      return;
    }

    if (!socket || socket.disconnected) {
      const newSocket = io(
        // @ts-ignore
        process.env.REACT_APP_BACKEND_URL?.replace(/^http/, "ws"),
        {
          query: { userId: user._id },
        }
      );
      setSocket(newSocket);
    }
  }, [user]);

  return <SocketProvider socket={socket}>{props.children}</SocketProvider>;
};

export default SocketWrapper;
