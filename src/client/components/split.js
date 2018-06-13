import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { unit } from './constants'

const availableAreas = [...Object.keys(areas), 'full']

const availableAreasWithRemaining = [...availableAreas, 'remaining']

const getArea = (property, areaSize) => {
  if (areaSize && availableAreas.indexOf(areaSize) === -1) {
    return `${property}: ${areaSize};`
  }
  if (areaSize === 'full') {
    return `${property}: 100%;`
  }
  return areaSize && `${property}: ${areas[areaSize] * unit}px;`
}

const getAreaWithRemaining = (property, areaSize) => {
  if (areaSize === 'remaining') {
    return 'flex: 1;'
  }
  return getArea(property, areaSize)
}
const alignments = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end'
}

const Split = styled.div`
  ${props => getArea('width', props.width)} ${props =>
    getArea('height', props.height)} display: flex;
  flex-wrap: nowrap;
  flex-direction: ${props => (props.vertical ? 'column' : 'row')};
  ${props => props.align && `align-items: ${alignments[props.align]}`};
`
Split.displayName = 'Split'

export const SplitItem = styled.div`
  ${props => getAreaWithRemaining('width', props.width)} ${props =>
  getAreaWithRemaining('height', props.height)} min-width: 0;
  min-height: 0;
  flex-shrink: 0;

  ${props =>
    props.padX &&
    `padding-left: ${props.padX * unit}px; padding-right: ${props.padX *
      unit}px;`} ${props =>
  props.padY &&
  `padding-top: ${props.padY * unit}px; padding-bottom: ${props.padY *
    unit}px;`} ${props =>
  props.padTop && `padding-top: ${props.padTop * unit}px;`} ${props =>
  props.padBottom && `padding-bottom: ${props.padBottom * unit}px;`} ${props =>
  props.padLeft && `padding-left: ${props.padLeft * unit}px;`} ${props =>
  props.padRight && `padding-right: ${props.padRight * unit}px;`};
`
SplitItem.displayName = 'SplitItem'

export const availableSplitItemWidths = availableAreasWithRemaining
export const availableSplitItemHeights = availableAreasWithRemaining
export const availableSplitWidths = availableAreas
export const availableAlignments = Object.keys(alignments)

Split.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.oneOf(availableAreas),
    PropTypes.string
  ]),
  height: PropTypes.string,
  align: PropTypes.oneOf(availableAlignments),
  vertical: PropTypes.bool,
  padX: PropTypes.string,
  padY: PropTypes.string,
  padTop: PropTypes.string,
  padBottom: PropTypes.string,
  padLeft: PropTypes.string,
  padRight: PropTypes.string
}

SplitItem.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.oneOf(availableSplitItemWidths),
    PropTypes.string
  ]),
  height: PropTypes.oneOfType([
    PropTypes.oneOf(availableSplitItemHeights),
    PropTypes.string
  ])
}

export default Split
