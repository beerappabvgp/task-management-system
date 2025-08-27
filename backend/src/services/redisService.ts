import Redis from 'ioredis';
import { logger } from '../utils/logger';

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
}

class RedisService {
  private redis: Redis;
  private isConnected: boolean = false;
  private readonly defaultTTL = 3600; // 1 hour default

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
      maxRetriesPerRequest: 3,
      lazyConnect: true
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.redis.on('connect', () => {
      this.isConnected = true;
      logger.info('Redis service connected successfully');
    });

    this.redis.on('ready', () => {
      logger.info('Redis service is ready');
    });

    this.redis.on('error', (error) => {
      logger.error('Redis service error:', error);
      this.isConnected = false;
    });

    this.redis.on('close', () => {
      logger.info('Redis service connection closed');
      this.isConnected = false;
    });

    this.redis.on('reconnecting', () => {
      logger.info('Redis service reconnecting...');
    });
  }

  async connect(): Promise<void> {
    try {
      await this.redis.connect();
    } catch (error) {
      logger.error('Failed to connect to Redis:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.redis.disconnect();
      this.isConnected = false;
      logger.info('Redis service disconnected');
    } catch (error) {
      logger.error('Failed to disconnect from Redis:', error);
    }
  }

  async set(key: string, value: any, options: CacheOptions = {}): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Redis service not connected');
    }

    try {
      const serializedValue = JSON.stringify(value);
      const ttl = options.ttl || this.defaultTTL;
      
      if (ttl > 0) {
        await this.redis.setex(key, ttl, serializedValue);
      } else {
        await this.redis.set(key, serializedValue);
      }
      
      logger.debug(`Cache set: ${key} (TTL: ${ttl}s)`);
    } catch (error) {
      logger.error(`Failed to set cache key ${key}:`, error);
      throw error;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected) {
      throw new Error('Redis service not connected');
    }

    try {
      const value = await this.redis.get(key);
      if (value === null) {
        logger.debug(`Cache miss: ${key}`);
        return null;
      }
      
      logger.debug(`Cache hit: ${key}`);
      return JSON.parse(value) as T;
    } catch (error) {
      logger.error(`Failed to get cache key ${key}:`, error);
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Redis service not connected');
    }

    try {
      await this.redis.del(key);
      logger.debug(`Cache deleted: ${key}`);
    } catch (error) {
      logger.error(`Failed to delete cache key ${key}:`, error);
      throw error;
    }
  }

  async deletePattern(pattern: string): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Redis service not connected');
    }

    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
        logger.debug(`Cache pattern deleted: ${pattern} (${keys.length} keys)`);
      }
    } catch (error) {
      logger.error(`Failed to delete cache pattern ${pattern}:`, error);
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.isConnected) {
      throw new Error('Redis service not connected');
    }

    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      logger.error(`Failed to check existence of cache key ${key}:`, error);
      return false;
    }
  }

  async expire(key: string, ttl: number): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Redis service not connected');
    }

    try {
      await this.redis.expire(key, ttl);
      logger.debug(`Cache TTL updated: ${key} (${ttl}s)`);
    } catch (error) {
      logger.error(`Failed to update TTL for cache key ${key}:`, error);
      throw error;
    }
  }

  async increment(key: string, amount: number = 1): Promise<number> {
    if (!this.isConnected) {
      throw new Error('Redis service not connected');
    }

    try {
      const result = await this.redis.incrby(key, amount);
      logger.debug(`Cache incremented: ${key} by ${amount} = ${result}`);
      return result;
    } catch (error) {
      logger.error(`Failed to increment cache key ${key}:`, error);
      throw error;
    }
  }

  async setHash(key: string, field: string, value: any): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Redis service not connected');
    }

    try {
      const serializedValue = JSON.stringify(value);
      await this.redis.hset(key, field, serializedValue);
      logger.debug(`Cache hash set: ${key}.${field}`);
    } catch (error) {
      logger.error(`Failed to set hash field ${key}.${field}:`, error);
      throw error;
    }
  }

  async getHash<T>(key: string, field: string): Promise<T | null> {
    if (!this.isConnected) {
      throw new Error('Redis service not connected');
    }
    
    try {
      const value = await this.redis.hget(key, field);
      if (value === null) {
        return null;
      }
      
      return JSON.parse(value) as T;
    } catch (error) {
      logger.error(`Failed to get hash field ${key}.${field}:`, error);
      return null;
    }
  }

  async getAllHash<T>(key: string): Promise<Record<string, T> | null> {
    if (!this.isConnected) {
      throw new Error('Redis service not connected');
    }

    try {
      const hash = await this.redis.hgetall(key);
      if (Object.keys(hash).length === 0) {
        return null;
      }

      const result: Record<string, T> = {};
      for (const [field, value] of Object.entries(hash)) {
        try {
          result[field] = JSON.parse(value);
        } catch {
          result[field] = value as T;
        }
      }

      return result;
    } catch (error) {
      logger.error(`Failed to get all hash fields for ${key}:`, error);
      return null;
    }
  }

  async deleteHashField(key: string, field: string): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Redis service not connected');
    }

    try {
      await this.redis.hdel(key, field);
      logger.debug(`Cache hash field deleted: ${key}.${field}`);
    } catch (error) {
      logger.error(`Failed to delete hash field ${key}.${field}:`, error);
      throw error;
    }
  }

  // Cache key generators for common patterns
  static generateUserKey(userId: string): string {
    return `user:${userId}`;
  }

  static generateTaskKey(taskId: string): string {
    return `task:${taskId}`;
  }

  static generateProjectKey(projectId: string): string {
    return `project:${projectId}`;
  }

  static generateTeamKey(teamId: string): string {
    return `team:${teamId}`;
  }

  static generateUserTasksKey(userId: string): string {
    return `user:${userId}:tasks`;
  }

  static generateProjectTasksKey(projectId: string): string {
    return `project:${projectId}:tasks`;
  }

  static generateSessionKey(sessionId: string): string {
    return `session:${sessionId}`;
  }

  isServiceConnected(): boolean {
    return this.isConnected;
  }

  // Health check
  async ping(): Promise<boolean> {
    try {
      const result = await this.redis.ping();
      return result === 'PONG';
    } catch (error) {
      logger.error('Redis ping failed:', error);
      return false;
    }
  }
}

// Create singleton instance
export const redisService = new RedisService();

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down Redis service...');
  await redisService.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Shutting down Redis service...');
  await redisService.disconnect();
  process.exit(0);
});

export default redisService;
