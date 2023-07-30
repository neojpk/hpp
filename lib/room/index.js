import {
  set,
  ref,
  push,
  onChildAdded,
  onChildChanged,
  onDisconnect,
  onValue,
  get,
  serverTimestamp,
  child,
  update,
} from "firebase/database";
import { db } from "@/lib/firebase";
import { store } from "@/store";
import { participants } from "@/store/room";

let roomData;

function createRoomData() {
  const { role, room, username, uuid } = store.getState().user;

  const roomsRef = ref(db, `rooms/${room}`);
  const roomRef = ref(db, `room/${room}`);
  const voteRef = ref(db, `room/${room}/votes`);
  const connectedRef = ref(db, ".info/connected");

  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      const room = push(roomsRef, { role, username, uuid });
      onDisconnect(room).remove();
    }
  });

  onValue(roomsRef, (snap) => {
    store.dispatch(participants(Object.values(snap.val())));
  });

  return {
    roomsRef,
    roomRef,
    voteRef,
    uuid,
  };
}

const setupRoom = () => {
  return {
    setup: () => {
      if (!roomData) {
        roomData = createRoomData(); // Llamar a initializeRoom solo si no se ha inicializado
      }
    },
    story: (id, action) => {},
    vote: (vote) => {
      const votation = push(roomData.voteRef, { uuid: roomData.uuid, vote });
    },
  };
};
export default setupRoom;
