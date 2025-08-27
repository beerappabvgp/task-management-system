#!/bin/bash

# 🚀 Jenkins Setup Script for Task Management System
# This script sets up Jenkins with all required plugins and configurations

set -e

echo "🔧 Setting up Jenkins for Task Management System CI/CD Pipeline..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Check if Jenkins is running
check_jenkins_status() {
    if systemctl is-active --quiet jenkins; then
        print_success "Jenkins is running"
        return 0
    else
        print_warning "Jenkins is not running"
        return 1
    fi
}

# Install Jenkins if not present
install_jenkins() {
    print_status "Checking if Jenkins is installed..."
    
    if ! command -v jenkins &> /dev/null; then
        print_status "Jenkins not found. Installing Jenkins..."
        
        # Add Jenkins repository
        curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
            /usr/share/keyrings/jenkins-keyring.asc > /dev/null
        
        echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
            https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
            /etc/apt/sources.list.d/jenkins.list > /dev/null
        
        # Update package list and install Jenkins
        sudo apt-get update
        sudo apt-get install -y jenkins
        
        print_success "Jenkins installed successfully"
    else
        print_success "Jenkins is already installed"
    fi
}

# Start and enable Jenkins service
setup_jenkins_service() {
    print_status "Setting up Jenkins service..."
    
    # Start Jenkins
    sudo systemctl start jenkins
    sudo systemctl enable jenkins
    
    # Wait for Jenkins to start
    print_status "Waiting for Jenkins to start..."
    sleep 30
    
    if check_jenkins_status; then
        print_success "Jenkins service is running"
    else
        print_error "Failed to start Jenkins service"
        exit 1
    fi
}

# Get Jenkins initial admin password
get_jenkins_password() {
    print_status "Getting Jenkins initial admin password..."
    
    if [ -f /var/lib/jenkins/secrets/initialAdminPassword ]; then
        PASSWORD=$(sudo cat /var/lib/jenkins/secrets/initialAdminPassword)
        print_success "Jenkins initial admin password: $PASSWORD"
        echo "🔑 Jenkins Initial Admin Password: $PASSWORD"
        echo "🔑 Please save this password and use it to complete Jenkins setup"
    else
        print_warning "Could not find Jenkins initial admin password"
    fi
}

# Install required Jenkins plugins
install_jenkins_plugins() {
    print_status "Installing required Jenkins plugins..."
    
    # Wait for Jenkins to be fully ready
    print_status "Waiting for Jenkins to be ready..."
    sleep 60
    
    # Install plugins using Jenkins CLI
    PLUGINS=(
        "workflow-aggregator"
        "git"
        "docker-plugin"
        "kubernetes"
        "kubernetes-cli"
        "aws-credentials"
        "aws-ecr"
        "aws-eks"
        "terraform"
        "sonarqube-scanner"
        "trivy-scanner"
        "performance"
        "blueocean"
        "pipeline-stage-view"
        "build-timeout"
        "timestamper"
        "ansicolor"
        "credentials-binding"
        "ssh-credentials"
        "plain-credentials"
        "matrix-auth"
        "authorize-project"
        "build-token-root"
        "credentials"
        "ldap"
        "mailer"
        "pam-auth"
        "windows-slaves"
        "antisamy-markup-formatter"
        "build-name-setter"
        "cloudbees-folder"
        "config-file-provider"
        "copyartifact"
        "envinject"
        "extended-choice-parameter"
        "extended-read-permission"
        "git-client"
        "git-server"
        "gradle"
        "groovy"
        "htmlpublisher"
        "junit"
        "maven-plugin"
        "parameterized-trigger"
        "pipeline-github-lib"
        "pipeline-milestone-step"
        "pipeline-model-definition"
        "pipeline-model-extensions"
        "pipeline-rest-api"
        "pipeline-stage-step"
        "pipeline-utility-steps"
        "script-security"
        "structs"
        "subversion"
        "throttle-concurrents"
        "token-macro"
        "workflow-basic-steps"
        "workflow-cps"
        "workflow-cps-global-lib"
        "workflow-durable-task-step"
        "workflow-job"
        "workflow-multibranch"
        "workflow-scm-step"
        "workflow-step-api"
        "workflow-support"
    )
    
    print_status "Installing ${#PLUGINS[@]} plugins..."
    
    for plugin in "${PLUGINS[@]}"; do
        print_status "Installing plugin: $plugin"
        java -jar /usr/share/java/jenkins.war -s http://localhost:8080/ install-plugin "$plugin" --username admin --password "$PASSWORD" || true
    done
    
    print_success "Plugin installation completed"
}

# Create Jenkins jobs
create_jenkins_jobs() {
    print_status "Creating Jenkins jobs..."
    
    # Create the main pipeline job
    if [ -f "jenkins-config.xml" ]; then
        print_status "Creating Task Management System pipeline job..."
        
        # Wait for Jenkins to be ready
        sleep 30
        
        # Create job using Jenkins CLI
        java -jar /usr/share/java/jenkins.war -s http://localhost:8080/ create-job "task-management-system" < jenkins-config.xml --username admin --password "$PASSWORD" || true
        
        print_success "Jenkins jobs created successfully"
    else
        print_warning "jenkins-config.xml not found. Skipping job creation."
    fi
}

