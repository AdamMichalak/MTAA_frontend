import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'

import { DefaultScreen } from './DefaultScreen'
import { useAuth } from '../hooks/useAuth'
import { Loader } from '../components/Loader'
import { getUserPosts } from '../api/getUserPosts'
import { DefaultButton } from '../components/DefaultButton'
import { navigate } from './RootNavigation'
import { deletePost } from '../api/deletePost'

const windowWidth = Dimensions.get('window').width

export const UserPostsScreen = () => {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const isFocused = useIsFocused()
  const [dataLoaded, setDataLoaded] = useState(false)
  const [hasPosts, setHasPosts] = useState(false)

  useEffect(() => {
    getUserPosts(user.id).then((res) => {
      if (res.response) {
        setHasPosts(false)
        setDataLoaded(true)
      } else {
        setPosts(res)
        setDataLoaded(true)
        setHasPosts(true)
      }
    })
  }, [isFocused])

  return (
    <>
      <DefaultScreen style={{ padding: 40 }}>
        <View>
          {dataLoaded ? (
            <View>
              {hasPosts ? (
                posts.map((post, key) => {
                  return (
                    <>
                      <View
                        key={key}
                        style={{
                          backgroundColor: '#F4EBE2',
                          borderRadius: 8,
                          marginBottom: 20,
                        }}>
                        <Image
                          style={{
                            width: windowWidth - 80,
                            height: windowWidth - 80,
                            borderRadius: 8,
                            alignSelf: 'center',
                          }}
                          source={{
                            uri: `data:image/gif;base64,${post.attachment}`,
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10,
                          }}>
                          <View>
                            <Text style={styles.postText}>
                              {new Date(post.created_at).toLocaleDateString(
                                'sk-SK',
                              )}
                            </Text>
                            <Text>{post.username}</Text>
                            <Text>{post.likes} likes</Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          marginBottom: 10,
                        }}>
                        <DefaultButton
                          style={styles.button}
                          text="Edit post"
                          handleClick={() =>
                            navigate('UploadPhoto', {
                              type: 'user_post_update',
                              photo: post.attachment,
                              post_id: post.id,
                            })
                          }
                        />
                        <DefaultButton
                          style={styles.button}
                          text="Delete post"
                          handleClick={() => deletePost(post.id, user.token)}
                        />
                      </View>
                    </>
                  )
                })
              ) : (
                <Text style={styles.heading}>You have no posts</Text>
              )}
            </View>
          ) : (
            <Loader />
          )}
        </View>
      </DefaultScreen>
    </>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '47.5%',
  },
  postText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
})
