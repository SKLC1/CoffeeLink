import styled from "@emotion/styled";

export const Item = styled.div`
  padding: 1rem; 
  margin: 1rem; 
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
  border-radius: 20px;
  background-color: #fff;
  & > h2 {
    color: hsl(210,99%,50%);
  }
  & > img {
    width: 10%;
    height: 10%;
  }
`
