const express = require("express");
const app = express();

require("dotenv").config();
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");

// app.use(cors());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // frontend + dashboard
    credentials: true, // ✅ Allow sending cookies (like JWT)
  })
);

const cookieParser = require("cookie-parser");
// Use cookie parser before your routes
app.use(cookieParser());

app.use(bodyParser.json());
// app.use(express.json())  same as above line

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

mongoose.connect(uri);

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const { UsersModel } = require("./model/UsersModel");
const { HoldingsModel } = require("./model/HoldingsModel");
const { OrdersSchema } = require("./schemas/OrdersSchema");
const { OrdersModel } = require("./model/OrdersModel");


// app.get("/addHoldings", async (req, res) => {
//     let tempHoldings = [
//         {
//           name: "BHARTIARTL",
//           qty: 2,
//           avg: 538.05,
//           price: 541.15,
//           net: "+0.58%",
//           day: "+2.99%",
//         },
//         {
//           name: "HDFCBANK",
//           qty: 2,
//           avg: 1383.4,
//           price: 1522.35,
//           net: "+10.04%",
//           day: "+0.11%",
//         },
//         {
//           name: "HINDUNILVR",
//           qty: 1,
//           avg: 2335.85,
//           price: 2417.4,
//           net: "+3.49%",
//           day: "+0.21%",
//         },
//         {
//           name: "INFY",
//           qty: 1,
//           avg: 1350.5,
//           price: 1555.45,
//           net: "+15.18%",
//           day: "-1.60%",
//           isLoss: true,
//         },
//         {
//           name: "ITC",
//           qty: 5,
//           avg: 202.0,
//           price: 207.9,
//           net: "+2.92%",
//           day: "+0.80%",
//         },
//         {
//           name: "KPITTECH",
//           qty: 5,
//           avg: 250.3,
//           price: 266.45,
//           net: "+6.45%",
//           day: "+3.54%",
//         },
//         {
//           name: "M&M",
//           qty: 2,
//           avg: 809.9,
//           price: 779.8,
//           net: "-3.72%",
//           day: "-0.01%",
//           isLoss: true,
//         },
//         {
//           name: "RELIANCE",
//           qty: 1,
//           avg: 2193.7,
//           price: 2112.4,
//           net: "-3.71%",
//           day: "+1.44%",
//         },
//         {
//           name: "SBIN",
//           qty: 4,
//           avg: 324.35,
//           price: 430.2,
//           net: "+32.63%",
//           day: "-0.34%",
//           isLoss: true,
//         },
//         {
//           name: "SGBMAY29",
//           qty: 2,
//           avg: 4727.0,
//           price: 4719.0,
//           net: "-0.17%",
//           day: "+0.15%",
//         },
//         {
//           name: "TATAPOWER",
//           qty: 5,
//           avg: 104.2,
//           price: 124.15,
//           net: "+19.15%",
//           day: "-0.24%",
//           isLoss: true,
//         },
//         {
//           name: "TCS",
//           qty: 1,
//           avg: 3041.7,
//           price: 3194.8,
//           net: "+5.03%",
//           day: "-0.25%",
//           isLoss: true,
//         },
//         {
//           name: "WIPRO",
//           qty: 4,
//           avg: 489.3,
//           price: 577.75,
//           net: "+18.08%",
//           day: "+0.32%",
//         },
//       ];

//     tempHoldings.forEach((item) => {
//         let newHolding = new HoldingsModel({
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//         });
//         newHolding.save();
//     });
//      res.send("Done!");

// });

// app.get("/addPositions", async (req, res) => {
//     let tempPositions = [
//         {
//           product: "CNC",
//           name: "EVEREADY",
//           qty: 2,
//           avg: 316.27,
//           price: 312.35,
//           net: "+0.58%",
//           day: "-1.24%",
//           isLoss: true,
//         },
//         {
//           product: "CNC",
//           name: "JUBLFOOD",
//           qty: 1,
//           avg: 3124.75,
//           price: 3082.65,
//           net: "+10.04%",
//           day: "-1.35%",
//           isLoss: true,
//         },
//       ];

//     tempPositions.forEach((position) => {
//         let newPosition = new PositionsModel({
//             product: position.product,
//             name: position.name,
//             qty: position.qty,
//             avg: position.avg,
//             price: position.price,
//             net: position.net,
//             day: position.day,
//             isLoss: position.isLoss,
//         });

//         newPosition.save();
//     });
//     res.send("Done");
// });



