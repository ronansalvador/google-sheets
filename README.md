# Integração Nextjs com Google Planilhas

Para acessar a planilha e ver o resultado acesse: [Planilha](https://docs.google.com/spreadsheets/d/1S7rrbDx6GF8i6J3t69YAm1FXwIHxLr32hdWnJn4Nt2k/edit?usp=sharing)


## Rotas Backend

GET - [/api/planilha](https://google-sheets-lac.vercel.app/api/planilha) - retorna o status da planilha

GET Rows - [/api/rows](https://google-sheets-lac.vercel.app/api/rows) - retorna o conteudo da planilha

POST rows - `/api/rows` - adiconar dados na planilha

utilizar o modelo abaixo no Body:

```json
{
  "values": [
    [ "30/07/2024", "jogo01", "100"],
    [ "31/07/2024", "jogo02", "100"]
    ]
}
```

## Frontend

[Visualizar dados da planilha](https://google-sheets-lac.vercel.app/)

[adicionar dados da planilha](https://google-sheets-lac.vercel.app/edit)


