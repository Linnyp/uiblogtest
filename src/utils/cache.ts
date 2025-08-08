import { CacheEntry } from '@/types/blog'

class TypedCache<T> {
  private cache = new Map<string, CacheEntry<T>>()
  private stats = { hits: 0, misses: 0 }

  async get<K extends T>(
    type: string, 
    identifier: string, 
    fetchFn: () => Promise<K>,
    ttl: number = 5 * 60 * 1000 // 5 minutes default
  ): Promise<K> {
    const key = `${type}:${identifier}:${Math.floor(Date.now() / 300000)}` // 5min windows
    
    if (this.cache.has(key)) {
      const entry = this.cache.get(key)!
      if (Date.now() - entry.timestamp < entry.ttl) {
        this.stats.hits++
        return entry.data as K
      }
    }
    
    this.stats.misses++
    const data = await fetchFn()
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
    
    return data
  }

  clear(): void {
    this.cache.clear()
    this.stats = { hits: 0, misses: 0 }
  }

  getStats() {
    const total = this.stats.hits + this.stats.misses
    const hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0
    return {
      ...this.stats,
      total,
      hitRate: Math.round(hitRate * 100) / 100
    }
  }
}

export const contentCache = new TypedCache<unknown>()