// User Authentication

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await UsersModel.findOne({ username });
    if(existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save new user
    const newUser = new UsersModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // 4. Create JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,  // Prevent access to cookie via JavaScript
      // secure: process.env.NODE_ENV === 'production',  // Only send cookies over HTTPS in production
      // sameSite: 'Strict',  // Restrict cross-site cookie sharing
      sameSite: 'None',
      secure: false,         // ✅ Allow cookie over HTTP
      // domain: ".localhost",
      maxAge: 24 * 60 * 60 * 1000,  // Cookie expiration (24 hour)
    });

    res.status(201).json({ msg: "Signup successful" });

   // res.status(201).json({ token }); // Send token to frontend


  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;
                  
  // Step 1: Input validation
  if (!username || !password) {
    return res.status(400).json({ msg: "Please provide both username and password" });
  }

  try {
    // Step 2: Find user by username
    const user = await UsersModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid username or password" });
   }

    // Step 3: Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
       return res.status(400).json({ msg: "Invalid username or password" });
    }

    // Step 4: Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET, // Use a proper secret key here
      { expiresIn: "24h" }
    );
     
    res.cookie("token", token, {
      httpOnly: true,  // Prevent access to cookie via JavaScript
      // secure: process.env.NODE_ENV === 'production',  // Only send cookies over HTTPS in production
      // sameSite: 'Strict',  // Restrict cross-site cookie sharing
      sameSite: 'lax',
      // secure: true,
      secure: false,         // ✅ Allow cookie over HTTP
      maxAge: 24 * 60 * 60 * 1000,  // Cookie expiration (1 hour)
    });

    // Step 5: Send response with token

    res.status(200).json({ msg: "Login successful" });

    // res.status(201).json({ token }); // Send token to frontend
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


app.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  res.status(200).json({ message: 'Logged out' });
});


// User Authorisation


// authContext in frontend 

app.get('/auth/status', (req, res) => {

  const token = req.cookies.token;
  console.log(token);
  if (!token) return res.json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ loggedIn: true, user: decoded });
  } catch (err) {
    return res.json({ loggedIn: false });
  }
});



const authenticateUser = (req, res, next) => {
  const token = req.cookies.token; // get token from cookie

  if (!token) {
    return res.status(401).json({ message: "No token. Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach to request
    next(); // go to route handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

app.get("/auth/check", authenticateUser, (req, res) => {
  // If token is valid, user is logged in
  res.json({ loggedIn: true, userId: req.user.userId });
});



// Stock Buy-Sell Features

app.post("/stockBuy", authenticateUser, async (req, res) => {
  
  const userId = req.user.userId;
  const { name, qty, price } = req.body;
  
  const quantity = Number(qty);
  const stockPrice = Number(price);
  const totalCost = quantity * stockPrice;

  try {
    
    const user = await UsersModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.funds -= totalCost;
    await user.save();

    let existingHolding = await HoldingsModel.findOne({ user: userId, name: name });

    if (existingHolding) {
      // Stock already exists -> Update the quantity
      existingHolding.qty += quantity;
      
      await existingHolding.save();
      return res.json({ success: true, message: "Holding updated!" });
    
    } else {
      // Stock does not exist -> Create new holding
      let holding = new HoldingsModel({
        name: name,
        qty: quantity,
        price: stockPrice, // Static price
        user: userId,
      });

      await holding.save();
      return res.json({ success: true, message: "Holding created!" });
    }
  } catch (error) {
    console.error("Error in stockBuy:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


app.post("/stockSell", authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  const { name, qty, price } = req.body;

  const quantity = Number(qty);
  const sellPrice = Number(price);
  
  const totalCost = quantity * sellPrice;

  try {
    // Find the stock in the user's holdings

    const existingHolding = await HoldingsModel.findOne({ user: userId, name });

    if (! existingHolding) {
      return res.status(404).json({ success: false, message: "You don't hold this stock." });
    }
 
    if (existingHolding.qty < quantity) {
      return res.status(400).json({ success: false, message: "Insufficient quantity to sell." });
    }

    // Deduct the sold quantity
    existingHolding.qty -= quantity;

    const user = await UsersModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.funds += totalCost;
    await user.save();


    // If all shares sold, remove the holding
    if (existingHolding.qty === 0) {
      await HoldingsModel.deleteOne({ _id: existingHolding._id });
      return res.json({ success: true, message: "All shares sold Holding removed." });
    } else {
      await existingHolding.save();
      return res.json({ success: true, message: "Shares sold. Holding updated." });
    }
    
  } catch (error) {
    console.error("Error in stockSell:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// Funds Management


app.get("/getUserFunds", authenticateUser, async (req, res) => {
  try {
    
    const user = await UsersModel.findById(req.user.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ funds: user.funds });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});


// Deposit funds

app.post("/depositFunds", authenticateUser, async (req, res) => {
  
  const { amount } = req.body;
  

  try {
    const user = await UsersModel.findById(req.user.userId);

    user.funds += amount;
    await user.save();

    res.json({ msg: `Added ₹${amount}`, funds: user.funds });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Withdraw funds
app.post("/withdrawFunds", authenticateUser, async (req, res) => {
  const { amount } = req.body;
 
  try {
    const user = await UsersModel.findById(req.user.userId);

    user.funds -= amount;
    await user.save();

    res.json({ msg: `Withdrew ₹${amount}`, funds: user.funds });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});




app.get("/allHoldings", authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  let allHoldings = await HoldingsModel.find({ user: userId});
  res.json(allHoldings);
});


app.get("/", (req, res) => {
  res.send("good");
})

app.listen(PORT, () => {
  console.log("App started!");
});
