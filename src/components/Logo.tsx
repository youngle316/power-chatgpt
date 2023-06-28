import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <Image
      className="h-12 w-12"
      alt="logo"
      src="/assets/logo.svg"
      width={48}
      height={48}
    />
  );
}

export default Logo;
