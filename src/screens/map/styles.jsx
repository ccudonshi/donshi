import { StyleSheet } from 'react-native'
import {white,gray} from '../../helper/color'
export const markerStyles = StyleSheet.create({
  calloutStyle :{ flex: 1, position: 'relative' },
  calloutviewStyle : { flex: 1, padding: 0 },
  imageStyle : { height: 20, width: 20 }
});
export const mapStyles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex:-1,

  },
})
export const screen =  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(52, 52, 52, 0.5)',
      flexDirection:'row',
    },
    floatButton:{
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        color:white,
        position: 'relative',
        zIndex: 2,
    },
    navBar:{
      zIndex:1,
    },
  });