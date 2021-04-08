import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {View, StyleSheet} from 'react-native';
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

        for(const mess of jsonObj.data.Items){
            if(mess.content == null){
                initMess.push({
                    _id: mess.recvId,
                    image: mess.message.image,
                    createdAt: new Date(mess.date),
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
        setMessages(initMess)
    })
  }, [])

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