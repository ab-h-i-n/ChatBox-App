import express from "express";

export const router = express.Router();

const ROOMS = [
  {
    title: "Global Chat",
    id: "1",
  },
];

const UserRooms = [
  {
    title: "Room 1",
    id: "2",
    members: ["Abhin"],
  },
];

router.get("/", (req, res) => {
  res.json(ROOMS);
});

//fetch the users rooms
router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const userRooms = UserRooms.filter((room) => room.members.includes(userId));
  res.json(userRooms);
});

//create user rooom
router.post("/user/:id", (req, res) => {
  const userId = req.params.id;
  const { roomId, roomTitle } = req.body;

  const existingRoom = UserRooms.find((room) => room.id === roomId);
  if (existingRoom) {
    return res.status(400).json({ message: "Room ID already exists." });
  }

  const roomData = {
    title: roomTitle,
    id: roomId,
    members: [userId],
  };

  console.log(roomData);
  

  UserRooms.push(roomData);

  res.status(201).json(roomData);
});

//join room
router.post("/user/join/:id", (req, res) => {
  const userId = req.params.id;
  const { roomId } = req.body;

  const room = UserRooms.find((room) => room.id == roomId);

  if (room) {
    if (!room.members.includes(userId)) {
      room.members.push(userId);
    } else {
      return res
        .status(400)
        .json({ message: "User is already a member of this room." });
    }
  } else {
    return res.status(404).json({ message: "Room not found." });
  }

  res.json(room);
});
