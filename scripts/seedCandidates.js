
// import mongoose from "mongoose"
// import dotenv from "dotenv"
// import Candidate from "../models/candidateModel.js"

// dotenv.config()

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => {
//     console.error("MongoDB connection error:", err)
//     process.exit(1)
//   })

// const seedCandidates = async () => {
//   try {
//     // Clear existing candidates
//     await Candidate.deleteMany({})

//     // Create new candidates
//     const candidates = [
//       {
//         name: "John Smith",
//         position: "Student Body President",
//         image: "/placeholder.svg?height=100&width=100",
//       },
//       {
//         name: "Sarah Johnson",
//         position: "Student Body President",
//         image: "/placeholder.svg?height=100&width=100",
//       },
//       {
//         name: "Michael Brown",
//         position: "Student Body President",
//         image: "/placeholder.svg?height=100&width=100",
//       },
//     ]

//     const createdCandidates = await Candidate.insertMany(candidates)

//     console.log("Candidates created:")
//     createdCandidates.forEach((candidate) => {
//       console.log(`ID: ${candidate._id}, Name: ${candidate.name}`)
//     })

//     console.log("\nUse these IDs in your VotingPage component:")
//     console.log(`
//     const [candidates, setCandidates] = useState([
//       { id: "${createdCandidates[0]._id}", name: "${createdCandidates[0].name}", position: "${createdCandidates[0].position}", image: "${createdCandidates[0].image}" },
//       { id: "${createdCandidates[1]._id}", name: "${createdCandidates[1].name}", position: "${createdCandidates[1].position}", image: "${createdCandidates[1].image}" },
//       { id: "${createdCandidates[2]._id}", name: "${createdCandidates[2].name}", position: "${createdCandidates[2].position}", image: "${createdCandidates[2].image}" },
//     ]);
//     `)

//     process.exit(0)
//   } catch (error) {
//     console.error("Error seeding candidates:", error)
//     process.exit(1)
//   }
// }

// seedCandidates()

import connectDB from "../config/db.js";
import Candidate from "../models/candidateModel.js";

await connectDB(); // This connects using MONGODB_URI from .env

const seedCandidates = async () => {
  try {
    await Candidate.deleteMany();

    const candidates = [
      { name: "John Smith", position: "President" },
      { name: "Sarah Johnson", position: "President" },
      { name: "Michael Brown", position: "President" },
    ];

    const created = await Candidate.insertMany(candidates);
    console.log("Candidates created:", created);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
};

seedCandidates();
