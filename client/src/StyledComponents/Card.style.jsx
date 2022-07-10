import styled from "@emotion/styled";

export const Card = styled.div`
 padding: 1rem;
  height: 60vh;
  width: 50vw;
  min-width: 300px;
  background-color: ${(props)=> props.backgroundColor };;
  border-radius: 15px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
  //display
  display: flex;
  flex-direction: column;

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
`
