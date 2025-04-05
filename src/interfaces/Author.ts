export interface AuthorBase {
  name: string
}

export interface Author extends AuthorBase {
  id: number
}

export interface AuthorCreate extends AuthorBase {}

export interface AuthorCreateNatural extends AuthorCreate {}
export interface AuthorCreateJuridic extends AuthorCreate {}

export interface AuthorRead extends Author {}

export interface AuthorUpdate extends Partial<AuthorBase> {}
