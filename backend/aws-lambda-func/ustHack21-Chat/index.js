const AWS = require('aws-sdk');
const { v4: uuid_v4 } = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

exports.handler = async (event) => {
    if(event.context.httpMethod == "PUT"){
        console.log(event.data);
        if(event.data.message.image){
            let imageName = `${uuid_v4()}.jpg`;
            let buffer = Buffer.from(event.data.message.image, 'base64');
            console.log(buffer);
            console.log(imageName)
            await s3.putObject({
                 Body: buffer,
                 Key: imageName,
                 Bucket: "usthack21"
            }).promise().then(data=> {
                console.log(data);
            }).catch(error => {
                console.log(error)
                 return {statCode: 400, config: false, message: "Upload data error"} 
            });
            
            console.log("userId ", event.data.userId)
            const now = new Date();
            now.setTime(now.getTime() + now.getTimezoneOffset() * 60 * 1000  +  8 * 60 * 60 * 1000);
            const nowDateTime = now.toUTCString();
    
            const params = {
                Item: {
                    "id": uuid_v4(),
                    "senderId": event.data.userId,
                    "recvId": event.data.sendId,
                    "date": nowDateTime,
                    "message": {
                        "image": `https://d259x0g575hge3.cloudfront.net/${imageName}`,
                        "content": null
                    }
                },
                TableName: "ustHack21-APP-Message",
                ReturnConsumedCapacity: "TOTAL"
            }
            
            
            return await dynamodb.put(params).promise().then((data) => {

                console.log(data);

            
                    return{
                        stateCode: 200,
                        created: true
                    }
                

            }).catch(err => {
                console.log(err)
                return {
                    stateCode: 400,
                    message: "error"
                }
            });

       
        }
            

    }else if (event.context.httpMethod == "GET"){
        
        const queryString = event.params.querystring;
        
        if(queryString.userId && queryString.goId){
            
            const params = {
                TableName: "ustHack21-APP-Message",
                FilterExpression: "senderId = :s and recvId = :r OR senderId = :r and recvId = :s",
                ExpressionAttributeValues: {
                    ":s": queryString.userId,
                    ":r": queryString.goId
                }
            }
            
             return await dynamodb.scan(params).promise().then((data) => {

                return (data);
                

            }).catch(err => {
                console.log(err)
                return {
                    stateCode: 400,
                    message: "error"
                }
            });
            
            
        }
        
    }
};

