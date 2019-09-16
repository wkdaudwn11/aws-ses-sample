import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Wrap = styled.div`
  display: flex;
  width: 1000px;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  margin: 200px auto;
  flex-direction: column;

  .title {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 100px;
    font-size: 2rem;
    font-weight: bold;
  }

  .contents {
    flex: 1;
    display: table;
    padding: 1rem;
  }

  .contents span {
    display: table-cell;
    vertical-align: middle;
  }

  .contents input[type='email'] {
    flex: 1;
    width: 200px;
    height: 25px;
    margin-right: 10px;
  }

  .contents button {
    flex: 1;
    width: 100px;
    height: 30px;
    cursor: pointer;
  }
`;

export default class App extends Component {
  state = {
    email: '',
    email2: ''
  };

  inputEmail = null;

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const sendData = [
      { email: this.state.email },
      { email: this.state.email2 }
    ];

    axios
      .post('/mail', sendData)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  };

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };

  componentDidMount() {
    this.inputEmail.focus();
  }

  render() {
    return (
      <Wrap>
        <div className='title'>Welcome to AWS SES sample.</div>
        <div className='contents'>
          <form onSubmit={this.onSubmit}>
            <div>
              <input
                type='email'
                name='email'
                placeholder='보내실 이메일을 입력해주세요.'
                value={this.state.email}
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                ref={ref => {
                  this.inputEmail = ref;
                }}
                style={{ width: '200px' }}
              />
            </div>
            <div>
              <input
                type='email'
                name='email2'
                placeholder='보내실 이메일을 입력해주세요.'
                value={this.state.email2}
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                ref={ref => {
                  this.inputEmail = ref;
                }}
                style={{ width: '200px' }}
              />
            </div>
            <div>
              <button type='submit' style={{ width: '205px' }}>
                이메일 보내기
              </button>
            </div>
          </form>
        </div>
      </Wrap>
    );
  }
}
