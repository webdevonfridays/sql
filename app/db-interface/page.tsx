import Container, { ContainerProps } from "app/components/Container";
import { GetPostgresTables } from "libs/postgrseQuery";

export default async function Page() {
  // Fetch tables on mount
  //you should receive a quey param in future to know which sql you should get table
  const fetchedTables: ContainerProps = await GetPostgresTables();

  return <Container tables={fetchedTables.tables} />;
}
