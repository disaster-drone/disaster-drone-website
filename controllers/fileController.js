const path = require('path');
const cwd = path.join(__dirname, '..');


const processFile = require("../middleware/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");

// Instantiate a storage client with credentials
const bucketName = 'dsd-cloud-storage';

// define the path and name of Google Cloud Storage object to download

const storage = new Storage();

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
  

// @ desc: make files public
// @ route: files/makepublic
// @access: Private
const makePublic = async (req, res) => {
  try{
    const [files] = await storage.bucket(bucketName).getFiles();
    files.forEach((file) => {
      storage.bucket(bucketName).file(fileName).makePublic();
      console.log(`gs://${bucketName}/${fileName} is now public.`);
    });
  } catch (err) {
    console.log(err);
    makePublic().catch(console.error);
  }
};


// @ desc: get list of the files
// @ route: get /files
// @ access: Private
const getListFiles = async (req, res) => {
  try {
    const [files] = await storage.bucket(bucketName).getFiles();
    let fileInfo = [];
      
    files.forEach((file) => {
      fileInfo.push({
        name: file.name,
        url: file.metadata.mediaLink,
        content: file.metadata.contentType,
        metagen: file.metadata.metageneration,
      });
    });
  
    res.status(200).send(fileInfo);
    res.json(fileInfo);
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
const downloadIntoMemory = async (req, res) => {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  const fileContents = await file.download();
  console.log(`Downloaded file contents: ${fileContents.name}`);
};

// @ desc download a file
// @ route get /files/:name
// @ access Private
const downloadFile = async (req, res) => {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  const fileContents = await file.download();
  console.log(`Downloaded file contents: ${fileContents.name}`);
};

const getListImages = async (req, res) => {
  try {
    const [files] = await storage.bucket(bucketName).getFiles();
    const imageFiles = files.filter(file => file.name.endsWith('.jpg') || file.name.endsWith('.png'));
    const imageInfo = [];
      
    imageFiles.forEach((image) => {
      imageInfo.push({
        name: image.name,
        url: image.metadata.mediaLink,
        content: image.metadata.contentType,
      });
    });
  
    res.status(200).send(imageInfo);
    res.json(imageInfo);
  } catch (err) {
    console.log(err);
  
    res.status(500).send({
      message: "Unable to read list of images!",
    });
  }
};

  
  module.exports = {
    upload,
    getListFiles,
    downloadIntoMemory,
    makePublic,
    getListImages,
  };
  