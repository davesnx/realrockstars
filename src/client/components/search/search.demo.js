import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Search from './search'

const stories = storiesOf('Search', module)

stories.add('Input group', () => (
  <div>
    <Search onSubmit={action('Submit')} />
  </div>
))
