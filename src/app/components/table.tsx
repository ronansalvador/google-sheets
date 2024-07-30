'use client'
import React, { useEffect, useState } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'

// Define o tipo de dados esperado
type TableRow = string[] // Ajuste conforme necessário, se os dados forem de outro tipo

const Tabela = () => {
  const [rows, setRows] = useState<TableRow[]>([]) // Define o tipo do estado
  const URL = process.env.NEXT_PUBLIC_URL_API

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await fetch(`${URL}api/rows`)
        const data = await response.json()

        if (data && Array.isArray(data.values)) {
          setRows(data.values)
        } else {
          console.error('No data found in the API response')
        }
      } catch (error) {
        console.error('Error fetching data from API', error)
      }
    }
    fetchEarnings()
  }, [])

  return (
    <>
      {rows.length > 0 ? (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              {rows[0].map((header, index) => (
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
      ) : (
        <FadeLoader color="teal" />
      )}
    </>
  )
}

export default Tabela
