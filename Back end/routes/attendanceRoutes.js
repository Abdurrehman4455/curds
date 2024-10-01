
const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Route to mark attendance
router.post('/attendance', async (req, res) => {
  const { personId, date, status } = req.body;
  try {
    const attendance = new Attendance({ personId, date, status });
    await attendance.save();
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error marking attendance' });
  }
});

// Route to get all attendance
// Route to get attendance by person ID
router.get('/attendance/:personId', async (req, res) => {
  const { personId } = req.params;
  try {
    // Fetch attendance based on personId
    const attendanceData = await Attendance.find({ personId });

    if (!attendanceData || attendanceData.length === 0) {
      return res.status(404).json({ error: 'No attendance data found for this person' });
    }

    const totalClasses = attendanceData.length;
    const presentCount = attendanceData.filter((a) => a.status === 'Present').length;
    const absentCount = totalClasses - presentCount;

    res.status(200).json({
      presentCount,
      absentCount,
      totalClasses,
    });
  } catch (error) {
    console.error(`Error fetching attendance for personId ${personId}:`, error);
    res.status(500).json({ error: 'Error fetching attendance data' });
  }
});

module.exports = router;
