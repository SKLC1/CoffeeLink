import styled from "@emotion/styled";

export const Message = styled.div`
  padding: 1rem; 
  margin: 1rem; 
  width: 80%;
  color: #fff;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
  border-radius: 20px;
  background-color: ${(props)=>props.backgroundColor};
`