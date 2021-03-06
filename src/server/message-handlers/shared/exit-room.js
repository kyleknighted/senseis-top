import {UPDATE_USERS} from '../../../shared/action-types';

import {getRoom} from '../../room-cache';
import {getUserData} from '../../user-helpers';

import broadcastRooms from './broadcast-rooms';
import wsSend from '../../ws-send';

const exitRoom = ({data}) => {
  const {userId, roomId, password} = data;

  const room = getRoom({roomId, password});
  if (!room) return;

  room.removeUser(userId);
  const hasRemainingUsers = room.users().length > 0;
  broadcastRooms();

  if (hasRemainingUsers) {
    room.users().forEach(user => {
      wsSend(user.ws, {
        type: UPDATE_USERS,
        users: room.usersExcept(user.userId).map(getUserData),
      });
    });
  }
};

export default exitRoom;
