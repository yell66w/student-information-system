import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import AdminLayout from "../components/AdminLayout";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  if (router.pathname.startsWith("/admin")) {
    return (
      <>
        <Head>
          <title>Admin - Telmo University</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <SessionProvider session={session}>
          <ChakraProvider>
            <AdminLayout>
              <Component {...pageProps}></Component>
            </AdminLayout>
          </ChakraProvider>
        </SessionProvider>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Telmo Univeristy</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <SessionProvider session={session}>
          <ChakraProvider>
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
          </ChakraProvider>
        </SessionProvider>
      </>
    );
  }
};

export default MyApp;
