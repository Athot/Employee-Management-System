const Salary = require("../models/Salary");
const PDFDocument = require("pdfkit");
const User = require("../models/User");
exports.createSalary = async (req, res) => {
  try {
    // console.log("HIT API");
    const { userID, month, basic, hra, allowances, deductions } = req.body;
    const user = await User.findById(userID).populate("name");
    if (!user) return res.status(401).json({ msg: "No username" });
    const userName = user.name;
    const netSalary =
      Number(basic) + Number(hra) + Number(allowances) - Number(deductions);

    const salary = await Salary.create({
      userID,
      userName,
      month,
      basic,
      hra,
      allowances,
      deductions,
      netSalary,
    });
    res.json(salary);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// generate salary
exports.generateSalarySlip = async (req, res) => {
  try {
    // console.log("Salary hit");
    const salary = await Salary.findById(req.params.id).populate(
      "userID",
      "name email",
    );
    // if (!salary) return res.status(400).json({ msg: "Salary not found" });
    if (!salary) {
      return res.status(404).end(); // 🔥 no JSON
    }
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=salary-${salary.month}.pdf`,
    );
    doc.pipe(res);

    // pdf content
    doc.fontSize(20).text("Salary Slip", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Employee : ${salary.userID.name}`);
    doc.text(`Email: ${salary.userID.email}`);
    doc.text(`Month: ${salary.month} ${salary.year}`);
    doc.moveDown();

    doc.text(`Basic: ₹${salary.basic}`);
    doc.text(`HRA: ₹${salary.hra}`);
    doc.text(`Allowances: ₹${salary.allowances}`);
    doc.text(`Deductions: ₹${salary.deductions}`);
    doc.moveDown();

    doc.fontSize(14).text(`Net Salary: ₹${salary.netSalary}`, {
      bold: true,
    });
    doc.end();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// get salary
exports.getSalary = async (req, res) => {
  try {
    // console.log("hit");
    const salaries = await Salary.find();
    res.json(salaries);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// view own salary
exports.getEmployeeSalary = async (req, res) => {
  try {
    // console.log("hit");
    const salaries = await Salary.find({ userID: req.user.id });
    res.json(salaries);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
