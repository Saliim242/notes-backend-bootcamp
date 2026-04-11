import { Notes } from "../modules/notes.model.js";
import mongoose from "mongoose";

export const getAnalytics = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const totalNotes = await Notes.countDocuments({ userId });

    const notesPerDay = await Notes.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const notesByTag = await Notes.aggregate([
      { $match: { userId } },
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      status: true,
      message: "Analytics data fetched successfully",
      totalNotes,
      notesPerDay,
      notesByTag,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
