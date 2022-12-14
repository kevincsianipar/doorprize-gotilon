import "antd/dist/antd.css";
import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Button, Card, Row, Col, Select } from 'antd';
import {
  CloseCircleTwoTone,
  CheckCircleTwoTone,
  LeftSquareTwoTone,
} from '@ant-design/icons';

const App = () => {
  const { Header, Content, Footer } = Layout;
  const { Option } = Select;
  const initialValue = (localStorage.getItem('takenNumber') && JSON.parse(localStorage.getItem('takenNumber'))) || [];
  const initialValueCategory = (localStorage.getItem('winnerByCategory') && JSON.parse(localStorage.getItem('winnerByCategory'))) || [];
  const initialValueConfirmedWinner = (localStorage.getItem('confirmedWinnerList') && JSON.parse(localStorage.getItem('confirmedWinnerList'))) || [];
  const initialCategory = 'hiburan1';
  const categoryOptions = [
    {
      text: "Hadiah Hiburan 1",
      value: "hiburan1",
      picks: 18
    },
    {
      text: "Hadiah Hiburan 2",
      value: "hiburan2",
      picks: 18
    },
    {
      text: "Hadiah Hiburan",
      value: "hiburan3",
      picks: 18
    },
    {
      text: "Hadiah Ketiga",
      value: "utama3",
      picks: 4,
      prize: "2 Unit Kipas Angin dan 2 Unit Rice Cooker"
    },
    {
      text: "Hadiah Kedua",
      value: "utama2",
      picks: 2,
      prize: "1 Unit Mesin Cuci dan 1 Unit Kulkas"
    },
    {
      text: "Hadiah Utama",
      value: "utama1",
      picks: 1,
      prize: "1 Unit Smart TV Samsung 50 Inch"
    }
  ];

  const [num, setNum] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedNumber, setSelectedNumber] = useState(initialValue);
  const [takenNumber, setTakenNumber] = useState(initialValue);
  const [winnerByCategory, setWinnerByCategory] = useState(initialValueCategory);
  const [enableReset, setEnableReset] = useState(false);
  const [blur, setBlur] = useState(false);
  const [confirmedWinnerList, setConfirmedWinnerList] = useState(initialValueConfirmedWinner);

  useEffect(() => {
    localStorage.setItem('takenNumber', JSON.stringify(takenNumber));
  }, [takenNumber]);

  useEffect(() => {
    localStorage.setItem('winnerByCategory', JSON.stringify(winnerByCategory));
  }, [winnerByCategory]);

  useEffect(() => {
    localStorage.setItem('confirmedWinnerList', JSON.stringify(confirmedWinnerList));
  }, [confirmedWinnerList]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
  }, []);

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
      let newObj = { ...winnerByCategory, [selectedCategory]: [...appendedList, rand] };
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
    if (selectedCategory.includes("utama")) {
      setBlur(true);
    }
  };

  function handleChangeCategory(value) {
    setNum(0);
    setEnableReset(false);
    setSelectedCategory(value);
    if (value.includes("utama")) {
      setBlur(true);
    } else {
      setBlur(false);
    }
  }

  const handleRemoveNumber = value => {
    let list = winnerByCategory[selectedCategory]
    list = list.filter(item => item !== value)
    let newObj = { ...winnerByCategory, [selectedCategory]: list };
    setWinnerByCategory(newObj)
  }

  const handleConfirmWinner = value => {
    setConfirmedWinnerList([...confirmedWinnerList, value])
  }

  const handleRemoveConfirmedWinner = value => {
    let list = confirmedWinnerList;
    list = list.filter(item => item !== value)
    setConfirmedWinnerList(list)
  }

  const handleKeyPress = event => {
    if (event.key.toUpperCase() === 'R') {
      document.getElementById("resetButton").click();
    }
    else if (event.key.toUpperCase() === 'ENTER') {
      document.getElementById("getNumber").click();
    }
    else if (event.key.toUpperCase() === ' ') {
      document.getElementById("openBlur").click();
    }
  };

  const handleOpenBlur = () => {
    setBlur(false);
  }

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, height: 100, width: '100%', backgroundColor: 'white' }}>
        <Row className="logo">
          <Col span="1">
            <img src={require('./logohkbp.png')} width={60} />
          </Col>
          <Col span="22">
            <h1 style={{ lineHeight: 1.2, textAlign: "center", marginTop: 12 }}>Pengambilan Nomor Kupon Doorprize<br>
            </br>Tahun Kesehatian dan Pesta Gotilon/HUT ke-43 HKBP Pondok Gede Resort Pondok Gede<br>
              </br>Minggu 13 November 2022
            </h1>
          </Col>
        </Row>
        <Col span="1">
        </Col>
      </Header>
      <Content className="site-layout" size='large' style={{ padding: '0px 50px', marginTop: 100 }}>
        <div className="site-layout-background" style={{ padding: '24px 0px', height: 'calc(100vh - 100px)' }}>
          <Row>
            <Col span={11}>
              <Row gutter={12}>
                <h1 style={{ fontSize: 26, lineHeight: 0.8 }}>Kategori :
                  <Select defaultValue="hiburan1" style={{ width: 250, marginLeft: 12, fontSize: 24 }} onChange={handleChangeCategory}>
                    {categoryOptions.map(cat => <Option value={cat.value} style={{ fontWeight: 600 }}>{cat.text}</Option>)}
                  </Select>
                </h1>
              </Row>
              <Row gutter={12}>
                <h1 style={{ fontSize: 26, lineHeight: 0.8 }}>Jumlah Pengambilan :
                  {categoryOptions.find(o => o.value === selectedCategory).picks}</h1>
              </Row>
              <Row type="flex" justify="center" align="top" style={{ marginTop: 32 }}>
                <h1 style={{ fontSize: 26, lineHeight: 0.8, padding: 4 }}>Nomor Kupon Terpilih:</h1>
              </Row>
              {num > 0 && (
                <div class="numbers">
                  <span class="numbers__window">
                    <span class="numbers__window__digit numbers__window__digit--0" data-fake="0000000000">0</span>
                  </span>
                  <span class="numbers__window">
                    <span class="numbers__window__digit numbers__window__digit--1" data-fake="0120120120">{renderCouponNumber(num).toString().charAt(1)}</span>
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
                  {blur && selectedCategory.includes('utama') && (
                    <div class="blur">
                      <Button
                        id="openBlur"
                        disabled={!enableReset}
                        className="openBlur"
                        size={"large"}
                        type="primary"
                        onClick={handleOpenBlur}
                      >Buka</Button>
                    </div>
                  )
                  }
                </div>
              )}
              {num == 0 && (
                <div class="numbers">
                  <span class="numbers__window">
                    <span class="numbers__window__digit" data-fake="0000000000">0</span>
                  </span>
                  <span class="numbers__window">
                    <span class="numbers__window__digit" data-fake="0120120120">0</span>
                  </span>
                  <span class="numbers__window">
                    <span class="numbers__window__digit" data-fake="3456789012">0</span>
                  </span>
                  <span class="numbers__window">
                    <span class="numbers__window__digit" data-fake="5678901234">0</span>
                  </span>
                  <span class="numbers__window">
                    <span class="numbers__window__digit" data-fake="6789012345">0</span>
                  </span>
                  <span class="numbers__window">
                    <span class="numbers__window__digit" data-fake="7890123456">0</span>
                  </span>
                </div>
              )}
              <Row gutter={16} type="flex" justify="center" align="top">
                <Col>
                  <Button
                    id="getNumber"
                    size={"large"}
                    type="primary"
                    onClick={handleClickGetNumber}
                    disabled={num > 0 ||
                      winnerByCategory[selectedCategory] &&
                      (winnerByCategory[selectedCategory].length >= categoryOptions.find(o => o.value === selectedCategory).picks)}>
                    Ambil Nomor (???)
                  </Button>
                </Col>
                <Col>
                  <Button
                    id="resetButton"
                    size={"large"}
                    onClick={handleClickReset}
                    type="danger"
                    disabled={!enableReset || blur}>
                    Reset (R)
                  </Button>
                </Col>
              </Row>

              <Row gutter={12}>
                <h1 style={{ paddingTop: 46, fontSize: 26, lineHeight: 0.8 }}>Sudah Diambil :
                  {winnerByCategory[selectedCategory] && winnerByCategory[selectedCategory].length}
                </h1>
              </Row>

              {selectedCategory.includes('utama') && (
                <Row gutter={12}>
                  <h1 style={{ paddingTop: 24, fontSize: 26, lineHeight: 0.8 }}>Hadiah : {" "}
                    {categoryOptions.find(o => o.value === selectedCategory).prize}
                  </h1>
                </Row>
              )}

            </Col>
            <Col span={13}>
              <Row type="flex" justify="center" align="top">
                <h1 style={{ fontSize: 26, lineHeight: 0.8 }}>Daftar Pemenang {categoryOptions.find(o => o.value === selectedCategory).text}:</h1>
              </Row>
              <Row type="flex" justify="center" align="top">
                {winnerByCategory[selectedCategory] && (winnerByCategory[selectedCategory]).map(value =>
                  <Col style={{ display: 'flex', paddingTop: 10, paddingRight: 18, flexDirection: 'row' }}>
                    <Card style={{ width: 184, height: 80, padding: 0 }} loading={selectedCategory.includes('utama') && blur && value === num} >
                      {!confirmedWinnerList.includes(value) &&
                        <div class="actionIcon" onClick={() => handleConfirmWinner(value)} style={{ position: "absolute", top: 0, left: 4 }}>
                          <CheckCircleTwoTone twoToneColor="#52c41a" />
                        </div>
                      }
                      {confirmedWinnerList.includes(value) &&
                        <div class="actionIcon" onClick={() => handleRemoveConfirmedWinner(value)} style={{ position: "absolute", top: 0, left: 4 }}>
                          <LeftSquareTwoTone twoToneColor="grey" />
                        </div>
                      }
                      {!confirmedWinnerList.includes(value) &&
                        <div class="actionIcon" onClick={() => handleRemoveNumber(value)} style={{ position: "absolute", top: 0, right: 4 }}>
                          <CloseCircleTwoTone twoToneColor="#eb2f96" />
                        </div>
                      }
                      <h1
                        padding={0}
                        style={
                          {
                            fontSize: 52,
                            fontWeight: 600,
                            marginLeft: -19,
                            marginTop: -20,
                            color: confirmedWinnerList.includes(value) ? '#008000' : 'black'
                          }
                        }>
                        {renderCouponNumber(value)}
                      </h1>
                    </Card>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
