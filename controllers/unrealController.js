import axios from 'axios'
const asyncHandler = require('express-async-handler')

const launchUnreal = () => {
  axios.get('/launch-unreal')
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.error(error);
    });
};

