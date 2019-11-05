class Player {
  constructor(name, time, id) {
    this.id = id || Date.now();
    this.name = name;
    this.time = time;
  }
  saveToLocal() {
    localStorage.setItem(JSON.stringify(this.id), JSON.stringify(this));
  }
}
