import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import GithubGrid from './github-grid'

const stories = storiesOf('GithubGrid', module)

stories.add('default', () =>
  <div>
    <GithubGrid />
  </div>
)
