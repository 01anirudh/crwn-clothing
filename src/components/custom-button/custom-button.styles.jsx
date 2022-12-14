import styled,{css} from "styled-components";


const ButtonStyles = css`
background-color: black;
color: white;
border: none;
&:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`

const invertedButtonStyles = css`
background-color: white;
color: black;
border: 1px solid black;

&:hover{
  background-color: black;
  color:white;
  border: none;
}
`

const googleSignInStyles = css`
background-color: #4285f4;
color: white;
border: none;

&:hover{
  background-color: #357ae8;
  border: none;
}
`

const getButtonStyles = props => {
    if(props.isGoogleSignIn) { 
        return googleSignInStyles
    }
    return props.inverted ? invertedButtonStyles : ButtonStyles;
}

export const CustomButtonContainer = styled.button`
min-width: 130px;
width: auto;
height: 50px;
letter-spacing: 1.5px;
line-height: 50px;
padding: 2px 1px 0 2px;
font-size: 15px;
text-transform: uppercase;
font-family: 'Open Sans Condensed';
font-weight: bolder;
cursor: pointer;
display: flex;
justify-content:  center;

${getButtonStyles};
`