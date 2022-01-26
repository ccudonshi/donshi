// import React, { Component } from 'react';
// import { TextInput } from 'react-native';

// export default function UselessTextInput() {
//   const [value, onChangeText] = React.useState('Useless Placeholder');

//   return (
//     <TextInput
//       style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//       onChangeText={text => onChangeText(text)}
//       value={value}
//     />
//   );
// }
import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView, TouchableOpacity,TextInput } from 'react-native-gesture-handler';

function UselessTextInput(props) {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}

export default function UselessTextInputMultiline() {
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');

  // If you type something in the text box that is a color, the background will change to that
  // color.
  return (
    <View
      style={{
        backgroundColor: value,
        borderBottomColor: '#545454',
        borderBottomWidth: 1,
      }}>
      <UselessTextInput
        multiline
        numberOfLines={3}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
    </View>
  );
}