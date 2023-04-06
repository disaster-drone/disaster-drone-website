// file pagejs
const downloadZip = async () => {
    const zipResult = await axios.get(`${apiRoot}/files/getzip`)
    const zipUrl = await zipResult.data[0].url
    setZipFiles(zipUrl)
    //console.log('this is the link to the zip array updated', zipFiles)
  }
  
  useEffect(() => {
      getImages()
      getCsvData()
      downloadZip()
  }, []);

// routes
router.route('/getzip')
  .get(fileController.getZip)

// controller
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

