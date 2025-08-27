#!/bin/bash

# Task Management System - Kubernetes Deployment Script
# This script deploys the complete application to Kubernetes

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NAMESPACE="default"
ENVIRONMENT="${ENVIRONMENT:-dev}"
CLUSTER_NAME="task-management-${ENVIRONMENT}"

echo -e "${BLUE}🚀 Task Management System - Kubernetes Deployment${NC}"
echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
echo -e "${BLUE}Cluster: ${CLUSTER_NAME}${NC}"
echo -e "${BLUE}Namespace: ${NAMESPACE}${NC}"
echo ""

# Function to print status
print_status() {
    echo -e "${YELLOW}📋 $1${NC}"
}

# Function to print success
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to print error
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    print_error "kubectl is not installed or not in PATH"
    exit 1
fi

# Check if we can connect to the cluster
print_status "Checking cluster connection..."
if ! kubectl cluster-info &> /dev/null; then
    print_error "Cannot connect to Kubernetes cluster"
    exit 1
fi
print_success "Connected to cluster: $(kubectl config current-context)"

# Check namespace
print_status "Checking namespace..."
if ! kubectl get namespace $NAMESPACE &> /dev/null; then
    print_status "Creating namespace: $NAMESPACE"
    kubectl create namespace $NAMESPACE
fi
print_success "Namespace ready: $NAMESPACE"

# Function to apply manifests
apply_manifests() {
    local dir=$1
    local description=$2
    
    print_status "Applying $description..."
    
    if [ -d "$dir" ]; then
        for file in $(find "$dir" -name "*.yaml" -type f | sort); do
            echo "  Applying: $(basename "$file")"
            kubectl apply -f "$file" --namespace="$NAMESPACE"
        done
        print_success "$description deployed successfully"
    else
        print_error "Directory not found: $dir"
        exit 1
    fi
}

# Apply manifests in order
echo ""
print_status "Starting deployment process..."

# 1. RBAC and Service Accounts
apply_manifests "manifests/backend" "RBAC and Service Accounts"

# 2. ConfigMaps and Secrets
apply_manifests "manifests/backend" "ConfigMaps and Secrets"

# 3. Backend Application
apply_manifests "manifests/backend" "Backend Application"

# 4. Frontend Application
apply_manifests "manifests/frontend" "Frontend Application"

# 5. Database Jobs
apply_manifests "manifests/database" "Database Jobs"

# 6. Network Policies
print_status "Applying Network Policies..."
kubectl apply -f manifests/network-policy.yaml --namespace="$NAMESPACE"
print_success "Network Policies deployed successfully"

# 7. Resource Management
print_status "Applying Resource Management..."
kubectl apply -f manifests/resource-quota.yaml --namespace="$NAMESPACE"
kubectl apply -f manifests/limit-range.yaml --namespace="$NAMESPACE"
print_success "Resource Management deployed successfully"

# 8. Ingress
print_status "Applying Ingress..."
kubectl apply -f manifests/ingress.yaml --namespace="$NAMESPACE"
print_success "Ingress deployed successfully"

# Wait for deployments to be ready
echo ""
print_status "Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/task-management-backend --namespace="$NAMESPACE"
kubectl wait --for=condition=available --timeout=300s deployment/task-management-frontend --namespace="$NAMESPACE"

# Check deployment status
echo ""
print_status "Checking deployment status..."
kubectl get deployments --namespace="$NAMESPACE"
kubectl get services --namespace="$NAMESPACE"
kubectl get pods --namespace="$NAMESPACE"

# Check ingress status
echo ""
print_status "Checking ingress status..."
kubectl get ingress --namespace="$NAMESPACE"

# Get service URLs
echo ""
print_status "Service URLs:"
echo "  Backend API: http://task-management-backend-service:80"
echo "  Frontend: http://task-management-frontend-service:80"

# Check if ingress controller is ready
echo ""
print_status "Checking ingress controller..."
if kubectl get pods -n ingress-nginx --selector=app.kubernetes.io/name=ingress-nginx &> /dev/null; then
    print_success "Ingress controller is running"
else
    print_error "Ingress controller not found. Please ensure it's deployed."
fi

echo ""
print_success "🎉 Deployment completed successfully!"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Check pod status: kubectl get pods -n $NAMESPACE"
echo "2. Check service status: kubectl get svc -n $NAMESPACE"
echo "3. Check ingress status: kubectl get ingress -n $NAMESPACE"
echo "4. View logs: kubectl logs -f deployment/task-management-backend -n $NAMESPACE"
echo "5. Access application through ingress URL"
echo ""
echo -e "${BLUE}Monitoring:${NC}"
echo "1. Grafana: http://monitoring.$CLUSTER_NAME.$ENVIRONMENT.local"
echo "2. Prometheus: http://monitoring.$CLUSTER_NAME.$ENVIRONMENT.local/prometheus"
echo "3. Kibana: http://monitoring.$CLUSTER_NAME.$ENVIRONMENT.local/kibana"
echo "4. Jaeger: http://monitoring.$CLUSTER_NAME.$ENVIRONMENT.local/jaeger"

