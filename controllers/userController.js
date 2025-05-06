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

export { googleAuth }
