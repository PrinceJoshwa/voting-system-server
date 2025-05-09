// import jwt from "jsonwebtoken"
// import User from "../models/userModel.js"

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   })
// }

// const googleAuth = async (req, res) => {
//   try {
//     const { token } = req.body

//     // Verify the access token with Google
//     const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })

//     if (!response.ok) {
//       throw new Error("Failed to verify token")
//     }

//     const userData = await response.json()
//     const { name, email, sub: googleId } = userData

//     let user = await User.findOne({ email })

//     if (!user) {
//       // Check if this is the first user (make them admin)
//       const userCount = await User.countDocuments()
//       const isAdmin = userCount === 0

//       user = await User.create({
//         name,
//         email,
//         googleId,
//         isAdmin,
//       })
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateToken(user._id),
//     })
//   } catch (error) {
//     console.error("Google Auth Error:", error)
//     res.status(401).json({ message: "Invalid token" })
//   }
// }

// export { googleAuth }


import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body

    // Verify the access token with Google
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.ok) {
      throw new Error("Failed to verify token")
    }

    const userData = await response.json()
    const { name, email, sub: googleId } = userData

    let user = await User.findOne({ email })

    if (!user) {
      // Check if this is the first user (make them admin)
      const userCount = await User.countDocuments()
      const isAdmin = userCount === 0

      user = await User.create({
        name,
        email,
        googleId,
        isAdmin,
      })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } catch (error) {
    console.error("Google Auth Error:", error)
    res.status(401).json({ message: "Invalid token" })
  }
}

// Get all users (admin only)
const getUsers = async (req, res) => {
  try {
    // Check if requesting user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to view users" })
    }

    const users = await User.find().select("-password")
    res.json(users)
  } catch (error) {
    console.error("Get Users Error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Update user to admin (admin only)
const updateUserToAdmin = async (req, res) => {
  try {
    // Check if requesting user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to update users" })
    }

    const { userId } = req.params

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.isAdmin = true
    await user.save()

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } catch (error) {
    console.error("Update User Error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export { googleAuth, getUsers, updateUserToAdmin }
