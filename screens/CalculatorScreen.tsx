import { Button, Container, Content, Form, Input, Item, Label, Text } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

export default function CalculatorScreen() {

  const [shares, setShares] = React.useState('');
  const [buyPrice, setBuy] = React.useState('');
  const [sellPrice, setSell] = React.useState('');
  const [buyComm, setBuyComm] = React.useState('0.00');
  const [sellComm, setSellComm] = React.useState('0.00');
  var [profitLoss, setProfitLoss] = React.useState('');
  var [totalBuyPrice, setTotalBuyPrice] = React.useState('0');
  var [totalSellPrice, setTotalSellPrice] = React.useState('0');
  var [formComplete, setFormComplete] = React.useState(false);

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  const CalculateProfitLoss = () =>{

    if(!IsFormComplete())
      return;

    let s = parseFloat(shares);
    let sp = parseFloat(sellPrice);
    let bp = parseFloat(buyPrice);
    let bc = parseFloat(buyComm);
    let sc = parseFloat(sellComm);

    let profitloss = (s * sp) - (s * bp) - bc - sc;

    setProfitLoss(FormatAsCurrency(profitloss));
    setTotalBuyPrice(FormatAsCurrency(s * bp));
    setTotalSellPrice(FormatAsCurrency(s * sp));
  }

  const FormatAsCurrency = (price: number): string => {
    return formatter.format(price)
  }

   const IsFormComplete = (): boolean => {

    var filled = (!!shares && !!buyPrice && !!sellPrice);

    if(filled)
      setFormComplete(true);
    else
      setFormComplete(false);

    return filled;
  }

  return (
    <Container>
      <Content>

        <Container style={{width:'60%', alignItems:'center', alignSelf: 'center'}}>
          <Form>
            <Item style={styles.formItem} stackedLabel>
              <Label>Shares</Label>
              <Input
              value={shares}
              onChangeText={value => setShares(value)}
              keyboardType='numeric'
              placeholder='1000'
              />
            </Item>

            <Item style={styles.formItem}  stackedLabel>
              <Label>Buy price</Label>
              <Input
              value={buyPrice}
              onChangeText={value => setBuy(value)}
              keyboardType='numbers-and-punctuation'
              placeholder='0.0000'
              />
            </Item>

            <Item style={styles.formItem} stackedLabel>
              <Label>Sell price</Label>
              <Input
              value={sellPrice}
              onChangeText={value => setSell(value)}
              keyboardType='numbers-and-punctuation'
              placeholder='0.0000'
              />
            </Item>

            <Item style={styles.formItem} stackedLabel>
              <Label>Buy commission</Label>
              <Input
              value={buyComm}
              onChangeText={value => setBuyComm(value)}
              keyboardType='numbers-and-punctuation'
              placeholder='0.00'
              />
            </Item>

            <Item style={styles.formItem} stackedLabel>
              <Label>Sell commission</Label>
              <Input
              value={sellComm}
              onChangeText={value => setSellComm(value)}
              keyboardType='numbers-and-punctuation'
              placeholder='0.00'
              />
            </Item>
          </Form>

          <Button style={styles.button}
            onPress={CalculateProfitLoss}
          >
            <Text style={styles.buttonText}>Calculate</Text>
          </Button>
        </Container>
        
        {formComplete &&
        <Container style={{width: '75%', alignSelf:'center', alignContent: 'center', marginTop: 20}}>

          <Container style={styles.totalContainer}>
              <Text style={styles.textLabel}>Purchase price</Text>
              <Text style={styles.textPrice}>{totalBuyPrice}</Text>
          </Container>

          <Container style={styles.totalContainer}>
              <Text style={styles.textLabel}>Sell price</Text>
              <Text style={styles.textPrice}>{totalSellPrice}</Text>
          </Container>

          <Container style={styles.totalContainer}>
              <Text style={styles.textLabel}>Profit/Loss</Text>
              <Text style={styles.textPrice}>{profitLoss}</Text>
          </Container>
        
        </Container>
        }  
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  formItem: {
    marginTop: 20
  },
  button:{
    alignSelf: 'center',
    marginTop: 15
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

