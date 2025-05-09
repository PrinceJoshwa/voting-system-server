import express from "express"
import { getCandidates } from "../controllers/candidateController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// Get all candidates
router.get("/", protect, getCandidates)

export default router
