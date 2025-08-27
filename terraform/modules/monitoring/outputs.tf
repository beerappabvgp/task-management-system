output "prometheus_endpoint" {
  description = "Prometheus endpoint"
  value       = "http://prometheus-stack-prometheus.${kubernetes_namespace.monitoring.metadata[0].name}.svc.cluster.local:9090"
}

output "grafana_endpoint" {
  description = "Grafana endpoint"
  value       = "http://prometheus-stack-grafana.${kubernetes_namespace.monitoring.metadata[0].name}.svc.cluster.local:80"
}

output "alertmanager_endpoint" {
  description = "AlertManager endpoint"
  value       = "http://prometheus-stack-alertmanager.${kubernetes_namespace.monitoring.metadata[0].name}.svc.cluster.local:9093"
}

output "elasticsearch_endpoint" {
  description = "Elasticsearch endpoint"
  value       = "http://elasticsearch-master.${kubernetes_namespace.monitoring.metadata[0].name}.svc.cluster.local:9200"
}

output "kibana_endpoint" {
  description = "Kibana endpoint"
  value       = "http://kibana-kibana.${kubernetes_namespace.monitoring.metadata[0].name}.svc.cluster.local:5601"
}

output "jaeger_endpoint" {
  description = "Jaeger endpoint"
  value       = "http://jaeger-jaeger-query.${kubernetes_namespace.monitoring.metadata[0].name}.svc.cluster.local:16686"
}

output "monitoring_namespace" {
  description = "Monitoring namespace name"
  value       = kubernetes_namespace.monitoring.metadata[0].name
}
