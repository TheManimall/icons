class ThemeStore {
  constructor(data) {
    this.state = data;
  }

  set setState(value) {
    this.state = value;
  }

  get getState() {
    return this.state;
  }
}

export default new ThemeStore;