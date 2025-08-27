# 🚀 **CI/CD Pipeline Documentation**

## 📋 **Overview**

This document describes the **Continuous Integration/Continuous Deployment (CI/CD)** pipeline for the Task Management System. The pipeline automates the entire software delivery process from code commit to production deployment.

---

## 🏗️ **Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Source Code   │───▶│   Jenkins CI    │───▶│  Kubernetes    │
│   Repository    │    │   Pipeline      │    │   Cluster      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Docker Hub    │
                       │   Registry      │
                       └─────────────────┘
```

---

## 🔧 **Components**

### 1. **Jenkins Pipeline**
- **Location**: `k8s/ci-cd/jenkins/Jenkinsfile`
- **Type**: Declarative Pipeline
- **Features**: Multi-stage, parallel execution, environment-specific deployments

### 2. **Jenkins Configuration**
- **Location**: `k8s/ci-cd/jenkins/jenkins-config.xml`
- **Purpose**: Job configuration with parameters and build steps

### 3. **Jenkins Setup Script**
- **Location**: `k8s/ci-cd/jenkins/setup-jenkins.sh`
- **Purpose**: Automated Jenkins installation and configuration

### 4. **Performance Tests**
- **Location**: `k8s/ci-cd/performance-tests/load-test.js`
- **Tool**: k6 (load testing framework)
- **Purpose**: Performance validation after deployment

---

## 🚀 **Pipeline Stages**

### **Stage 1: Initialize**
- Validate environment parameters
- Check branch restrictions (production only from main)
- Set version and build information

### **Stage 2: Checkout**
- Clone source code repository
- Extract Git information (commit, branch, URL)

### **Stage 3: Dependencies Check**
- Verify required files exist
- Validate project structure

### **Stage 4: Security Scan** ⚠️
- **Trivy**: Vulnerability scanning for code and dependencies
- **npm audit**: Security audit for Node.js packages
- **Conditional**: Only runs if `SECURITY_SCAN=true`

### **Stage 5: Backend Build & Test** 🔨
- **Parallel execution** with Frontend
- Install production dependencies
- TypeScript compilation
- Create build artifacts
- Run unit and integration tests

### **Stage 6: Frontend Build & Test** 🔨
- **Parallel execution** with Backend
- Install production dependencies
- Build production bundle
- Create build artifacts
- Run unit and E2E tests

### **Stage 7: Docker Build** 🐳
- Build Backend Docker image
- Build Frontend Docker image
- Tag with version and latest

### **Stage 8: Docker Security Scan** 🔒
- **Trivy**: Scan Docker images for vulnerabilities
- **Conditional**: Only runs if `SECURITY_SCAN=true`

### **Stage 9: Push Images** 📤
- Push images to Docker registry
- Tag with version and latest

### **Stage 10: Deploy to Kubernetes** 🚀
- Update Kubernetes manifests with new image tags
- Adjust replica counts based on environment
- Execute deployment using `deploy.sh` script

### **Stage 11: Health Check** 🏥
- Wait for deployments to be ready
- Verify pod status
- Run basic health checks
- Validate service endpoints

### **Stage 12: Performance Test** ⚡
- **k6**: Load testing with realistic scenarios
- **Conditional**: Only runs if `PERFORMANCE_TEST=true`
- Archive performance results

### **Stage 13: Post Deployment** 📊
- Collect deployment status
- Verify ingress configuration
- Monitor resource usage
- Send notifications

---

## ⚙️ **Pipeline Parameters**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `ENVIRONMENT` | Choice | - | Deployment environment (dev/uat/prod) |
| `DEPLOYMENT_STRATEGY` | Choice | - | Deployment method (rolling/blue-green/canary) |
| `RUN_TESTS` | Boolean | `true` | Execute automated tests |
| `SECURITY_SCAN` | Boolean | `true` | Run security scans |
| `PERFORMANCE_TEST` | Boolean | `false` | Execute performance tests |
| `CUSTOM_TAG` | String | `''` | Custom Docker image tag |

---

## 🌍 **Environment Configuration**

### **Development (dev)**
- **Replicas**: 2 (Backend & Frontend)
- **Instance Type**: t3.micro
- **Auto-scaling**: Disabled
- **Monitoring**: Basic

### **User Acceptance Testing (uat)**
- **Replicas**: 2 (Backend & Frontend)
- **Instance Type**: t3.small
- **Auto-scaling**: Enabled
- **Monitoring**: Enhanced

### **Production (prod)**
- **Replicas**: 3 (Backend & Frontend)
- **Instance Type**: t3.medium
- **Auto-scaling**: Enabled
- **Monitoring**: Full observability
- **Branch Restriction**: Only from `main` branch

---

## 🛡️ **Security Features**

### **Code Security**
- **Trivy**: Vulnerability scanning
- **npm audit**: Dependency security
- **Branch protection**: Production restrictions

### **Infrastructure Security**
- **Kubernetes RBAC**: Role-based access control
- **Network Policies**: Pod communication rules
- **Resource Quotas**: Resource limits
- **Secrets Management**: Secure credential storage

### **Deployment Security**
- **Image signing**: Docker image verification
- **Rollback capability**: Automatic failure recovery
- **Health checks**: Deployment validation

---

## 📊 **Monitoring & Observability**

### **Pipeline Metrics**
- **Build duration**: Time to complete pipeline
- **Success rate**: Percentage of successful builds
- **Test coverage**: Code coverage metrics
- **Security findings**: Vulnerability reports

### **Application Metrics**
- **Response time**: API endpoint performance
- **Error rate**: Application error percentage
- **Throughput**: Requests per second
- **Resource usage**: CPU, memory, disk utilization

### **Infrastructure Metrics**
- **Pod status**: Running, failed, pending pods
- **Service health**: Endpoint availability
- **Resource utilization**: Cluster resource usage
- **Auto-scaling**: HPA metrics and scaling events

---

## 🔄 **Deployment Strategies**

### **1. Rolling Update (Default)**
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 25%
    maxUnavailable: 25%
```
- **Pros**: Zero downtime, gradual rollout
- **Cons**: Slower deployment, potential version mixing

