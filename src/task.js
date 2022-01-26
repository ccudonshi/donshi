import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
// 通知的基本建置 真正判斷邏輯不在這
const TASK_NAME = "BACKGROUND_TASK"

TaskManager.defineTask(TASK_NAME, () => {
  console.log('BACKGROUND_TASK BACKGROUND_TASK BACKGROUND_TASK BACKGROUND_TASK BACKGROUND_TASK BACKGROUND_TASK')
  try {
    // fetch data here...
    const receivedNewData = "Simulated fetch " + Math.random()
    console.log("My task ", receivedNewData)
    return receivedNewData
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData
  } catch (err) {
    return BackgroundFetch.Result.Failed
  }
})

export async function getBackgroundStatusAsync(){
  try {
    console.log('getbaclgroundstatus')
    const status = await BackgroundFetch.getStatusAsync()
    switch (status) {
      case BackgroundFetch.Status.Restricted:
        console.log('restricted')
        break;
      case BackgroundFetch.Status.Denied:
        console.log('deny')
        break;
      case BackgroundFetch.Status.Available :
        console.log('alaiable')
        break;
      default:
        console.log('default')
        break;
    }
    console.log('getbaclgroundstatus funish')
    console.log(status)
  } catch (error) {
    
  }
}



export async function registerBackgroundTask(){
    try {
      await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 1, // seconds,
      })
      console.log("Task registered")
    } catch (err) {
      console.log("Task Register failed:", err)
    }
  }
