import styled, { keyframes } from 'styled-components';
import Color from 'color';
import { useContext } from 'react';

import { TethysAppContext } from '../../context';

import logo from '../../assets/logo.svg';

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

function LearnReact() {
  const tethysApp = useContext(TethysAppContext);

  return (
    <div>
      <ContentDiv className="primary-content-wrapper" 
        style={{
          backgroundColor: Color(tethysApp.color).darken(0.8) || "#282c34"
        }}>
        <Rotate><StyledImage src={logo} alt="React logo" /></Rotate>
          <p>
            Edit <code>reactapp/views/learn/LearnReact.js</code> and save to reload.
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
    </div>
  );
}

export default LearnReact;
