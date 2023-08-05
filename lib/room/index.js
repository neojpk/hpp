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

function createRoom() {
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

const setup = {
  initialize() {
    if (!roomData) {
      roomData = createRoom(); // Llamar a initializeRoom solo si no se ha inicializado
    }
  },
};

export default setup;
