import { Server as HttpServer } from 'http';
import { Server as SocketIoServer } from 'socket.io';

const io = {} as SocketIoServer;

function initialize(httpServer: HttpServer): void {
  Object.assign(
    io,
    new SocketIoServer(httpServer, {
      cors: {
        origin: '*',
      },
    }),
  );
}

export { io, initialize };
