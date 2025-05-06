import express from "express"
import { checkVoteStatus, submitVote, getVotingResults } from "../controllers/voteController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// Check if user has already voted
router.get("/status", protect, checkVoteStatus)

// Submit a vote
router.post("/", protect, submitVote)

// Get voting results (admin only)
router.get("/results", protect, getVotingResults)

export default router
