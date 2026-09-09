import express from "express";
import { authorize, protect } from "../middlewares/auth.middleware.js";
import { approveSeller, blockUser, deleteProperty, deleteUser, getAllInquires, getAllProperties, getAllUser, getDashboardStats, getPendingSeller } from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.use(protect, authorize("admin"));

adminRouter.get("/users", getAllUser);
adminRouter.patch("/users/:id/block", blockUser);
adminRouter.delete("/users/:id/block", deleteUser);
adminRouter.get("/properties", getAllProperties);

adminRouter.delete("/properties/:id", deleteProperty);
adminRouter.get("/inquires", getAllInquires);
adminRouter.get("/stats", getDashboardStats);
adminRouter.get("/pending-seller", getPendingSeller);
adminRouter.patch("/approve-seller/:id", approveSeller);

export default adminRouter;