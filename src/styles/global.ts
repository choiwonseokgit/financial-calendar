import { createGlobalStyle } from 'styled-components';
import colors from './colors';
import reset from './reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    ${colors}
`;

export default GlobalStyle;
