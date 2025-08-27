output "cluster_endpoint" {
  description = "RDS cluster endpoint"
  value       = aws_rds_cluster.main.endpoint
}

output "cluster_identifier" {
  description = "RDS cluster identifier"
  value       = aws_rds_cluster.main.cluster_identifier
}

output "cluster_arn" {
  description = "RDS cluster ARN"
  value       = aws_rds_cluster.main.arn
}

output "database_name" {
  description = "RDS database name"
  value       = aws_rds_cluster.main.database_name
}

output "master_username" {
  description = "RDS master username"
  value       = aws_rds_cluster.main.master_username
}

output "port" {
  description = "RDS port"
  value       = aws_rds_cluster.main.port
}

output "security_group_id" {
  description = "RDS security group ID"
  value       = aws_security_group.rds.id
}

output "kms_key_arn" {
  description = "RDS KMS key ARN"
  value       = aws_kms_key.rds.arn
}
