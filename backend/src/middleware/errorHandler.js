const errorHandler = (error, _req, res, _next) => {
  console.error(error);

  if (error.code === 11000) {
    return res.status(409).json({ message: "Duplicate resource detected" });
  }

  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal server error"
  });
};

module.exports = errorHandler;
