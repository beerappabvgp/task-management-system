# 🚀 **Task Management System - Kubernetes Deployment**

## 📋 **Overview**

This directory contains all the Kubernetes manifests needed to deploy the Task Management System to a Kubernetes cluster. The deployment includes:

- **Backend API** (Node.js + Express)
- **Frontend** (React + Vite)
- **Database Jobs** (Prisma migrations, backups)
- **Monitoring Stack** (Prometheus, Grafana, ELK, Jaeger)
- **Security** (Network policies, RBAC, Resource quotas)
- **Scaling** (Horizontal Pod Autoscalers)

---

## 🏗️ **Directory Structure**

```
k8s/
├── manifests/                    # Kubernetes manifests
│   ├── backend/                 # Backend API manifests
│   │   ├── deployment.yaml      # Backend deployment
│   │   ├── service.yaml         # Backend service
│   │   ├── configmap.yaml       # Configuration
│   │   ├── secrets.yaml         # Sensitive data
│   │   ├── service-account.yaml # RBAC and permissions
│   │   └── hpa.yaml            # Auto-scaling
│   ├── frontend/                # Frontend manifests
│   │   ├── deployment.yaml      # Frontend deployment
│   │   ├── service.yaml         # Frontend service
│   │   └── hpa.yaml            # Auto-scaling
│   ├── database/                # Database manifests
│   │   └── migration-job.yaml   # Migration and backup jobs
│   ├── monitoring/              # Monitoring manifests
│   ├── ingress.yaml             # Ingress configuration
│   ├── network-policy.yaml      # Network security
│   ├── resource-quota.yaml      # Resource limits
│   └── limit-range.yaml         # Default resource limits
├── helm-charts/                 # Helm charts (future)
├── ci-cd/                       # CI/CD configurations
├── deploy.sh                    # Deployment script
└── README.md                    # This file
```

---

## 🎯 **Key Components**

### **1. Backend API (`manifests/backend/`)**
- **Deployment**: 2 replicas with rolling updates
- **Service**: ClusterIP service on port 80/3000
- **ConfigMap**: Application configuration
- **Secrets**: Database URLs, JWT secrets
- **Service Account**: RBAC permissions
- **HPA**: Auto-scaling based on CPU/Memory

### **2. Frontend (`manifests/frontend/`)**
- **Deployment**: 2 replicas with rolling updates
- **Service**: ClusterIP service on port 80
- **HPA**: Auto-scaling based on CPU/Memory

### **3. Database (`manifests/database/`)**
- **Migration Job**: One-time Prisma migrations
- **Backup CronJob**: Daily database backups at 2 AM

### **4. Security & Networking**
- **Network Policies**: Control pod-to-pod communication
- **RBAC**: Service account permissions
- **Resource Quotas**: Limit namespace resource usage
- **Limit Ranges**: Default container resource limits

### **5. Ingress & Load Balancing**
- **Ingress**: Route external traffic to services
- **AWS Load Balancer**: Internet-facing ALB
- **SSL/TLS**: HTTPS redirection

---

## 🚀 **Deployment Process**

### **Prerequisites**
1. **Kubernetes Cluster**: EKS, GKE, or local (minikube/kind)
2. **kubectl**: Configured to access your cluster
3. **Ingress Controller**: AWS Load Balancer Controller or NGINX
4. **Storage Class**: For persistent volumes

### **Quick Deployment**

```bash
# Clone the repository
git clone <repository-url>
cd task-management-system

# Make deployment script executable
chmod +x k8s/deploy.sh

# Deploy to default namespace
./k8s/deploy.sh

# Or specify environment
ENVIRONMENT=dev ./k8s/deploy.sh
```

### **Manual Deployment**

```bash
# 1. Apply RBAC and Service Accounts
kubectl apply -f k8s/manifests/backend/service-account.yaml

# 2. Apply ConfigMaps and Secrets
kubectl apply -f k8s/manifests/backend/configmap.yaml
kubectl apply -f k8s/manifests/backend/secrets.yaml

# 3. Deploy Backend
kubectl apply -f k8s/manifests/backend/deployment.yaml
kubectl apply -f k8s/manifests/backend/service.yaml
kubectl apply -f k8s/manifests/backend/hpa.yaml

# 4. Deploy Frontend
kubectl apply -f k8s/manifests/frontend/deployment.yaml
kubectl apply -f k8s/manifests/frontend/service.yaml
kubectl apply -f k8s/manifests/frontend/hpa.yaml

# 5. Deploy Database Jobs
kubectl apply -f k8s/manifests/database/migration-job.yaml

# 6. Apply Security and Networking
kubectl apply -f k8s/manifests/network-policy.yaml
kubectl apply -f k8s/manifests/resource-quota.yaml
kubectl apply -f k8s/manifests/limit-range.yaml

# 7. Deploy Ingress
kubectl apply -f k8s/manifests/ingress.yaml
```

