export const getBarValues = async (req, res) => {
  const data= [
    { label: "A", value: 10 },
    { label: "B", value: 20 },
    { label: "C", value: 15 },
    { label: "D", value: 25 },
    { label: "E", value: 50 },
    { label: "F", value: 40 },
    { label: "I", value: 30 },
    { label: "O", value: 13 },
    { label: "k", value: 34 },
  ];

  try {
    res.status(200).json({
      success: true,
      message: "Successful",
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};