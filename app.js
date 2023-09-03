if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");

const RoadMap = require("./roadmap_model");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4000/?API_URL=http%3A%2F%2Flocalhost%3A8080",
  })
);

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 5000;

const t2 = `mongodb://amoghpnivas:${process.env.MONGODB_PWD}@ac-9r8jibh-shard-00-00.yeabb6z.mongodb.net:27017,ac-9r8jibh-shard-00-01.yeabb6z.mongodb.net:27017,ac-9r8jibh-shard-00-02.yeabb6z.mongodb.net:27017/roadmap-chatbot-db?ssl=true&replicaSet=atlas-az3rxw-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose
  .connect(t2)
  .then(() => {
    console.log("DB connection successfull");
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// roadmap = {
//     steps: '\n' +
//       '\n' +
//       '1. Node.js Basics\n' +
//       '2. JavaScript and Node.js Syntax\n' +
//       '3. Node.js Core Modules\n' +
//       '4. Node Package Manager (npm)\n' +
//       '5. Asynchronous Programming\n' +
//       '6. Event-driven Programming\n' +
//       '7. Working with File System\n' +
//       '8. Working with Streams\n' +
//       '9. Working with Databases\n' +
//       '10. Web Application Development with Express.js\n' +
//       '11. Building APIs with Node.js\n' +
//       '12. Security and Authentication\n' +
//       '13. Debugging Node.js Applications\n' +
//       '14. Unit Testing Node.js Applications\n' +
//       '15. Performance Optimization',
//     prerequisites: '\n' +
//       '\n' +
//       '1. Node.js Basics: Basic knowledge of JavaScript programming.\n' +
//       '2. JavaScript and Node.js Syntax: Basic knowledge of JavaScript programming, familiarity with the
//   Node.js platform.\n' +
//       '3. Node.js Core Modules: Knowledge of Node.js and its core modules.\n' +
//       '4. Node Package Manager (npm): Knowledge of Node.js and familiarity with the npm package manager.\n' +
//       '5. Asynchronous Programming: Knowledge of JavaScript and Node.js syntax, understanding of asynchronous programming.\n' +
//       '6. Event-driven Programming: Knowledge of JavaScript and Node.js syntax, understanding of event-driven programming.\n' +
//       '7. Working with File System: Knowledge of JavaScript and Node.js syntax, familiarity with the Node.js file system module.\n' +
//       '8. Working with Streams: Knowledge of JavaScript and Node.js syntax, familiarity with Node.js streams.\n' +
//       '9. Working with Databases: Knowledge of JavaScript and Node.js syntax, familiarity with Node.js database drivers.\n' +
//       '10. Web Application Development with Express.js: Knowledge of JavaScript and Node.js syntax, familiarity with the Express.js framework.\n' +
//       '11. Building APIs with Node.js: Knowledge of JavaScript and Node.js syntax, familiarity with Node.js',
//     resources: '\n' +
//       '\n' +
//       '1. Node.js Basics: https://www.w3schools.com/nodejs/default.asp\n' +
//       '2. JavaScript and Node.js Syntax: https://www.tutorialspoint.com/nodejs/nodejs_syntax.htm\n' +
//       '3. Node.js Core Modules: https://nodejs.org/dist/latest-v10.x/docs/api/\n' +
//       '4. Node Package Manager (npm): https://www.sitepoint.com/beginners-guide-node-package-manager/\n' +
//       '5. Asynchronous Programming: https://www.pluralsight.com/guides/javascript-asynchronous-programming-node-js\n' +
//       '6. Event-driven Programming: https://www.youtube.com/watch?v=G-hA4X1_Kf4\n' +
//       '7. Working with File System: https://www.tutorialspoint.com/nodejs/nodejs_filesystem.htm\n' +
//       '8. Working with Streams: https://www.youtube.com/watch?v=zjHrGX5MvzI\n' +
//       '9. Working with Databases: https://www.codement'
//   }

steps =
  "\n" +
  "\n" +
  "1. Node.js Basics\n" +
  "2. JavaScript and Node.js Syntax\n" +
  "3. Node.js Core Modules\n" +
  "4. Node Package Manager (npm)\n" +
  "5. Asynchronous Programming\n" +
  "6. Event-driven Programming\n" +
  "7. Working with File System\n" +
  "8. Working with Streams\n" +
  "9. Working with Databases\n" +
  "10. Web Application Development with Express.js\n" +
  "11. Building APIs with Node.js\n" +
  "12. Security and Authentication\n" +
  "13. Debugging Node.js Applications\n" +
  "14. Unit Testing Node.js Applications\n" +
  "15. Performance Optimization";

const resources =
  "\n" +
  "\n" +
  "1. Node.js Basics: https://www.w3schools.com/nodejs/default.asp\n" +
  "2. JavaScript and Node.js Syntax: https://www.tutorialspoint.com/nodejs/nodejs_syntax.htm\n" +
  "3. Node.js Core Modules: https://nodejs.org/dist/latest-v10.x/docs/api/\n" +
  "4. Node Package Manager (npm): https://www.sitepoint.com/beginners-guide-node-package-manager/\n" +
  "5. Asynchronous Programming: https://www.pluralsight.com/guides/javascript-asynchronous-programming-node-js\n" +
  "6. Event-driven Programming: https://www.youtube.com/watch?v=G-hA4X1_Kf4\n" +
  "7. Working with File System: https://www.tutorialspoint.com/nodejs/nodejs_filesystem.htm\n" +
  "8. Working with Streams: https://www.youtube.com/watch?v=zjHrGX5MvzI\n" +
  "9. Working with Databases: https://www.codement";

function formatRequest(s) {
  const lines = s.split("\n").filter((line) => line.trim() != "");
  //   console.log(lines);
  const ans = [];
  lines.forEach((line) => {
    ans.push(line.replace(/^\d+\.\s*/, ""));
  });
  //   console.log(ans);
  return ans;
}

// formatRequest(resources);

app.post("/roadmap", async (req, res) => {
  const data = req.body;

  console.log(data.resources);

  const steps = data.steps.split("\n").filter((line) => line.trim() != "");
  const temp = formatRequest(data.prerequisites);
  console.log(temp);
  const resources = formatRequest(data.resources);
  //   const parts = temp.split(":");
  const prerequisites = temp.map((s) => s.split(":")[1].trim());

  console.log(steps);
  console.log(prerequisites);
  console.log(resources);

  const obj = {
    topic: data.topic,
    steps: steps,
    prerequisites: prerequisites,
    resources: resources,
  };

  const roadmap = new RoadMap(obj);

  console.log(roadmap._id);

  await roadmap.save();

  const responseData = {
    message: "Data received successfully",
    id: roadmap._id,
  };
  res.status(200).json(responseData);
});

app.get("/roadmap/:roadmapId", async (req, res) => {
  const { roadmapId } = req.params;

  const roadmap = await RoadMap.findById(roadmapId);

  if (!roadmap) {
    res.status(400).send({ message: "Roadmap not found" });
  }

  res.render("show", { roadmap });
});
