import React from 'react';
import renderer from 'react-test-renderer';
import LoginScene from 'guest/auth/scenes/LoginScene';

test('renders Notification Component', () => {
  const tree = renderer.create(
    <LoginScene
      handleForgotPasswordRoute={() => {}}
      handleRegisterRoute={() => {}}
      handleLogin={() => {}}
      onValueChange={() => {}}
      email="z4ls@live.com"
      password="password"
      busy={false}
    />,
  );
  expect(tree).toMatchSnapshot();
});
