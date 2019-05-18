import styled, { css } from 'styled-components'

export const Wrapper = styled.section`
  font-family: "돋움", Dotum, sans-serif;
  padding: 4em;
`

export const Table = styled.table`
  width: 100%;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-collapse: collapse;

  th, td {
    width: calc(100% / 6);
    padding: 5px;
    border: 1px solid #e0e0e0;
  }

  th {
    background-color: #e9e9e9;
  }
`
export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  margin: 20px 0;
`

export const FormControl = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 3px;
`

export const OrderSpan = styled.span`
  margin-left: 10px;
  cursor: pointer;
`

export const Button = styled.button`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  border-radius: 3px;
  background-color: #1f83b8;
  border: solid 1px #005184;
  padding: 10px;
  cursor: pointer;

  ${props => props.marginLeft && css`
    margin-left: ${props.marginLeft}px
  `};

  ${props => props.marginRight && css`
    margin-left: ${props.marginRight}px
  `};

  ${props => props.marginBottom && css`
    margin-bottom: ${props.marginBottom}px
  `};

  ${props => props.marginTop && css`
    margin-top: ${props.marginTop}px
  `};

  ${props => props.bgColor ? css`
    background-color: ${props.bgColor};
  ` : css`
    background-color: #1f83b8;
  `};
`

export const Label = styled.label`
  width: 10%;
  line-height: 35px;

  ${props => props.isFlex && css`
    flex: 1
  `}
`

export const FieldForm = styled.div`
  width: 40%;

  & > input {
    width: 80%;
    padding: 10px;
    border: 1px solid #d3d3d3;
    border-radius: 3px;

    ${props => props.marginBottom && css`
      margin-bottom: ${props.marginBottom}px
    `};
  }
`

export const FieldError = styled.div`
  font-size: 14px;
  color: #e20000;
`