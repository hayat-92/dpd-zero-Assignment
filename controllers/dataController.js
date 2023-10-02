const Data = require("../models/Data");

// Store Data
let storeData = async (req, res) => {
  try {
    const { keyN, valueN } = req.body;

    if (!keyN) {
      return res.status(400).json({
        status: "error",
        code: "INVALID_KEY",
        message: "The provided key is not valid or missing.",
      });
    }

    if (!valueN) {
      return res.status(400).json({
        status: "error",
        code: "INVALID_VALUE",
        message: "The provided value is not valid or missing.",
      });
    }

    // Check if the key already exists
    const existingData = await Data.findOne({ where: { keyN } });

    if (existingData) {
      return res.status(400).json({
        status: "error",
        code: "KEY_EXISTS",
        message:
          "The provided key already exists in the database. To update an existing key, use the update API.",
      });
    }

    // Create a new data entry
    await Data.create({ keyN, valueN });

    res.status(200).json({
      status: "success",
      message: "Data stored successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal server error occurred. Please",
    });
  }
};

// Update Data
let updateData = async (req, res) => {
  try {
    const { keyN } = req.params;
    const { valueN } = req.body;

    if (!keyN) {
      return res.status(400).json({
        status: "error",
        code: "INVALID_KEY",
        message: "The provided key is not valid or missing.",
      });
    }

    if (!valueN) {
      return res.status(400).json({
        status: "error",
        code: "INVALID_VALUE",
        message: "The provided value is not valid or missing.",
      });
    }

    // Check if the key exists
    const existingData = await Data.findOne({ where: { keyN } });

    if (!existingData) {
      return res.status(404).json({
        status: "error",
        code: "KEY_NOT_FOUND",
        message: "The provided key does not exist in the database.",
      });
    }

    // Update the value for the existing key
    await existingData.update({ valueN });

    res.status(200).json({
      status: "success",
      message: "Data updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal server error occurred. Please try again later.",
    });
  }
};

// reterieve data
let retrieveData = async (req, res) => {
  try {
    const { keyN } = req.params;

    if (!keyN) {
      return res.status(400).json({
        status: "error",
        code: "INVALID_KEY",
        message: "The provided key is not valid or missing.",
      });
    }

    // Check if the key exists
    const existingData = await Data.findOne({ where: { keyN } });

    if (!existingData) {
      return res.status(404).json({
        status: "error",
        code: "KEY_NOT_FOUND",
        message: "The provided key does not exist in the database.",
      });
    }

    res.status(200).json({
      status: "success",
      data: existingData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal server error occurred. Please try again later.",
    });
  }
};

// Delete Data
let deleteData = async (req, res) => {
  try {
    const { keyN } = req.params;

    if (!keyN) {
      return res.status(400).json({
        status: "error",
        code: "INVALID_KEY",
        message: "The provided key is not valid or missing.",
      });
    }

    // Check if the key exists
    const existingData = await Data.findOne({ where: { keyN } });

    if (!existingData) {
      return res.status(404).json({
        status: "error",
        code: "KEY_NOT_FOUND",
        message: "The provided key does not exist in the database.",
      });
    }

    // Delete the data entry
    await existingData.destroy();

    res.status(200).json({
      status: "success",
      message: "Data deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal server error occurred. Please try again later.",
    });
  }
};

module.exports = {
  storeData,
  retrieveData,
  updateData,
  deleteData,
};
