# MSK Kafka Cluster
resource "aws_msk_cluster" "main" {
  cluster_name           = "${var.cluster_name}-kafka"
  kafka_version         = "3.5.1"
  number_of_broker_nodes = var.environment == "prod" ? 2 : 1

  # Industry standard: Broker configuration
  broker_node_group_info {
    instance_type   = var.kafka_size
    client_subnets  = var.private_subnet_ids
    security_groups = [aws_security_group.kafka.id]
    
    storage_info {
      ebs_storage_info {
        volume_size = var.environment == "prod" ? 100 : 50
      }
    }
  }

  # Industry standard: Encryption
  encryption_info {
    encryption_in_transit {
      client_broker = "TLS"
      in_cluster    = true
    }
    encryption_at_rest_kms_key_arn = aws_kms_key.kafka.arn
  }

  # Industry standard: Logging
  logging_info {
    broker_logs {
      cloudwatch_logs {
        enabled   = true
        log_group = aws_cloudwatch_log_group.kafka.name
      }
      firehose {
        enabled = false
      }
      s3 {
        enabled = false
      }
    }
  }

  # Industry standard: Configuration
  configuration_info {
    arn      = aws_msk_configuration.main.arn
    revision = aws_msk_configuration.main.latest_revision
  }

  tags = local.common_tags
}

# MSK Configuration
resource "aws_msk_configuration" "main" {
  kafka_versions = ["3.5.1"]
  name           = "${var.cluster_name}-kafka-config"

  server_properties = <<PROPERTIES
# Industry standard: Performance tuning
num.partitions=3
default.replication.factor=3
min.insync.replicas=2
log.retention.hours=168
log.segment.bytes=1073741824
log.retention.check.interval.ms=300000
PROPERTIES
}

# Security Group for Kafka
resource "aws_security_group" "kafka" {
  name        = "${var.cluster_name}-kafka-sg"
  description = "Security group for Kafka cluster"
  vpc_id      = var.vpc_id

  # Allow Kafka traffic from private subnets
  ingress {
    from_port       = 9092
    to_port         = 9092
    protocol        = "tcp"
    security_groups = [var.app_security_group_id]
    description     = "Allow Kafka access from application security group"
  }

  # Allow Kafka traffic from EKS nodes
  ingress {
    from_port       = 9092
    to_port         = 9092
    protocol        = "tcp"
    cidr_blocks     = var.private_subnet_cidrs
    description     = "Allow Kafka access from private subnets"
  }

  # Allow Kafka traffic from EKS nodes (TLS)
  ingress {
    from_port       = 9094
    to_port         = 9094
    protocol        = "tcp"
    security_groups = [var.app_security_group_id]
    description     = "Allow Kafka TLS access from application security group"
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

# KMS Key for Kafka encryption
resource "aws_kms_key" "kafka" {
  description             = "KMS key for Kafka cluster encryption"
  deletion_window_in_days = 7
  enable_key_rotation    = true

  tags = local.common_tags
}

# CloudWatch Log Group for Kafka
resource "aws_cloudwatch_log_group" "kafka" {
  name              = "/aws/msk/${var.cluster_name}-kafka"
  retention_in_days = var.environment == "prod" ? 30 : 7

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
