import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, FlatList, View, Text, ActivityIndicator, RefreshControl } from 'react-native'
import Header from '../components/Header'
import Post from '../components/Post'
import { fetchPosts } from '../store/actions/posts'

class Feed extends Component {
    componentDidMount = () => {
        this.props.onFetchPosts()
    }

    render() {
        const feedBody = this.props.posts.length > 0
            ? <FlatList
                data={this.props.posts}
                keyExtractor={item => `${item.id}`}
                refreshControl={<RefreshControl refreshing={this.props.isLoading} onRefresh={this.props.onFetchPosts} />}
                renderItem={({ item }) =>
                    <Post key={item.id} {...item} />} />
            : <View style={{...styles.container, backgroundColor: '#FFF'}}>
                <Text>Não existem postagens ainda...</Text>
                <Text>Para adicionar faça login e publique uma imagem!</Text>
              </View>
        return (
            <View style={styles.container}>
                <Header />
                {feedBody}
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

const mapStateToProps = ({ posts, feed }) => {
    return {
        posts: posts.posts,
        isLoading: feed.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: () => dispatch(fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)