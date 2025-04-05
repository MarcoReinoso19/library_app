import type { MaterialType } from '@/utils/enums'
import type { AuthorRead } from './Author'
import type { SectionRead } from './Section'

export interface MaterialBase {
  type: MaterialType
  title: string
  codRef: string
  price: number
  isbn?: string | null
  issn?: string | null
  description: string | null
  authorId: number
  sectionId: number
}

export interface Material extends MaterialBase {
  id: number
}

export interface MaterialCreate extends MaterialBase {}

export interface MaterialCreateNatural extends MaterialCreate {}
export interface MaterialCreateJuridic extends MaterialCreate {}

export interface MaterialRead extends Material {
  author: AuthorRead
  section: SectionRead
}

export interface MaterialUpdate extends Partial<MaterialBase> {}
