import type { LibraryRead } from './Library'
import type { MaterialRead } from './Material'

export interface InventoryBase {
  stock: number
  libraryId: number
  materialId: number
}

export interface Inventory extends InventoryBase {
  id: number
}

export interface InventoryCreate extends InventoryBase {}

export interface InventoryCreateNatural extends InventoryCreate {}
export interface InventoryCreateJuridic extends InventoryCreate {}

export interface InventoryRead extends Inventory {
  library: LibraryRead
  material: MaterialRead
}

export interface InventoryUpdate extends Partial<InventoryBase> {}
