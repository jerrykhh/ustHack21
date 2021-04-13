const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {
    
    if(event.context.httpMethod == "GET") {
        
        const queryString = event.params.querystring;
        if(queryString.userId){
            
            const params = {
                TableName: 'ustHack21-APP-User',
                KeyConditionExpression: 'id = :i',
                ExpressionAttributeValues: {
                    ":i": queryString.userId
                }
            }
            
            
            let user = await dynamodb.query(params).promise().then((data) => {
                return {
                    userId: data.Items[0].id,
                    username: data.Items[0].username,
                    profile_image: data.Items[0].image
                }
            }).catch(err => console.log(err));
            
            
            const packageParams = {
                
                TableName: 'ustHack21-APP-Package',
                FilterExpression: 'userId = :id',
                ExpressionAttributeValues: {
                    ":id": queryString.userId
                }
                
            }
            
            user["packages"] = await dynamodb.scan(packageParams).promise().then((data) => {
                return data.Items;
            }).catch(err => console.log(err));
            
            const imagesParams = {
                TableName: 'ustHack21-APP-Gallery',
                FilterExpression: 'userId = :id',
                ExpressionAttributeValues: {
                    ":id": queryString.userId
                }
            }
            
            return  await dynamodb.scan(imagesParams).promise().then((data) => {
                user.images = data.Items;
                
                return {
                    stateCode: 200,
                    user
                }
            }).catch(err => {
                
                console.log(err);
                return {
                    stateCode: 400,
                    message: "error "
                }
                
            });
            
            
            
            
        }
        
        
    }
    
    
};
