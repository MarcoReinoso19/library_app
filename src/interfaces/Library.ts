export interface LibraryBase {
  name: string
  address: string
}

export interface Library extends LibraryBase {
  id: number
}

export interface LibraryCreate extends LibraryBase {}

export interface LibraryCreateNatural extends LibraryCreate {}
export interface LibraryCreateJuridic extends LibraryCreate {}

export interface LibraryRead extends Library {}

export interface LibraryUpdate extends Partial<LibraryBase> {}
