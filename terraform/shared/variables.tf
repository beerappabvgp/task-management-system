variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name (dev, uat, prod)"
  type        = string
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "node_count" {
  description = "Number of EKS nodes"
  type        = number
}

variable "cluster_endpoint" {
  description = "EKS cluster endpoint"
  type        = string
}

variable "cluster_ca_certificate" {
  description = "EKS cluster CA certificate"
  type        = string
}

variable "cluster_token" {
  description = "EKS cluster authentication token"
  type        = string
  sensitive   = true
}

variable "instance_type" {
  description = "EKS node instance type"
  type        = string
}

variable "database_size" {
  description = "RDS instance size"
  type        = string
}

variable "cache_size" {
  description = "Redis cache instance size"
  type        = string
}

variable "kafka_size" {
  description = "Kafka broker instance size"
  type        = string
}
