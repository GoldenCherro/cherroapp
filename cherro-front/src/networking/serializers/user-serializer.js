class UserSerializer {
  static deSerialize(nickname, pass) {
    return {
      nickname,
      pass,
    };
  }

  static serialize(user) {
    return {
      nickname: user.nickname,
      password: user.pass,
      name: user.name,
    };
  }
}

export { UserSerializer };
