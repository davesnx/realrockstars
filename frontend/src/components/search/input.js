import styled from 'styled-components'

const Input = styled.input`
  position: relative;
  display: inline-block;
  padding: 10px 15px;
  width: 100%;
  height: 45px;
  font-size: 16px;
  line-height: 1.5;

  color: rgba(0, 0, 0, 0.65);
  background-image: none;
  border: 3px solid #d9d9d9;

  border-right-width: ${props => (props.center ? '0px' : '3px')};
  border-left-width: ${props => (props.center ? '0px' : '3px')};

  background-color: #fff;
  background-color: ${props => (props.disabled ? '#E3E3E3' : '#FFF')};

  border-radius: ${props => (props.center ? '0px' : '6px')};

  border-top-right-radius: ${props => (props.right ? '6px' : '0px')};
  border-bottom-right-radius: ${props => (props.right ? '6px' : '0px')};

  border-top-left-radius: ${props => (props.left ? '6px' : '0px')};
  border-bottom-left-radius: ${props => (props.left ? '6px' : '0px')};

  user-select: ${props => (props.disabled ? 'none' : 'auto')};
  cursor: ${props => (props.disabled ? 'default' : 'text')};
  outline: none;

  transition: all .3s;
`

export default Input
