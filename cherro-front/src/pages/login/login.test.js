import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { Login } from './login';
import { LoginController } from '../../networking/controllers/login-controller';

jest.mock('../../networking/controllers/login-controller');

const faker = require('faker');

describe('Login', () => {
  const setupTest = async (nick, pass, output) => {
    const nickField = output.find({ label: 'Nickname' }).first();
    const passField = output.find({ label: 'Password' }).first();

    act(() => {
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
    it('shows a submit button that is enabled', async () => {
      const nickname = faker.name.findName();
      const password = faker.internet.password();
      const output = shallow(<Login />);
      setupTest(nickname, password, output);

      const logInButtonE = output.find({ type: 'submit' }).first();
      expect(logInButtonE.props().disabled).toBe(false);
    });
  });

  describe('when textFields are empty', () => {
    it('shows a submit button that is disabled', async () => {
      const output = shallow(<Login />);
      setupTest('', '', output);

      const logInButtonD = output.find({ type: 'submit' }).first();
      expect(logInButtonD.props().disabled).toBe(true);
    });
  });

  describe('Loggin In', () => {
    const setupLoggingIn = async (nick, pass, obj) => {
      const output = shallow(<Login />);
      setupTest(nick, pass, output);

      const loginForm = output.find('form').first();

      LoginController.logIn.mockImplementationOnce(() => (obj));

      act(() => {
        loginForm.props().onSubmit({ preventDefault: () => {} });
      });
    };

    it('calls controller with nickname and password', async () => {
      const nick = faker.name.findName();
      const pass = faker.internet.password();
      setupLoggingIn(nick, pass, { nickname: nick, password: pass });

      expect(LoginController.logIn).toBeCalledWith(nick, pass);
    });

    it('calls controller once', async () => {
      const nick = faker.name.findName();
      const pass = faker.internet.password();
      setupLoggingIn(nick, pass, { nickname: nick, password: pass });

      expect(LoginController.logIn).toHaveBeenCalledTimes(1);
    });

    describe('when login fails', () => {
      it('renders an error message', async () => {
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
