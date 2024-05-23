const express = require("express");
const auth = require("../middleware/auth");
const Ticket = require("../models/Ticket");

const router = express.Router();

// Create Ticket
router.post("/", auth, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTicket = new Ticket({ title, description, status });
    const ticket = await newTicket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get All Tickets
router.get("/", auth, async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update Ticket
router.put("/:id", auth, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ msg: "Ticket not found" });
    }

    ticket.title = title || ticket.title;
    ticket.description = description || ticket.description;
    ticket.status = status || ticket.status;

    ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { $set: ticket },
      { new: true }
    );
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete Ticket
router.delete("/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ msg: "Ticket not found" });
    }

    await Ticket.findByIdAndRemove(req.params.id);
    res.json({ msg: "Ticket removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
