// // import Vote from "../models/voteModel.js"
// // import Candidate from "../models/candidateModel.js"

// // // Check if user has already voted
// // const checkVoteStatus = async (req, res) => {
// //   try {
// //     const user = req.user

// //     // Check if user has already voted
// //     const existingVote = await Vote.findOne({ email: user.email })

// //     return res.status(200).json({
// //       hasVoted: !!existingVote,
// //     })
// //   } catch (error) {
// //     console.error("Check Vote Status Error:", error)
// //     return res.status(500).json({ message: "Server error" })
// //   }
// // }

// // // Submit a vote
// // const submitVote = async (req, res) => {
// //   try {
// //     const { candidateId } = req.body
// //     const user = req.user

// //     if (!candidateId) {
// //       return res.status(400).json({ message: "Candidate ID is required" })
// //     }

// //     // Check if user has already voted
// //     const existingVote = await Vote.findOne({ email: user.email })

// //     if (existingVote) {
// //       return res.status(400).json({ message: "You have already voted" })
// //     }

// //     // Create new vote
// //     const newVote = new Vote({
// //       user: user._id,
// //       email: user.email,
// //       candidateId,
// //     })

// //     await newVote.save()

// //     return res.status(201).json({
// //       message: "Vote submitted successfully",
// //       vote: {
// //         candidateId,
// //         timestamp: newVote.timestamp,
// //       },
// //     })
// //   } catch (error) {
// //     console.error("Submit Vote Error:", error)
// //     return res.status(500).json({ message: "Server error" })
// //   }
// // }

// // // Get voting results (admin only)
// // const getVotingResults = async (req, res) => {
// //   try {
// //     const user = req.user

// //     // Check if user is admin
// //     if (!user.isAdmin) {
// //       return res.status(403).json({ message: "Not authorized to view results" })
// //     }

// //     // Get all votes
// //     const votes = await Vote.find().populate("user", "name email")

// //     // Get all candidates
// //     const candidates = await Candidate.find()

// //     // Calculate results
// //     const results = candidates.map((candidate) => {
// //       const candidateVotes = votes.filter((vote) => vote.candidateId === candidate._id.toString())

// //       return {
// //         candidateId: candidate._id,
// //         candidateName: candidate.name,
// //         votes: candidateVotes.length,
// //         percentage: votes.length > 0 ? (candidateVotes.length / votes.length) * 100 : 0,
// //         voters: candidateVotes.map((vote) => ({
// //           email: vote.email,
// //           candidateName: candidate.name,
// //           timestamp: vote.timestamp,
// //         })),
// //       }
// //     })

// //     return res.status(200).json({
// //       totalVotes: votes.length,
// //       results,
// //     })
// //   } catch (error) {
// //     console.error("Get Voting Results Error:", error)
// //     return res.status(500).json({ message: "Server error" })
// //   }
// // }

// // export { checkVoteStatus, submitVote, getVotingResults }




// import Vote from "../models/voteModel.js"
// import Candidate from "../models/candidateModel.js"
// import User from "../models/userModel.js"

// // Check if user has already voted
// const checkVoteStatus = async (req, res) => {
//   try {
//     const user = req.user

//     // Check if user has already voted
//     const existingVote = await Vote.findOne({ email: user.email })

//     return res.status(200).json({
//       hasVoted: !!existingVote,
//     })
//   } catch (error) {
//     console.error("Check Vote Status Error:", error)
//     return res.status(500).json({ message: "Server error" })
//   }
// }

// // Submit a vote
// const submitVote = async (req, res) => {
//   try {
//     const { candidateId } = req.body
//     const user = req.user

//     if (!candidateId) {
//       return res.status(400).json({ message: "Candidate ID is required" })
//     }

//     // Check if user has already voted
//     const existingVote = await Vote.findOne({ email: user.email })

//     if (existingVote) {
//       return res.status(400).json({ message: "You have already voted" })
//     }

//     // Create new vote
//     const newVote = new Vote({
//       user: user._id,
//       email: user.email,
//       candidateId,
//     })

