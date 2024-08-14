import React, { createContext, useState } from "react";



export const TableStatusContext = createContext();

export const TableStatusProvider = ({ children }) => {
  const [tableStatus, setTableStatus] = useState(""); // Make sure tableStatus is initialized properly

  return (
    <TableStatusContext.Provider value={{ tableStatus, setTableStatus }}>
      {children}
    </TableStatusContext.Provider>
  );
};

export default TableStatusContext;