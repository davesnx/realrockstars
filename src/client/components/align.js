import styled, { css } from 'react-emotion'
import PropTypes from 'prop-types'

const alignments = {
  center: css`
    align-items: center;
    justify-content: center;
  `,
  'top-left': css`
    align-items: flex-start;
    justify-content: flex-start;
  `,
  'top-center': css`
    align-items: flex-start;
    justify-content: center;
  `,
  'top-right': css`
    align-items: flex-start;
    justify-content: flex-end;
  `,
  'bottom-left': css`
    align-items: flex-end;
    justify-content: flex-start;
  `,
  'bottom-center': css`
    align-items: flex-end;
    justify-content: center;
  `,
  'bottom-right': css`
    align-items: flex-end;
    justify-content: flex-end;
  `,
  'right-center': css`
    align-items: center;
    justify-content: flex-end;
  `,
  'left-center': css`
    align-items: center;
    justify-content: flex-start;
  `
}

const Align = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  ${props => alignments[props.align]};
`

Align.displayName = 'Align'

export const availableAlignments = Object.keys(alignments)

Align.propTypes = {
  align: PropTypes.oneOf(availableAlignments)
}

export default Align
