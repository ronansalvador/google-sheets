'use client'
import React, { useEffect, useState } from 'react'

// Define o tipo de dados esperado
type TableRow = string[] // Ajuste conforme necessário, se os dados forem de outro tipo

const Tabela = () => {
  const [rows, setRows] = useState<TableRow[]>([]) // Define o tipo do estado

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/rows`)
        const data = await response.json()
        console.log('data', data)
        if (data && Array.isArray(data.values)) {
          setRows(data.values)
          console.log('result', data.values)
        } else {
          console.error('No data found in the API response')
        }
      } catch (error) {
        console.error('Error fetching data from API', error)
      }
    }
    fetchEarnings()
  }, [])

  console.log('rows', rows)
  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr>
          {rows.length > 0 &&
            rows[0].map((header, index) => (
              <th key={index} className="border bg-teal-500 text-black">
                {header}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {rows.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border text-left">
                {cellIndex === 2
                  ? `R$ ${Number(cell).toFixed(2).replace('.', ',')}`
                  : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Tabela
