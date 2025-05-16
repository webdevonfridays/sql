"use client";
import { useState } from "react";
import Board from "../components/Board";
import SideBar from "app/components/SideBar";

export interface ContainerProps {
  tables: { tablename: string }[]; // Expecting the tables array with tablename
}

export default function Container({ tables }: ContainerProps) {
  const [currentTable, setCurrentTable] = useState<string | null>();

  // Function to change the current table
  const changeCurrentTable = (tableName: string) => {
    setCurrentTable(tableName);
  };

  return (
    <>
      <SideBar tables={tables} chageCurrentTable={changeCurrentTable} />
      <Board tableName={currentTable || ""} />
    </>
  );
}

/*{
  results.map((row, i) => (
    <tr key={i}>
      {Object.values(row).map((value: any, j) => (
        <td key={j}>{JSON.stringify(value)}</td>
      ))}
    </tr>
  ));
}*/
