const mongoose = require("mongoose");
const config = require("../config");

require("./models/portfolio");

module.exports = {
  connect: () => {
    return mongoose.connect(
      config.DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      },
      err => {
        if (err) {
          console.log("error");
        } else {
          console.log("connected to data base");
        }
      }
    );
  }
};
// exports.connect = () => {
//   return mongoose.connect(
//     config.DB_URI,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false
//     },
//     err => {
//       if (err) {
//         console.log("error");
//       } else {
//         console.log("connected to data base");
//       }
//     }
//   );
// };
