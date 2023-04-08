export interface LoginInput {
  username: string;
  password: string;
}

export interface JWTToken {
  access_token: string;
}

export interface RegisterInput extends LoginInput {
  email: string;
  name: string;
  passwordConfirmation?: string;
}

export interface RecoverInput {
  recoveryToken: string;
  password: string;
  passwordConfirmation?: string;
}
