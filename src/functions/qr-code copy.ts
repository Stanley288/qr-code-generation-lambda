import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import QRCode from 'easyqrcodejs-nodejs'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { headers, queryStringParameters } = event

    const responseHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }

    const options = {
      text: "https://github.com/ushelp/EasyQRCodeJS",
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H
    }

    const qrCode = new QRCode(options)

    const res = {
      statusCode: 200,
      headers: {
        ...responseHeaders,
      },
      body: JSON.stringify(qrCode)
    }
    return res
  } catch (err) {
    return {
      statusCode: 500,
      body: 'An error occured',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  }
}

export default {}
