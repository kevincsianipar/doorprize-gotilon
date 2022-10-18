import "antd/dist/antd.css";
import React, { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";
import { Layout, Menu, Card, Row, Col, Select } from 'antd';

const App = () => {
  let jsonData = require('./data.json');

  const { Header, Content, Footer } = Layout;
  const { Option } = Select;
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

  function handleChange(value) {
    console.log(`selected ${value}`);
  }



  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, height: 100, width: '100%', backgroundColor: 'white' }}>
        <Row className="logo">
          <Col span="3">
            <img src={require('./logohkbp.png')} width={60} />
          </Col>
          <Col span="18">
            <h1 style={{ lineHeight: 1.2, textAlign: "center", marginTop: 12 }}>Pengambilan Nomor Kupon Doorprize <br>
            </br>Pesta Gotilon Tahun Kesehatian dan HUT HKBP Pondok Gede ke-43<br>
              </br>Minggu 12 November 2022
            </h1>
          </Col>
        </Row>
        <Col span="3">
        </Col>
      </Header>
      <Content className="site-layout" size='large' style={{ padding: '0 50px', marginTop: 100 }}>
        <div className="site-layout-background" style={{ padding: 24, height: 'calc(100vh - 100px)' }}>
          <h1>Kategori :
            <Select defaultValue="hiburan1" style={{ width: 180, marginLeft: 12 }} onChange={handleChange}>
              <Option value="hiburan1">Hadiah Hiburan 1</Option>
              <Option value="hiburan2">Hadiah Hiburan 2</Option>
              <Option value="hiburan3">Hadiah Hiburan 3</Option>
              <Option value="hiburan4">Hadiah Hiburan 4</Option>
              <Option value="hiburan5">Hadiah Hiburan 5</Option>
              <Option value="hiburan6">Hadiah Hiburan 6</Option>
              <Option value="utama3">Hadiah Utama 3</Option>
              <Option value="utama2">Hadiah Utama 2</Option>
              <Option value="utama1">Hadiah Utama 1</Option>
            </Select>
          </h1>
          <h2>number is: {num}</h2>
          <button onClick={handleClick}>Ambil Nomor</button>
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