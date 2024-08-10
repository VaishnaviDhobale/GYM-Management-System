const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { adminRouter } = require("./routes/adminAuth.routes");
const { userRouter } = require("./routes/userAuth.routes");
const { packageRouter } = require("./routes/packages.routes");
const { memberRouter } = require("./routes/members.routes");
const { msgRouter } = require("./routes/communicationMsg.routes");
const { blockMembersRoute } = require("./routes/blockMembers.routes");
const { blockUserRoute } = require("./routes/blockUsers.routes");
const { supplementRouter } = require("./routes/supplementStore.routes");
const { privateMsgRouter } = require("./routes/privateMsgs.routes");
const { trainerRouter } = require("./routes/trainer.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/package", packageRouter);
app.use("/supplement", supplementRouter);
app.use("/member", memberRouter);
app.use("/msg", msgRouter);
app.use("/blockMembers", blockMembersRoute);
app.use("/blockUsers", blockUserRoute);
app.use("/privateMsgs", privateMsgRouter);
app.use("/trainers", trainerRouter);



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
