import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  border-witdh: 1px;
  border-radius: 8px;
  cursor: pointer;
`;
function Button(props) {
  const { title, onClick, disabled } = props;
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {title || 'BUTTON'}
    </StyledButton>
  );
}
export default Button;
