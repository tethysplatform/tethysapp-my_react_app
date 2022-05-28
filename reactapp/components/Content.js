import logo from '../assets/logo.svg'
import { TethysAppPropType } from './propTypes';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${rotate} infinite 20s linear;
  }
`;

const StyledImage = styled.img`
  height: 40vmin;
  pointer-events: none;
`;

const ContentDiv = styled.div`
  color: white;
  text-align: center;
  font-size: calc(10px + 2vmin);
  background-color: #282c34;
  min-height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StyledLink = styled.a`
  color: #61dafb;
`;


const Content = ({tethysApp}) => {
  return (
    <ContentDiv className="primary-content-wrapper">
      <Rotate><StyledImage src={logo} alt="React logo" /></Rotate>
        <p>
          Edit <code>reactapp/components/Content.js</code> and save to reload.
        </p>
        <StyledLink
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click Here to Learn React!
        </StyledLink>
    </ContentDiv>
  );
};

Content.propTypes = {
  tethysApp: TethysAppPropType,
};

export default Content;