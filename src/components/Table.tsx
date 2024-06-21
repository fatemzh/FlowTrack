import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface TableProps<T> {
  data: T[];
  title: string;
  columns: Column<T>[];
}

const Table = <T extends { [key: string]: any }>({ data, title, columns }: TableProps<T>) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredData = data.filter((item) =>
    columns.some((column) =>
      item[column.accessor]?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="w-full p-2 mb-4 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
          <thead className="bg-green-500 bg-opacity-60">
            <tr>
              {columns.map((column) => (
                <th key={column.accessor as string} className="border p-2 text-left">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="border p-2 text-center">
                  No results found
                </td>
              </tr>
            ) : (
              filteredData.map((item, idx) => (
                <tr
                  key={idx}
                  onClick={() => navigate(`/${item.id}`)}
                  className="cursor-pointer hover:bg-green-100"
                >
                  {columns.map((column) => (
                    <td key={column.accessor as string} className="border p-2">
                      {item[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
