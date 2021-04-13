const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    if(event.context.httpMethod){
        const querystring = event.params.querystring;
        const params = {
            TableName: "ustHack21-APP-Friend",
            KeyConditionExpression: "id = :v1",
            ExpressionAttributeValues: {
                ":v1": querystring.userId
            }
        }
        
        let items = await dynamodb.query(params).promise().catch((error) => {
            console.log(error);
            return {
                stateCode: 400,
                message: `error ${error}` 
            }
        });

        let result = items.Items;

        let index = 0;
        for(const user of result){
            
            
            const getUserParam = {
                TableName: "ustHack21-APP-User",
                KeyConditionExpression: "id = :v1",
                ExpressionAttributeValues: {
                    ":v1": user.userId
                }
            }
            await dynamodb.query(getUserParam).promise().then(userObject => {
                
               delete result[index].id;
               result[index].username = userObject.Items[0].username;
               result[index].image = userObject.Items[0].image;
               result[index].desc = userObject.Items[0].desc;
               if(querystring.detail == "true" || querystring.detail == true){
                    result[index].lat = userObject.Items[0].lat
                    result[index].lng = userObject.Items[0].lng
               }
                    
            }).catch(error => {
                console.log(error);
                return {
                    stateCode: 400,
                    message: `error ${error}`
                }
            })
            index++;
        }
        
        
        
        return {
            stateCode: 200,
            result
        }
      
    }
    
    
    
};
