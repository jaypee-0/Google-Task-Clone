import { Image, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const Favourites = () => {
  const starImage = require('../../assets/images/star.png')
  return (
    <View style={tw`px-4 pt-4`}>
      <View style={tw`flex h-full justify-center items-center`}>   
      <Image style={[tw`mx-auto rounded-full h-50 w-50 -mt-5`, {transform:  [{ rotate:'-30deg'}]}]} resizeMode='contain' source={starImage} />       
        <Text style={[tw`text-center text-3xl mt-2`, { fontFamily: 'DarkerGrotesque_600SemiBold' }]}>
          No starred tasks
        </Text>
        <Text style={tw`text-center text-[#00000070] mt-2 max-w-[79%]`}>
          Mark important tasks with a star so that you can easily find them here
        </Text>
      </View>
    </View>
  )
}

export default Favourites
