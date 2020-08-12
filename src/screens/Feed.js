import React, { Component } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import Header from '../components/Header'
import Post from '../components/Post'

class Feed extends Component {
    state = {
        posts: [{
            id: Math.random(),
            nickname: 'Matheus de Oliveira Lopes',
            email: 'matlopes1999@gmail.com',
            image: require('../../assets/imgs/fence.jpg'),
            comments: [{
                nickname: 'Ivaneide Lopes',
                comment: 'Lindo meu filho!!'
            }, {
                nickname: 'Suzana',
                comment: 'Top de mais meu gato!'
            }]
        }, {
            id: Math.random(),
            nickname: 'Ivaneide Lopes',
            email: 'nutneide@bol.com.br',
            image: require('../../assets/imgs/bw.jpg'),
            comments: [{
                nickname: 'Gabriel Lopes',
                comment: 'Lindo mãe <3'
            }]
        }]
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <FlatList
                    data={this.state.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) =>
                        <Post key={item.id} {...item} />} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
})

export default Feed