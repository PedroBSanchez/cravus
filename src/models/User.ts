class User {
  public name: string;
  public email: string;
  public password: string;
  public created_at: Date;
  constructor(name: string, email: string, password: string, created_at: Date) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
  }
}

export { User };
