# *Disaster Drone Website POC*
<br />
<br />

<p align="center">
  <a href="https://github.com/disaster-drone/">
    <img src="https://cdn.discordapp.com/attachments/804128313521471548/1105547469007364146/DRONE.png" alt="drone logo white">
  </a>
</p>

<br />

## Tech Stack
The MERN stack was used along side Google Cloud Platform.
1. Mongo DB was used to store the cases once processes from the GCP.
2. Express js was used to allow us to create and use our API's.
3. React js was used to build the UI of the application.
4. Node js allowed us use javascript on the server side of our applcations.

### things to note
1. This project was never deployed, just created in devleopment to run using node in the browser on port 3500 as set in .env.
2. TailwindCSS was used for the styling of the applcation. [Documentation](https://tailwindcss.com/docs/installation)
3. KendoReact was used to download the PDF final report. [Link](https://www.telerik.com/kendo-react-ui/components/pdfprocessing/)
4. For the creation of the API's to connect to GCP [References](https://github.com/googleapis/nodejs-storage)
5. The login does work with accounts on mongoDB but can just bypass that step by adding "/dash" to the end of the localhost link.
6. The operation that parses is the csv file from the cloud and then is updates the mongo db object is slightly bugged, it does parse the csv but for some reason the scope of the array does not work properly. The issue is commented in the code in fileController.js in the updatecases function.



## Installation and Startup Process
### Windows
1. Install Node.js 18.12.1 LTS.
[Download Link](https://nodejs.org/en/)
2. Clone this repository onto your machine.
3. There are two files missing from this repo that include important keys that connect the mongodb database, google cloud connection, and the kendo reacts PDF library. You will have to add these two files to the the main scope of the application, the same one where 'server.js' is located. This is what they will look like just not including the keys.

   ``` .env
   NODE_ENV=development
   PORT=3500
   MONGO_URI=
   ACCESS_TOKEN_SECRET=
   REFRESH_TOKEN_SECRET=
   GOOGLE_APPLICATION_CREDENTIALS="./my-service-account-key.json"
   KENDO_UI-LICENSE=
   ```
   
   ``` my-service-account-key.json
   {
    "type": "service_account",
    "project_id": "",
    "private_key_id": "",
    "private_key": "-----BEGIN PRIVATE KEY-----\",
    "client_id": "",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": ""
    }
    ```

4. In Command Prompt, navigate to the frontend folder and type "npm install".
5. Lastly, type "npm run dev" to start the application.


### macOS
1. Install Node.js (Version 18 or above)
[Download Link](https://nodejs.org/en/download/)
2. Clone this repo on your machine.
3. There are two files missing from this repo that include important keys that connect the mongodb database, google cloud connection, and the kendo reacts PDF library. You will have to add these two files to the the main scope of the application, the same one where 'server.js' is located. This is what they will look like just not including the keys.

   ``` .env
   NODE_ENV=development
   PORT=3500
   MONGO_URI=
   ACCESS_TOKEN_SECRET=
   REFRESH_TOKEN_SECRET=
   GOOGLE_APPLICATION_CREDENTIALS="./my-service-account-key.json"
   KENDO_UI-LICENSE=
   ```
   
   ``` my-service-account-key.json
   {
    "type": "service_account",
    "project_id": "",
    "private_key_id": "",
    "private_key": "-----BEGIN PRIVATE KEY-----\",
    "client_id": "",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": ""
    }
    ```
   
   
4. In CLI, navigate to the frontend folder and type `npm install`.
5. Lastly, run `npm run dev` to start the application.

## Project Overview
This website is the main connection between all the different elements in the project including mongodb, google storage, and the virtual reality enviornment. The Home, About, and Team pages are mainly for documentation, while the main functionality of the website lies in the Files Claim Page.

Before getting be able to use the file a claim page, the assumption is that an the drone has already flown into the air and taken the photos neccessary for the photogrammetry process to take place on Google Cloud Platform. Once that step is complete the agent can navigate to the file claims page. 

### This is how the code works to connect everything. 
1. User clicks on file claims page, which makes an api call to google cloud storage to check if there are any new claims that are not already on the mongo db database. If there is a new claim it creates a new document for that claim in mongo db and it includes the name, zip file, and all the images. 

2. The user can then download the zip file, which contains everything needed to run the virtual reality enviornment on their computer and walk around the 3D and select pin points. Once they leave the environment a CSV file is sent to google cloud with the names of all the pins selected.

3. Now the user can click on the reload button on the file claims page, which will make an api 'update claims' which will check if there are any new CSV files on google cloud for each claim and will parse the CSV file in the backend and update the mongo db document of that claim with a new array containing every pinned image name.

4. The user can click on the preview pinpoints which filters through the images in the mongo db document and only displays the images that were pinned in the virtual reality enviornment.

5. Finally the user can click on the create report button which will filter the images just like the preview images but instead it will create a PDF report style format that allows the agent to add a description to every pinned image and then let then download the report.

# Website Screenshots
  <img src="https://github.com/disaster-drone/Documentation/blob/main/media/0.png?raw=true" name="Login">
  <img src="https://github.com/disaster-drone/Documentation/blob/main/media/1.png?raw=true" name="Homepage">
  <img src="https://github.com/disaster-drone/Documentation/blob/main/media/2.png?raw=true" name="Aboutpage">
  <img src="https://github.com/disaster-drone/Documentation/blob/main/media/3.png?raw=true" name="Teampage">
  <img src="https://github.com/disaster-drone/Documentation/blob/main/media/4.png?raw=true" name="Fileclaims-page">
  <img src="https://github.com/disaster-drone/Documentation/blob/main/media/5.png?raw=true" name="Download-zip">
  <img src="https://github.com/disaster-drone/Documentation/blob/main/media/6.png?raw=true" name="View-gallery">
  <img src="https://github.com/disaster-drone/Documentation/blob/main/media/7.png?raw=true" name="Create-document">
  <img src="https://github.com/disaster-drone/Documentation/blob/main/media/8.png?raw=true" name="Download-document">
  <img src="https://github.com/disaster-drone/Documentation/blob/main/media/9.png?raw=true" name="Download-document">
