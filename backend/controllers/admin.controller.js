import User from "../models/user.model.js";
import Property from "../models/property.model.js";
import Inquiry from "../models/inquiry.model.js";

// view all users
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Block a perticular user
export const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      success: true,
      message: user.isBlocked ? "User Blocked" : "User Unblocked",
      isBlocked: user.isBlocked,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete a perticular user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({
      message: true,
      message: "User deleted successfullt!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// view all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("seller", "name email");

    res.json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete a perticular property
export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({
      message: true,
      message: "Property deleted successfullt!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// view all inquires
export const getAllInquires = async (req, res) => {
  try {
    const inquires = await Inquiry.find()
      .populate("buyer", "name email")
      .populate("seller", "name email")
      .populate("property", "title price")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: inquires.length,
      inquires,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Dashboard analytics
export const getDashboardStats = async (req, res) => {
  try {
    const totalUser = await User.countDocuments();
    const totalProperties = await Property.countDocuments();
    const activeListing = await Property.countDocuments({
      status: "sale",
    });

    const soldProperties = await Property.countDocuments({
      status: "sold",
    });

    res.json({
      success: true,
      stats: {
        totalUser,
        totalProperties,
        activeListing,
        soldProperties,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get pending seller account
export const getPendingSeller = async (req, res) => {
  try {
    const pendingSellers = await User.find({
      role: "seller",
      isApproved: false,
    }).select("-password");

    res.json({
      success: true,
      count: pendingSellers.length,
      pendingSellers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// now to approve a seller
export const approveSeller = async (req, res) => {
  try {
    const seller = await User.findById(req.params.id);

    if (!seller || seller.role !== "seller") {
      return res.status(404).json({
        success: true,
        message: "Yor are not a seller or seller not found",
      });
    }

    seller.isApproved = true;
    await seller.save();

    res.json({
      success: true,
      message: "Seller approve successfully",
      seller,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
