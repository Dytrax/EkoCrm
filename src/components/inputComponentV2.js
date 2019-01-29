import React, {Component} from 'react'
import {
    View
} from "react-native"
import { Input } from 'react-native-elements';

export default class InputComponentV2 extends Component{
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


    validatePassword = (password) => {
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])([A-Za-z\d$@$!%*?&.]|[^ ]){8,15}$/
        return re.test(password)
    }

    render(){
    return(
        
        (this.props.passwordValidate ? 
            <Input
                    secureTextEntry={this.props.secureText}
                    inputStyle={{height:undefined}}
                    shake={false}
                    multiline = {false} 
                    //containerStyle={{width:this.props.width}}
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
                        if(this.props.validate){
                            if(this.props.pastPassword===text){
                                this.setState({
                                    error:false
                                })
                            }else{
                                this.setState({
                                error:true,
                            
                            })
                            }
                        }else{
                            if(!this.validatePassword(text)){
                            this.setState({
                            error:true,
                            
                            })
                            }else{
                                this.setState({
                                    error:false
                                })
                            }
                        }
                        

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
                        
                        
                            }}
                    value={this.props.value}
                    keyboardType={this.props.type}
                    
                />
                :
                <Input
                    secureTextEntry={this.props.secureText}
                    inputStyle={{height:undefined}}
                    shake={false}
                    multiline = {false} 
                    //containerStyle={{width:this.props.width}}
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
                    value={this.props.value}
                    keyboardType={this.props.type}
                    
                />
        
        )
                

        
    )
}
}