---

## 🔧 **Configuration**

### **Environment Variables**

The application uses the following environment variables:

```bash
# Backend
NODE_ENV=production
PORT=3000
DATABASE_URL=<from-secret>
REDIS_URL=<from-secret>
KAFKA_BROKERS=<from-configmap>
JWT_SECRET=<from-secret>
LOG_LEVEL=info

# Frontend
NODE_ENV=production
REACT_APP_API_URL=<from-configmap>
REACT_APP_ENVIRONMENT=dev
```

### **Resource Limits**

```yaml
# Backend
requests:
  memory: "256Mi"
  cpu: "250m"
limits:
  memory: "512Mi"
  cpu: "500m"

# Frontend
requests:
  memory: "128Mi"
  cpu: "100m"
limits:
  memory: "256Mi"
  cpu: "200m"
```

---

## 📊 **Monitoring & Observability**

### **Metrics Endpoints**
- **Backend**: `/metrics` (Prometheus format)
- **Frontend**: Health checks on `/`

### **Monitoring Stack**
- **Prometheus**: Metrics collection
- **Grafana**: Dashboards and visualization
- **ELK Stack**: Log aggregation and analysis
- **Jaeger**: Distributed tracing

### **Health Checks**
- **Liveness Probe**: `/health` endpoint
- **Readiness Probe**: Application readiness
- **Startup Probe**: Initial startup time

---

## 🔒 **Security Features**

### **Network Security**
- **Network Policies**: Restrict pod communication
- **Service Mesh**: Future implementation
- **TLS/SSL**: HTTPS encryption

### **Access Control**
- **RBAC**: Role-based access control
- **Service Accounts**: Pod identity
- **Secrets Management**: Secure credential storage

### **Resource Security**
- **Resource Quotas**: Prevent resource exhaustion
- **Limit Ranges**: Enforce resource limits
- **Security Context**: Non-root containers

---

## 📈 **Scaling & Performance**

### **Auto-scaling**
- **HPA**: CPU and Memory-based scaling
- **VPA**: Vertical Pod Autoscaler (future)
- **Cluster Autoscaler**: Node-level scaling

### **Performance Optimization**
- **Resource Limits**: Prevent resource hogging
- **Health Checks**: Fast failure detection
- **Rolling Updates**: Zero-downtime deployments

---

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Pods not starting**
   ```bash
   kubectl describe pod <pod-name>
   kubectl logs <pod-name>
   ```

2. **Services not accessible**
   ```bash
   kubectl get svc
   kubectl describe svc <service-name>
   ```

3. **Ingress not working**
   ```bash
   kubectl get ingress
   kubectl describe ingress <ingress-name>
   ```

4. **Resource issues**
   ```bash
   kubectl describe resourcequota
   kubectl describe limitrange
   ```

### **Debug Commands**

```bash
# Check all resources
kubectl get all -n default

# Check events
kubectl get events -n default --sort-by='.lastTimestamp'

# Check logs
kubectl logs -f deployment/task-management-backend

# Port forward for debugging
kubectl port-forward svc/task-management-backend-service 3000:80
```

---

## 🔄 **Updates & Maintenance**

### **Updating Deployments**

```bash
# Update image
kubectl set image deployment/task-management-backend backend=task-management-backend:v2.0.0

# Rollback if needed
kubectl rollout undo deployment/task-management-backend

# Check rollout status
kubectl rollout status deployment/task-management-backend
```

### **Database Migrations**

```bash
# Run migrations manually
kubectl create job --from=cronjob/task-management-db-migration manual-migration

# Check migration status
kubectl get jobs
kubectl logs job/manual-migration
```

---

## 🌟 **Next Steps**

1. **CI/CD Pipeline**: Implement automated deployment
2. **Service Mesh**: Add Istio or Linkerd
3. **Multi-environment**: Dev, UAT, Production
4. **Disaster Recovery**: Backup and restore procedures
5. **Performance Testing**: Load testing and optimization

---

## 📚 **Additional Resources**

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [AWS EKS Best Practices](https://aws.github.io/aws-eks-best-practices/)
- [Prometheus Monitoring](https://prometheus.io/docs/)
- [Grafana Dashboards](https://grafana.com/docs/grafana/latest/dashboards/)

---

## 🤝 **Support**

For issues and questions:
1. Check the troubleshooting section
2. Review Kubernetes events and logs
3. Consult the monitoring stack
4. Open an issue in the repository

