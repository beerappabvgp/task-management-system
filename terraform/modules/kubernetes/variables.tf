variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "private_subnet_ids" {
  description = "Private subnet IDs for EKS cluster"
  type        = list(string)
}

variable "node_count" {
  description = "Number of EKS nodes"
  type        = number
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}
