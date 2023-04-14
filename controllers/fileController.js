
const path = require('path')
const cwd = path.join(__dirname, '..')
const processFile = require("../middleware/upload")
const { format } = require("util")
const { Storage } = require("@google-cloud/storage")
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const https = require('https');
const csv = require('csv-parser')
const Case = require('../models/Case')
const csvParser = require('csv-parser')
//import React, {useState} from 'react'

// Instantiate a storage client with credentials
const bucketName = 'dsd-cloud-storage';
const bucketNameImage = 'dsd-cloud-storage/dji_demo_images';
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
        folder: file.prefix,
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
const downloadIntoMemory = async (req, res, {downloadFile}) => {
  const contents = await storage.bucket(bucketName).file({downloadFile}).download();
  downloadIntoMemory().catch(console.error);

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
    const imageFiles = files.filter(file => file.name.endsWith('.JPG') || file.name.endsWith('.PNG'));
    const csvFiles = files.filter(file => file.name.endsWith('.csv'));
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

const getPins = async (req, res) => {
  try {
    const [files] = await storage.bucket(bucketName).getFiles();
    const csvFiles = files.filter(file => file.name.endsWith('.csv'));
    const csvInfo = [];
      
    csvFiles.forEach((file) => {
      csvInfo.push({
        name: file.name,
        url: file.metadata.mediaLink,
        content: file.metadata.contentType,
      });
      
    });
  
    res.status(200).send(csvInfo);
    res.json(csvInfo);
  } catch (err) {
    console.log(err);
  
    res.status(500).send({
      message: "Unable to get list of CSV's from the google cloud.!",
    });
  }
};

const getZip = async (req, res) => {
  try {
    const [files] = await storage.bucket(bucketName).getFiles();
    const zipFiles = files.filter(file => file.name.endsWith('.zip'));
    const zipInfo = [];
      
    zipFiles.forEach((file) => {
      zipInfo.push({
        name: file.name,
        url: file.metadata.mediaLink,
        content: file.metadata.contentType,
      });
      
    });
  
    res.status(200).send(zipInfo);
    res.json(zipInfo);
  } catch (err) {
    console.log(err);
  
    res.status(500).send({
      message: "Unable to get list of zipped files from the google cloud.!",
    });
  }
};

const getListBuckets = async (req, res) => {
  try {
    const [buckets] = await storage.getBuckets();
    let bucketInfo = [];
      
    buckets.forEach((bucket) => {
      bucketInfo.push({
        name: bucket.name,
      });
      console.log(bucket.name)
    });
  
    res.status(200).send(bucketInfo);
    res.json(bucketInfo);
  } catch (err) {
    console.log(err);
  
    res.status(500).send({
      message: "Unable to read list of buckets!",
    });
  }
};

const createNewObject = async (req, res) => {
  
  // const [zipUrl, setZipUrl] = React.useState('');
  const folders = new Set();

  // get a list of the folders in the bucket.
  const [files] = await storage.bucket(bucketName).getFiles();
  if (files.length === 0) {
    console.log(`No files found in bucket ${bucketName}`);
  } else {
    //console.log(`Folders in bucket ${bucketName}:`);
    files.forEach(file => {
      const [folder] = file.name.split('/', 1);
      folders.add(folder);
    });
  }
  
  //console.log(`Folders in bucket ${bucketName}: ${folders}`)

  // loop through each folder and create an object for each one.
  for (const folder of folders) {
    let images = [];
    console.log(`the current case being worked on is: ${folder}`)
    //check if a case with the same name already exist in the database.
    const existingCase = await Case.findOne({name: folder}).exec();

    // if the case already exist then skip it.
    if(existingCase){
      console.log(`Case ${folder} already exist in the database, skipping....`);
      continue;
    }

    // get a list of all the files in the folder and seperate into images and csv files.
    //console.log(`ths prefix for folder ${folder} should be ${folder}/` )
    let [files] = await storage.bucket(bucketName).getFiles({prefix: folder});
    //let files = allFiles.filter(file => file.name.startsWith(folder) === folder);
    let imageFiles = files.filter(file => file.name.endsWith('.JPG') && file.name.startsWith(folder) || file.name.endsWith('.PNG') && file.name.startsWith(folder));
    let imageData = [];
    let zipFiles = files.filter(file => file.name.endsWith('.zip') && file.name.startsWith(folder));
    let zipData = [];

    // get the images for the current case.
    imageFiles.forEach((image) => {
      imageData.push({
        name: image.name,
        caseID: image.name.split('/', 1)[0],
        url: image.metadata.mediaLink,
        content: image.metadata.contentType,
      });
    });
    //images.push(imageData)

    // getting the zip url for the current cases.
    let zipUrl;
    if(zipFiles.length === 0){
      zipUrl = '';
    }
    else{
      zipFiles.forEach((file) => {
        zipData.push({
          name: file.name,
          zipurl: file.metadata.mediaLink,
        });
      })
      zipUrl = await zipData[0].zipurl
      //React.setZipUrl(zip);
    }
    //console.log(`ZIP URL FOR CASE ${existingCase.name}: `, zipUrl)

    //create and store the new case object in the database.
    const result = await Case.create({
      name: folder,
      images: imageData,
      zipUrl: zipUrl,
    });
    console.log(`Case ${folder} created successfully!`);
    }
}

const updateCase = async (req, res) => {
  let folders = new Set();

  // get a list of the folders in the bucket.
  const [files] = await storage.bucket(bucketName).getFiles();
  if (files.length === 0) {
    console.log(`No files found in bucket ${bucketName}`);
  } else {
    //console.log(`Folders in bucket ${bucketName}:`);
    files.forEach(file => {
      const [folder] = file.name.split('/');
      folders.add(folder);
    });
  }
  
  // loop through each folder and create an object for each one.
  for (const folder of folders) {

    // look for existing cases in the database and update then with the csv and zip files.
    let existingCase = await Case.findOne({name: folder}).exec();

    // if the case already exist then skip it.
    if(existingCase){
      //console.log(`FOUND CASE: ${folder}, Updating with csv and zip files....`);
      
      // get a list of all the files in the folder and seperate into images and csv files.
      const [files] = await storage.bucket(bucketName).getFiles({prefix: existingCase.name});
      const csvFiles = files.filter(file => file.name.endsWith('.csv') && file.name.startsWith(existingCase.name));
      const csvData = [];

      // get the csv url for the current case.
      csvFiles.forEach((file) => {
        csvData.push({
          name: file.name,
          url: file.metadata.mediaLink,
        });
      });
      let csvUrl = await csvData[0].url

      
      const parseCsv = async () => {
        csvParsed = [];
        https.get(csvUrl, (res) => {
          res.pipe(csv({headers: false}))
            .on('data', (row) => {
              for (const [key, value] of Object.entries(row)) {
                csvParsed.push(value)
                console.log(`This is the parsed data for ${existingCase.name} so far:`, csvParsed)
              }
            })
            .on('end', () => {
              console.log('CSV data parsed successfully!')
            })
            .on('error', (err) => {
              console.log(err)
            })
        })
      }
      
      await parseCsv()
    
      //create and store the new case object in the database.
      let result = await Case.updateOne({name: existingCase.name}, {
        csvUrl: csvUrl,
        csvNames: csvParsed,
      });
      //console.log(`Case ${existingCase.name} updated successfully!`);
    }
    else {
      console.log(`Case ${folder} does not exist in the database, skipping....`);
    }
  }
}


  
  module.exports = {
    upload,
    getListFiles,
    downloadIntoMemory,
    makePublic,
    getListImages,
    getListBuckets,
    getPins,
    getZip,
    createNewObject,
    updateCase,
  };
  