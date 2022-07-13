
import styled from "@emotion/styled"

export const Form = styled.div`
padding: 1rem;
margin: 3rem;
box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
border-radius: 20px;
background-color: #fff;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

& > div > label {
  color: hsl(210,99%,50%);
  }
& > h2 {
  color: hsl(210,99%,50%);
  }
& > h3 {
  color: hsl(210,99%,50%);
  }
& > span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
& > button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props)=> props.width };;
  background-color: hsl(198,100%,85%);
  padding: 0.4rem;
  margin: 0.3rem;
  max-height: 2rem;
  border-radius: 10px;
  color: hsl(210,99%,50%);
  font-weight: 500;
  border: solid 2px hsl(210,99%,50%);
}
& > div > img{
  width: 100%;
  height: auto;
} 
`