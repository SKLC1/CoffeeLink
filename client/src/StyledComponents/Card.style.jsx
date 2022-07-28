import styled from "@emotion/styled";

export const Card = styled.div`
  padding: 3rem;
  min-width: 300px;
  height: 60vh;
  width: 50vw;
  font-size: 1vw;
  background-color: ${(props)=> props.backgroundColor };;
  border-radius: 15px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
  background-color: #fff;
  //display
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: start;
  //children
  & > div > div > div > h2 {
       color: ${(props)=> props.nameColor };
    }
  & > div > div > div > h4 {
       color: ${(props)=> props.categoryColor };;
    }
  & > div > div > div > p {
       color: ${(props)=> props.descriptionColor };;
    }
    //media
    @media (max-width: 500px ) {
      font-size: 2vw;
    }
`