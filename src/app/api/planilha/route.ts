import { NextResponse } from 'next/server'
import { getAuthSheets } from '../utils/credential'

// Função de rota GET para obter dados da planilha
export async function GET(req: Request) {
  try {
    // Autenticação e configuração
    const { googleSheets, spreadsheetId } = await getAuthSheets()

    // Obtenção de metadados da planilha
    const metadata = await googleSheets.spreadsheets.get({
      spreadsheetId, // Corrigido para usar "spreadsheetId"
    })

    // Retorno dos metadados da planilha como JSON
    return NextResponse.json(metadata.data) // Retorna apenas os dados
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
