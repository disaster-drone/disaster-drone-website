    // this is creating an array with each image object 
    useEffect(() => {
        axios
            .get(`${apiRoot}/files/listimages`)
            .then(res => setImages([...images, ...res.data]))
            .then(console.log('(i should go first) -> this is the images array: ', images))
    }, [])


    // this is creating an array with each filename from the cvs as an object in the array.
    useEffect(() => {
        axios
            .get(`${apiRoot}/files/getpins`)
            .then((res) => {
                const cvsUrl = res.data[0].url
                Papa.parse(cvsUrl, {
                    download: true,
                    header: false,
                    complete: function(data) {
                        console.log('(i should go second) -> this is the cvs data: ', data.data)
                        setPinnedImages(data.data)
                        console.log('(i should go third) -> this is the pinned images array: ', pinnedImages)
                    }
                })
            })
            .finally(
                pinnedImages.forEach((pinnedImage) => {
                    images.forEach((image) => {
                        if(pinnedImage[0][0] === image.name){
                            setFilterdImages([...filterdImages, image])
                        }
                    })
                })
            )
    }, [])