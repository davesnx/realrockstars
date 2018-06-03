import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Stat from './../stat'
import StarIcon from './../icons/star'
import CodeIcon from './../icons/code'
import constants from './../constants'
import Text from './../text'
import Spacer from './../spacer'

const messageMaxWidths = {
  xlg: `${constants.areas.lg * constants.unit}px`
}

const MessageCard = styled.div`
  ${props => `background-color: ${constants.colors.lightbrand}`};
  ${props => `color: ${constants.colors.body}`};
  ${props => props.maxWidth === 'xlg' && `max-width: ${messageMaxWidths[props.maxWidth]}`};
  ${constants.innerSpaces.sm};

  & * {
    ${props => `color: ${constants.colors.brand}`};
  }
`

const MessageBox = ({ type, maxWidth, title, children }) => (
  <MessageCard type={type} maxWidth={maxWidth}>
    {title &&
      <Spacer bottom={1}>
        <Text inline type={type} size={'size2'} fontWeight='bold'>
          {title}
        </Text>
      </Spacer>}
    {children &&
      <Text dimmed size={'size1'}>
        {children}
      </Text>}
  </MessageCard>
)

export const availableMessageMaxWidths = Object.keys(messageMaxWidths)

MessageBox.defaultProps = {
  type: 'default',
  maxWidth: 'full'
}

MessageBox.propTypes = {
  maxWidth: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.string
}

export default MessageBox
