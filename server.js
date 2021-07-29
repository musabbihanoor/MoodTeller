const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const connectDB = require("./config/db");
const Data = require("./Model");
const newData = require("./Data");
const path = require("path");

connectDB();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/admin", async (req, res) => {
  try {
    const newData = new Data({
      name: req.body.name,
      emoji: req.body.emoji,
      color: req.body.color,
    });

    const data = await newData.save();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/admin", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/data", async (req, res) => {
  try {
    const NewData = new newData({
      name: req.body.name,
      emoji: req.body.emoji,
      color: req.body.color,
    });

    const data = await NewData.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "testemailmusabbiha@gmail.com",
        pass: "musabbiha@18", // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const mailOptions = {
      from: "testemailmusabbiha@gmail.com",
      to: "huzaifamawahab@gmail.com",
      subject: "Mood changed",
      text: "My mood has changed",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        return;
      }
    });

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/data", async (req, res) => {
  try {
    const data = await newData.findOne({}).sort({ _id: -1 });
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
