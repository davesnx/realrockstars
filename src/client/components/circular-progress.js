import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import constants from './constants'
import approximate from 'approximate-number'

const Text = styled.p`
  position: absolute;
  margin: 0;

  color: ${props => props.color};
  font-size: 35px;
  font-weight: 600;
  letter-spacing: -5px;
`

const Svg = styled.svg`
  display: block;
  margin: ${constants.unit} auto;
  width: 100%;
  height: 6em;

  circle {
    fill: none;
    stroke-width: 10;
    transform: translate(100px, 100px) rotate(-89.9deg);
    transition: stroke-dashoffset 0.3s linear;
  }
  .arc-background {
    stroke: ${props => props.arcBackgroundColor};
  }
  .arc {
    stroke: ${props => props.arcColor};
    stroke-linecap: ${props => (props.rounded ? 'round' : 'inherit')};
  }
`

const Progress = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProgressArc = ({
  value,
  max,
  className,
  arcColor,
  arcBackgroundColor,
  textColor,
  textVisible,
  radius,
  rounded
}) => {
  const p = 2 * radius * Math.PI
  const humanValue = approximate(value * 10) / 10
  const stroke = (max - value) / max * p
  return (
    <Progress>
      {textVisible && <Text color={textColor}>{humanValue.toString()}</Text>}
      <Svg
        className={className}
        arcColor={arcColor}
        arcBackgroundColor={arcBackgroundColor}
        textColor={textColor}
        rounded={rounded}
        viewBox='0 0 200 200'
      >
        <circle className='arc-background' r={radius} />

        <circle
          className='arc'
          r={radius}
          strokeDashoffset={stroke.toString()}
          strokeDasharray={p}
        />
      </Svg>
    </Progress>
  )
}

ProgressArc.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  unit: PropTypes.string,
  arcColor: PropTypes.string,
  arcBackgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  textVisible: PropTypes.bool,
  radius: PropTypes.number,
  rounded: PropTypes.bool
}

ProgressArc.defaultProps = {
  value: 0,
  max: 100,
  unit: '',
  arcColor: constants.colors.brand,
  arcBackgroundColor: constants.colors.grey,
  textColor: constants.colors.brand,
  textVisible: true,
  radius: 90,
  rounded: false,
  dominantBaseline: 'middle'
}

export default ProgressArc
