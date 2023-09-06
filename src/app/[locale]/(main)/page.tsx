import dynamic from "next/dynamic";

const MainContainer = dynamic(() => import("../MainContainer"), { ssr: false });

export default function Home() {
  return <MainContainer>{}</MainContainer>;
}
