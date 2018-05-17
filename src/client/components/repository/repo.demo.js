import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Repo from './repo'

const stories = storiesOf('Repo', module)

stories.add('default', () => (
  <div>
    <Repo
      name={'node-jq'}
      org={'sanack'}
      description={'node-jq is a node wrapper for jq'}
      avatarURL={'https://avatars2.githubusercontent.com/u/19934836?v=4&s=200'}
      stars={45}
      language={'JavaScript'}
      linesOfCode={90000}
      rockstarLevel={0.88}
    />
  </div>
))
