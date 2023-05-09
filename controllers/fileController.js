const { Storage } = require("@google-cloud/storage")
const https = require('https');
const csv = require('csv-parser')
const Case = require('../models/Case')

// This is controller that handles all the functions related to the files in the google bucket

// Instantiate a storage client with credentials
const bucketName = 'dsd-cloud-storage';
const bucketNameImage = 'dsd-cloud-storage/dji_demo_images';
const storage = new Storage();

// @ desc: get list of the files
// @ route: get /files
// @ access: Private
// Individual function that returns a list of all the files in the google bucket, not used in the frontend (used for testing)
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

// Individual function that returns a list of all the images in the google bucket, not used in the frontend (used for testing)
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

// Individual function that returns a list of all the pinned images in the csv file, not used in the frontend (used for testing)
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

// Individual function that returns a string of the download link of the zip file in the google bucket, not used in the frontend (used for testing)
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

// This function checks everything in the bucket to check for new cases
// if a new case exist it adds it to the database, this only add the images and name.
const createNewObject = async (req, res) => {
  
  const folders = new Set();
  // get a list of the folders in the bucket.
  const [files] = await storage.bucket(bucketName).getFiles();
  if (files.length === 0) {
    console.log(`No files found in bucket ${bucketName}`);
  } else {
    files.forEach(file => {
      const [folder] = file.name.split('/', 1);
      folders.add(folder);
    });
  }

  // loop through each folder and create an object for each one.
  for (const folder of folders) {
    let images = [];
    console.log(`the current case being worked on is: ${folder}`)
    
    // check if case with the same name already exists in the database.
    const existingCase = await Case.findOne({name: folder}).exec();
    if(existingCase){
      console.log(`Case ${folder} already exist in the database, skipping....`);
      continue;
    }

    // get a list of all the files in the folder and seperate into images and csv files.)
    let [files] = await storage.bucket(bucketName).getFiles({prefix: folder});
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
    }

    //create and store the new case object in the database.
    const result = await Case.create({
      name: folder,
      images: imageData,
      zipUrl: zipUrl,
    });
    console.log(`Case ${folder} created successfully!`);
  }
}

// this function adds the parsed pinned images to the database.
// this is only done after the user has downloaded rhe eviornment and selected pinned images
// using the VR headset.
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

      let csvUrl = await csvData[0].url;

      // declaring it outside of the block so it can be updated in the function.
      let csvParsed = [];

      const parseCsv = async () => {
        https.get(csvUrl, (res) => {
          res.pipe(csv({headers: false}))
            .on('data', (row) => {
              for (const [key, value] of Object.entries(row)) {
                // updating the csvParsed array with the new data.
                csvParsed.push(value)
                console.log(`This is the parsed data for ${existingCase.name} so far:`, csvParsed)
              }
            })
            .on('end', () => {
              console.log('CSV data parsed successfully!')
              console.log('this is the final array ---->', csvParsed)
            })
            .on('error', (err) => {
              console.log(err)
            })
        })
      }
      
      // calling the function.
      await parseCsv()

      console.log('This is after the function call but in the outter scope.', csvParsed)
    
      //create and store the new case object in the database.
      await Case.updateOne({name: existingCase.name}, {
        csvUrl: csvUrl,
        csvNames: csvParsed,
      });
      console.log(`Case ${existingCase.name} updated successfully!`);
    }
    else {
      console.log(`Case ${folder} does not exist in the database, skipping....`);
    }
  }
}

  module.exports = {
    getListFiles,
    getListImages,
    getPins,
    getZip,
    createNewObject,
    updateCase,
  };
  