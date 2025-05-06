import Vote from "../models/voteModel.js"
import Candidate from "../models/candidateModel.js"

// Check if user has already voted
const checkVoteStatus = async (req, res) => {
  try {
    const user = req.user

    // Check if user has already voted
    const existingVote = await Vote.findOne({ email: user.email })

    return res.status(200).json({
      hasVoted: !!existingVote,
    })
  } catch (error) {
    console.error("Check Vote Status Error:", error)
    return res.status(500).json({ message: "Server error" })
  }
}

// Submit a vote
const submitVote = async (req, res) => {
  try {
    const { candidateId } = req.body
    const user = req.user

    if (!candidateId) {
      return res.status(400).json({ message: "Candidate ID is required" })
    }

    // Check if user has already voted
    const existingVote = await Vote.findOne({ email: user.email })

    if (existingVote) {
      return res.status(400).json({ message: "You have already voted" })
    }

    // Create new vote
    const newVote = new Vote({
      user: user._id,
      email: user.email,
      candidateId,
    })

    await newVote.save()

    return res.status(201).json({
      message: "Vote submitted successfully",
      vote: {
        candidateId,
        timestamp: newVote.timestamp,
      },
    })
  } catch (error) {
    console.error("Submit Vote Error:", error)
    return res.status(500).json({ message: "Server error" })
  }
}

// Get voting results (admin only)
const getVotingResults = async (req, res) => {
  try {
    const user = req.user

    // Check if user is admin
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to view results" })
    }

    // Get all votes
    const votes = await Vote.find().populate("user", "name email")

    // Get all candidates
    const candidates = await Candidate.find()

    // Calculate results
    const results = candidates.map((candidate) => {
      const candidateVotes = votes.filter((vote) => vote.candidateId === candidate._id.toString())

      return {
        candidateId: candidate._id,
        candidateName: candidate.name,
        votes: candidateVotes.length,
        percentage: votes.length > 0 ? (candidateVotes.length / votes.length) * 100 : 0,
        voters: candidateVotes.map((vote) => ({
          email: vote.email,
          candidateName: candidate.name,
          timestamp: vote.timestamp,
        })),
      }
    })

    return res.status(200).json({
      totalVotes: votes.length,
      results,
    })
  } catch (error) {
    console.error("Get Voting Results Error:", error)
    return res.status(500).json({ message: "Server error" })
  }
}

export { checkVoteStatus, submitVote, getVotingResults }
