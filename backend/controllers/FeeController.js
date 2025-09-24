const Fee = require("../models/Fee");

// Ajouter un paiement
const addFee = async (req, res) => {
  try {
    const { student, classID, school, amount, paymentType, term } = req.body;

    if (!student || !classID || !school || !amount || !paymentType) {
      return res
        .status(400)
        .json({ message: "Tous les champs obligatoires doivent être remplis" });
    }

    const fee = new Fee({
      student,
      classID,
      school,
      amount,
      paymentType,
      term: term || "Mensuel", // par défaut mensuel
    });

    const savedFee = await fee.save();
    res.status(201).json(savedFee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Obtenir le total des frais collectés pour une école
const getTotalFeesBySchool = async (req, res) => {
  try {
    const { schoolID } = req.params;

    const total = await Fee.aggregate([
      { $match: { school: schoolID } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    res.status(200).json({ totalFees: total[0]?.totalAmount || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Obtenir tous les paiements d'une école
const getFeesBySchool = async (req, res) => {
  try {
    const { schoolID } = req.params;

    const fees = await Fee.find({ school: schoolID })
      .populate("student", "name rollNum")
      .populate("classID", "sclassName");

    res.status(200).json(fees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = {
  addFee,
  getTotalFeesBySchool,
  getFeesBySchool,
};
