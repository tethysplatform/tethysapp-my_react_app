import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import styled from 'styled-components';


const StyledButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;

  &:hover, &:focus {
    background-color: rgba(0, 0, 0, 0.1)!important;
    color: white;
    border: none;
    box-shadow: none;
  }
`;


const HeaderButton = ({children, tooltipPlacement, tooltipText, href, ...props}) => {
  const styledButton = (
    <StyledButton href={href} variant="light" size="sm" {...props}>{children}</StyledButton>
  );
  const styledButtonWithTooltip = (
    <OverlayTrigger
      key={tooltipPlacement}
      placement={tooltipPlacement}
      overlay={
        <Tooltip id={`tooltip-${tooltipPlacement}`}>
          {tooltipText}
        </Tooltip>
      }
    >
      {styledButton}
    </OverlayTrigger>
  );
  return tooltipText ? styledButtonWithTooltip : styledButton;
}

export default HeaderButton