import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ButtonTextProps{
  light: boolean;
}
interface ButtonProps extends RectButtonProps {
    color: string;
}

export const Container = styled(RectButton) <ButtonProps>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color }) => color };
`;

export const Title = styled.Text<ButtonTextProps>`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${({ theme, light }) => light ? theme.colors.header : theme.colors.shape};
`;