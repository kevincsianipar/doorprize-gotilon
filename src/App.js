import "antd/dist/antd.css";
import './App.css';
import React, { useState, useEffect } from 'react';
import { Layout, Button, Card, Row, Col, Select } from 'antd';
import {
  CloseCircleTwoTone,
} from '@ant-design/icons';
import { Space } from 'antd';

const App = () => {
  const { Header, Content, Footer } = Layout;
  const { Option } = Select;
  const initialValue = (localStorage.getItem('takenNumber') && JSON.parse(localStorage.getItem('takenNumber'))) || [];
  const initialValueCategory = (localStorage.getItem('winnerByCategory') && JSON.parse(localStorage.getItem('winnerByCategory'))) || [];
  const initialCategory = 'hiburan1';
  const categoryOptions = [
    {
      text: "Hadiah Hiburan 1",
      value: "hiburan1",
      picks: 6
    },
    {
      text: "Hadiah Hiburan 2",
      value: "hiburan2",
      picks: 6
    },
    {
      text: "Hadiah Hiburan 3",
      value: "hiburan3",
      picks: 6
    },
    {
      text: "Hadiah Utama 3",
      value: "utama3",
      picks: 3
    },
    {
      text: "Hadiah Utama 2",
      value: "utama2",
      picks: 1
    },
    {
      text: "Hadiah Utama 1",
      value: "utama1",
      picks: 1
    }
  ];

  const [num, setNum] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedNumber, setSelectedNumber] = useState(initialValue);
  const [takenNumber, setTakenNumber] = useState(initialValue);
  const [winnerByCategory, setWinnerByCategory] = useState(initialValueCategory);
  const [enableReset, setEnableReset] = useState(false);

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
      if (winnerByCategory[selectedCategory]) {
        appendedList = winnerByCategory[selectedCategory]
      }
      let newObj = { ...winnerByCategory, [selectedCategory]: [rand, ...appendedList] };
      setTimeout(function () {
        setWinnerByCategory(newObj)
      }.bind(this), 6500);
    }
    return rand;
  }

  function renderCouponNumber(value) {
    const additionalZeros = '0'.repeat(6 - String(value).length)
    return additionalZeros + String(value)
  }

  const handleClickGetNumber = () => {
    setNum(getRandomWithManyExclusions(1, 20000, selectedNumber));
    setTimeout(function () {
      setEnableReset(true);
    }.bind(this), 6500);
  };


  const handleClickReset = () => {
    setNum(0);
    setEnableReset(false);
  };

  function handleChange(value) {
    setNum(0);
    setSelectedCategory(value);
  }

  const handleRemoveNumber = value => {
    let list = winnerByCategory[selectedCategory]
    list = list.filter(item => item !== value)
    console.log(value, list)
    let newObj = { ...winnerByCategory, [selectedCategory]: list };
    setWinnerByCategory(newObj)
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
            <h1>Kategori :
              <Select defaultValue="hiburan1" style={{ width: 250, marginLeft: 12, fontSize: 24 }} onChange={handleChange}>
                {categoryOptions.map(cat => <Option value={cat.value}>{cat.text}</Option>)}
              </Select>
            </h1>
          </Row>
          <Row>
            <h1>Jumlah Pengambilan : {categoryOptions.find(o => o.value === selectedCategory).picks}</h1>
          </Row>
          <Row type="flex" justify="center" align="top">
            <h1 style={{ fontSize: 36 }}>Kupon Terpilih:</h1>
          </Row>
          {num > 0 && (
            <div class="numbers">
              <span class="numbers__window">
                <span class="numbers__window__digit numbers__window__digit--0" data-fake="1234567890">0</span>
              </span>
              <span class="numbers__window">
                <span class="numbers__window__digit numbers__window__digit--1" data-fake="2345678901">{renderCouponNumber(num).toString().charAt(1)}</span>
              </span>
              <span class="numbers__window">
                <span class="numbers__window__digit numbers__window__digit--2" data-fake="3456789012">{renderCouponNumber(num).toString().charAt(2)}</span>
              </span>
              <span class="numbers__window">
                <span class="numbers__window__digit numbers__window__digit--3" data-fake="5678901234">{renderCouponNumber(num).toString().charAt(3)}</span>
              </span>
              <span class="numbers__window">
                <span class="numbers__window__digit numbers__window__digit--4" data-fake="6789012345">{renderCouponNumber(num).toString().charAt(4)}</span>
              </span>
              <span class="numbers__window">
                <span class="numbers__window__digit numbers__window__digit--5" data-fake="7890123456">{renderCouponNumber(num).toString().charAt(5)}</span>
              </span>
            </div>
          )}
          {num == 0 && (
            <div class="numbers">
              <span class="numbers__window">
                <span>0</span>
              </span>
              <span class="numbers__window">
                <span>0</span>
              </span>
              <span class="numbers__window">
                <span>0</span>
              </span>
              <span class="numbers__window">
                <span>0</span>
              </span>
              <span class="numbers__window">
                <span>0</span>
              </span>
              <span class="numbers__window">
                <span>0</span>
              </span>
            </div>
          )}
          <Row gutter={16} type="flex" justify="center" align="top">
            <Col>
              <Button
                onClick={handleClickGetNumber}
                disabled={num > 0 ||
                  winnerByCategory[selectedCategory] && 
                  (winnerByCategory[selectedCategory].length  >= categoryOptions.find(o => o.value === selectedCategory).picks)}>
                Ambil Nomor
              </Button>
            </Col>
            <Col>
              <Button onClick={handleClickReset} type="danger" disabled={!enableReset}>Reset</Button>
            </Col>
          </Row>

          <Row>
            {winnerByCategory[selectedCategory] && (winnerByCategory[selectedCategory]).map(value =>
              <Col style={{ display: 'flex', paddingTop: 24, paddingRight: 12, flexDirection: 'row' }}>
                <Card style={{ width: 160, height: 100, padding: 0 }}>
                  <div class="iconRemove" onClick={() => handleRemoveNumber(value)} style={{ position: "absolute", top: 0, right: 4 }}>
                    <CloseCircleTwoTone twoToneColor="#eb2f96" />
                  </div>
                  <h1 padding={0} style={{ fontSize: 32 }}>{renderCouponNumber(value)}</h1>
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