"use server";
import QueryInput from "./QurtyInput";

export interface BoardParam {
  tableName: string;
}

export default async function Board(table: BoardParam) {
  //query table data base table name in postgres specific section
  // return tableColums.map((columData) => {
  // return (
  // <QueryInput columName={columData.colum} columType={columData.type} />
  //);
  //});
  return <>table is = {table}</>;
}
