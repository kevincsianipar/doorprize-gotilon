import "antd/dist/antd.css";
import React, { useState } from 'react';
import { Layout, Menu, Card } from 'antd';

const App = () => {
  let jsonData = require('./data.json');

  const { Header, Content, Footer } = Layout;
  const initialValue = jsonData.selectedNumber;

  const [num, setNum] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(initialValue);

  function getRandomWithManyExclusions(min, max, arrayOfIndexesToExclude) {
    var rand = null;

    if (selectedNumber.length < max) {
      while (rand === null || arrayOfIndexesToExclude.includes(rand)) {
        rand = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      setSelectedNumber([rand, ...selectedNumber])
      jsonData.selectedNumber.push(rand);
    }
    
    const newData = JSON.stringify(jsonData)
    console.log(newData);

    const fs = require("browserify-fs")
    fs.writeFile("./data.json", newData, err => {
      if (err) {
        console.log("Error writing file", err)
      } else {
        console.log('JSON data is written to the file successfully')
      }
    })
    return rand;
  }

  function renderCouponNumber(value) {
    const additionalZeros = '0'.repeat(6 - String(value).length)
    return additionalZeros + String(value)
  }

  const handleClick = () => {
    setNum(getRandomWithManyExclusions(1, 20000, selectedNumber));
  };



  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo">
          Header
        </div>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <h2>number is: {num}</h2>
          <button onClick={handleClick}>Generate random number</button>
          {selectedNumber.map(value =>
            <Card style={{ width: 'auto', height: 'auto', padding: 12 }}>
              <h2>{renderCouponNumber(value)}</h2>
            </Card>)}
        </div>
      </Content>
    </Layout>
  );
};

export default App;