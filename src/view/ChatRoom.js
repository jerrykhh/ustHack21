import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {View, StyleSheet, Text} from 'react-native';
import axios from 'axios';
const ChatRoom = ( props) => {
    const [messages, setMessages] = useState([]);
console.log(props)
  useEffect(() => {

    console.log(props.userId, props.gotoId, "sdfdfsd")
    axios.get(`https://aclog6mgqd.execute-api.us-east-1.amazonaws.com/v1/message?userId=${props.userId}&goId=${props.goId}`).then((res) => {

        const responObj = JSON.stringify(res);
        const jsonObj = JSON.parse(responObj);
        console.log(jsonObj)

        let initMess = [];

        for(let i = jsonObj.data.Items.length -1; i >= 0; i--){
            const mess = jsonObj.data.Items[i];
            const dateObj = new Date(mess.date);
            dateObj.setHours(dateObj.getHours() - 6);
            if(mess.content == null){
                initMess.push({
                    _id: mess.recvId,
                    image: mess.message.image,
                    createdAt: dateObj,
                    user: {
                        _id: mess.senderId,
                    },
                });
            }else{
                initMess.push({
                    _id: mess.senderId,
                    text: mess.message.content,
                    createdAt: new Date(mess.date.substring(0, mess.date.length-4)),
                    user: {
                        _id: mess.recvId,
                    },
                });
            }
        }
        setMessages(initMess);
        console.log("refesh");
        console.log(initMess);
    })
  }, []);


  console.log(messages);

  const onSend = useCallback((messages = []) => {
     
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: props.userId,
      }}
      
    />
  )
}

export default ChatRoom;