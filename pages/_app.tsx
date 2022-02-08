import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import AdminLayout from "../components/AdminLayout";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
  router,
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  if (router.pathname.startsWith("/admin")) {
    return (
      <ChakraProvider>
        <AdminLayout>
          <Component {...pageProps}></Component>
        </AdminLayout>
      </ChakraProvider>
    );
  } else {
    return (
      <ChakraProvider>
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </ChakraProvider>
    );
  }
};

export default MyApp;
