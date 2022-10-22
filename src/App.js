import "antd/dist/antd.css";
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Row, Col, Select } from 'antd';

const App = () => {
  const { Header, Content, Footer } = Layout;
  const { Option } = Select;
  const initialValue =  (localStorage.getItem('takenNumber') && JSON.parse(localStorage.getItem('takenNumber'))) || [];
  const initialValueCategory =  (localStorage.getItem('winnerByCategory') && JSON.parse(localStorage.getItem('winnerByCategory'))) || [];
  const initialCategory = 'hiburan1'

  const [num, setNum] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedNumber, setSelectedNumber] = useState(initialValue);
  const [takenNumber, setTakenNumber] = useState(initialValue);
  const [winnerByCategory, setWinnerByCategory] = useState(initialValueCategory);

  useEffect(() => {
    localStorage.setItem('takenNumber', JSON.stringify(takenNumber));
  }, [takenNumber]);

  useEffect(() => {
    localStorage.setItem('winnerByCategory', JSON.stringify(winnerByCategory));
  }, [winnerByCategory]);

  function getRandomWithManyExclusions(min, max, arrayOfIndexesToExclude) {
    var rand = null;

    if (selectedNumber.length < max) {
      while (rand === null || arrayOfIndexesToExclude.includes(rand)) {
        rand = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      setSelectedNumber([rand, ...selectedNumber])
      setTakenNumber([rand, ...takenNumber])
      let appendedList = [];
      if (winnerByCategory[selectedCategory]){
        appendedList= winnerByCategory[selectedCategory]
      }
      let newObj = { ...winnerByCategory, [selectedCategory]: [rand, ...appendedList]};
      setWinnerByCategory(newObj)
    }
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
    setNum(0);
    setSelectedCategory(value);
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
          <Row>
            <Col span={6}>
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
            </Col>
            <Col span={8}>
              <h1>Jumlah Pengambilan : </h1>
            </Col>
          </Row>
          
          <h1 style={{fontSize: 36}}>Kupon Terpilih: {renderCouponNumber(num)}</h1>
          <button onClick={handleClick}>Ambil Nomor</button>
          <Row>
            {winnerByCategory[selectedCategory] && winnerByCategory[selectedCategory].map(value =>
              <Col style={{display: 'flex', paddingBottom: 6, paddingTop: 6, paddingRight: 6, flexDirection: 'row'}}>
                <Card style={{ width: 120, height: 80, padding: 0 }}>
                  <h1 padding={0}>{renderCouponNumber(value)}</h1>
                </Card>
              </Col>
            )}
          </Row>
          
        </div>
      </Content>
    </Layout>
  );
};

export default App;