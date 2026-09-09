import express from "express";
import Chat from "../models/chat.model.js";
import { protect } from "../middlewares/auth.middleware.js";

const chatRouter = express.Router();

// All chat routes require authentication
chatRouter.use(protect);

/* =========================================================
   CREATE / GET CHAT
   POST /api/chat/start
========================================================= */

chatRouter.post("/start", async (req, res) => {
  try {
    const {
      propertyId,
      sellerId,
      buyerId: providedBuyerId,
    } = req.body;

    // Logged-in user
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    let buyerId;
    let finalSellerId;

    // Seller starts chat with buyer
    if (req.user.role === "seller") {
      buyerId = providedBuyerId;
      finalSellerId = loggedInUserId;
    }

    // Buyer starts chat with seller
    else {
      buyerId = loggedInUserId;
      finalSellerId = sellerId;
    }

    if (!buyerId) {
      return res.status(400).json({
        success: false,
        message: "Missing buyer Id",
      });
    }

    if (!finalSellerId) {
      return res.status(400).json({
        success: false,
        message: "Missing seller Id",
      });
    }

    if (!propertyId) {
      return res.status(400).json({
        success: false,
        message: "Missing property Id",
      });
    }

    // Prevent chatting with yourself
    if (buyerId.toString() === finalSellerId.toString()) {
      return res.status(400).json({
        success: false,
        message: "Buyer and seller cannot be the same user",
      });
    }

    // Find existing chat
    let chat = await Chat.findOne({
      buyer: buyerId,
      seller: finalSellerId,
      property: propertyId,
    });

    // Create chat if it doesn't exist
    if (!chat) {
      chat = await Chat.create({
        property: propertyId,
        buyer: buyerId,
        seller: finalSellerId,
        messages: [],
      });
    }

    // Populate chat
    chat = await Chat.findById(chat._id)
      .populate("buyer", "name email profilePic")
      .populate("seller", "name email profilePic")
      .populate("property", "title price images");

    return res.status(200).json({
      success: true,
      message: "Chat started successfully",
      chat,
    });
  } catch (error) {
    console.error("Start chat error:", error);

    return res.status(500).json({
      success: false,
      message: "Error creating chat or getting previous one",
      error: error.message,
    });
  }
});

/* =========================================================
   SEND MESSAGE
   POST /api/chat/send
========================================================= */

chatRouter.post("/send", async (req, res) => {
  try {
    const { chatId, text, image } = req.body;

    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "Chat ID is required",
      });
    }

    if (!text && !image) {
      return res.status(400).json({
        success: false,
        message: "Message text or image is required",
      });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Check user belongs to chat
    if (
      chat.buyer.toString() !== userId.toString() &&
      chat.seller.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to send message in this chat",
      });
    }

    const newMessage = {
      sender: userId,
      text: text || "",
      image: image || "",
      createdAt: new Date(),
    };

    chat.messages.push(newMessage);

    await chat.save();

    const savedMessage =
      chat.messages[chat.messages.length - 1];

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      chat,
      newMessage: savedMessage,
    });
  } catch (error) {
    console.error("Send message error:", error);

    return res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
});

/* =========================================================
   GET USER CHATS
   GET /api/chat/user
========================================================= */

chatRouter.get("/user", async (req, res) => {
  try {
    // FIX: req.use -> req.user
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    const chats = await Chat.find({
      $or: [
        { buyer: userId },
        { seller: userId },
      ],
    })
      .populate("buyer", "name email profilePic")
      .populate("seller", "name email profilePic")
      .populate("property", "title price images")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    console.error("Get user chats error:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching user chats",
      error: error.message,
    });
  }
});

/* =========================================================
   GET CHAT MESSAGES
   GET /api/chat/:chatId
========================================================= */

chatRouter.get("/:chatId", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("buyer", "name email profilePic")
      .populate("seller", "name email profilePic")
      .populate("property", "title price images")
      .populate("messages.sender", "name profilePic");

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const userId = req.user?._id?.toString();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    if (
      chat.buyer._id.toString() !== userId &&
      chat.seller._id.toString() !== userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    return res.status(200).json({
      success: true,
      chat,
      messages: chat.messages,
    });
  } catch (error) {
    console.error("Get chat messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching chat messages",
      error: error.message,
    });
  }
});

/* =========================================================
   DELETE ENTIRE CHAT
   DELETE /api/chat/:chatId
========================================================= */

chatRouter.delete("/:chatId", async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    if (
      chat.buyer.toString() !== userId.toString() &&
      chat.seller.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await Chat.findByIdAndDelete(req.params.chatId);

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.error("Delete chat error:", error);

    return res.status(500).json({
      success: false,
      message: "Error deleting chat",
      error: error.message,
    });
  }
});

/* =========================================================
   DELETE SPECIFIC MESSAGE
   DELETE /api/chat/:chatId/message/:messageId
========================================================= */

chatRouter.delete(
  "/:chatId/message/:messageId",
  async (req, res) => {
    try {
      const userId = req.user?._id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "User authentication required",
        });
      }

      const chat = await Chat.findById(req.params.chatId);

      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Chat not found",
        });
      }

      // User must belong to chat
      if (
        chat.buyer.toString() !== userId.toString() &&
        chat.seller.toString() !== userId.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Not authorized",
        });
      }

      // FIX:
      // Chat.message -> chat.messages
      const message = chat.messages.id(
        req.params.messageId
      );

      if (!message) {
        return res.status(404).json({
          success: false,
          message: "Message not found",
        });
      }

      // Only sender can delete message
      if (
        message.sender.toString() !== userId.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to delete this message",
        });
      }

      chat.messages.pull(req.params.messageId);

      await chat.save();

      return res.status(200).json({
        success: true,
        message: "Message deleted successfully",
        chat,
      });
    } catch (error) {
      console.error("Delete message error:", error);

      return res.status(500).json({
        success: false,
        message: "Error deleting message",
        error: error.message,
      });
    }
  }
);

export default chatRouter;