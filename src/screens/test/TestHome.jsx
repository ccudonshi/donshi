import React, { Component } from 'react'
import { Text, View, Button} from 'react-native'
import AppHelper from '../../helper/AppDBHelper'
export default class TestHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            abcd:'123',
            posts:[]
        }
        // this.onMyPress = this.onMyPress.bind(this);

    }
    async fewfwf(){
        const manager = await AppHelper();
        manager.getLimitPosts(1,"false",6,5)
                 .then(posts=>this.setState({posts}))
    }
    async componentDidMount() {
       const manager = await AppHelper();
       
       //   1.
       manager.getLimitPosts(1,"false",1,5)
                .then(posts=>this.setState({posts}))


        // 2. 
        // manager.getTypes()
        //         .then(function(data){
        //             console.log(data)
        //         }) 

    
    }
    render() {
      
        return (
            <View>
                <View>
                   <Button
                        title={this.state.abcd}
                        onPress={()=>this.fewfwf()}/>
                    {
                        this.state.posts.map(post=>
                            <Text>postId:{post.getId()}</Text>
                        )
                    }
                </View>
                <View>
                    <Text>dwddwd</Text>
                </View>
               
            </View>
        )
    }
}


   // async checkLogin(){
    //     const jwt = await Storage.get('jwt')
    //     return jwt
    //     // Storage.save('jwt','123dwswqdewf').then(()=>Actions.test());

    // }