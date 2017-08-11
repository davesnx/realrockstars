import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Jumbo from './jumbo'
import Header from './header'

const stories = storiesOf('Main', module)

stories.add('default', () =>
  <div>
    <Jumbo>
      <img
        class="reactjs-starfield"
        src="//thoughtbot.com/assets/service-react/starfield-5589dd0dcc1c54b04bef3e4edd3ffe23e479438b0bdadac27c8a1812a2b78c93.gif"
        alt="Starfield"
      />
    </Jumbo>
  </div>
)
