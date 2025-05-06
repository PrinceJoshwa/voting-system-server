import mongoose from "mongoose"

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    timestamps: true,
  },
)

const Candidate = mongoose.model("Candidate", candidateSchema)
export default Candidate
