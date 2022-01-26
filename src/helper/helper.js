import MyToken from '../model/MyToken'
import { Linking } from 'react-native'

const typeIdToImgSrc = (typeId) => {
  switch (typeId) {
    case 1:
      return require('app/assets/first_menu_food.png')
    case 2:
      return require('app/assets/first_menu_cloth.png')
    case 3:
      return require('app/assets/first_menu_home.png')
    case 4:
      return require('app/assets/first_menu_transportation.png')
    case 5:
      return require('app/assets/first_menu_education.png')
    case 6:
      return require('app/assets/first_menu_entertainment.png')
    case 7:
      return require('app/assets/first_menu_health.png')
    default:
      return require('app/assets/first_menu_health.png')  // 之後改other
  }
}

const formatDate = (date) => { // YYYY-MM-DD
  year = date.getFullYear();
  month = date.getMonth() + 1;
  dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }

  return `${year}-${month}-${dt}`;
}

const getCurrentUserASync = async () => {
  const decoded = await MyToken.getDecoded();
  return decoded.payload;
}

const goToGoogleMap = (latlng) => {
  const { latitude, longitude } = latlng;
  var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${latitude},${longitude}`;
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + url);
    } else {
      return Linking.openURL(url);
    }
  }).catch(err => console.warn('An error occurred', err));
}

const diffDate = (date1) => {
  const date2 = new Date();
  const diffTime = Math.abs(date1.getTime() - date2.getTime());

  // 越近的時間越長被算到
  const diffMins = Math.floor(diffTime / (1000 * 60));
  if (diffMins < 1)
    return `剛剛`;
  if (diffMins < 60)
    return `${diffMins}分鐘前`;

  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  if (diffHours < 24)
    return `${diffHours}小時前`;

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 30)
    return `${diffDays}天前`;

  const diffMoth = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
  if (diffMoth < 12)
    return `${diffMoth}個月前`;

  const diffYear = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30 * 12));
  return `${diffYear}年前`;


}

const unicodeToChar = (text) => 
  text.replace(/\\u[\dA-F]{4}/gi, (match) =>
    String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16)));

export {
  typeIdToImgSrc,
  formatDate,
  getCurrentUserASync,
  goToGoogleMap,
  diffDate,
  unicodeToChar
}