const ImageKit = require("imagekit");
const mongoose = require("mongoose");


const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY_URL,
  privateKey: process.env.PRIVATE_KEY_URL,
  urlEndpoint: process.env.END_POINT_URL,
});

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file.buffer,
        fileName: new mongoose.Types.ObjectId().toString(),
        folder: "moodyPlayer",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}

module.exports = uploadFile;
