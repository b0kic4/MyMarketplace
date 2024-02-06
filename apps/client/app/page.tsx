// this is server side example
import ClientSide from "./ClientSide";
import { trpc } from "./trpc";

export default async function Home() {
  // getting hello from the nest successfully
  const response = await trpc.hello.query({ name: "Boris" });
  return (
    <div>
      <ClientSide />
      {response}
    </div>
  );
}
