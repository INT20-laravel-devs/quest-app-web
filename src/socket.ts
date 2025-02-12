import { io } from 'socket.io-client';
import { UpgradedSocket } from '@/lib/upgraded-socket';

export const socketIO = io('http://localhost:4555', { withCredentials: true });

export const socket = new UpgradedSocket(socketIO);
