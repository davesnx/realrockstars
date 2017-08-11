import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Logo from './logo'

const stories = storiesOf('Logo', module)

stories.add('only text', () =>
  <div>
    <Logo />
  </div>
)
