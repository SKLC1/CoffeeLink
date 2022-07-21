import styled from "@emotion/styled"

export const CircleButton = styled.div`
padding: 1rem;
/* margin: rem; */
box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
border-radius: 20px;
background-color: #fff;
margin: auto;
border-radius: 50px;
width: 3rem;
height: 3rem;
margin: 0 1rem ;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

&:hover{
  transition: 0.3s;
  background-color: #e7eaff;
}
`