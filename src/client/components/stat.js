import constants from './constants'
import styled from 'styled-components'

const Stat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${constants.unit * 2}px;

  & > svg {
    margin-right: ${constants.unit / 2}px;
  }
`

export default Stat
