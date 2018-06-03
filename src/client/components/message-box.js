import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Parser from 'html-react-parser'

import constants from './constants'
import Text from './text'
import Spacer from './spacer'

const messageMaxWidths = {
  xlg: `${constants.areas.lg * constants.unit}px`
}

const MessageCard = styled.div`
  ${props => `background-color: ${constants.colors.grey1}`};
  ${props => `color: ${constants.colors.body}`};
  ${props => props.maxWidth === 'xlg' && `max-width: ${messageMaxWidths[props.maxWidth]}`};
  ${constants.borderRadiuses.sm};
  ${constants.innerSpaces.sm};
`

const MessageBox = ({ type, maxWidth, title, description }) => (
  <MessageCard type={type} maxWidth={maxWidth}>
    {title &&
      <Spacer bottom={1}>
        <Text type={type} size={'size2'} fontWeight='bold'>
          {title}
        </Text>
      </Spacer>}
    {description &&
      <Text dimmed size={'size1'}>
        {Parser(description)}
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
  description: PropTypes.string
}

export default MessageBox
