const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { adminRouter } = require("./routes/adminAuth.routes");
const { userRouter } = require("./routes/userAuth.routes");
const { packageRouter } = require("./routes/packages.routes");
const { memberRouter } = require("./routes/members.routes");
const { msgRouter } = require("./routes/communicationMsg.routes");
const { blockMembersRoute } = require("./routes/blockMembers.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/package", packageRouter);
app.use("/member", memberRouter);
app.use("/msg", msgRouter);
app.use("/blockMembers", blockMembersRoute);



// Database connection
app.listen(process.env.PORT || 8080, async () => {
  try {
    await connection;
    console.log("Connected with database!!");
    console.log(`Server running on port ${process.env.PORT}!`);
  } catch (error) {
    console.log(error);
  }
});
