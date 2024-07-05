import { Html, Head, Main, NextScript } from "next/document";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

export default function Document() {
  // useEffect(() => {
  //   const router = useRouter();
  //   const token = localStorage.getItem("accesstoken");
  //   const group = localStorage.getItem("group");
  //   if (token) {
  //     if (role === "PARENT") {
  //       router.push("/parent-dashboard");
  //     } else {
  //       router.push(`/dashboard/${role}`);
  //     }
  //   }
  // });
  return (
    <Html lang="en">
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NBPRMSYMN5"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
 
  gtag('config', 'G-NBPRMSYMN5');`,
          }}
        ></script>
        <meta
          name="google-site-verification"
          content="mEQ_sOPkmauw4vYbugnUJfg6ygVrM9c1rSOlfy5Qx90"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
