// controllers/dashboardController.js
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const ClassModel = require("../models/sclassSchema");
const Fee = require("../models/Fee");

const getDashboardStats = async (req, res) => {
  try {
    const { adminID } = req.params;

    const totalStudents = await Student.countDocuments({ school: adminID });
    const totalTeachers = await Teacher.countDocuments({ school: adminID });
    const totalClasses = await ClassModel.countDocuments({ school: adminID });
    const totalFees = await Fee.aggregate([
      { $match: { school: adminID } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      students: totalStudents,
      teachers: totalTeachers,
      classes: totalClasses,
      feeCollections: totalFees.length > 0 ? totalFees[0].total : 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getDashboardStats };
