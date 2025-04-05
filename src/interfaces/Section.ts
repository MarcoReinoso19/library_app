export interface SectionBase {
  name: string
  capacity: number
}

export interface Section extends SectionBase {
  id: number
}

export interface SectionCreate extends SectionBase {}

export interface SectionCreateNatural extends SectionCreate {}
export interface SectionCreateJuridic extends SectionCreate {}

export interface SectionRead extends Section {}

export interface SectionUpdate extends Partial<SectionBase> {}
