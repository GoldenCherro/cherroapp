/* eslint-disable no-unused-vars */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import { Login } from './login';
import { LoginController } from '../../networking/controllers/login-controller';
import { Router } from '../../routes';
import { routeConfig } from '../../route-components';

jest.mock('../../networking/controllers/login-controller');

const faker = require('faker');

describe('Login', () => {
  const setupTest = async (nick, pass, output) => {
    const nickField = output.find({ label: 'Nickname' }).first();
    const passField = output.find({ label: 'Password' }).first();

    await act(async () => {
      nickField.props().onChange({ target: { value: nick } });
      passField.props().onChange({ target: { value: pass } });
    });

    output.update();

    return output;
  };

  it('should render correctly', () => {
    const output = shallow(<Login />);
    expect(output.exists()).toBe(true);
  });

  describe('when nickname and password are entered', () => {
    it('login is enabled', async () => {
      const nickname = faker.name.findName();
      const password = faker.internet.password();
      const output = shallow(<Login />);
      setupTest(nickname, password, output);

      const logInButtonE = output.find({ type: 'submit' }).first();
      expect(logInButtonE.props().disabled).toBe(false);
    });
  });

  describe('when textFields are empty', () => {
    it('login is disabled', async () => {
      const output = shallow(<Login />);
      setupTest('', '', output);

      const logInButtonD = output.find({ type: 'submit' }).first();
      expect(logInButtonD.props().disabled).toBe(true);
    });
  });

  describe('Loggin In', () => {
    const setupLogginIn = async (nick, pass, obj) => {
      const output = shallow(<Login />);
      setupTest(nick, pass, output);

      const loginForm = output.find('form').first();

      LoginController.logIn.mockImplementationOnce(() => (obj));

      await act(async () => {
        loginForm.props().onSubmit({ preventDefault: () => {} });
      });
    };

    it('calls controller with nickname and password', async () => {
      const nick = faker.name.findName();
      const pass = faker.internet.password();
      setupLogginIn(nick, pass, { nickname: nick, password: pass });

      expect(LoginController.logIn).toBeCalledWith(nick, pass);
    });

    describe('when sign in fails', () => {
      it('renders error message', async () => {
        const failMessage = faker.lorem.words();
        const nickname = faker.name.findName();
        const password = faker.internet.password();
        const output = shallow(<Login />);
        setupTest(nickname, password, output);

        LoginController.logIn.mockImplementationOnce(() => ({ error: true, message: failMessage }));

        const loginForm = output.find('form').first();

        await act(async () => {
          loginForm.props().onSubmit({ preventDefault: () => {} });
        });

        const logInAlert = output.find({ severity: 'warning' }).first();

        expect(logInAlert.text()).toBe(failMessage);
      });
    });
  });
});
