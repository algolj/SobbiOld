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
  namespace: '/room-chat',
  cors: {
    credentials: true,
  },
})
export class RoomChatGateway {
  @WebSocketServer()
  server;

  private roomName = (roomId) => `room-${roomId}`;

  private sendMessage(
    user: chatUser,
    messageBody: { message: string },
    chatType: string,
  ) {
    const roomName = this.roomName(user.roomId);

    this.server.to(`${roomName}-${chatType}`).emit(`message-${chatType}`, {
      userId: user.userId,
      name: user.name,
      message: messageBody['message'],
    });
  }

  private joinLeaveRoom(client, eventType) {
    const roomEvent = {
      connect: { event: 'join' },
      disconnect: { event: 'leave' },
    };
    const roomName = this.roomName(client.user.roomId);

    const chatForAll = roomName + '-all';
    const chatForInterviewer = roomName + '-interviewer';

    client[roomEvent[eventType].event](chatForAll);
    client.emit(
      `${roomEvent[eventType].event}Rooms`,
      JSON.stringify({ [eventType]: chatForAll }),
    );

    if (client.user.role !== 'interviewee') {
      client[roomEvent[eventType].event](chatForInterviewer);
      client.emit(
        `${roomEvent[eventType].event}Rooms`,
        JSON.stringify({ [eventType]: chatForInterviewer }),
      );
    }
  }

  @UseGuards(socketRoomUserGuard)
  @SubscribeMessage('message-all')
  messageAllUserInRoom(
    @RoomUser() user: chatUser,
    @MessageBody()
    messageBody: { message: string },
  ): void {
    this.sendMessage(user, messageBody, 'all');
  }

  @UseGuards(socketRoomUserGuard)
  @SubscribeMessage('message-interviewer')
  messageInterviewerUserInRoom(
    @RoomUser() user: chatUser,
    @MessageBody()
    messageBody: { message: string },
  ): void {
    if (user.role.toLowerCase() == 'interviewee') {
      throw new WsException('No access');
    }

    this.sendMessage(user, messageBody, 'interviewer');
  }

  @UseGuards(socketRoomUserGuard)
  @SubscribeMessage('joinRooms')
  handleJoinRooms(client, textBody): void {
    this.joinLeaveRoom(client, 'connect');
  }

  @UseGuards(socketRoomUserGuard)
  @SubscribeMessage('leaveRooms')
  handleLeaveRooms(client, textBody): void {
    this.joinLeaveRoom(client, 'disconnect');
  }
}
