interface ICreateUserDTO {
  id?: string;
  name: string;
  email: string;
  phone: number;
  password: string;
  passwordConfirmation: string;
}

export { ICreateUserDTO };