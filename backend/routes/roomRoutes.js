import express from "express";

export const router = express.Router();
const ROOMS = [
  {
    title: "Global Chat",
    id: "1",
  },
];

router.get("/", (req, res) => {
  res.json(ROOMS);
});
