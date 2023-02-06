const path = require('path');
const cwd = path.join(__dirname, '..');


const processFile = require("../middleware/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: "./my-service-account-key.json" });
const bucket = storage.bucket("dsd-cloud-storage");


// define the path and name of Google Cloud Storage object to download
const fileName = 'dji_demo/objects/OfficeScptTest.obj'
// define the destination folder of downloaded object

// @ desc upload a file
// @ route POST /files
// @ access Private
const upload = async (req, res) => {
    try {
      await processFile(req, res);
  
      if (!req.file) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
  
      // Create a new blob in the bucket and upload the file data.
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });
  
      blobStream.on("error", (err) => {
        res.status(500).send({ message: err.message });
      });
  
      blobStream.on("finish", async (data) => {
        // Create URL for directly file access via HTTP.
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
  
        try {
          // Make the file public
          await bucket.file(req.file.originalname).makePublic();
        } catch {
          return res.status(500).send({
            message:
              `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
            url: publicUrl,
          });
        }
  
        res.status(200).send({
          message: "Uploaded the file successfully: " + req.file.originalname,
          url: publicUrl,
        });
      });
  
      blobStream.end(req.file.buffer);
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
          return res.status(500).send({
            message: "File size cannot be larger than 2MB!",
          });
        }
    
        res.status(500).send({
          message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
  };
  
  // @ desc get list of the files
  // @ route get /files
  // @ access Private
  const getListFiles = async (req, res) => {
    try {
      const [files] = await bucket.getFiles();
      let fileInfos = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file.name,
          url: file.metadata.mediaLink,
        });
      });
  
      res.status(200).send(fileInfos);
    } catch (err) {
      console.log(err);
  
      res.status(500).send({
        message: "Unable to read list of files!",
      });
    }
  };
  
  // @ desc download a file
  // @ route get /files/:name
  // @ access Private
  const download = async (req, res) => {
    try {
      const contents = await storage.bucket(bucket).file(fileName).download();
      
      console.log(
        `Contents of gs://${bucket}/${fileName} are ${contents.toString()}.`
      );
      
      
    } catch (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  };
  
  module.exports = {
    upload,
    getListFiles,
    download,
  };
  