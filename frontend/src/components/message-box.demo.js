import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import MessageBox from './message-box'

const stories = storiesOf('Message Box', module)

stories.add('Input group', () => (
  <div>
    <MessageBox title={`What's a real rockstar?`} description={`
      A developer who has a project with more stars than lines of code.
      <br/><br/>
      Linus Torvalds made Linux's Kernel and potentially is a rockstar, but not a realrockstar... the project has 24M lines of code and only 46,253 Github stars, that's a 0.08 of realrockstar level
    `} />
  </div>
))
