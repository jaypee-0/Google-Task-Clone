import { Image, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { selectStarred, selectTasks } from '../../slices/taskSlice'
import { FlatList } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../constants/Colors'

const Favourites = () => {
  const starImage = require('../../assets/images/star.png')

  const dispatch = useDispatch()
  const STARRED = useSelector(selectStarred)
  console.log(STARRED, 'Starred')

  const Item = ({ title, description, uid }: any) => {
    return (
      <TouchableOpacity style={tw`flex flex-row w-full justify-between items-center w-full mb-2`}>
        <View style={tw`flex flex-row items-center`}>
          <TouchableOpacity
            style={tw`h-4 w-4 mr-3 border border-[#8c8c8c] border-[1.5px] rounded-full`}
          ></TouchableOpacity>

          <View style={tw`flex flex-col max-w-[82%]`}>
            <Text style={[tw`text-2xl sm:text-3xl`, { fontFamily: 'DarkerGrotesque_600SemiBold' }]}>
              {title}
            </Text>
            <Text
              style={[tw`text-lg text-[#8c8c8c]`, { fontFamily: 'DarkerGrotesque_600SemiBold' }]}
            >
              {description}
            </Text>
            <View
              style={tw`rounded-2xl px-3 py-2 mt-1 border border-[1px] border-[#8c8c8c] mr-auto`}
            >
              <Text style={tw``}>{'Today'}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={tw``}>
          <FontAwesome5 name="star" color={false ? Colors.primary : Colors.secondary} size={24} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
  return (
    <View style={tw`px-4 pt-4`}>
      {STARRED.length < 1 ? (
        <View style={tw`px-4 pt-4`}>
          <View style={tw`flex h-full justify-center items-center`}>
            <Image
              style={[
                tw`mx-auto rounded-full h-50 w-50 -mt-5`,
                { transform: [{ rotate: '-30deg' }] }
              ]}
              resizeMode="contain"
              source={starImage}
            />
            <Text
              style={[tw`text-center text-3xl mt-2`, { fontFamily: 'DarkerGrotesque_600SemiBold' }]}
            >
              No starred tasks
            </Text>
            <Text style={tw`text-center text-[#00000070] mt-2 max-w-[79%]`}>
              Mark important tasks with a star so that you can easily find them here
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={STARRED}
          renderItem={({ item }) => (
            <Item title={item.title} description={item.description} uid={item.uid} />
          )}
          keyExtractor={item => item.title}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

export default Favourites
