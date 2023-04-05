import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoURI = "mongodb+srv://tanishgupta0707:07121998%40UdhampuR@cluster0.xmwrc50.mongodb.net/mydatabase?retryWrites=true&w=majority"

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Mongoose is connected");
})
.catch((err) => {
  console.log("Could not connect to MongoDB: ", err);
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const User = mongoose.model("User",userSchema);

app.post("/login", async(req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        if(password === user.password) {
        res.send({ message: "User already logged-in", user:user });
        }else{
            res.send({message:"Pass didn't matched"})
        }
      } else {
        const newUser = new User({ email, password });
        await newUser.save();
        res.send({ message: "User logged-in successfully" });
      }
    } catch (err) {
      res.send(err);
    }
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.send({ message: "User saved successfully" });
      }
    } catch (err) {
      res.send(err);
    }
  });

app.listen(9200, () => {
  console.log("Listening")
});