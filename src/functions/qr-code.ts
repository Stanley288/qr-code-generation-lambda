import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda'
import QRCode from 'easyqrcodejs-nodejs'

// type Options = {
//   teamURL: string | null
// } & APIGatewayProxyEventQueryStringParameters

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body || '')

    const responseHeaders = {
      'Content-Type': 'application/json',
    }

    // TODO: fix this weird type error
    const { 
      url,
      title,
      logo = undefined,
      color= "#000",
    } = body

    const options = {
      text: url,
      title: title,
      titleTop: 0,
      logo,
      quietZone: 15,
      dotScale: 0.5,
      width: 256,
      height: 256,
      colorDark: color,
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H
    }

    const qrCode = new QRCode(options)
    const dataUri = await qrCode.toDataURL()

    const res = {
      statusCode: 200,
      headers: {
        ...responseHeaders,
      },
      body: JSON.stringify(dataUri),
    }

    return res
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }
}

export default {}
