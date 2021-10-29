import React, { useState, useEffect } from 'react'
import { TableTransaksi } from '../../../components/Table'
import VendorLayout from "../../../components/Layout/VendorLayout";
import MOCK_DATA_PRODUK from "../../../components/Table/MOCK_DATA_PRODUK.json"

function transaksi() {
    const [selectedRow, setSelectedRow] = useState({})
 

    function selectRow(row) {
        setSelectedRow(row)
        console.log(selectedRow)
    }

    const TRANSACTION = [
        { Header: 'Nama Venue', accessor: 'nama' },
        { Header: 'Klien', accessor: 'klien' },
        { Header: 'Tanggal check-in', accessor: 'tanggalCheckIn' },
        { Header: 'Tanggal check-out', accessor: 'tanggalCheckOut' },
        { Header:'Status Pembayaran', accessor:'status'},
        {
            Header: 'Keterangan',
            Cell: (props) => {
                console.log(props.row.original)
                return (
                    <div className="d-flex justify-content-center">
                        <button className="bg-red-600 px-4 py-2 rounded rounded-2xl text-white">Refund</button>
                    </div>
                )
            }
        }
    ]

    return (
        <>
     
            <TableTransaksi name="Transaksi" columns={TRANSACTION} data={MOCK_DATA_PRODUK}  />
        </>
    )
}
transaksi.Layout = VendorLayout;
export default transaksi;