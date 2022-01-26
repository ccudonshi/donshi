import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'
import AppHelper from '../method'
export class DemoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /* 看你這個頁面需要哪些資訊 */
            // eg. posts
            posts:[]

        }  

        // 這句大概的用意在於 讓getPost 可以用 this.getPost 取得
        this.getPost = this.getPost.bind(this);
    }
    async getPost(){
        // 有用到await的話，function 就要是async，所以getPost前面有個async
        // await 的用意 就是要等那個function 做好才會繼續往下跑
        // .then() 就是那個function 做完之後，接著要做的事
        // 去看一下 Promise , await/async
        // 如果不習慣箭頭的寫法就自己改成 function(...){...} 
        
        // 這句是起手式一定要用
        const manager = await AppHelper();
        // 我把基本功能都包好放在 helper/AppDBHelper.js 裡，可以去那裡看有什麼功能，以及要什麼參數
        // e.g. getPost 需要 typeId , isNeed
        let typeId = 1;
        let isNeed = "true";
        await manager.getPosts()
                // .then(data=>console.log(data)) 如果第一次用不知道會回傳什麼，就先用這個，可以從terminal看到
                .then(posts => this.setState({posts:posts}))
                // 去看一下React 的 state,props
        
        let searchQuery = '';
        await manager.queryPost(searchQuery)
                    .then(post=>console.log(post))
    }

    // 看一下React 的生命週期，不過應該只會用到這個
    async componentDidMount() {
        await this.getPost();
    }

    render() {
        return (
            <View>
                {
                    this.state.posts.map(post=>{
                    return (<View> 
                            <Text>postId : {post.getId()}</Text>
                            <Text>title : {post.getTitle()}</Text>
                            </View>)
                    })
                }
                <Text> textInComponent </Text>
            </View>
        )
    }
}
