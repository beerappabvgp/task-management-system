# EKS Cluster
resource "aws_eks_cluster" "main" {
  name     = var.cluster_name
  role_arn = aws_iam_role.eks_cluster.arn
  version  = "1.28"

  vpc_config {
    subnet_ids              = var.private_subnet_ids
    endpoint_private_access = true
    endpoint_public_access  = true
    public_access_cidrs     = var.environment == "prod" ? ["0.0.0.0/0"] : ["10.0.0.0/8"]
  }

  # Industry standard: Encryption
  encryption_config {
    provider {
      key_arn = aws_kms_key.eks.arn
    }
    resources = ["secrets"]
  }

  # Industry standard: Logging
  enabled_cluster_log_types = ["api", "audit", "authenticator", "controllerManager", "scheduler"]

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy,
    aws_iam_role_policy_attachment.eks_vpc_resource_controller,
  ]

  tags = local.common_tags
}

# EKS Node Group
resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "${var.cluster_name}-node-group"
  node_role_arn   = aws_iam_role.eks_node_group.arn
  subnet_ids      = var.private_subnet_ids
  
  # Industry standard: Right-sizing instances
  instance_types = var.environment == "prod" ? ["m5.large", "m5.xlarge"] : ["t3.medium", "t3.large"]
  
  # Industry standard: Use spot instances for non-production
  capacity_type = var.environment == "prod" ? "ON_DEMAND" : "SPOT"

  scaling_config {
    desired_size = var.node_count
    max_size     = var.environment == "prod" ? 20 : 5
    min_size     = var.environment == "prod" ? 5 : 1
  }

  # Industry standard: Update strategy
  update_config {
    max_unavailable = 1
  }

  # Industry standard: Labels and taints
  labels = {
    Environment = var.environment
    NodeGroup  = "main"
    Purpose    = "application"
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_worker_node_policy,
    aws_iam_role_policy_attachment.eks_cni_policy,
    aws_iam_role_policy_attachment.ec2_container_registry_read_only,
  ]

  tags = local.common_tags
}

# Application Security Group
resource "aws_security_group" "app" {
  name        = "${var.cluster_name}-app-sg"
  description = "Security group for application pods"
  vpc_id      = var.vpc_id

  # Allow HTTP traffic from load balancer
  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    cidr_blocks     = ["0.0.0.0/0"]
    description     = "Allow HTTP traffic from load balancer"
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic"
  }

  tags = local.common_tags
}

# KMS Key for EKS encryption
resource "aws_kms_key" "eks" {
  description             = "KMS key for EKS cluster encryption"
  deletion_window_in_days = 7
  enable_key_rotation    = true

  tags = local.common_tags
}

# IAM Role for EKS Cluster
resource "aws_iam_role" "eks_cluster" {
  name = "${var.cluster_name}-cluster-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "eks.amazonaws.com"
        }
      }
    ]
  })

  tags = local.common_tags
}

# IAM Role for EKS Node Group
resource "aws_iam_role" "eks_node_group" {
  name = "${var.cluster_name}-node-group-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = local.common_tags
}

# IAM Policy Attachments
resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks_cluster.name
}

resource "aws_iam_role_policy_attachment" "eks_vpc_resource_controller" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
  role       = aws_iam_role.eks_cluster.name
}

resource "aws_iam_role_policy_attachment" "eks_worker_node_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.eks_node_group.name
}

resource "aws_iam_role_policy_attachment" "eks_cni_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.eks_node_group.name
}

resource "aws_iam_role_policy_attachment" "ec2_container_registry_read_only" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.eks_node_group.name
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
