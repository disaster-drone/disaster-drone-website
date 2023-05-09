# *Disaster Drone Website*
Website for the Disaster Drone Project

## Installation and Startup Process
### Windows
1. Install Node.js 18.12.1 LTS.
[Download Link](https://nodejs.org/en/)
2. Clone this repository onto your machine.
3. In Command Prompt, navigate to the frontend folder and type "npm install".
4. Lastly, type "npm run dev" to start the application.


### macOS
(macOS installation guide here)
1. Install Node.js (Version 18 or above)
[Download Link](https://nodejs.org/en/download/)
2. Clone this repo on your machine.
3. In CLI, navigate to the frontend folder and type `npm install`.
4. Lastly, run `npm run dev` to start the application.

## Project Overview
This website is the main connection between all the different elements in the project including mongodb, google storage, and the virtual reality enviornment. The Home, About, and Team pages are mainly for documentation, while the main functionality of the website lies in the Files Claim Page.

Before getting be able to use the file a claim page, the assumption is that an the drone has already flown into the air and taken the photos neccessary for the photogrammetry process to take place on Google Cloud Platform. Once that step is complete the agent can navigate to the file claims page. 

### This is how the code works to connect everything. 
1. User clicks on file claims page, which makes an api call to google cloud storage to check if there are any new claims that are not already on the mongo db database. If there is a new claim it creates a new document for that claim in mongo db and it includes the name, zip file, and all the images. 

2. The user can then download the zip file, which contains everything needed to run the virtual reality enviornment on their computer and walk around the 3D and select pin points. Once they leave the environment a CSV file is sent to google cloud with the names of all the pins selected.

3. Now the user can click on the reload button on the file claims page, which will make an api 'update claims' which will check if there are any new CSV files on google cloud for each claim and will parse the CSV file in the backend and update the mongo db document of that claim with a new array containing every pinned image name.

4. The user can click on the preview pinpoints which filters through the images in the mongo db document and only displays the images that were pinned in the virtual reality enviornment.

5. Finally the user can click on the create report button which will filter the images just like the preview images but instead it will create a PDF report style format that allows the agent to add a description to every pinned image and then let then download the report.
