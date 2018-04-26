import React from 'react'
import styled from 'styled-components'
import { unit } from './constants'

const ALIGN = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end'
}

const spaceToValue = space =>
  typeof space === 'string' ? space : space * unit + 'px'

const Distribute = styled.div`
  display: flex;
  ${props => (props.align ? `align-items: ${ALIGN[props.align]}` : '')};
  ${props =>
    props.position ? `justify-content: ${ALIGN[props.position]}` : ''};

  & > * {
    flex: 0 0 auto;

    &:not(:last-child) {
      ${props =>
        props.vertical
          ? 'margin-bottom:' + spaceToValue(props.space)
          : 'margin-right:' + spaceToValue(props.space)};
    }
  }

  ${props => (props.vertical ? 'flex-direction: column' : '')};
`

Distribute.defaultProps = {
  space: 0
}

const Export = props => <Distribute {...props} />
Export.displayName = 'Distribute'
export default Export
