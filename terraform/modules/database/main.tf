# RDS Aurora PostgreSQL Cluster
resource "aws_rds_cluster" "main" {
  cluster_identifier     = "${var.cluster_name}-cluster"
  engine                = "aurora-postgresql"
  engine_version        = "15.4"
  database_name         = "taskmanagement"
  master_username       = var.db_username
  master_password       = var.db_password
  skip_final_snapshot   = false
  deletion_protection   = var.environment == "prod" ? true : false
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  # Industry standard: Backup and maintenance
  backup_retention_period = var.environment == "prod" ? 35 : 7
  preferred_backup_window = "03:00-04:00"
  preferred_maintenance_window = "sun:04:00-sun:05:00"
  
  enabled_cloudwatch_logs_exports = ["postgresql"]
  
  # Industry standard: Encryption
  storage_encrypted = true
  kms_key_id       = aws_kms_key.rds.arn

  tags = local.common_tags
}

# RDS Aurora Instance (Primary)
resource "aws_rds_cluster_instance" "primary" {
  identifier          = "${var.cluster_name}-primary"
  cluster_identifier  = aws_rds_cluster.main.id
  instance_class     = var.environment == "prod" ? "db.r5.large" : "db.t3.micro"
  engine              = aws_rds_cluster.main.engine
  
  # Industry standard: Performance optimization
  monitoring_interval = 60
  monitoring_role_arn = aws_iam_role.rds_monitoring.arn

  tags = local.common_tags
}

# RDS Aurora Read Replicas
resource "aws_rds_cluster_instance" "read_replicas" {
  count               = var.environment == "prod" ? 3 : 1
  identifier          = "${var.cluster_name}-read-${count.index + 1}"
  cluster_identifier  = aws_rds_cluster.main.id
  instance_class     = var.environment == "prod" ? "db.r5.large" : "db.t3.micro"
  engine              = aws_rds_cluster.main.engine
  
  # Industry standard: Performance optimization
  monitoring_interval = 60
  monitoring_role_arn = aws_iam_role.rds_monitoring.arn

  tags = local.common_tags
}

# DB Subnet Group
resource "aws_db_subnet_group" "main" {
  name       = "${var.cluster_name}-db-subnet-group"
  subnet_ids = var.database_subnet_ids

  tags = local.common_tags
}

# Security Group for RDS
resource "aws_security_group" "rds" {
  name        = "${var.cluster_name}-rds-sg"
  description = "Security group for RDS cluster"
  vpc_id      = var.vpc_id

  # Allow PostgreSQL traffic from private subnets
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [var.app_security_group_id]
    description     = "Allow PostgreSQL access from application security group"
  }

  # Allow PostgreSQL traffic from EKS nodes
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    cidr_blocks     = var.private_subnet_cidrs
    description     = "Allow PostgreSQL access from private subnets"
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

# KMS Key for RDS encryption
resource "aws_kms_key" "rds" {
  description             = "KMS key for RDS cluster encryption"
  deletion_window_in_days = 7
  enable_key_rotation    = true

  tags = local.common_tags
}

# IAM Role for RDS monitoring
resource "aws_iam_role" "rds_monitoring" {
  name = "${var.cluster_name}-rds-monitoring-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "monitoring.rds.amazonaws.com"
        }
      }
    ]
  })

  tags = local.common_tags
}

# IAM Policy for RDS monitoring
resource "aws_iam_role_policy_attachment" "rds_monitoring" {
  role       = aws_iam_role.rds_monitoring.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
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
