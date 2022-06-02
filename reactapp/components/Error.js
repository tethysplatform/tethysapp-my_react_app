import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const TETHYS_HOST = process.env.TETHYS_HOST;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url(${TETHYS_HOST}/static/tethys_portal/images/error_500.png);
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

const ErrorTitle = styled.h1`
  font-size: 40pt;
`;

const ErrorMessage = styled.p`
  font-size: 20pt;
`;

const ErrorPage = () => {
  return (
    <>
      <BackgroundImage />
      <ErrorMessageContainer>
        <ErrorMessageBox className="px-5 py-3 shadow rounded">
          <ErrorTitle>Whoops!</ErrorTitle>
          <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
          <Button variant="primary" as="a" href={TETHYS_HOST + "/apps/"}>Go Back</Button>
        </ErrorMessageBox>
      </ErrorMessageContainer>
    </>
  );
};

export default ErrorPage;