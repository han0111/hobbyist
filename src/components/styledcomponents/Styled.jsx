import styled from "styled-components";

export const StH2 = styled.h2`
  color: #5e5ee8;
  font-size: 28px;
  padding-top: 20px;
`;

export const Label = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
  width: 120px;
  text-align: right;
  margin-right: 10px;
`;

export const Input = styled.input`
  width: 250px;
  height: 40px;
  background-color: #f5f3f3;
  border-style: none;
  border-radius: 8px;
  padding-left: 15px;
`;

export const Button = styled.button`
  top: 0;
  right: 0;
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
  background-color: rgba(0, 0, 0, 0.5);
`;

export const signUp = styled.form`
  text-align: center;
`;

export const ModalContainerModal2 = styled.div`
  width: 550px;
  height: 400px;
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
`;

export const CancelBtn = styled(Button)`
  position: absolute;
  background-color: transparent;
  border-style: none;
  right: 10px;
  top: 10px;
  font-size: 17px;
  cursor: pointer;
`;

export const SubmitBtn = styled(Button)`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border-style: none;
  background-color: #6969ed;
  cursor: pointer;
  color: white;
  margin-bottom: 10px;
`;

export const VerifyMessage = styled.span`
  font-size: 12px;
  color: ${(props) => (props.invalid ? "red" : "blue")};
`;
