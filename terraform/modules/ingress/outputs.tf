output "load_balancer_dns" {
  description = "Load balancer DNS name"
  value       = data.kubernetes_service.nginx_ingress.status[0].load_balancer[0].ingress[0].hostname
}

output "ingress_namespace" {
  description = "Ingress namespace name"
  value       = kubernetes_namespace.ingress.metadata[0].name
}

output "load_balancer_controller_role_arn" {
  description = "Load balancer controller IAM role ARN"
  value       = aws_iam_role.load_balancer_controller.arn
}
