import { ThemeProvider, DefaultTheme } from "styled-components";
import "antd/dist/antd.css";
import "@/styles/globals.css";
import Layout from "@/components/layout";
import GlobalStyle from "@/components/globalstyles";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { theme } from "@/styles/theme";

function ErrorFallback() {
  return <div>Something went wrong</div>;
}

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
