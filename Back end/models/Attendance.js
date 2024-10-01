const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  personId: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
  date: { type: String, required: true }, // or Date type if preferred
  status: { type: String, required: true },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
