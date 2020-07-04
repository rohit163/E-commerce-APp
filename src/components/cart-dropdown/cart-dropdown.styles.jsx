import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.components';

export const CartdropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  ::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }
 
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
  }
`;
export const CartitemsContainer = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`;
export const EmptyMessageContainer = styled.span`
 font-size: 18px;
    margin: 50px auto;
`;

export const CartDropdownButton = styled(CustomButton)`
  margin-top: auto;
`;