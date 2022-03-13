// This file is based on the models defined in apps\backend\node_modules\.prisma\client\index.d.ts

/**
 * Model Item
 * 
 */
export type Item = {
  id: number
  name: string
  weight: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Bin
 * 
 */
export type Bin = {
  id: number
  name: string
  itemId: number
  shelfId: number | null
  shelfX: number | null
  shelfY: number | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Shelf
 * 
 */
export type Shelf = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}


