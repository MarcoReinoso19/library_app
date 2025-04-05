export interface UserBase {
  username: string
  password: string
  email: string
}

export interface User extends UserBase {
  id: number
}

export interface UserCreate extends UserBase {}

export interface UserCreateNatural extends UserCreate {}
export interface UserCreateJuridic extends UserCreate {}

export interface UserRead extends User {}

export interface UserUpdate extends Partial<UserBase> {}
