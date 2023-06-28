import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
    }
    body {
        width: 1200px;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    
`;

export default GlobalStyle;
