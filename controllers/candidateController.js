import Candidate from "../models/candidateModel.js"

// Get all candidates
const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()

    return res.status(200).json(candidates)
  } catch (error) {
    console.error("Get Candidates Error:", error)
    return res.status(500).json({ message: "Server error" })
  }
}

export { getCandidates }
