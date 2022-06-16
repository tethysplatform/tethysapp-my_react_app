import styled from 'styled-components';

const ErrorBackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 50%;
`
const ErrorMessageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessageBox = styled.div`
  background: white;
`;

const ErrorMessage = styled.p`
  font-size: 20pt;
`;

const ErrorTitle = styled.h1`
  font-size: 40pt;
`;


export { ErrorBackgroundImage, ErrorMessageBox, ErrorMessageContainer, ErrorMessage, ErrorTitle };