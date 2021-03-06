import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NetInfo from '@react-native-community/netinfo'

import { navigationRef } from './RootNavigation'
import { WelcomeScreen } from './WelcomeScreen'
import { RegisterScreen } from './RegisterScreen'
import { LoginScreen } from './LoginScreen'
import { MainScreen } from './MainScreen'
import { SetupProfileScreen } from './SetupProfileScreen'
import { CreateAddressScreen } from './CreateAddressScreen'
import { UpdateUserScreen } from './UpdateUserScreen'
import { UpdateProfileScreen } from './UpdateProfileScreen'
import { UpdateAddressScreen } from './UpdateAddressScreen'
import { ViewProfileScreen } from './ViewProfileScreen'
import { UserPostsScreen } from './UserPostsScreen'
import { UploadPhotoScreen } from './UploadPhotoScreen'
import { ViewPostsScreen } from './ViewPostsScreen'
import { SendMessageScreen } from './SendMessageScreen'
import { ConversationScreen } from './ConversationScreen'
import { SyncScreen } from './SyncScreen'
import {
  showDefaultSuccessMessage,
  showDefaultWarnMessage,
} from '../helpers/showDefaultMessage'

const Stack = createNativeStackNavigator()

export const InitialScreen = () => {
  NetInfo.addEventListener((state) => {
    if (state.isInternetReachable) {
      showDefaultSuccessMessage('Connection restored')
    }

    if (!state.isInternetReachable) {
      showDefaultWarnMessage('No internet connection', undefined, false)
    }
  })

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerStyles={{ height: 40 }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: 'Welcome', headerStyle: { height: 60 } }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Registration' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: 'Main', headerShown: false }}
        />
        <Stack.Screen
          name="SetupProfile"
          component={SetupProfileScreen}
          options={{ title: 'Setup your profile', headerShown: false }}
        />
        <Stack.Screen
          name="CreateAddress"
          component={CreateAddressScreen}
          options={{ title: 'Add address' }}
        />
        <Stack.Screen
          name="UpdateAddress"
          component={UpdateAddressScreen}
          options={{ title: 'Update address' }}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUserScreen}
          options={{ title: 'Update user data' }}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfileScreen}
          options={{ title: 'Update student data' }}
        />
        <Stack.Screen
          name="ViewProfile"
          component={ViewProfileScreen}
          options={{ title: 'View profile' }}
        />
        <Stack.Screen
          name="ViewPosts"
          component={ViewPostsScreen}
          options={{ title: 'View posts' }}
        />
        <Stack.Screen
          name="UserPosts"
          component={UserPostsScreen}
          options={{ title: 'Your posts' }}
        />
        <Stack.Screen
          name="UploadPhoto"
          component={UploadPhotoScreen}
          options={{ title: 'Upload a photo' }}
        />
        <Stack.Screen
          name="SendMessage"
          component={SendMessageScreen}
          options={{ title: 'Send a message' }}
        />
        <Stack.Screen
          name="Conversation"
          component={ConversationScreen}
          options={{ title: 'Messages' }}
        />
        <Stack.Screen
          name="Sync"
          component={SyncScreen}
          options={{ title: 'Sync' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
