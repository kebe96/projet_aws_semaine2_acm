

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        const AWS = require('aws-sdk');
        
       //return S3 bucket files of us-east-1 region
        const s3 = new AWS.S3({region: 'us-east-1'});
        const data = await s3.listObjectsV2({Bucket: 'projetawssemaine2acmf60cfe3dad1b414cb943fddd33f173248-dev'}).promise();
        console.log(data);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({
                message: `Success`,
                data: data
            }),
        };
    }catch(e){
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({
                message: `Error: ${e.message}`,
            }),
        };
    }
    
};
