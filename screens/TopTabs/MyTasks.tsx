import { Text, TouchableOpacity, View } from 'react-native'
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons'
import tw from 'twrnc'
import React, { useEffect } from 'react'
import Colors from '../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCompleted,
  selectStarred,
  selectTasks,
  setCompleted,
  setStarred
} from '../../slices/taskSlice'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

const MyTasks = () => {
  const dispatch = useDispatch()

  const TASKS = useSelector(selectTasks)
  const STARRED = useSelector(selectStarred)
  const COMPLETED = useSelector(selectCompleted)

  const COMPARE = () => {
    const starredUids = STARRED.map((item: any) => item.uid)
    const tasks = TASKS.filter((item: any) => starredUids.includes(item.uid))
    return tasks.map((data: any) => data.uid).toString()
  }

  const Item = ({ title, description, uid }: any) => {
    const data: any = { title, description, uid }
    return (
      <TouchableOpacity style={tw`flex flex-row w-full justify-between items-center w-full mb-2`}>
        <View style={tw`flex flex-row items-center`}>
          <TouchableOpacity
            onPress={() => dispatch(setCompleted(data))}
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

        <TouchableOpacity style={tw``} onPress={() => dispatch(setStarred(data))}>
          <AntDesign
            name={'star'}
            color={COMPARE() === uid ? Colors.primary : Colors.secondary}
            size={24}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  const CompleteItem = ({ title, description, uid }: any) => {
    const data: any = { title, description, uid }
    return (
      <TouchableOpacity style={tw`flex flex-row w-full justify-between items-center w-full mb-2`}>
        <View style={tw`flex flex-row items-center`}>
          <Entypo name="check" size={24} color="#2F80ED" style={tw`mr-3`} />

          <View style={tw`flex flex-col max-w-[100%]`}>
            <Text style={[tw`text-2xl sm:text-3xl`, { fontFamily: 'DarkerGrotesque_600SemiBold' }]}>
              {title}
            </Text>
            <Text
              style={[tw`text-lg text-[#8c8c8c]`, { fontFamily: 'DarkerGrotesque_600SemiBold' }]}
            >
              {description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={tw`px-4 pt-4`}>
      {TASKS.length === 0 ? (
        <View style={tw`flex flex-col justify-center items-center h-full`}>
          <View style={tw`h-[230px] w-40 bg-[#b22222] flex items-center justify-center`}>
            <Text
              style={[tw`text-2xl text-[#ffff]`, { fontFamily: 'DarkerGrotesque_600SemiBold' }]}
            >
              No Tasks
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`pb-20`}>
          <FlatList
            data={TASKS}
            renderItem={({ item }) => (
              <Item title={item.title} description={item.description} uid={item.uid} />
            )}
            keyExtractor={item => item.title}
            showsVerticalScrollIndicator={false}
          />
          <View style={tw`mt-2`}>
            <Text style={tw`pb-3`}>Completed ({COMPLETED?.length})</Text>
            <FlatList
              data={COMPLETED}
              renderItem={({ item }) => (
                <CompleteItem title={item.title} description={item.description} uid={item.uid} />
              )}
              keyExtractor={item => item.title}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default MyTasks
