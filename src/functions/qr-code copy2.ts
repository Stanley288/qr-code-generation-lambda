import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import QRCode from 'qrcode'
import { createCanvas, loadImage } from 'canvas'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { headers, queryStringParameters } = event

    const responseHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }

    const canvas = createCanvas(500, 500)
    QRCode.toCanvas(
      canvas,
      'https://www.google.ca',
      {
        errorCorrectionLevel: 'H',
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      },
    )
    const qrCode = canvas.toDataURL('image/png')

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
