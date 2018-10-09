import React, {Component} from 'react';
import {
    FlatList,
    Text } from 'react-native';
import Requests from './solicitudComponent'
import Separator from './horizontal-separator'
class SuggestionList extends Component {
    keyExtractor = (item) => item.id.toString()
    /* renderEmpty = () =>{
        return(
        <Empty text="No hay sugerencias :("></Empty>
        )
    } */
    itemSeparator = ()=>{
        return(
            <Separator  ></Separator>
        )
    }
    renderItem = ({item})=>{
        return(
            <Requests {...item}></Requests>
        )
    }
    render(){
        const list = [
            {
                title: 'Avengers',
                year: '2012',
                rating: 5 + " Estrellas",
                key: '1',
            },
            {
                title: 'Pokemon',
                year: '2000',
                rating: 3 + " Estrellas",
                key: '2',
            },
            {
                title: 'Carlos El caga montes',
                year: '2015',
                rating: 2 + " Estrellas",
                key: '3',
            },
            {
                title: 'Carlos El caga montes 2',
                year: '2020',
                rating: 5 + " Estrellas",
                key: '4',
            }
            
        ]
        return (
            <Layout
            title= "Recomendado para ti" >
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.props.list}
                ListEmptyComponent={this.renderEmpty}
                ItemSeparatorComponent={this.itemSeparator}
                renderItem={this.renderItem}
            />
            </Layout>

        );
    }
}

export default SuggestionList;