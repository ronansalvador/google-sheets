import { NextResponse } from 'next/server'
import { getAuthSheets } from '../../utils/credential'

export async function POST(req: Request) {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets()
  const { values } = await req.json()

  try {
    const updateValue = await googleSheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Teste1!A2:C2',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
      },
    })
    return NextResponse.json(updateValue.data)
  } catch (error) {
    return NextResponse.json(
      {
        message: 'error',
        error,
      },
      { status: 500 },
    )
  }
}
