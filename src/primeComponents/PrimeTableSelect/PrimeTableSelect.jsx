import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import "./PrimeTableSelect.css"

export default function PrimeTableSelect({ 
    data, 
    columns, 
    multiSelect = false, 
    onSelectionChange,
    selectAll = false,
    selectedItems = false,
    title = false
}) {
    const [selectedProducts, setSelectedProducts] = useState(multiSelect ? [] : null);
    const [checked, setChecked] = useState(false);

    const effectiveSelectedItems = selectedItems !== undefined ? selectedItems : selectedProducts;

    useEffect(() => {
        if (selectAll && selectedItems && selectedItems.length === data.length) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [selectedItems, data, selectAll]);

    const handleSelectionChange = (e) => {
        setSelectedProducts(e.value);
        onSelectionChange(e.value);
    };

    const handleSelectAllChange = (e) => {
        setChecked(e.checked);
        if(e.checked) {
            setSelectedProducts(data);
            onSelectionChange(data);
        } else {
            setSelectedProducts([]);
            onSelectionChange([]);
        }
    }

    return (
      <div className="card">
        <DataTable 
          value={data} 
          selectionMode={multiSelect ? "multiple" : "single"} 
          selection={effectiveSelectedItems}
          onSelectionChange={handleSelectionChange}
          metaKeySelection={false} 
          tableStyle={{ minWidth: 'auto' }}
          header={
            selectAll ? 
            <div className="p-checkbox-select-all container__check__1">
              <div className='container__title'>
                { title && <h4> { title } </h4> }
              </div>
              <div className='container__check'>
                <Checkbox id='check' onChange={handleSelectAllChange} checked={checked}> </Checkbox>
                <label htmlFor='check'>Seleccionar todos</label>
              </div>
            </div>
            : null
        }
          >
          {columns.map(col => (
              <Column key={col.field} field={col.field} header={col.header}></Column>
          ))}
        </DataTable>
      </div>
    );
}
