import Chart from "../models/Charts.js";

// create new chart
export const createChart = async (req, res) => {
  const newChart = new Chart(req.body);
  try {
    const savedChart = await newChart.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedChart,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};
//get Chart
export const getChart = async (req, res) => {
  try {
    const charts = await Chart.find({});
    res.status(200).json({
      success: true,
      message: "Successful",
      data: charts,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};
