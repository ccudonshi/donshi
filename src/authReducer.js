import React from 'react'
// 派發登入狀態改變的動作
export default function authReducer(state, action) {
    switch(action.type) {
      case 'login':
        return { userId : action.payload.userId }
      case 'logout':
      case 'init':
        return { userId : ''}  
      default:
        return state
    }
  }