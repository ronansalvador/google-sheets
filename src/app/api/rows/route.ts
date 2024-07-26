import { NextResponse } from 'next/server'
import { google } from 'googleapis'

// Função para autenticar e obter acesso ao Google Sheets
async function getAuthSheets() {
  // Autenticação com credenciais
  const credentials = JSON.parse(process.env.CREDENTIALS_API || '{}')

  const auth = new google.auth.GoogleAuth({
    credentials: credentials, // Passa o objeto de credenciais diretamente
    scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Escopo para leitura
  })

  const client = await auth.getClient()

  // Instância do serviço Google Sheets
  const googleSheets = google.sheets({
    version: 'v4',
    auth: client,
  })

  // ID da planilha
  const spreadsheetId = '1S7rrbDx6GF8i6J3t69YAm1FXwIHxLr32hdWnJn4Nt2k'

  return { auth, client, googleSheets, spreadsheetId }
}

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
      resource: {
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