//     await newVote.save()

//     return res.status(201).json({
//       message: "Vote submitted successfully",
//       vote: {
//         candidateId,
//         timestamp: newVote.timestamp,
//       },
//     })
//   } catch (error) {
//     console.error("Submit Vote Error:", error)
//     return res.status(500).json({ message: "Server error" })
//   }
// }

// // Get voting results (admin only)
// const getVotingResults = async (req, res) => {
//   try {
//     const user = req.user

//     // Check if user is admin
//     if (!user.isAdmin) {
//       return res.status(403).json({ message: "Not authorized to view results" })
//     }

//     // Get all votes with user details
//     const votes = await Vote.find().populate("user", "name email")

//     // Get all candidates
//     const candidates = await Candidate.find()

//     // Get all voters with their details
//     const voterList = await Promise.all(
//       votes.map(async (vote) => {
//         const candidate = candidates.find((c) => c._id.toString() === vote.candidateId)
//         const voter = await User.findById(vote.user).select("name email")

//         return {
//           voterId: vote.user,
//           voterName: voter ? voter.name : "Unknown",
//           email: vote.email,
//           candidateId: vote.candidateId,
//           candidateName: candidate ? candidate.name : "Unknown Candidate",
//           timestamp: vote.timestamp,
//         }
//       }),
//     )

//     // Calculate results
//     const results = candidates.map((candidate) => {
//       const candidateVotes = votes.filter((vote) => vote.candidateId === candidate._id.toString())

//       return {
//         candidateId: candidate._id,
//         candidateName: candidate.name,
//         votes: candidateVotes.length,
//         percentage: votes.length > 0 ? (candidateVotes.length / votes.length) * 100 : 0,
//       }
//     })

//     return res.status(200).json({
//       totalVotes: votes.length,
//       results,
//       voterList,
//     })
//   } catch (error) {
//     console.error("Get Voting Results Error:", error)
//     return res.status(500).json({ message: "Server error" })
//   }
// }

// export { checkVoteStatus, submitVote, getVotingResults }

import Vote from "../models/voteModel.js"
import Candidate from "../models/candidateModel.js"
import User from "../models/userModel.js"

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

    // Create a map of candidate IDs to candidate objects for easier lookup
    const candidateMap = {}
    candidates.forEach((candidate) => {
      candidateMap[candidate._id.toString()] = candidate
    })

    // Get all voters with their details
    const voterList = await Promise.all(
      votes.map(async (vote) => {
        // Find the candidate by ID
        const candidateId = vote.candidateId.toString()
        const candidate = candidateMap[candidateId]

        // Get voter details
        const voter = await User.findById(vote.user).select("name email")

        return {
          voterId: vote.user,
          voterName: voter ? voter.name : "Unknown",
          email: vote.email,
          candidateId: vote.candidateId,
          candidateName: candidate ? candidate.name : "Unknown Candidate",
          timestamp: vote.timestamp,
        }
      }),
    )

    // Calculate results for each candidate
    const results = candidates.map((candidate) => {
      const candidateId = candidate._id.toString()
      const candidateVotes = votes.filter((vote) => vote.candidateId.toString() === candidateId)

      return {
        candidateId: candidate._id,
        candidateName: candidate.name,
        votes: candidateVotes.length,
        percentage: votes.length > 0 ? (candidateVotes.length / votes.length) * 100 : 0,
      }
    })

    // Add debug information to help troubleshoot
    console.log(
      "Candidates:",
      candidates.map((c) => ({ id: c._id.toString(), name: c.name })),
    )
    console.log(
      "Votes:",
      votes.map((v) => ({ candidateId: v.candidateId.toString(), email: v.email })),
    )
    console.log("Results:", results)

    return res.status(200).json({
      totalVotes: votes.length,
      results,
      voterList,
    })
  } catch (error) {
    console.error("Get Voting Results Error:", error)
    return res.status(500).json({ message: "Server error" })
  }
}

export { checkVoteStatus, submitVote, getVotingResults }
