import { Button, Container, Content, Form, Input, Item, Label, Text } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { getData } from '../hooks/PersistentStorage';

export default class CalculatorScreen extends React.Component{
  constructor(props: any){
    super(props)
  }

  state ={
    shares: '',
    buyPrice: '',
    sellPrice: '',
    buyComm: '',
    sellComm: '',
    profitLoss: '',
    totalBuyPrice: '0',
    totalSellPrice: '0',
    formComplete: false
  }

  componentDidMount(){
    getData("buyingCommission").then((res) => {
        this.setState({buyComm: res.data ? res.data : '0.00'})
    })
    
    getData("sellingCommission").then((res)=>{
        this.setState({sellComm: res.data ? res.data : '0.00'})
    })
}

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  CalculateProfitLoss = () =>{

    if(!this.IsFormComplete())
      return;

    let s = parseFloat(this.state.shares);
    let sp = parseFloat(this.state.sellPrice);
    let bp = parseFloat(this.state.buyPrice);
    let bc = parseFloat(this.state.buyComm);
    let sc = parseFloat(this.state.sellComm);

    let profitloss = (s * sp) - (s * bp) - bc - sc;

    this.setState({profitLoss: this.FormatAsCurrency(profitloss)})
    this.setState({totalBuyPrice: this.FormatAsCurrency(s * bp - bc)})
    this.setState({totalSellPrice: this.FormatAsCurrency(s * sp - sc)}) 
  }

  FormatAsCurrency = (price: number): string => {
    return this.formatter.format(price)
  }

  IsFormComplete = (): boolean => {

    var filled = (!!this.state.shares && !!this.state.buyPrice && !!this.state.sellPrice);

    if(filled)
      this.setState({formComplete: true})
    else
      this.setState({formComplete: true})

    return filled;
  }

  render(){
  return (
    <Container>
      <Content>

        <Container style={{width:'60%', alignItems:'center', alignSelf: 'center'}}>
          <Form>
            <Item style={styles.formItem} stackedLabel>
              <Label>Shares</Label>
              <Input
              value={this.state.shares}
              onChangeText={shares => this.setState({shares})}
              keyboardType='numeric'
              placeholder='1000'
              />
            </Item>

            <Item style={styles.formItem}  stackedLabel>
              <Label>Buy price</Label>
              <Input
              value={this.state.buyPrice}
              onChangeText={buyPrice => this.setState({buyPrice})}
              keyboardType='numbers-and-punctuation'
              placeholder='0.0000'
              />
            </Item>

            <Item style={styles.formItem} stackedLabel>
              <Label>Sell price</Label>
              <Input
              value={this.state.sellPrice}
              onChangeText={sellPrice => this.setState({sellPrice})}
              keyboardType='numbers-and-punctuation'
              placeholder='0.0000'
              />
            </Item>

            <Item style={styles.formItem} stackedLabel>
              <Label>Buy commission</Label>
              <Input
              value={this.state.buyComm}
              onChangeText={buyComm => this.setState({buyComm})}
              keyboardType='numbers-and-punctuation'
              placeholder='0.00'
              />
            </Item>

            <Item style={styles.formItem} stackedLabel>
              <Label>Sell commission</Label>
              <Input
              value={this.state.sellComm}
              onChangeText={sellComm => this.setState({sellComm})}
              keyboardType='numbers-and-punctuation'
              placeholder='0.00'
              />
            </Item>
          </Form>

          <Button style={styles.button}
            onPress={this.CalculateProfitLoss}
          >
            <Text style={styles.buttonText}>Calculate</Text>
          </Button>
        </Container>
        
        {this.state.formComplete &&
        <Container style={{width: '75%', alignSelf:'center', alignContent: 'center', marginTop: 20}}>

          <Container style={styles.totalContainer}>
              <Text style={styles.textLabel}>Purchase price</Text>
              <Text style={styles.textPrice}>{this.state.totalBuyPrice}</Text>
          </Container>

          <Container style={styles.totalContainer}>
              <Text style={styles.textLabel}>Sell price</Text>
              <Text style={styles.textPrice}>{this.state.totalSellPrice}</Text>
          </Container>

          <Container style={styles.totalContainer}>
              <Text style={styles.textLabel}>Profit/Loss</Text>
              <Text style={styles.textPrice}>{this.state.profitLoss}</Text>
          </Container>
        
        </Container>
        }  
      </Content>
    </Container>
  );
}
}

const styles = StyleSheet.create({
  formItem: {
    marginTop: 20
  },
  button:{
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor:'tomato'
  },
  buttonText: {
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  totalContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  textLabel:{
    fontSize: 20,
    fontFamily: 'System'
  },
  textPrice:{
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'System'
  }
});

