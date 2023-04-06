import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "",
  credentials: true
}));


const mongoURI = "mongodb+srv://ujwalgupta30:Ujwalmongo1@cluster0.vhj6sqt.mongodb.net/?retryWrites=true&w=majority"

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
        res.status(200).send({ message: "User already logged-in", user:user });
        }else{
            res.status(200).send({message:"Password didn't match"})
        }
      } else {
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(200).send({ message: "User logged-in successfully" });
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
        res.status(200).send({ message: "User already registered" });
      } else {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.ststus(200).send({ message: "User saved successfully" });
      }
    } catch (err) {
      res.status(200).send({message: "ERR"});
    }
  });

app.listen(9200, () => {
  console.log("Listening")
});