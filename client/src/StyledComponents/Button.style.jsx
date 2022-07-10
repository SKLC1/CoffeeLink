import styled from "@emotion/styled";

export const Button = styled.button`
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
`
