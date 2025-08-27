output "endpoint" {
  description = "Redis endpoint"
  value       = aws_elasticache_replication_group.main.primary_endpoint_address
}

output "port" {
  description = "Redis port"
  value       = aws_elasticache_replication_group.main.port
}

output "replication_group_id" {
  description = "Redis replication group ID"
  value       = aws_elasticache_replication_group.main.replication_group_id
}

output "security_group_id" {
  description = "Redis security group ID"
  value       = aws_security_group.redis.id
}

output "subnet_group_name" {
  description = "Redis subnet group name"
  value       = aws_elasticache_subnet_group.main.name
}
