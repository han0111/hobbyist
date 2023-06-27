import styled from "styled-components";

export const Label = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
  width: 120px;
  text-align: right;
  margin-right: 10px;
`;

export const Input = styled.input`
  width: 70%;
  padding: 5px;
`;

export const Button = styled.button`
  margin-left: ${({ marginLeft }) => marginLeft || 0};
`;

export const TopButton = styled.button`
  font-size: 20px;
  width: 120px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* 배경에 투명한 검은색 레이어 추가 */
`;

export const ModalContainerModal2 = styled.div`
  width: 500px;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CancelBtn = styled(Button)``;

export const SubmitBtn = styled(Button)``;
