// import express from "express"
// import { googleAuth } from "../controllers/userController.js"

// const router = express.Router()

// router.post("/google", googleAuth)

// export default router

import express from "express"
import { googleAuth, getUsers, updateUserToAdmin } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/google", googleAuth)

// Admin routes
router.get("/", protect, getUsers)
router.put("/:userId/make-admin", protect, updateUserToAdmin)

export default router
