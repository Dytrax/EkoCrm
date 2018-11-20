import React, {Component} from 'react'
import {
    View
} from "react-native"
import { Input } from 'react-native-elements';

export default class InputComponent extends Component{
    constructor(){
        super();
        
        
        this.state = {
            texto:"",
            error:false
        }
    }
    componentDidMount(){
        console.log(this.props.value)
        this.setState({
            texto:this.props.value
        })
        this.props.stateChange(this.props.state,this.props.value)
    }
    render(){
    return(
        <View style={{justifyContent:"center",alignItems:"center",marginTop:20}}>
                <Input
                    //shake={true}
                    placeholder={this.props.texto}
                    errorMessage={this.state.error===true?this.props.mensajeError:null}
                    onChangeText={(text)=> {
                        
                        
                        this.setState({texto:text})
                        //console.log(text)
                        this.props.stateChange(this.props.state,text)
                        if(this.state.texto.length<=1){
                        this.setState({
                            error:true
                        })
                        }else{
                            this.setState({
                                error:false
                            })
                        }
                            }}
                    value={this.state.texto}
                    keyboardType={this.props.type}
                    
                />

        </View>  
    )
}
}