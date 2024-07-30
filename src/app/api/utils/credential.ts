import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library' // Importando o tipo correto

// Função para autenticar e obter acesso ao Google Sheets
export async function getAuthSheets() {
  // Autenticação com credenciais
  const credentials = JSON.parse(process.env.CREDENTIALS_API || '{}')

  const auth = new google.auth.GoogleAuth({
    credentials: credentials, // Passa o objeto de credenciais diretamente
    scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Escopo para leitura
  })

  // Obtenha o cliente de autenticação como um OAuth2Client
  const client = (await auth.getClient()) as OAuth2Client

  // Instância do serviço Google Sheets
  const googleSheets = google.sheets({
    version: 'v4',
    auth: client, // Passa o cliente autenticado
  })

  // ID da planilha
  const spreadsheetId = '1S7rrbDx6GF8i6J3t69YAm1FXwIHxLr32hdWnJn4Nt2k'

  return { auth, client, googleSheets, spreadsheetId }
}
