class ResponseSerializer {
  static deSerialize(data) {
    return {
      message: data,
    };
  }
}

export { ResponseSerializer };
