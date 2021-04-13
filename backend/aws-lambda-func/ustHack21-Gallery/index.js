const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { v4: uuid_v4 } = require('uuid');
const s3 = new AWS.S3();


exports.handler = async (event) => {
    

    
    if(event.context.httpMethod == "PUT"){

        if(event.data.userId && event.data.image){
            
            let imageName = `${uuid_v4()}.jpg`;
            let buffer = Buffer.from(event.data.image, 'base64');
            console.log(buffer);
            console.log(imageName)
            await s3.putObject({
                 Body: buffer,
                 Key: imageName,
                 Bucket: "usthack21"
            }).promise().then(data=> {
                console.log(data);
                return {
                    stateCode: 200,
                    created: true
                }
            }).catch(error => {
                console.log(error)
                return {statCode: 400, config: false, message: "Upload data error"} 
            });
            
            
            const params = {
                Item: {
                    "id": uuid_v4(),
                    "userId": event.data.userId,
                    "image": `https://d259x0g575hge3.cloudfront.net/${imageName}`,
                    "lat": event.data.lat,
                    "lng": event.data.lng,
                    "like": 0
                },
                TableName: "ustHack21-APP-Gallery",
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
            
            
        
        
    
    }else if(event.context.httpMethod == "GET"){
    
        const querystring = event.params.querystring;
        
        if(querystring.lat && querystring.lng && querystring.km){
            const params = {
                TableName: 'ustHack21-APP-Gallery'
            }
            
            return await dynamodb.scan(params).promise().then(data => {
                let locations = [];
                let curr = [];
                for(let i = 0; i < data.Items.length ; i++){
                    if(!curr.includes(i)){
                        if(arePointsNear({lng:data.Items[i].lng, lat:data.Items[i].lat}, {lng: querystring.lng, lat:querystring.lat}, querystring.km)){
                            locations.push(data.Items[i]);
                            locations[locations.length-1].images = [];
                            for(let j = 0; j < data.Items.length; j++){
                                if(data.Items[i] != data.Items[j]){
                                     if(arePointsNear({lng:data.Items[i].lng, lat:data.Items[i].lat}, {lng: data.Items[j].lng, lat:data.Items[j].lat}, 0.2)){
                                         console.log(data.Items[i].id, data.Items[j].id);
                                         curr.push(j);
                                         locations[locations.length-1].images.push(data.Items[j])
                                     }
                                }
                            }
                        }
                    }
                }
                
                for(let i = 0; i < locations.length; i++){
                    
                    locations[i].images.sort((a,b) => {
                        return a.like - b.like;
                    });
                    if( typeof locations[i].images.length !== 'undefined' && locations[i].images.length > 0 && locations[i].like < locations[i].images[locations[i].images.length-1].like){
                        let temp = locations[i].images;
                        let objTemp = locations[i];
                        delete objTemp.images;
                        let deletedTemp = objTemp;
                        objTemp = temp[temp.length-1];
                        objTemp.images = temp;
                        objTemp.images[temp.length-1] = deletedTemp;
                        locations[i] = objTemp;
                        locations[i].images.sort((a,b) => {
                            return a.like - b.like;
                        });
                    }
    
                }
                
                return {
                    stateCode: 200,
                    locations
                }
                
            }).catch(error => {
                console.log(error);
                return {
                    stateCode: 400,
                    message: "error"
                }
            })
        }else{
            return {
                stateCode: 400,
                message: "error: missing required attribute"
            }
        }
    }
    
};


const arePointsNear = (checkPoint, centerPoint, km) => {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}