const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {
    
    
    console.log(event);
    const params = {
        TableName: 'ustHack21-APP-User',
        FilterExpression: "username = :u and password = :p",
        ExpressionAttributeValues: {
            ":u": event.data.username,
            ":p": event.data.password
        }
    }
    
    return await dynamodb.scan(params).promise().then(data => {
        console.log(data);
        if(data.Count == 1){
            return {
                stateCode: 200,
                login: true,
                id: data.Items[0].id,
                username: data.Items[0].username,
            }
        }else{
            return {
                stateCode: 200,
                login: false,
            }
        }
        
    }).catch(error => {
        console.log(error);
        return {
                stateCode: 400,
                login: false,
                message: "error, missing required attributes"
        }
    })
};
