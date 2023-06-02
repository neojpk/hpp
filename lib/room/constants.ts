export enum RoomRoles {
  OWNER = "Product Owner",
  ASSISTANT = "Product Owner Assistant",
  DEVELOPER = "Developer",
}

export enum UserEvents {
  USER = "user:user",
}

export enum Rooms {
  PARTICIPANTS = "rooms:participants",
}

export enum RoomEvents {
  JOIN = "room:join",
  JOINED = "room:joined",
  PARTICIPANTS = "room:participants",
  VOTE = "room:vote",
  STORIES = "room:stories",
  STORY = "room:story",
  END = "room:end",
}
