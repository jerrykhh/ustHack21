const AWS = require('aws-sdk');
const { v4: uuid_v4 } = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {
    console.log(event);
    if(event.data.userId && event.data.package){
        
        console.log(uuid_v4().toString())
        const nowTime = new Date().getTime();
        const params = {
            TableName: 'ustHack21-APP-Package',
            Item: {
                "id": uuid_v4(),
                "userId": event.data.userId,
                "title": event.data.title,
                "desc": event.data.desc,
                "country": event.data.country,
                "timestamp": nowTime,
                "package": event.data.package,
            },
            ReturnConsumedCapacity: "TOTAL"
        }

        return await dynamodb.put(params).promise().then((data) => {
            console.log(data);
            if(data.ConsumedCapacity.CapacityUnits > 0){
                return {
                    stateCode: 200,
                    created: true
                }
            }
            
        }).catch((error) => {
            console.log(error);
            return {
                stateCode: 400,
                created: false,
                message: "error"
            }
        })
    
    }else{
        return {
            stateCode: 400,
            created: false,
            message: "error"
        }
    }
};

