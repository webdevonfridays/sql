"use client";
export interface SideBarInterface {
  tables: { tablename: string }[];
  chageCurrentTable: (changeTo: string) => void;
}

export default function SideBar({
  tables,
  chageCurrentTable,
}: SideBarInterface) {
  return (
    <aside className="bg-white w-80 h-screen m-0 p-4 rounded-r-xl">
      <div>
        <ul>
          {tables.map((table) => {
            return (
              <button
                className="block rounded-lg p-2 text-xl text-black hover:bg-black/20"
                key={Math.random()}
                onClick={() => chageCurrentTable(table.tablename)}
              >
                {table.tablename}
              </button>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
