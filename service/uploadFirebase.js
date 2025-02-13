const admin = require("firebase-admin");
const package = require("../middlewares/package");

// Account of Firebase
const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "finalsoa-fae05.appspot.com",
});


const uploadFile = (rcfile) => {
    return new Promise((resolve, reject) => {
        const uploadedFile = rcfile;

        const bucket = admin.storage().bucket();
        const destinationPath = `avatars/upload/${Date.now()}-${uploadedFile.originalname}`;

        // Upload the file to Firebase Cloud Storage
        const file = bucket.file(destinationPath);
        const stream = file.createWriteStream({
            metadata: {
                contentType: uploadedFile.mimetype,
            },
            public: true,
        });

        stream.on("error", (error) => {
            console.error("Error uploading file:", error);
            reject({ code: 500, message: "Error uploading file" });
        });

        stream.on("finish", () => {
            console.log("File uploaded successfully.");

            // Get the download URL
            file.getSignedUrl({
                action: "read",
                expires: "01-01-2100",
            })
                .then((urls) => {
                    const downloadURL = urls[0];
                    resolve({ code: 0, message: "Upload file successfully.", data: downloadURL });
                })
                .catch((error) => {
                    console.error("Error getting download URL:", error);
                    reject({ code: 500, message: "Error getting download URL" });
                });
        });

        stream.end(uploadedFile.buffer);
    });
};
module.exports = uploadFile;