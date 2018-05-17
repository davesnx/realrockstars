import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import styles from '@sambego/storybook-styles'
import BaseStyles from './../components/base-styles'

addDecorator(styles({ padding: 22 }))

const req = require.context('./../components', true, /\.demo.js$/)

const loadStories = () => {
  req.keys().forEach(req)
}

setOptions({
  name: '',
  url: '',
  downPanelInRight: true,
  sortStoriesByKind: true
})

configure(loadStories, module)
