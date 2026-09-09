import express from "express";
import { authorize, protect } from "../middlewares/auth.middleware.js";
import { getSellerInquiry, markAsRead, sendinquiry } from "../controllers/inquiry.controller.js";

const inquiryRouter = express.Router()

inquiryRouter.post("/", protect, authorize("buyer"), sendinquiry);
inquiryRouter.get("/seller", protect, authorize("seller"), getSellerInquiry);
inquiryRouter.post("/:id/read", protect, markAsRead);

export default inquiryRouter;