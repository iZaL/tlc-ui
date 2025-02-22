import React from 'react';
import renderer from 'react-test-renderer';
import RegisterScene from 'guest/auth/scenes/RegisterScene';

test('renders Notification Component', () => {
  const tree = renderer.create(
    <RegisterScene
      handleRegister={() => {}}
      handleLoginRoute={() => {}}
      onValueChange={() => {}}
      name="zal"
      email="z4ls@live.com"
      mobile="97978803"
      password="testpassword"
      busy={false}
    />,
  );
  expect(tree).toMatchSnapshot();
});
