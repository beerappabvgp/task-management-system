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
