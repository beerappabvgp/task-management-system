# Configure AWS Provider
provider "aws" {
  region = var.aws_region
}

# Create VPC and Networking
module "networking" {
  source = "./networking"
  
  vpc_cidr        = var.vpc_cidr
  environment     = var.environment
  cluster_name    = var.cluster_name
}

# Create EKS Cluster
module "kubernetes" {
  source = "./kubernetes"
  
  cluster_name        = var.cluster_name
  vpc_id              = module.networking.vpc_id
  private_subnet_ids  = module.networking.private_subnet_ids
  environment         = var.environment
  node_count          = var.node_count
}

# Create Database (RDS Aurora)
module "database" {
  source = "./database"
  
  cluster_name        = var.cluster_name
  environment         = var.environment
  vpc_id              = module.networking.vpc_id
  database_subnet_ids = module.networking.database_subnet_ids
  app_security_group_id = module.kubernetes.app_security_group_id
  private_subnet_cidrs = module.networking.private_subnet_cidrs
  db_username         = var.db_username
  db_password         = var.db_password
}

# Create Cache (Redis ElastiCache)
module "cache" {
  source = "./cache"
  
  cluster_name        = var.cluster_name
  environment         = var.environment
  vpc_id              = module.networking.vpc_id
  private_subnet_ids  = module.networking.private_subnet_ids
  app_security_group_id = module.kubernetes.app_security_group_id
  private_subnet_cidrs = module.networking.private_subnet_cidrs
  cache_size          = var.cache_size
  redis_auth_token    = var.redis_auth_token
}

# Create Messaging (MSK Kafka)
module "messaging" {
  source = "./messaging"
  
  cluster_name        = var.cluster_name
  environment         = var.environment
  vpc_id              = module.networking.vpc_id
  private_subnet_ids  = module.networking.private_subnet_ids
  app_security_group_id = module.kubernetes.app_security_group_id
  private_subnet_cidrs = module.networking.private_subnet_cidrs
  kafka_size          = var.kafka_size
}

# Create Monitoring Stack
module "monitoring" {
  source = "./monitoring"
  
  cluster_name        = var.cluster_name
  environment         = var.environment
  domain_name         = var.domain_name
  grafana_admin_password = var.grafana_admin_password
}

# Outputs
output "vpc_id" {
  description = "VPC ID"
  value       = module.networking.vpc_id
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = module.networking.private_subnet_ids
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = module.networking.public_subnet_ids
}

output "cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = module.kubernetes.cluster_endpoint
}

output "cluster_name" {
  description = "EKS cluster name"
  value       = module.kubernetes.cluster_name
}

output "database_endpoint" {
  description = "RDS cluster endpoint"
  value       = module.database.cluster_endpoint
}

output "redis_endpoint" {
  description = "Redis endpoint"
  value       = module.cache.endpoint
}

output "kafka_brokers" {
  description = "Kafka broker endpoints"
  value       = module.messaging.broker_endpoints
}

output "prometheus_endpoint" {
  description = "Prometheus endpoint"
  value       = module.monitoring.prometheus_endpoint
}

output "grafana_endpoint" {
  description = "Grafana endpoint"
  value       = module.monitoring.grafana_endpoint
}

output "elasticsearch_endpoint" {
  description = "Elasticsearch endpoint"
  value       = module.monitoring.elasticsearch_endpoint
}

output "kibana_endpoint" {
  description = "Kibana endpoint"
  value       = module.monitoring.kibana_endpoint
}

output "jaeger_endpoint" {
  description = "Jaeger endpoint"
  value       = module.monitoring.jaeger_endpoint
}