### **2. Blue-Green Deployment**
```yaml
# Two identical environments
# Switch traffic after validation
```
- **Pros**: Instant rollback, no version mixing
- **Cons**: Higher resource usage, complex setup

### **3. Canary Deployment**
```yaml
# Gradual traffic shifting
# Monitor metrics before full rollout
```
- **Pros**: Risk mitigation, gradual validation
- **Cons**: Complex routing, monitoring overhead

---

## 🚨 **Error Handling & Rollback**

### **Automatic Rollback**
- **Production failures**: Automatic rollback to previous version
- **Health check failures**: Deployment halted
- **Resource exhaustion**: Pod scaling limits

### **Manual Rollback**
```bash
# Rollback to previous deployment
kubectl rollout undo deployment/task-management-backend -n prod
kubectl rollout undo deployment/task-management-frontend -n prod

# Check rollback status
kubectl rollout status deployment/task-management-backend -n prod
```

### **Failure Scenarios**
1. **Build failures**: Pipeline stops, no deployment
2. **Test failures**: Pipeline stops, no deployment
3. **Security scan failures**: Pipeline continues with warnings
4. **Deployment failures**: Automatic rollback (production)
5. **Health check failures**: Rollback initiated

---

## 📈 **Performance Testing**

### **Load Test Configuration**
```javascript
export const options = {
    stages: [
        { duration: '2m', target: 10 },    // Ramp up
        { duration: '5m', target: 10 },    // Steady load
        { duration: '3m', target: 50 },    // Peak load
        { duration: '5m', target: 50 },    // Sustained peak
        { duration: '2m', target: 0 },     // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% < 2s
        http_req_failed: ['rate<0.1'],     // Error rate < 10%
    },
};
```

### **Test Scenarios**
1. **Authentication**: Login/logout cycles
2. **CRUD Operations**: Create, read, update, delete
3. **Page Loads**: Frontend page rendering
4. **API Endpoints**: Backend API performance
5. **Search Operations**: Query performance
6. **Health Checks**: System responsiveness

---

## 🛠️ **Setup Instructions**

### **1. Install Jenkins**
```bash
cd k8s/ci-cd/jenkins
chmod +x setup-jenkins.sh
./setup-jenkins.sh
```

### **2. Access Jenkins**
- **URL**: http://localhost:8080
- **Username**: admin
- **Password**: admin123 (or from initial setup)

### **3. Configure Credentials**
- **AWS Credentials**: For EKS access
- **Docker Registry**: For image pushing
- **Kubernetes**: For cluster access

### **4. Create Pipeline Job**
- **Job Name**: task-management-system
- **Type**: Pipeline
- **Source**: SCM (Git repository)

---

## 📋 **Usage Examples**

### **Development Deployment**
```bash
# Trigger pipeline with dev environment
curl -X POST "http://localhost:8080/job/task-management-system/buildWithParameters" \
  -d "ENVIRONMENT=dev" \
  -d "RUN_TESTS=true" \
  -d "SECURITY_SCAN=true" \
  -d "PERFORMANCE_TEST=false"
```

