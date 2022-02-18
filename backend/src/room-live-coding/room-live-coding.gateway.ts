import { chatUser } from '@app/common/chat-user.interface';
import { RoomUser } from '@app/decorators/room-user.decorator';
import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { socketRoomUserGuard } from '../guard/socket-room-user.guard';

@WebSocketGateway(3100, {
  namespace: '/room-live-coding',
  cors: {
    credentials: true,
  },
})
export class RoomLiveCodingGateway {
  @WebSocketServer()
  server;

  private roomName = (roomId) => `room-${roomId}-live-coding`;

  private joinLeaveRoom(client, eventType) {
    const roomEvent = {
      connect: { event: 'join' },
      disconnect: { event: 'leave' },
    };
    const roomName = this.roomName(client.user.roomId);

    if (
      client.user.role == 'interviewee' ||
      client.user.role == 'interviewer'
    ) {
      client[roomEvent[eventType].event](roomName);
      client.emit(
        `${roomEvent[eventType].event}LiveCoding`,
        JSON.stringify({ [eventType]: roomName }),
      );
    } else {
      throw new WsException('No access');
    }
  }

  @UseGuards(socketRoomUserGuard)
  @SubscribeMessage('live-coding')
  messageAllUserInRoom(
    @RoomUser() user: chatUser,
    @MessageBody()
    messageBody: { caretPosition: number; text: string },
  ): void {
    if (
      user.role.toLowerCase() == 'interviewee' ||
      user.role.toLowerCase() == 'interviewer'
    ) {
      const roomName = this.roomName(user.roomId);

      this.server.to(roomName).emit('live-coding', {
        userId: user.userId,
        name: user.name,
        role: user.role,
        caretPosition: messageBody['caretPosition'],
        text: messageBody['text'],
      });
    } else {
      throw new WsException('No access');
    }
  }

  @UseGuards(socketRoomUserGuard)
  @SubscribeMessage('joinLiveCoding')
  handleJoinRooms(client, textBody): void {
    this.joinLeaveRoom(client, 'connect');
  }

  @UseGuards(socketRoomUserGuard)
  @SubscribeMessage('leaveLiveCoding')
  handleLeaveRooms(client, textBody): void {
    this.joinLeaveRoom(client, 'disconnect');
  }
}
