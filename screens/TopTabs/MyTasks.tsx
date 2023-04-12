import { Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import tw from 'twrnc'
import React from 'react'
import Colors from '../../constants/Colors'

const MyTasks = () => {
  return (
    <View style={tw`px-4 pt-4`}>
          
      <TouchableOpacity style={tw`flex flex-row w-full justify-between items-center w-full mb-2`}>
        <View style={tw`flex flex-row items-center`}>
          <TouchableOpacity style={tw`h-4 w-4 mr-3 border border-[#8c8c8c] border-[1.5px] rounded-full`}>

          </TouchableOpacity>

          <View style={tw`flex flex-col max-w-[82%]`}>
            <Text style={[tw`text-2xl sm:text-3xl`, { fontFamily: 'DarkerGrotesque_600SemiBold' }]}>
              My Tasks is complete dfuf fhf fh uif jfh dfio df 9ufd d fdi fj ijd fi fdoif  idfjidfj oif
            </Text>
            <View style={tw`rounded-2xl px-3 py-2 mt-1 border border-[1px] border-[#8c8c8c] mr-auto`}>
              <Text style={tw``}>
                {'Today'}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={tw``}>
          <FontAwesome5 name="star" color={false ? Colors.primary : Colors.secondary} size={24} />
        </TouchableOpacity>
      </TouchableOpacity>

    </View>
  )
}

export default MyTasks
