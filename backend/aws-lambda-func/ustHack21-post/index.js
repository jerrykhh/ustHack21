const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
   
   if(event.context.httpMethod == "GET") {
       
        const queryString = event.params.querystring;
        
    
        if(queryString.postId){
            
            const params = {
                
                TableName: "ustHack21-APP-Gallery",
                FilterExpression: "id = :id",
                ExpressionAttributeValues: {
                    ":id": queryString.postId
                }
            }
            
             let result = await dynamodb.scan(params).promise().then((data) => {
                 console.log(data);
                 return data.Items[0];
             }).catch(err => {console.log(err)});
             
             result.post_image = result.image;
             const likeParams = {
                TableName: "ustHack21-APP-Like",
                KeyConditionExpression: "userId = :u and postId = :p",
                ExpressionAttributeValues: {
                    ":u": result.userId,
                    ":p": queryString.postId
                }
            }
            
            result.liked = await dynamodb.query(likeParams).promise().then((data) => {
                console.log(data)
                return (data.Items.length > 0) ? true : false;
            });
             
             
             console.log(result);
             
             const userParams = {
                 TableName: "ustHack21-APP-User",
                 KeyConditionExpression: "id = :u",
                 ExpressionAttributeValues: {
                    ":u": result.userId
                }
             }
            
            return dynamodb.query(userParams).promise().then((data) => {
                console.log(data);
                const user = data.Items[0];
                result.username = user.username;
                result.image = user.image;
                
                return {
                    stateCode: 200,
                    post: result
                }
                
            }).catch(err => {
                console.log(err) 
                return {stateCode: 400, message: "error"}
            });
            
            
            
        }
       
       
       
       
       
   }else if (event.context.httpMethod == "POST"){
       
       
       
       if(event.data.postId && event.data.userId){


           if(!event.data.like){
               
               const params = {
                   TableName: "ustHack21-APP-Like",
                   ReturnConsumedCapacity: "TOTAL",
                   Item: {
                       "userId": event.data.userId,
                       "postId": event.data.postId
                   }
               }
               
               return await dynamodb.put(params).promise().then((data) => {
                   if(data.ConsumedCapacity.CapacityUnits > 0){
                       return {
                            stateCode: 200,
                            updated: true,
                            liked: true
                        }    
                   }else{
                        return {
                            stateCode: 200,
                            updated: false,
                            liked: false
                        }  
                   }
                   
               }).catch(err => {
                   console.log(err) 
                   return {stateCode: 400, message: "error"}
               });
               
           }else{
               
               const params = {
                   TableName: "ustHack21-APP-Like",
                   Key: {
                       "userId": event.data.userId,
                       "postId": event.data.postId
                   },
                   ReturnConsumedCapacity: "TOTAL"
               }
               
              return await dynamodb.delete(params).promise().then((data) => {
                  
                   if(data.ConsumedCapacity.CapacityUnits > 0){
                       return {
                            stateCode: 200,
                            updated: true,
                            liked: false
                        }    
                   }else{
                        return {
                            stateCode: 200,
                            updated: false,
                            liked: true
                        }  
                   }
                  
              }).catch(err => {
                  console.log(err) 
                  return {stateCode: 400, message: "error"}
                  
              });
               
               
           }
           
           
           
       }
       
       
       
   }
   
   
   
   
};
