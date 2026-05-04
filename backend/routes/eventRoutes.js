const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Worker = require("../models/Worker");
const Team = require("../models/Team");

// GET all events  
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().lean();
    
    // Enrich events with team information
    const enrichedEvents = [];
    for (const event of events) {
      // Look up worker by memberName to get team info and workerId
      if (event.memberName) {
        const worker = await Worker.findOne({ name: event.memberName });
        if (worker) {
          event.teamId = worker.teamId;
          event.workerId = worker.workerId;
          const team = await Team.findOne({ teamId: worker.teamId });
          event.teamName = team ? team.name : null;
        }
      }
      
      enrichedEvents.push(event);
    }
    
    res.json(enrichedEvents);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST new event
router.post("/", async (req, res) => {
  try {
    const eventData = { ...req.body };
    let workerId = null;
    
    // If memberName is provided, look up the worker to get memberId, workerId, and teamId
    if (eventData.memberName && !eventData.memberId) {
      const worker = await Worker.findOne({ name: eventData.memberName });
      if (worker) {
        eventData.memberId = worker._id;
        eventData.teamId = worker.teamId;
        workerId = worker.workerId; // Store workerId for response
        
        // Get team name
        const team = await Team.findOne({ teamId: worker.teamId });
        if (team) {
          eventData.teamName = team.name;
        }
      }
    }
    
    const event = await Event.create(eventData);
    const eventResponse = event.toObject();
    
    // Include workerId if we found it
    if (workerId) {
      eventResponse.workerId = workerId;
    }
    
    res.json(eventResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;