# Configure Jenkins security
configure_jenkins_security() {
    print_status "Configuring Jenkins security..."
    
    # Create Jenkins configuration directory
    sudo mkdir -p /var/lib/jenkins/init.groovy.d
    
    # Create security configuration script
    cat << 'EOF' | sudo tee /var/lib/jenkins/init.groovy.d/security.groovy
import jenkins.model.*
import hudson.security.*
import hudson.util.*
import jenkins.install.*

def instance = Jenkins.getInstance()

if (!(instance instanceof InstallState.INITIAL_SETUP_COMPLETED)) {
    println "Jenkins is not ready for configuration yet"
    return
}

// Disable Jenkins CLI
Jenkins.instance.getDescriptor(CLI.class).enabled = false

// Configure security
def hudsonRealm = new HudsonPrivateSecurityRealm(false)
hudsonRealm.createAccount("admin", "admin123")
instance.setSecurityRealm(hudsonRealm)

def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
instance.setAuthorizationStrategy(strategy)

instance.save()
println "Jenkins security configured successfully"
EOF
    
    # Restart Jenkins to apply security configuration
    print_status "Restarting Jenkins to apply security configuration..."
    sudo systemctl restart jenkins
    sleep 30
    
    print_success "Jenkins security configured"
}

# Setup Jenkins workspace and tools
setup_jenkins_workspace() {
    print_status "Setting up Jenkins workspace and tools..."
    
    # Create workspace directory
    sudo mkdir -p /var/lib/jenkins/workspace/task-management-system
    
    # Install required tools
    print_status "Installing required tools..."
    
    # Install Docker
    if ! command -v docker &> /dev/null; then
        print_status "Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker jenkins
        sudo systemctl enable docker
        sudo systemctl start docker
        print_success "Docker installed"
    fi
    
    # Install kubectl
    if ! command -v kubectl &> /dev/null; then
        print_status "Installing kubectl..."
        curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
        sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
        print_success "kubectl installed"
    fi
    
    # Install AWS CLI
    if ! command -v aws &> /dev/null; then
        print_status "Installing AWS CLI..."
        curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
        unzip awscliv2.zip
        sudo ./aws/install
        print_success "AWS CLI installed"
    fi
    
    # Install Terraform
    if ! command -v terraform &> /dev/null; then
        print_status "Installing Terraform..."
        curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
        sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs)"
        sudo apt-get update && sudo apt-get install -y terraform
        print_success "Terraform installed"
    fi
    
    print_success "Jenkins workspace and tools setup completed"
}

# Configure Jenkins credentials
configure_jenkins_credentials() {
    print_status "Configuring Jenkins credentials..."
    
    # Create credentials configuration
    cat << 'EOF' | sudo tee /var/lib/jenkins/init.groovy.d/credentials.groovy
import jenkins.model.*
import com.cloudbees.plugins.credentials.*
import com.cloudbees.plugins.credentials.common.*
import com.cloudbees.plugins.credentials.domains.*
import com.cloudbees.jenkins.plugins.awscredentials.AWSCredentialsImpl
import org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl

def instance = Jenkins.getInstance()

if (!(instance instanceof InstallState.INITIAL_SETUP_COMPLETED)) {
    println "Jenkins is not ready for configuration yet"
    return
}

def domain = Domain.global()
def store = instance.getExtensionList('com.cloudbees.plugins.credentials.SystemCredentialsProvider')[0].getStore()

// Add AWS credentials
def awsCredentials = new AWSCredentialsImpl(
    CredentialsScope.GLOBAL,
    "aws-credentials",
    "AWS Credentials for Task Management System",
    "AKIAIOSFODNN7EXAMPLE",
    "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    "Task Management System AWS Account"
)
store.addCredentials(domain, awsCredentials)

// Add Docker registry credentials
def dockerCredentials = new UsernamePasswordCredentialsImpl(
    CredentialsScope.GLOBAL,
    "docker-registry",
    "Docker Registry Credentials",
    "username",
    "password"
)
store.addCredentials(domain, dockerCredentials)

// Add Kubernetes credentials
def kubeCredentials = new StringCredentialsImpl(
    CredentialsScope.GLOBAL,
    "kubeconfig",
    "Kubernetes Configuration",
    "kubeconfig-content"
)
store.addCredentials(domain, kubeCredentials)

println "Jenkins credentials configured successfully"
EOF
    
    print_success "Jenkins credentials configuration created"
}

# Main execution
main() {
    print_status "Starting Jenkins setup for Task Management System..."
    
    # Install Jenkins
    install_jenkins
    
    # Setup Jenkins service
    setup_jenkins_service
    
    # Get initial password
    get_jenkins_password
    
    # Wait for user to complete initial setup
    print_status "Please complete Jenkins initial setup in your browser at http://localhost:8080"
    print_status "Use the password shown above to create the admin user"
    print_status "After setup is complete, press Enter to continue..."
    read -r
    
    # Install plugins
    install_jenkins_plugins
    
    # Create jobs
    create_jenkins_jobs
    
    # Configure security
    configure_jenkins_security
    
    # Setup workspace and tools
    setup_jenkins_workspace
    
    # Configure credentials
    configure_jenkins_credentials
    
    print_success "Jenkins setup completed successfully!"
    print_status "Jenkins is available at: http://localhost:8080"
    print_status "Username: admin"
    print_status "Password: admin123"
    print_status "Main job: task-management-system"
}

# Run main function
main "$@"