### **Production Deployment**
```bash
# Trigger pipeline with production settings
curl -X POST "http://localhost:8080/job/task-management-system/buildWithParameters" \
  -d "ENVIRONMENT=prod" \
  -d "RUN_TESTS=true" \
  -d "SECURITY_SCAN=true" \
  -d "PERFORMANCE_TEST=true" \
  -d "DEPLOYMENT_STRATEGY=rolling"
```

### **Custom Tag Deployment**
```bash
# Deploy with custom version tag
curl -X POST "http://localhost:8080/job/task-management-system/buildWithParameters" \
  -d "ENVIRONMENT=uat" \
  -d "CUSTOM_TAG=v1.2.3-rc1"
```

---

## 🔍 **Troubleshooting**

### **Common Issues**

#### **1. Pipeline Fails at Build Stage**
```bash
# Check build logs
tail -f /var/log/jenkins/jenkins.log

# Verify dependencies
cd backend && npm ci
cd frontend && npm ci
```

#### **2. Docker Build Failures**
```bash
# Check Docker daemon
sudo systemctl status docker

# Verify Dockerfile syntax
docker build --no-cache -t test-image .
```

#### **3. Kubernetes Deployment Issues**
```bash
# Check pod status
kubectl get pods -n dev

# View deployment logs
kubectl logs deployment/task-management-backend -n dev

# Check events
kubectl get events -n dev --sort-by='.lastTimestamp'
```

#### **4. Performance Test Failures**
```bash
# Run k6 locally
k6 run performance-tests/load-test.js

# Check endpoint availability
curl -f http://localhost:3001/health
```

### **Debug Commands**
```bash
# Jenkins pipeline debug
curl -X GET "http://localhost:8080/job/task-management-system/lastBuild/consoleText"

# Kubernetes cluster info
kubectl cluster-info
kubectl get nodes
kubectl get namespaces

# Docker system info
docker system df
docker images
```

---

## 📚 **Best Practices**

### **Pipeline Design**
1. **Fail Fast**: Stop pipeline on critical failures
2. **Parallel Execution**: Run independent stages concurrently
3. **Environment Parity**: Maintain consistency across environments
4. **Security First**: Scan at every stage
5. **Monitoring**: Comprehensive observability

### **Deployment Strategy**
1. **Blue-Green**: For critical production systems
2. **Canary**: For risk mitigation
3. **Rolling**: For most use cases
4. **Feature Flags**: For gradual feature rollout

### **Security Measures**
1. **Regular Updates**: Keep dependencies current
2. **Vulnerability Scanning**: Scan at build and runtime
3. **Access Control**: Principle of least privilege
4. **Audit Logging**: Track all pipeline activities

---

## 🔮 **Future Enhancements**

### **Planned Features**
1. **Multi-Region Deployment**: Global application distribution
2. **Advanced Rollback**: Intelligent rollback strategies
3. **Chaos Engineering**: Resilience testing
4. **GitOps Integration**: Declarative deployment management
5. **Advanced Monitoring**: AI-powered anomaly detection

### **Integration Opportunities**
1. **Slack/Teams**: Deployment notifications
2. **Jira**: Issue tracking integration
3. **Confluence**: Documentation updates
4. **ServiceNow**: Change management
5. **PagerDuty**: Incident response

---

## 📞 **Support & Contact**

### **Documentation**
- **Pipeline Configuration**: This document
- **Kubernetes Manifests**: `k8s/manifests/`
- **Terraform Infrastructure**: `terraform/`
- **Application Code**: `backend/` and `frontend/`

### **Getting Help**
1. **Check logs**: Jenkins and Kubernetes logs
2. **Review configuration**: Pipeline and manifest files
3. **Test locally**: Run components individually
4. **Consult documentation**: This guide and Kubernetes docs
5. **Open issue**: Repository issue tracker

---

## 🎯 **Success Metrics**

### **Pipeline Performance**
- **Build Success Rate**: > 95%
- **Average Build Time**: < 15 minutes
- **Deployment Frequency**: Multiple times per day
- **Lead Time**: < 2 hours from commit to production

### **Application Performance**
- **Response Time**: p95 < 2000ms
- **Error Rate**: < 1%
- **Availability**: > 99.9%
- **Throughput**: > 1000 requests/second

### **Security Posture**
- **Vulnerability Count**: 0 critical, < 5 high
- **Security Scan Coverage**: 100%
- **Dependency Updates**: < 30 days old
- **Access Reviews**: Quarterly

---

*This documentation is maintained by the DevOps team and should be updated with any pipeline changes.*
