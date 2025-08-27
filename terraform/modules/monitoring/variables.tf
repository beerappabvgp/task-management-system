variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "domain_name" {
  description = "Domain name for ingress"
  type        = string
}

variable "grafana_admin_password" {
  description = "Grafana admin password"
  type        = string
  sensitive   = true
}

variable "prometheus_retention_days" {
  description = "Prometheus data retention in days"
  type        = number
  default     = 7
}

variable "elasticsearch_replicas" {
  description = "Number of Elasticsearch replicas"
  type        = number
  default     = 1
}

variable "storage_class" {
  description = "Storage class for persistent volumes"
  type        = string
  default     = "gp2"
}
