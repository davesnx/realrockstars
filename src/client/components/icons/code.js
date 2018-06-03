import React from 'react'

const Icon = ({ width = 20, height = 20, color = '#222' }) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 24 13'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g fill={color} fillRule={color}>
      <rect width='14' height='3' rx='1.5' />
      <rect opacity='.5' x='16' width='8' height='3' rx='1.5' />
      <rect opacity='.5' y='10' width='7' height='3' rx='1.5' />
      <rect x='9' y='10' width='15' height='3' rx='1.5' />
      <rect y='5' width='24' height='3' rx='1.5' />
    </g>
  </svg>
)

export default Icon
