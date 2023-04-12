import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import tw from 'twrnc'
import Constants from 'expo-constants'
import Colors from '../constants/Colors'
import { TopNavigator } from '../navigation/Main'
import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import { auth, db } from '../shared/utils/firebase'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { setUser } from '../slices/userSlice'
import { useDispatch } from 'react-redux'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'
import CustomBackdrop from '../components/CustomBackdrop'
import { clearTasks, setTasks } from '../slices/taskSlice'
//import auth from '@react-native-firebase/auth';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Home = () => {
  const { name } = useRoute()
  const currentRoute = name

  const defaultImage = require('../assets/images/user.png')
  // async function onGoogleButtonPress() {
  //   // Check if your device supports Google Play
  //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //   // Get the users ID token
  //   const { idToken } = await GoogleSignin.signIn();

  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);
  // }

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
  const loginWithGoogleHandler = () => {
    signInWithGoogle([''], { prompt: 'select_account' })
      .then((res: any) => {
        console.log(res)
        if (res) {
          const userQuery = query(userRef, where('uid', '==', res.user.uid))
          const ref = doc(db, 'users', res.user.uid)
          getDoc(ref)
            .then((data: any) => {
              if (data.data()) {
                res && console.log(res)
                //router.push("/store");
              } else {
                const docRef = doc(db, 'users', res.user.uid)
                const data = {
                  email: res.user.email && res.user.email,
                  name: res.user.displayName && res.user.displayName,
                  pic: res.user.photoURL && res.user.photoURL,
                  role: '',
                  uid: res.user.uid && res.user.uid,
                  phoneNo: ''
                }
                setDoc(docRef, data).then(() => {
                  dispatch(
                    setUser({
                      name: res?.user.displayName,
                      pic: res?.user.photoURL,
                      email: res?.user.email,
                      phoneNo: res?.user.phoneNumber,
                      uid: res?.user.uid
                    })
                  )
                  res && setshow(true)
                })
              }
            })
            .catch((data: any) => {})
        }
      })
      .catch(e => {
        console.log(e, '-error')
      })
  }

  const [show, setshow] = useState(false)
  const [showdetails, setshowdetails] = useState(false)

  const userRef = collection(db, 'users')
  const dispatch = useDispatch()

  useEffect(() => {
    const userQuery = collection(db, 'tasks')
    const userDoc = getDocs(userQuery)
    onSnapshot(userQuery, querySnapshot => {
      querySnapshot.docs.forEach((doc: any) => {
        dispatch(setTasks(doc.data()))
      })
    })
  }, [])

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const bottomSheetTaskModalRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = useMemo(() => ['15%', '35%'], [])
  const snapPointsAddTask = useMemo(() => ['22%', '75%'], [])

  // callbacks
  const openMenu = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const openTask = useCallback(() => {
    bottomSheetTaskModalRef.current?.present()
  }, [])
  const closeAllModal = useCallback(() => {
    bottomSheetModalRef.current?.close()
    bottomSheetTaskModalRef.current?.close()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const MENU_ITEMS = [
    {
      id: '0',
      title: 'Starred',
      route: '',
      icon: 'star'
    },
    {
      id: '1',
      title: 'My Tasks',
      route: '',
      icon: 'star'
    }
  ]

  const [details, setdetails] = useState({
    title: '',
    description: ''
  })

  const AddTask = async () => {
    const docRef = doc(db, 'tasks', Math.random().toString(36).substring(3))
    await setDoc(docRef, {
      uid: Math.random().toString(36).substring(3),
      title: details.title,
      description: details.description
    })
      .then((res: any) => {
        console.log(res, '--- doc uploaded')
        setdetails({
          title: '',
          description: ''
        })
        bottomSheetTaskModalRef.current?.close()
      })
      .catch(e => {
        console.log(e, '--- Error on doc upload')
      })
  }

  const handleChange = (name: any, value: any) => {
    setdetails({
      ...details,
      [name]: value
    })
  }
  const Item = ({ title, icon }: any) => (
    <TouchableOpacity
      style={tw`px-4 bg-[${
        currentRoute === 'Starred' ? '#00bfff20' : ''
      }] py-3 mb-[2px] rounded-r-full flex flex-row items-center`}
    >
      <Entypo
        name={'star'}
        size={28}
        color={currentRoute === 'My Tasks' ? '#2F80ED' : '#00000070'}
        style={tw`mr-2`}
      />
      <Text style={tw`text-[#2F80ED] font-bold`}>{title}</Text>
    </TouchableOpacity>
  )
  return (
    <>
      <View
        style={tw`pt-[${Constants.statusBarHeight}] bg-[${Colors.light.background}] flex flex-row items-center px-4 `}
      >
        {/* Bottom Modals */}
        {/* Menu */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={tw`flex flex-col`}
          backdropComponent={backdropProps => (
            <CustomBackdrop {...backdropProps} close={closeAllModal} />
          )}
        >
          <View style={tw`mt-auto`}>
            <View style={tw`pr-4`}>
              <FlatList
                data={MENU_ITEMS}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
              />
            </View>
            <TouchableOpacity
              style={tw`px-4 py-4 border-t w-full border-t-[#80808080] flex flex-row items-center`}
            >
              <Entypo name="plus" size={28} color="#00000070" />
              <Text style={tw`text-[#00000090] font-bold ml-2`}>{'Create New list'}</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>

        {/* Tasks */}
        <BottomSheetModal
          ref={bottomSheetTaskModalRef}
          index={1}
          snapPoints={snapPointsAddTask}
          onChange={handleSheetChanges}
          style={tw`flex flex-col`}
          backdropComponent={backdropProps => (
            <CustomBackdrop {...backdropProps} close={closeAllModal} />
          )}
        >
          <View style={tw`px-5`}>
            <TouchableOpacity style={tw`flex flex-row items-center`}>
              <Text style={tw`text-[#2F80ED] font-bold`}>{'My Tasks'}</Text>
              <AntDesign name="caretdown" size={10} color="#2F80ED" style={tw`ml-2`} />
            </TouchableOpacity>
            <TextInput
              placeholder="New Task"
              style={tw`border-b border-[#80808080] py-3 text-sm font-bold`}
              value={details.title}
              clearButtonMode="always"
              autoFocus={true}
              onChangeText={text => handleChange('title', text)}
              placeholderTextColor="#C9CCD3"
            />
            {showdetails && (
              <TextInput
                placeholder="Add details"
                style={tw`border-b border-[#80808080] py-3 text-sm font-bold`}
                value={details.description}
                clearButtonMode="always"
                onChangeText={text => handleChange('description', text)}
                placeholderTextColor="#C9CCD3"
              />
            )}

            <View style={tw`flex flex-row justify-between items-center mt-4`}>
              <View style={tw`flex flex-row items-center`}>
                <TouchableOpacity
                  style={tw`flex flex-row items-center mr-4`}
                  onPress={() => setshowdetails(!showdetails)}
                >
                  <Feather name="menu" size={24} color="#2F80ED" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row items-center mr-4`}>
                  <AntDesign name="calendar" size={24} color="#2F80ED" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row items-center`}>
                  <AntDesign name="star" size={24} color="#2F80ED" style={tw``} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={tw``} onPress={AddTask}>
                <Text
                  style={tw`font-bold text-[16px] text-[${
                    details.title.length > 3 || details.description.length > 3
                      ? '#2F80ED'
                      : '#8c8c8c90'
                  }]`}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
        <Text style={[tw`ml-auto py-3 text-2xl`, { fontFamily: 'DarkerGrotesque_700Bold' }]}>
          Tasks
        </Text>
        <TouchableOpacity
          style={tw`ml-auto rounded-full h-9 w-9 bg-[#808080]`}
          onPress={()=>dispatch(clearTasks())}
        >
          <Image
            style={tw`bg-[#808080] rounded-full h-9 w-9`}
            resizeMode="contain"
            source={defaultImage}
          />
        </TouchableOpacity>
      </View>

      {/* Main Section */}
      <View style={tw`flex-1`}>
        <TopNavigator />
      </View>

      {/* Bottom */}
      <View
        style={tw`bg-[${Colors.light.background}] flex justify-between flex-row px-4 py-3 shadow-lg relative`}
      >
        <TouchableOpacity onPress={openMenu}>
          <Entypo name="menu" size={28} color="#00000070" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openTask}
          style={tw`absolute right-[50%] left-[50%] -top-[95%] rounded-full bg-white shadow-xl shadow-black h-[60px] w-[60px] items-center justify-center border-[4px] border-[#00000020] `}
        >
          <Entypo name="plus" size={28} color="#DF1B12" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Entypo name="plus" size={28} color="#00000070" />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Home
