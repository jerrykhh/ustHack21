import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList, Image, TouchableOpacity, Dimensions} from 'react-native';


const styles = StyleSheet.create({
    imagesConatiner: {

    },
    images:{
        flexDirection: 'row',
        paddingHorizontal: 0.5,
    },
    image:{
        padding: 1.5
    }
})


const ProfileImageList = (props) => {
    
    const [images, setImages] = useState([
        {
            id: 1,
            image: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
        },
        {
            id: 2,
            image: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
        },
        {
            id: 3,
            image: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
        },
        {
            id: 4,
            image: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
        },
        {
            id: 5,
            image: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
        },
        {
            id: 6,
            image: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
        },
        {
            id: 7,
            image: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
        },
        {
            id: 8,
            image: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
        },
        {
            id: 9,
            image: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
        },
    ]);

    const [imageSize, setImageSize] = useState((Dimensions.get('window').width - 12) /3);
    

    const viewImage = (imageObject) => {
        console.log(id);
    }   
    console.log(props)

    return (
        <View style={styles.images}>
            <FlatList
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                data={props.data}
                numColumns={3}
                renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => viewImage(item)}>
                            <Image style={{width: imageSize, height: imageSize, margin: 1.7}}  source={{uri: item.image}}/>
                        </TouchableOpacity>
                )}
            />
        </View>
)
}

export default ProfileImageList;