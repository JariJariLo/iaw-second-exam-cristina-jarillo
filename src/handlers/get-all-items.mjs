// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
export const getAllItemsHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    const lista=[];
    var params = {
        TableName : tableName,
    };

    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        var items = data.Items;
    } catch (err) {
        console.log("Error MALO malo", err);
    }

    for(const coso of items){
        if(coso.disponible==true){
            lista.push(coso);
        }
    }
  


    const response = {
        statusCode: 200,
        body: JSON.stringify(lista)
    };
   
    

    // All log statements are written to CloudWatch
   console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
   return response;
}
