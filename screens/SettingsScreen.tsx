import { Container, Input, Item, Text } from "native-base";
import React from "react";
import { StyleSheet, Switch } from 'react-native';
import { getData, storeData } from "../hooks/PersistentStorage";


export default class SettingsScreen extends React.Component{
    constructor(props: any){
        super(props);
    }

    state={
        buyingCommission: '0.00',
        sellingCommission: '0.00',
        darkMode: false
    }

    componentDidMount(){
        getData("buyingCommission").then((res) => {
            this.setState({buyCommission: res.data ? res.data : '0.00'})
        })
        
        getData("sellingCommission").then((res)=>{
            this.setState({sellingCommission: res.data ? res.data : '0.00'})
        })
    
        getData("darkMode").then((res)=>{
            this.setState({darkMode: res.data == "true" ? true : false})
        })
    }
    
    saveData = (input: string) =>{
        switch(input){
            case "buyingCommission":
                storeData(input, this.state.buyingCommission)
                break;
            
        }
    }

    render(){
        return(
            <Container>

                <Container style={styles.optionContainer}>
                    <Text style={styles.optionText}>Default buying commission</Text>
                    <Item>
                        <Input
                            style={styles.optionInput}
                            value={this.state.buyingCommission}
                            onChangeText={buyingCommission => this.setState({buyingCommission})}
                            onBlur={() => this.saveData("buyingCommission")}
                            keyboardType='numbers-and-punctuation'
                        />
                    </Item>
                </Container>

                <Container style={styles.optionContainer}>
                    <Text style={styles.optionText}>Default selling commission</Text>
                    <Item>
                        <Input
                            style={styles.optionInput}
                            value={this.state.sellingCommission}
                            onChangeText={sellingCommission => this.setState({sellingCommission})}
                            keyboardType='numbers-and-punctuation'
                            onBlur={() => this.saveData("sellingCommission")}
                        />
                    </Item>
                </Container>

                <Container style={styles.optionContainer}>
                    <Text style={styles.optionText}>Dark mode</Text>
                    <Switch
                    value={this.state.darkMode}
                    onValueChange={darkMode => this.setState({darkMode})}
                    trackColor={{true: 'tomato', false:'#767577'}}
                    thumbColor={'white'}
                    />
                </Container>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    optionContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '60%',
        alignItems:'center',
        alignSelf: 'center'
    },
    optionText:{
        alignSelf:'center',
    },
    optionInput:{
        alignSelf:'center',
        width:'50%'
    }
});
