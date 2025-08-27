import { Kafka, Producer, Consumer, KafkaMessage } from 'kafkajs';
import { logger } from '../utils/logger';

export interface TaskEvent {
  type: 'TASK_CREATED' | 'TASK_UPDATED' | 'TASK_DELETED' | 'TASK_ASSIGNED';
  taskId: string;
  userId: string;
  projectId?: string;
  data: any;
  timestamp: Date;
}

export interface ProjectEvent {
  type: 'PROJECT_CREATED' | 'PROJECT_UPDATED' | 'PROJECT_DELETED';
  projectId: string;
  userId: string;
  data: any;
  timestamp: Date;
}

export interface TeamEvent {
  type: 'TEAM_CREATED' | 'USER_ADDED_TO_TEAM' | 'USER_REMOVED_FROM_TEAM';
  teamId: string;
  userId: string;
  data: any;
  timestamp: Date;
}

class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private isConnected: boolean = false;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'task-management-backend',
      brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
      retry: {
        initialRetryTime: 100,
        retries: 8
      }
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'task-management-group' });
  }

  async connect(): Promise<void> {
    try {
      await this.producer.connect();
      await this.consumer.connect();
      this.isConnected = true;
      logger.info('Kafka service connected successfully');
    } catch (error) {
      logger.error('Failed to connect to Kafka:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.producer.disconnect();
      await this.consumer.disconnect();
      this.isConnected = false;
      logger.info('Kafka service disconnected');
    } catch (error) {
      logger.error('Failed to disconnect from Kafka:', error);
    }
  }

  async publishTaskEvent(event: TaskEvent): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Kafka service not connected');
    }

    try {
      await this.producer.send({
        topic: 'task-events',
        messages: [
          {
            key: event.taskId,
            value: JSON.stringify(event),
            timestamp: event.timestamp.getTime().toString()
          }
        ]
      });
      logger.info(`Task event published: ${event.type} for task ${event.taskId}`);
    } catch (error) {
      logger.error('Failed to publish task event:', error);
      throw error;
    }
  }

  async publishProjectEvent(event: ProjectEvent): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Kafka service not connected');
    }

    try {
      await this.producer.send({
        topic: 'project-events',
        messages: [
          {
            key: event.projectId,
            value: JSON.stringify(event),
            timestamp: event.timestamp.getTime().toString()
          }
        ]
      });
      logger.info(`Project event published: ${event.type} for project ${event.projectId}`);
    } catch (error) {
      logger.error('Failed to publish project event:', error);
      throw error;
    }
  }

  async publishTeamEvent(event: TeamEvent): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Kafka service not connected');
    }

    try {
      await this.producer.send({
        topic: 'team-events',
        messages: [
          {
            key: event.teamId,
            value: JSON.stringify(event),
            timestamp: event.timestamp.getTime().toString()
          }
        ]
      });
      logger.info(`Team event published: ${event.type} for team ${event.teamId}`);
    } catch (error) {
      logger.error('Failed to publish team event:', error);
      throw error;
    }
  }

  async subscribeToTaskEvents(callback: (event: TaskEvent) => void): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Kafka service not connected');
    }

    try {
      await this.consumer.subscribe({ topic: 'task-events', fromBeginning: false });
      
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const event: TaskEvent = JSON.parse(message.value?.toString() || '{}');
            logger.info(`Received task event: ${event.type} for task ${event.taskId}`);
            callback(event);
          } catch (error) {
            logger.error('Failed to process task event:', error);
          }
        }
      });

      logger.info('Subscribed to task events');
    } catch (error) {
      logger.error('Failed to subscribe to task events:', error);
      throw error;
    }
  }

  async subscribeToProjectEvents(callback: (event: ProjectEvent) => void): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Kafka service not connected');
    }

    try {
      await this.consumer.subscribe({ topic: 'project-events', fromBeginning: false });
      
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const event: ProjectEvent = JSON.parse(message.value?.toString() || '{}');
            logger.info(`Received project event: ${event.type} for project ${event.projectId}`);
            callback(event);
          } catch (error) {
            logger.error('Failed to process project event:', error);
          }
        }
      });

      logger.info('Subscribed to project events');
    } catch (error) {
      logger.error('Failed to subscribe to project events:', error);
      throw error;
    }
  }

  async subscribeToTeamEvents(callback: (event: TeamEvent) => void): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Kafka service not connected');
    }

    try {
      await this.consumer.subscribe({ topic: 'team-events', fromBeginning: false });
      
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const event: TeamEvent = JSON.parse(message.value?.toString() || '{}');
            logger.info(`Received team event: ${event.type} for team ${event.teamId}`);
            callback(event);
          } catch (error) {
            logger.error('Failed to process team event:', error);
          }
        }
      });

      logger.info('Subscribed to team events');
    } catch (error) {
      logger.error('Failed to subscribe to team events:', error);
      throw error;
    }
  }

  isServiceConnected(): boolean {
    return this.isConnected;
  }
}

// Create singleton instance
export const kafkaService = new KafkaService();

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down Kafka service...');
  await kafkaService.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Shutting down Kafka service...');
  await kafkaService.disconnect();
  process.exit(0);
});

export default kafkaService;
