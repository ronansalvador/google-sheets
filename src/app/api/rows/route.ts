import { NextResponse } from 'next/server'
import { getAuthSheets } from '../utils/credential'

// Função de rota GET para obter dados da planilha
export async function GET(req: Request) {
  try {
    // Autenticação e configuração
    const { googleSheets, spreadsheetId } = await getAuthSheets()

    // Obtenção de metadados da planilha
    const getRows = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Teste1',
      valueRenderOption: 'UNFORMATTED_VALUE',
      dateTimeRenderOption: 'FORMATTED_STRING',
    })

    // Retorno dos metadados da planilha como JSON
    return NextResponse.json(getRows.data) // Retorna apenas os dados
  } catch (error: any) {
    // Manipulação de erro
    return NextResponse.json(
      {
        message: 'Error retrieving spreadsheet metadata',
        error: error.message || error.toString(),
      },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets()
  const { values } = await req.json()

  try {
    const row = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'Teste1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
      },
    })
    return NextResponse.json(row.data)
  } catch (error) {
    // res.status(500).json({ error: 'Failed to create earning.' })
    return NextResponse.json(
      {
        message: 'error',
        error,
      },
      { status: 500 },
    )
  }
}
