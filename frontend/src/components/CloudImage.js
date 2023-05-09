import React from 'react'
import styled from 'styled-components'
import './CloudImage.css'

// this is the component that renders the images from the google bucket.
// does the the CloudImage.css for the styling.
const CloudImage = ({url, key, name}) => {
  return (<img src={url} key={key} alt={name} className="cloud-images" />)
}

export default CloudImage
