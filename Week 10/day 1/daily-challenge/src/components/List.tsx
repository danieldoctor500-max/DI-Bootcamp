import type { Key, ReactNode } from 'react'

interface ListProps<T> {
  items: T[]
  getKey: (item: T) => Key
  renderItem: (item: T, index: number) => ReactNode
}

export function List<T,>({ items, getKey, renderItem }: ListProps<T>) {
  return <>{items.map((item, index) => <li key={getKey(item)}>{renderItem(item, index)}</li>)}</>
}