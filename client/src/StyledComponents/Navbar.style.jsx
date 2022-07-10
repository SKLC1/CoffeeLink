import styled from "@emotion/styled"

export const NavbarComponent = styled.div`
  width: 100vw;
  height: 4rem;
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background-color: ${(props)=> props.backgroundColor };
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);

`
export const NavbarLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`