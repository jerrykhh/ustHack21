import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regFaHeart} from '@fortawesome/free-regular-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ImageView = (props) => {

    const [post, setPost] = useState();
    const [userId, setUserId] = useState(null);
    const [count, setCount] = useState(0);
 

    console.log(props);
    useEffect(() => {

        axios.get(`https://aclog6mgqd.execute-api.us-east-1.amazonaws.com/v1/post?postId=${props.imageId}`).then((res) => {
            const responObj = JSON.stringify(res.data);
            console.log(responObj);
            const jsonObj = JSON.parse(responObj);
            console.log(jsonObj);
            setPost(jsonObj.post);

        }).catch(err => {
            console.error(err);
        })

        AsyncStorage.getItem('userId').then((data) => {
            setUserId(data);
        });

        

    }, []);

    const eventTriggerLike = (postId) => {
        const data = {
            userId : userId,
            postId: postId,
            like: post.liked
        }
        console.log(postId)
        axios.post("https://aclog6mgqd.execute-api.us-east-1.amazonaws.com/v1/post", data).then((res) => {
            const responObj = JSON.stringify(res.data);
            console.log(responObj);
            const jsonObj = JSON.parse(responObj);
            if(jsonObj.updated ){
                const updatePost = post;
                updatePost.liked = jsonObj.liked;
                if(!post.liked)
                    updatePost.like -= 1;
                else
                    updatePost.like += 1;
                setPost(updatePost);
                setCount(count+1);
                console.log(post);
            }
        }).catch(err=> {
            console.log(err)
        })
    }

    return(
        (post != null) ?
        <SafeAreaView style={styles.container}>

                <View style={styles.userInf}>

                        <Image style={styles.userIcon} source={{uri: post.image}} />
                   
          
                        <Text style={styles.usernameText}>{post.username}</Text>
                    
                </View>
                <View style={{flex:1,flexDirection: 'row'}}>
                    <Image resizeMode="contain" style={styles.image} source={{uri: post.post_image}}/>
                </View>
                
                <View style={styles.userInteraction}>
                    <Text style={{fontSize: 16}}>{post.like} Likes</Text>
                    <TouchableOpacity style={styles.actionButton} onPress={() => eventTriggerLike(post.id)}>
                        
                        {(post.liked)?
                            <>
                                <FontAwesomeIcon icon={faHeart} size={32} color={'red'}/>
                            </>
                            :
                            <>
                                <FontAwesomeIcon icon={regFaHeart} size={32}/>
                            </>
                        }
                    
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
                :<></>
    )
    

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    userInf: {
        paddingLeft: 30,
        paddingTop: 30,
        flexDirection: 'row'
    },
    userIcon: {
        width: 40,
        height: 40,
        borderRadius: 100
    },
    usernameText:{
        fontSize: 16,
        fontWeight: '700',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 10
    },
    image:{
        flex:1, 
        width: null, 
        height: null 
    },
    userInteraction: {
        flex: 1,
        marginLeft: 30,
        marginTop: -20
    },
    actionButton:{
        marginTop: 10
    }
})

export default ImageView;