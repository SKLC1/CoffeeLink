import styled from "@emotion/styled"

export const NavbarComponent = styled.div`
  width: 100vw;
  height: 5rem;
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background-color: ${(props)=> props.backgroundColor };
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
  border-radius: 0 0 25px 25px;
`
export const NavbarLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const NavButton = styled.div`
  background-color: hsl(198,100%,85%);
  padding: 0.4rem;
  margin: 0.3rem;
  max-height: 2rem;
  border-radius: 10px;
  color: hsl(210,99%,50%);
  font-weight: 500;
  /* border: solid 2px hsl(210,99%,50%); */
`