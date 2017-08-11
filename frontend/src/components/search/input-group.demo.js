import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Search from './input-group'

const stories = storiesOf('Search', module)

stories.add('Input group', () =>
  <div>
    <Search />
  </div>
)
