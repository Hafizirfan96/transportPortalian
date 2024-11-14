class MMKVFaker {
    private data : any = {};
  
    getString(key: string) {
      return this.data[key]
    }
  
    set(key: string, value: string) {
      this.data[key] = value
    }
  
    delete(key: string) {
      if (this.data[key]) this.data[key] = undefined
    }
  
    clearAll() {
      this.data = {}
    }
  }

  export default MMKVFaker;