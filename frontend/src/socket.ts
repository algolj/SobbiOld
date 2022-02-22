import io from 'socket.io-client';
import { SOCKET_URL } from './http/http';

export const connectSocket = io(`${SOCKET_URL}/room-chat`, {
  autoConnect: false,
  extraHeaders: {
    authorization: `Bearer ${localStorage.getItem('roomToken')}`,
  },
});
// Authorization: `Bearer ${localStorage.getItem('token')}`,
