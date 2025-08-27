# Redis ElastiCache Replication Group
resource "aws_elasticache_replication_group" "main" {
  replication_group_id          = "${var.cluster_name}-redis"
  description                   = "Redis cluster for ${var.environment}"
  node_type                    = var.cache_size
  port                         = 6379
  parameter_group_name         = "default.redis7"
  
  # Industry standard: High availability
  num_cache_clusters = var.environment == "prod" ? 3 : 1
  
  automatic_failover_enabled = var.environment == "prod" ? true : false
  multi_az_enabled          = var.environment == "prod" ? true : false
  
  # Industry standard: Security
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  auth_token                 = var.redis_auth_token
  
  security_group_ids = [aws_security_group.redis.id]
  subnet_group_name  = aws_elasticache_subnet_group.main.name
  
  # Industry standard: Backup and maintenance
  snapshot_retention_limit = var.environment == "prod" ? 7 : 1
  snapshot_window          = "04:00-05:00"
  maintenance_window       = "sun:05:00-sun:06:00"
  
  # Industry standard: Performance optimization
  engine_version = "7.0"

  tags = local.common_tags
}

# ElastiCache Subnet Group
resource "aws_elasticache_subnet_group" "main" {
  name       = "${var.cluster_name}-redis-subnet-group"
  subnet_ids = var.private_subnet_ids

  tags = local.common_tags
}

# Security Group for Redis
resource "aws_security_group" "redis" {
  name        = "${var.cluster_name}-redis-sg"
  description = "Security group for Redis cluster"
  vpc_id      = var.vpc_id

  # Allow Redis traffic from private subnets
  ingress {
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [var.app_security_group_id]
    description     = "Allow Redis access from application security group"
  }

  # Allow Redis traffic from EKS nodes
  ingress {
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    cidr_blocks     = var.private_subnet_cidrs
    description     = "Allow Redis access from private subnets"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic"
  }

  tags = local.common_tags
}

# Common tags
locals {
  common_tags = {
    Project         = "Task-Management-System"
    Environment     = var.environment
    Owner           = "DevOps-Team"
    CostCenter      = "Engineering"
    DataClassification = "Internal"
    Compliance      = "SOC2"
    BackupRequired  = var.environment == "prod" ? "true" : "false"
    AutoScaling     = "enabled"
    MaintenanceWindow = "Sunday 2-4 AM UTC"
  }
}
