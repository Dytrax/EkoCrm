import React, {Component} from 'react'
import {
    View
} from "react-native"
import { Input } from 'react-native-elements';

export default class InputPrueba extends Component{
    constructor(){
        super();
        
        
        this.state = {
            texto:"",
            error:false,
            iconColor:"rgb(184,184,184)"
        }
    }
    componentDidMount(){
        
        this.setState({
            texto:this.props.value
        })
        this.props.stateChange(this.props.state,this.props.value)
    }
    render(){
    return(
        
                <Input
                    //shake={true}
                    multiline = {true} 
                    containerStyle={{width:this.props.width}}
                    placeholder={this.props.texto}
                    errorMessage={this.state.error===true?this.props.mensajeError:null}
                    leftIcon=
                    {{ 
                    type: this.props.iconType, 
                    name: this.props.iconName, 
                    size: this.props.iconSize,
                    color: this.state.iconColor
                    }}
                    onChangeText={(text)=> {

                        this.setState({texto:text})
                        
                        this.props.stateChange(this.props.state,text)

                        if (text.length>0){
                            this.setState({
                            iconColor:"green"
                        })
                        }else{
                            this.setState({
                            iconColor:"rgb(184,184,184)"
                        })
                        }
                        
                        
                        
                        //console.log(text)
                        
                        if(text.length<1){
                        this.setState({
                            error:true,
                            
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

        
    )
}
}