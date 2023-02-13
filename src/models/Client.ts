class Client {
  public name: string;
  public phone: string;
  public createdAt: Date;
  public code: number;

  constructor(name: string, phone: string, createdAt: Date, code: number) {
    this.name = name;
    this.phone = phone;
    this.createdAt = createdAt;
    this.code = code;
  }
}

export { Client };
