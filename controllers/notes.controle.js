import { isValidObjectId } from "../utils/check_moongose_id.js";
import { Notes } from "../modules/notes.model.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ userId: req.user._id }).sort({
      isPinned: -1,
    });
    res
      .status(200)
      .json({ status: true, message: "All notes are fetched", notes: notes });
  } catch (error) {
    console.log("Getting all notes failed", error);
    res.status(404).json({ status: false, message: error.message });
  }
};

// lets get single notes
export const getSingleNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    // if (!isValidObjectId(req.params.id)) {
    //   return res
    //     .status(400)
    //     .json({ status: false, message: "Invalid Object Id" });
    // }

    if (!note) {
      return res.status(404).json({ status: false, message: "Note not found" });
    }

    res.status(200).json({
      status: true,
      message: "Single note found in the database successfully",
      note: note,
    });
  } catch (error) {
    // console.log(error
    console.error("Getting sindle Note Error", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// lets create a new note

export const addNote = async (req, res) => {
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;
  console.log(req.user);
  try {
    if (!title || !content) {
      return res
        .status(400)
        .json({ status: false, message: "All Feilds are requires" });
    }

    const note = new Notes({
      title,
      content,
      tags: tags || [],
      userId: req.user._id,
      isPinned: isPinned || false,
    });

    await note.save();

    res
      .status(201)
      .json({ status: true, message: "Note Created Successfully", note: note });
  } catch (error) {
    // lets console the error and give message to console
    console.error("Create New note Errror ", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// lest update a single note

export const editNote = async (req, res) => {
  try {
    const note = await Notes.findOne({
      _id: req.params.id,
    });
    if (!note) {
      return res.status(404).json({ status: false, message: "Note not found" });
    }

    if (note.userId.toString() !== req.user._id.toString()) {
      // if (note.userId.toString() !== req.user._id) {
      console.log(note.userId, req.user._id);
      return res.status(403).json({
        status: false,
        message: "User does not have permession to updated other users",
      });
    }

    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    await updatedNote.save();
    res.status(200).json({
      status: true,
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    // console.log(error
    console.error("Updating Note Error", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// Search Notes

export const searchNote = async (req, res) => {
  console.log("Waaa lagu wa coyaaa Deee");
  const { query } = req.query;

  try {
    //lets check the query is there or not
    if (!query) {
      return res.status(400).json({
        status: false,
        message: "must provide what you want to search",
      });
    }

    console.log(req.user.id);

    // lets find the query maches
    const notes = await Notes.find({
      userId: req.user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
        { tags: { $regex: new RegExp(query, "i") } },
      ],
    });

    // if (!notes) {
    //   return res
    //     .status(404)
    //     .json({ status: false, message: "No  notes found" });
    // }

    console.log(notes);

    res.status(200).json({
      status: true,
      message: "Note search found successfully",
      note: notes,
    });
  } catch (error) {
    // console.
    console.log("Error when searching", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// Note make ping

export const notePing = async (req, res) => {
  const { isPinned } = req.body;
  console.log(isPinned);
  try {
    const note = await Notes.findOne({ _id: req.params.id });
    if (!note) {
      return res
        .status(404)
        .json({ status: false, message: "Note is Not Found" });
    }

    // if (isPinned) note.isPinned = isPinned;
    note.isPinned = isPinned;
    // const updatedNotePing = await Notes.findByIdAndUpdate(
    //   req.params.id,
    //   isPinned: isPinned,
    // );

    await note.save();
    res.status(200).json({
      status: true,
      message: "Note Pinged successfully",
      note: note,
    });
  } catch (error) {
    // console the error and
    console.log("Note Ping error ", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// lets delete the note

export const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findOne({
      _id: req.params.id,
    });
    if (!note) {
      return res.status(404).json({ status: false, message: "Note not found" });
    }

    if (note.userId.toString() !== req.user._id) {
      console.log(note.userId, req.user._id);
      return res.status(403).json({
        status: false,
        message: "User does not have permession to updated other users",
      });
    }

    const deleteNote = await Notes.findByIdAndDelete(note);

    res.status(200).json({
      status: true,
      message: "Note Deleted successfully",
      note: deleteNote,
    });
  } catch (error) {
    // console.log(error
    console.error("Deleting Note Error", error);
    res.status(500).json({ status: false, message: error.message });
  }
};
