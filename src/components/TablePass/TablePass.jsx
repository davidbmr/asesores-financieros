import React, { useState } from "react";
import PrimeTableSelect from "@/primeComponents/PrimeTableSelect/PrimeTableSelect";
import style from './TablePass.module.css';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

function TablePass({
  columns,
  columns2,
  data,
  data2,
  onSelectionChange, //Aca va la funcion que Set-ea data por eje setData
  onSelectionChange2, //Aca va la funcion que Set-ea data 2 por eje setData2,
  title1 = "",
  title2 = "",
  column = false
}) {
  const [selectedItemsTable1, setSelectedItemsTable1] = useState([]);
  const [selectedItemsTable2, setSelectedItemsTable2] = useState([]);

  function moveFromTable1ToTable2() {
    const selectedIdsTable1 = selectedItemsTable1.map(item => item.id);
    onSelectionChange(data.filter(item => !selectedIdsTable1.includes(item.id)));
    onSelectionChange2([...data2, ...selectedItemsTable1]);
    setSelectedItemsTable1([]);
  } 

  function moveFromTable2ToTable1() {
    const selectedIdsTable2 = selectedItemsTable2.map(item => item.id);
    onSelectionChange2(data2.filter(item => !selectedIdsTable2.includes(item.id)));
    onSelectionChange([...data, ...selectedItemsTable2]);
    setSelectedItemsTable2([]);
  }

  function handleSelectionTable1(items) {
    setSelectedItemsTable1(items);
  }

  function handleSelectionTable2(items) {
    setSelectedItemsTable2(items);
  }

  return (
    <div className={!column ? style.container__1 : style.container__1__column }>
      <PrimeTableSelect
        columns={columns}
        data={data}
        onSelectionChange={handleSelectionTable1}
        multiSelect
        selectAll
        selectedItems={selectedItemsTable1}
        title={title1}
      />

      <div className={ !column ? style.container__buttons : style.container__buttons__column}>
        <div onClick={moveFromTable1ToTable2}> <FiChevronRight /> </div>
        <div onClick={moveFromTable2ToTable1}> <FiChevronLeft /> </div>
      </div>

      <PrimeTableSelect
        columns={columns2}
        data={data2}
        onSelectionChange={handleSelectionTable2}
        multiSelect
        selectAll
        selectedItems={selectedItemsTable2}
        title={title2}
      />
    </div>
  );
}

export default TablePass;
