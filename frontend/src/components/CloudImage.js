import React from 'react'
import styled from 'styled-components'
import './CloudImage.css'

const CloudImage = ({url, key}) => {
  return (<img src={url} key={key} alt="" className="cloud-images" />)
}

export default CloudImage
