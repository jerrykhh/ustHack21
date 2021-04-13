const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    if(event.context.httpMethod == "GET"){
        const querystring = event.params.querystring;
        if(querystring.like){
            
            const params = {
                
                TableName : 'ustHack21-APP-User',
                FilterExpression: "contains(#username, :username)",
                ExpressionAttributeNames: {
                    "#username": "username",
                },
                ExpressionAttributeValues: {
                    ":username": querystring.like.toLowerCase(),
                }
            }
            
            return await dynamodb.scan(params).promise().then(data => {
                let result = [];
                let count = 0
                for(const user of data.Items){
                    if(count >= 3)
                        break;
                    result.push({
                        id: user.id,
                        username: user.username,
                        image: user.image
                    })
                    count++;
                    
                    
                }
                return result;
                
            });
            
            
            
            
            
        }
        
        
    }
};
