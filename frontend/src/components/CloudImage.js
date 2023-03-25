import React from 'react'
import styled from 'styled-components'
import './CloudImage.css'

const CloudImage = ({url, key, name}) => {
  return (<img src={url} key={key} alt={name} className="cloud-images" />)
}

export default CloudImage
