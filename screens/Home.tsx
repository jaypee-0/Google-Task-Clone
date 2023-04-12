import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Constants from 'expo-constants'
import Colors from '../constants/Colors'
import { TopNavigator } from '../navigation/Main'
import { Entypo } from '@expo/vector-icons'

const Home = () => {
  const defaultImage = require('../assets/images/user.png')

  

//   const [signInWithGoogle, user] =
//   useSignInWithGoogle(auth);

//   const loginWithGoogleHandler = () => {
//     signInWithGoogle([""], { prompt: "select_account" })
//         .then((res: any) => {
//             if (res) {
//                 const userQuery = query(
//                     userRef,
//                     where("uid", "==", res.user.uid)
//                 );
//                 const ref = doc(
//                     db,
//                     "users",
//                     res.user.uid
//                 );
//                 getDoc(ref)
//                     .then((data: any) => {
//                         if (data.data()) {
//                             res &&
//                                 router.push("/store");
//                         } else {
//                             const docRef = doc(
//                                 db,
//                                 "users",
//                                 res.user.uid
//                             );
//                             const data = {
//                                 email:
//                                     res.user.email &&
//                                     res.user.email,
//                                 name:
//                                     res.user
//                                         .displayName &&
//                                     res.user
//                                         .displayName,
//                                 pic:
//                                     res.user.photoURL &&
//                                     res.user.photoURL,
//                                 role: "",
//                                 uid:
//                                     res.user.uid &&
//                                     res.user.uid,
//                                 phoneNo: ""
//                             };
//                             setDoc(docRef, data).then(
//                                 () => {
//                                     dispatch(
//                                         setUser({
//                                             name: res
//                                                 ?.user
//                                                 .displayName,
//                                             pic: res
//                                                 ?.user
//                                                 .photoURL,
//                                             email: res
//                                                 ?.user
//                                                 .email,
//                                             phoneNo:
//                                                 res
//                                                     ?.user
//                                                     .phoneNumber,
//                                             uid: res
//                                                 ?.user
//                                                 .uid
//                                         })
//                                     );
//                                     res &&
//                                         router.push(
//                                             "/store"
//                                         );
//                                 }
//                             );
//                         }
//                     })
//                     .catch((data: any) => {});
//             }
//         })
//         .catch((e) => {});
// };

  return (
    <>
      <View
        style={tw`pt-[${Constants.statusBarHeight}] bg-[${Colors.light.background}] flex flex-row items-center px-4 `}
      >
        <Text style={[tw`ml-auto py-3 text-2xl`, { fontFamily: 'DarkerGrotesque_700Bold' }]}>
          Tasks
        </Text>
        <TouchableOpacity style={tw`ml-auto rounded-full h-9 w-9 bg-[#808080]`}>
          <Image style={tw`bg-[#808080] rounded-full h-9 w-9`} resizeMode='contain' source={defaultImage} />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1`}>
        <TopNavigator />
      </View>

      {/* Bottom */}
      <View
        style={tw`bg-[${Colors.light.background}] flex justify-between flex-row px-4 py-3 shadow-lg`}
      >
        <TouchableOpacity>
          <Entypo name="menu" size={28} color="#00000070" />
        </TouchableOpacity>

        <TouchableOpacity>

        </TouchableOpacity>

        <TouchableOpacity>
          <Entypo name="plus" size={28} color="#00000070" />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Home
