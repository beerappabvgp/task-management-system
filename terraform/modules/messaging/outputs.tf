output "broker_endpoints" {
  description = "Kafka broker endpoints"
  value       = aws_msk_cluster.main.bootstrap_brokers
}

output "broker_endpoints_tls" {
  description = "Kafka broker endpoints (TLS)"
  value       = aws_msk_cluster.main.bootstrap_brokers_tls
}

output "cluster_arn" {
  description = "Kafka cluster ARN"
  value       = aws_msk_cluster.main.arn
}

output "cluster_name" {
  description = "Kafka cluster name"
  value       = aws_msk_cluster.main.cluster_name
}

output "security_group_id" {
  description = "Kafka security group ID"
  value       = aws_security_group.kafka.id
}

output "kms_key_arn" {
  description = "Kafka KMS key ARN"
  value       = aws_kms_key.kafka.arn
}
