terraform {
  # Using local backend for now, we'll create S3 bucket later
  # backend "s3" {
  #   bucket = "task-management-terraform-state-dev"
  #   key    = "dev/terraform.tfstate"
  #   region = "us-west-2"
  # }
}

provider "aws" {
  region = "us-west-2"
}

# Load sensitive data from local file (in production, use AWS Secrets Manager)
locals {
  # For development, we'll use simple values
  # In production, these would come from AWS Secrets Manager or similar
  db_username = "admin"
  db_password = "dev-password-123"
  redis_auth_token = "dev-redis-token-123"
  grafana_admin_password = "admin123"
}

module "infrastructure" {
  source = "../../modules"
  
  environment     = "dev"
  cluster_name    = "task-management-dev"
  vpc_cidr        = "10.0.0.0/16"
  node_count      = 2
  
  # Data layer configuration
  db_username     = local.db_username
  db_password     = local.db_password
  cache_size      = "cache.t3.micro"
  redis_auth_token = local.redis_auth_token
  kafka_size      = "kafka.t3.small"
  
  # Monitoring configuration
  domain_name     = "dev.local"
  grafana_admin_password = local.grafana_admin_password
}
