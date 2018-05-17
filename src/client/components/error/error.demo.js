import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Error from './error'

const stories = storiesOf('Error', module)

stories.add('with text', () => (
  <Error>Seems that something is broken! :(</Error>
))
