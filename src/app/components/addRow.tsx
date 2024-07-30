'use client'
import React, { useEffect, useState } from 'react'

const AddRow = () => {
  const URL = process.env.NEXT_PUBLIC_URL_API
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Impede o recarregamento da página

    // Criação do novo objeto de linha
    const newRow = {
      values: [
        [date, name, price.replace('.', ',')], // Note que todos os valores são strings, conforme o formato
      ],
    }

    console.log('Novo dado de entrada:', newRow)

    // Lógica para enviar os dados para o backend
    try {
      const response = await fetch(`${URL}api/rows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRow),
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar dados para o backend')
      }

      const result = await response.json()
      console.log('Resposta do backend:', result)

      // Limpa os campos após o envio
      setDate('')
      setName('')
      setPrice('')
    } catch (error) {
      console.error('Erro na submissão:', error)
    }
  }

  console.log('price', price)
  console.log(typeof price)

  return (
    <div>
      <h2 className="font-black">Adicionar Nova Linha</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="date">Data:</label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="p-2 text-black rounded"
        />

        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 text-black rounded"
          placeholder="Digite o nome"
        />

        <label htmlFor="price">Valor:</label>
        <input
          type="number"
          name="price"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="p-2 text-black rounded"
          placeholder="Digite o valor"
          step="0.01"
          min="0"
        />

        <button
          type="submit"
          className="p-2 bg-green-600 rounded hover:bg-teal-600"
        >
          Adicionar Linha
        </button>
      </form>
    </div>
  )
}

export default AddRow
