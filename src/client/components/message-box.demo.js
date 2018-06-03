import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import MessageBox from './message-box'

const stories = storiesOf('Message Box', module)

stories.add('Input group', () => (
  <div>
    <MessageBox
      title={`What's a realrockstar?`}
      description={`
      A developer who has a project with more stars than lines of code.
      <a href='http://wikipedia.com/Linus_torvalds'>Linus Torvalds</a> made <a href='http://wikipedia.com/linux'>Linux</a>'s Kernel and potentially is a rockstar, but not a realrockstar... the project has <strong>24M lines of code</strong> and <strong>"only" 46,253 github stars, </strong>that's a 0.08 of realrockstar level
    `}
    />
  </div>
))
