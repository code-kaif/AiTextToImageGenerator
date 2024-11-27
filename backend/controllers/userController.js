import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import razorpay from "razorpay";
// import Transaction from "../models/transactionModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Plz Enter all details" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new User(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, "nvfdsnvkdnvkdnvdnfvsnv");

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, "nvfdsnvkdnvkdnvdnfvsnv");
      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    res.json({
      success: true,
      creditBalance: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// const razorpayInstance = new razorpay({
//   key_id: "rzp_test_EkHebaijoULPoN",
//   key_secret: "0gjgKG0VYQ7ziq2mCyOAU9GP",
// });

// export const paymentRazorpay = async (req, res) => {
//   try {
//     const { userId, planId } = req.body;
//     const userData = await User.findById(userId);
//     if (!userId || planId) {
//       return res.json({ success: false, message: "Missing Details" });
//     }

//     let credits, plan, amount, date;

//     switch (planId) {
//       case "Basic":
//         plan = "Basic";
//         credits = 100;
//         amount = 10;
//         break;
//       case "Advanced":
//         plan = "Advanced";
//         credits = 500;
//         amount = 50;
//         break;
//       case "Business":
//         plan = "Business";
//         credits = 5000;
//         amount = 250;
//         break;

//       default:
//         return res.json({ success: false, message: "Plan Not Found" });
//     }

//     date = Date.now();

//     const transactionData = {
//       userId,
//       plan,
//       amount,
//       credits,
//       date,
//     };
//     const newTransaction = await Transaction.create(transactionData);

//     const options = {
//       amount: amount * 100,
//       currency: "INR",
//       receipt: newTransaction._id,
//     };

//     await razorpayInstance.orders.create(options, (error, order) => {
//       if (error) {
//         console.log(error);
//         return res.json({ success: false, message: error });
//       }
//       res.json({ success: true, order });
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };