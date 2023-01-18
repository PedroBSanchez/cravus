interface InterfaceCreateUser {
  name: string;
  email: string;
  password: string;
}
interface InterfaceLogin {
  email: string;
  password: string;
}

export { InterfaceCreateUser, InterfaceLogin };
