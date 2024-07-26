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

export async function POST(req: Request) {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets()
  const { values } = await req.json()

  try {
    const updateValue = await googleSheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Teste1!A2:C2',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: values,
      },
    })
    return NextResponse.json(updateValue.data)
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
