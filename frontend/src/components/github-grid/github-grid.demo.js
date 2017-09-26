import React from 'react'

import { storiesOf } from '@storybook/react'

import GithubGrid from './github-grid'

const stories = storiesOf('GithubGrid', module)

stories.add('default', () => (
  <div>
    <GithubGrid
      size={{
        width: window.innerWidth,
        height: window.innerHeight
      }}
    />
  </div>
))
