import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    :root{
        @media (max-width: 1440px) {
            font-size : 14px;
	    }
	    @media (min-width: 1441px) {
		    font-size : 18px;
	    }
    }
    *{
        box-sizing: border-box;
        padding : 0;
        margin : 0;
    }
    body{
        font-family: 'Acme', sans-serif;
        background-color : #1B374B;
        color : white;
        padding-top : 5rem;
	}
    a {
        text-decoration: none;
        color :inherit;
    }
`;

export default GlobalStyles;
