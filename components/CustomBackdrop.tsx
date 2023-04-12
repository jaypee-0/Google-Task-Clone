import { Entypo } from '@expo/vector-icons'
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import tw from 'twrnc'

const CustomBackdrop = ({ animatedIndex, style, close }: any) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP)
  }))

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: '#8c8c8c70'
      },
      containerAnimatedStyle
    ],
    [style, containerAnimatedStyle]
  )

  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity onPress={close} style={tw`absolute h-full w-full p-4`}>
        <View></View>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default CustomBackdrop
