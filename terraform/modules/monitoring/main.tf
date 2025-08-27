# Prometheus Stack (Prometheus + AlertManager + Grafana)
resource "helm_release" "prometheus_stack" {
  name       = "prometheus-stack"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = kubernetes_namespace.monitoring.metadata[0].name
  create_namespace = false

  set {
    name  = "prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.storageClassName"
    value = "gp2"
  }

  set {
    name  = "prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage"
    value = var.environment == "prod" ? "30Gi" : "10Gi"
  }

  set {
    name  = "prometheus.prometheusSpec.retention"
    value = var.environment == "prod" ? "30d" : "7d"
  }

  set {
    name  = "prometheus.prometheusSpec.resources.requests.memory"
    value = var.environment == "prod" ? "2Gi" : "512Mi"
  }

  set {
    name  = "prometheus.prometheusSpec.resources.requests.cpu"
    value = var.environment == "prod" ? "1000m" : "250m"
  }

  set {
    name  = "grafana.adminPassword"
    value = var.grafana_admin_password
  }

  set {
    name  = "grafana.persistence.enabled"
    value = true
  }

  set {
    name  = "grafana.persistence.size"
    value = var.environment == "prod" ? "30Gi" : "10Gi"
  }

  set {
    name  = "alertmanager.alertmanagerSpec.storage.volumeClaimTemplate.spec.storageClassName"
    value = "gp2"
  }

  set {
    name  = "alertmanager.alertmanagerSpec.storage.volumeClaimTemplate.spec.resources.requests.storage"
    value = var.environment == "prod" ? "20Gi" : "5Gi"
  }

  depends_on = [kubernetes_namespace.monitoring]

  tags = local.common_tags
}

# ELK Stack (Elasticsearch + Logstash + Kibana)
resource "helm_release" "elasticsearch" {
  name       = "elasticsearch"
  repository = "https://helm.elastic.co"
  chart      = "elasticsearch"
  namespace  = kubernetes_namespace.monitoring.metadata[0].name
  create_namespace = false

  set {
    name  = "replicas"
    value = var.environment == "prod" ? 3 : 1
  }

  set {
    name  = "resources.requests.memory"
    value = var.environment == "prod" ? "2Gi" : "1Gi"
  }

  set {
    name  = "resources.requests.cpu"
    value = var.environment == "prod" ? "1000m" : "500m"
  }

  set {
    name  = "volumeClaimTemplate.resources.requests.storage"
    value = var.environment == "prod" ? "100Gi" : "20Gi"
  }

  depends_on = [kubernetes_namespace.monitoring]

  tags = local.common_tags
}

resource "helm_release" "kibana" {
  name       = "kibana"
  repository = "https://helm.elastic.co"
  chart      = "kibana"
  namespace  = kubernetes_namespace.monitoring.metadata[0].name
  create_namespace = false

  set {
    name  = "replicas"
    value = var.environment == "prod" ? 2 : 1
  }

  set {
    name  = "resources.requests.memory"
    value = var.environment == "prod" ? "1Gi" : "512Mi"
  }

  set {
    name  = "resources.requests.cpu"
    value = var.environment == "prod" ? "500m" : "250m"
  }

  depends_on = [kubernetes_namespace.monitoring, helm_release.elasticsearch]

  tags = local.common_tags
}

# Fluentd for Log Collection
resource "helm_release" "fluentd" {
  name       = "fluentd"
  repository = "https://fluent.github.io/helm-charts"
  chart      = "fluentd"
  namespace  = kubernetes_namespace.monitoring.metadata[0].name
  create_namespace = false

  set {
    name  = "replicaCount"
    value = var.environment == "prod" ? 3 : 1
  }

  set {
    name  = "elasticsearch.host"
    value = "elasticsearch-master.${kubernetes_namespace.monitoring.metadata[0].name}.svc.cluster.local"
  }

  set {
    name  = "elasticsearch.port"
    value = "9200"
  }

  depends_on = [kubernetes_namespace.monitoring, helm_release.elasticsearch]

  tags = local.common_tags
}

# Jaeger for Distributed Tracing
resource "helm_release" "jaeger" {
  name       = "jaeger"
  repository = "https://jaegertracing.github.io/helm-charts"
  chart      = "jaeger"
  namespace  = kubernetes_namespace.monitoring.metadata[0].name
  create_namespace = false

  set {
    name  = "storage.type"
    value = "elasticsearch"
  }

  set {
    name  = "storage.options.es.server-urls"
    value = "http://elasticsearch-master.${kubernetes_namespace.monitoring.metadata[0].name}.svc.cluster.local:9200"
  }

  set {
    name  = "ingress.enabled"
    value = true
  }

  set {
    name  = "ingress.hosts[0]"
    value = "jaeger.${var.cluster_name}.${var.domain_name}"
  }

  depends_on = [kubernetes_namespace.monitoring, helm_release.elasticsearch]

  tags = local.common_tags
}

# Kubernetes Namespace for Monitoring
resource "kubernetes_namespace" "monitoring" {
  metadata {
    name = "monitoring"
    labels = {
      name = "monitoring"
      environment = var.environment
      project = "Task-Management-System"
    }
  }
}

# Service Account for Prometheus
resource "kubernetes_service_account" "prometheus" {
  metadata {
    name      = "prometheus"
    namespace = kubernetes_namespace.monitoring.metadata[0].name
  }
}

# Cluster Role for Prometheus
resource "kubernetes_cluster_role" "prometheus" {
  metadata {
    name = "prometheus"
  }

  rule {
    api_groups = [""]
    resources  = ["nodes", "nodes/proxy", "services", "endpoints", "pods"]
    verbs      = ["get", "list", "watch"]
  }

  rule {
    api_groups = ["extensions"]
    resources  = ["ingresses"]
    verbs      = ["get", "list", "watch"]
  }

  rule {
    non_resource_urls = ["/metrics"]
    verbs             = ["get"]
  }
}

# Cluster Role Binding for Prometheus
resource "kubernetes_cluster_role_binding" "prometheus" {
  metadata {
    name = "prometheus"
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = kubernetes_cluster_role.prometheus.metadata[0].name
  }

  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.prometheus.metadata[0].name
    namespace = kubernetes_namespace.monitoring.metadata[0].name
  }
}

# ConfigMap for Prometheus Rules
resource "kubernetes_config_map" "prometheus_rules" {
  metadata {
    name      = "prometheus-rules"
    namespace = kubernetes_namespace.monitoring.metadata[0].name
  }

  data = {
    "kubernetes.rules" = file("${path.module}/files/kubernetes.rules")
    "application.rules" = file("${path.module}/files/application.rules")
  }
}

# ConfigMap for Grafana Dashboards
resource "kubernetes_config_map" "grafana_dashboards" {
  metadata {
    name      = "grafana-dashboards"
    namespace = kubernetes_namespace.monitoring.metadata[0].name
  }

  data = {
    "kubernetes-cluster.json" = file("${path.module}/files/kubernetes-cluster.json")
    "application-metrics.json" = file("${path.module}/files/application-metrics.json")
    "infrastructure-metrics.json" = file("${path.module}/files/infrastructure-metrics.json")
  }
}

# Common tags
locals {
  common_tags = {
    Project         = "Task-Management-System"
    Environment     = var.environment
    Owner           = "DevOps-Team"
    CostCenter      = "Engineering"
    DataClassification = "Internal"
    Compliance      = "SOC2"
    BackupRequired  = var.environment == "prod" ? "true" : "false"
    AutoScaling     = "enabled"
    MaintenanceWindow = "Sunday 2-4 AM UTC"
  }
}
