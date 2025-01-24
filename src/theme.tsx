import styled from "styled-components"

export const appTheme = {
  colors: {
    primary: '#BF4F74',
    secondary: '#d895ab',
    subtitle: '#853751',
    text: '#853751',
    tertiary: '#4c1f2e',
  },
  fonts: {
    body: 'Arial, sans-serif',
  },
};

export const Pill = styled.div`
  background: transparent;
  border-radius: 20px;
  border: 2px solid ${appTheme.colors.primary};
  margin: 5px 5px;
  align-items: center;
  padding: 0.25em 1em;
  text-align: center;
`

export const PageGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`

export const Title = styled.h2`
  font-family: ${appTheme.fonts.body};
  color: ${appTheme.colors.text};
`

export const Subtitle = styled.h3`
  font-family: ${appTheme.fonts.body};
  color: ${appTheme.colors.subtitle};
`

export const ListItem = styled.p`
  font-family: ${appTheme.fonts.body}
  color: ${appTheme.colors.tertiary};
  margin: 0 auto;
  font-weight: 600;
`