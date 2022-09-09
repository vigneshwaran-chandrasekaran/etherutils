import { ThemeProvider, DefaultTheme } from "styled-components";
import "antd/dist/antd.css";
import "../styles/globals.css";
import Layout from "../components/layout";
import GlobalStyle from "../components/globalstyles";

const theme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
