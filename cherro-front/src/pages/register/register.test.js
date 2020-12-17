import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { Register } from './register';
import { RegisterController } from '../../networking/controllers/register-controller';
import { User } from '../../models/user';

jest.mock('../../networking/controllers/register-controller');

const faker = require('faker');

describe('Register', () => {
  const setupTest = async (user, output) => {
    const nameField = output.find({ label: 'Name' }).first();
    const nickField = output.find({ label: 'Nickname' }).first();
    const passField = output.find({ label: 'Password' }).first();
    const rPassField = output.find({ label: 'Repeat Password' }).first();

    act(() => {
      nameField.props().onChange({ target: { value: user.name } });
      nickField.props().onChange({ target: { value: user.nick } });
      passField.props().onChange({ target: { value: user.pass } });
      rPassField.props().onChange({ target: { value: user.rPass } });
    });

    output.update();

    return output;
  };

  it('should render correctly', () => {
    const output = shallow(<Register />);
    expect(output.exists()).toBe(true);
  });

  describe('when email, name or password are missing', () => {
    it('has a disabled register button', () => {
      const output = shallow(<Register />);
      const registerButton = output.find({ type: 'submit' }).first();

      expect(registerButton.props().disabled).toBe(true);
    });
  });

  describe('when entering the password and repeat password', () => {
    it('has a disabled register button if the passwords are not the same', () => {
      const output = mount(<Register />);
      const user = {
        name: faker.name.findName(),
        nick: faker.name.findName(),
        pass: faker.internet.password(),
        rPass: faker.internet.password(),
      };
      setupTest(user, output);

      const registerButton = output.find({ type: 'submit' }).first();

      expect(registerButton.props().disabled).toBe(true);
    });

    it('has a enabled register button if the passwords are the same', () => {
      const output = mount(<Register />);
      const truePass = faker.internet.password();
      const user = {
        name: faker.name.findName(),
        nick: faker.name.findName(),
        pass: truePass,
        rPass: truePass,
      };
      setupTest(user, output);

      const registerButton = output.find({ type: 'submit' }).first();

      expect(registerButton.props().disabled).toBe(false);
    });
  });

  describe('register a user', () => {
    const setupRegisterUser = async (user) => {
      const output = shallow(<Register />);
      const nameField = output.find({ label: 'Name' }).first();
      const nickField = output.find({ label: 'Nickname' }).first();
      const passField = output.find({ label: 'Password' }).first();
      const rPassField = output.find({ label: 'Repeat Password' }).first();

      act(() => {
        nameField.props().onChange({ target: { value: user.name } });
        nickField.props().onChange({ target: { value: user.nickname } });
        passField.props().onChange({ target: { value: user.pass } });
        rPassField.props().onChange({ target: { value: user.pass } });
      });

      output.update();

      const registerForm = output.find('form').first();

      RegisterController.register.mockImplementationOnce(() => (user));

      act(() => {
        registerForm.props().onSubmit({ preventDefault: () => {} });
      });
    };

    it('calls controller with user', async () => {
      const truePass = faker.internet.password();
      const nameNick = faker.name.findName();
      const user = new User({
        name: nameNick,
        nickname: nameNick,
        pass: truePass,
      });
      setupRegisterUser(user);

      expect(RegisterController.register).toBeCalledWith(user);
    });

    it('calls controller once', async () => {
      const truePass = faker.internet.password();
      const nameNick = faker.name.findName();
      const user = new User({
        name: nameNick,
        nickname: nameNick,
        pass: truePass,
      });
      setupRegisterUser(user);

      expect(RegisterController.register).toHaveBeenCalledTimes(1);
    });

    describe('when register fails', () => {
      it('renders an error message', async () => {
        const truePass = faker.internet.password();
        const nameNick = faker.name.findName();
        const output = shallow(<Register />);
        const user = {
          name: nameNick,
          nick: nameNick,
          pass: truePass,
          rPass: truePass,
        };
        setupTest(user, output);

        const registerForm = output.find('form').first();

        await act(async () => {
          registerForm.props().onSubmit({ preventDefault: () => {} });
        });

        const registerAlert = output.find({ severity: 'warning' }).first();

        expect(registerAlert.text()).toBe('No pudiste registrarte. Intentá de nuevo amiguín.');
      });
    });
  });
});
