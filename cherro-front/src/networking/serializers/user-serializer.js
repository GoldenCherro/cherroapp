class UserSerializer {
  static serialize(nickname, pass) {
    return {
      nickname,
      pass,
    };
  }

  static deSerialize(user) {
    return {
      nickname: user.nickname,
      password: user.pass,
      name: user.name,
    };
  }
}

export { UserSerializer };
