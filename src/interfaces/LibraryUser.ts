export interface LibraryUserBase {
  libraryId: string
  userId: string
}

export interface LibraryUser extends LibraryUserBase {
  id: number
}

export interface LibraryUserCreate extends LibraryUserBase {}

export interface LibraryUserCreateNatural extends LibraryUserCreate {}
export interface LibraryUserCreateJuridic extends LibraryUserCreate {}

export interface LibraryUserRead extends LibraryUser {}

export interface LibraryUserUpdate extends Partial<LibraryUserBase> {}
