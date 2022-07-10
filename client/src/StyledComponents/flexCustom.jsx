import styled from "@emotion/styled"

export const FlexCustom = styled.div`
display: flex;
flex-direction: ${(props)=> props.direction };
align-items: ${(props)=> props.align };
justify-content: ${(props)=> props.justify };
height: ${(props)=> props.height};
`
