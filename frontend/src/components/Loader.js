import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const LoaderExampleText = () => (
  <div>
    <Segment>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </Segment>
  </div>
)

export default LoaderExampleText
