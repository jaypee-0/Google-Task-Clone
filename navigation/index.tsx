import Main from './Main'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return <Main colorScheme={colorScheme} />
}
