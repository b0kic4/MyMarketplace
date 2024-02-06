"use client";

import { useEffect, useState } from "react";
// import { trpc } from "./trpc";

export default function ClientSide() {
  // const [greetting, setGreeting] = useState("");
  // useEffect(() => {
  //   trpc.hello
  //     .query({
  //       name: "Client side",
  //     })
  //     .then((response: any) => {
  //       setGreeting(response);
  //     });
  // }, []);
  return <div>I am client side - {/**{greetting} */}</div>;
}
