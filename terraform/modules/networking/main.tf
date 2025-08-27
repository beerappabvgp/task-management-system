# VPC
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "${var.cluster_name}-vpc"
    Environment = var.environment
    Project     = "Task-Management-System"
    Purpose     = "Learning-DevOps"
  }
}

# Public Subnets
resource "aws_subnet" "public" {
  count             = 3
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  map_public_ip_on_launch = true

  tags = {
    Name        = "${var.cluster_name}-public-${count.index + 1}"
    Environment = var.environment
    Project     = "Task-Management-System"
    Purpose     = "Learning-DevOps"
    "kubernetes.io/role/elb" = "1"
  }
}

# Private Subnets
resource "aws_subnet" "private" {
  count             = 3
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index + 3)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name        = "${var.cluster_name}-private-${count.index + 1}"
    Environment = var.environment
    Project     = "Task-Management-System"
    Purpose     = "Learning-DevOps"
    "kubernetes.io/role/internal-elb" = "1"
  }
}

# Database Subnets
resource "aws_subnet" "database" {
  count             = 3
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index + 6)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name        = "${var.cluster_name}-database-${count.index + 1}"
    Environment = var.environment
    Project     = "Task-Management-System"
    Purpose     = "Learning-DevOps"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name        = "${var.cluster_name}-igw"
    Environment = var.environment
    Project     = "Task-Management-System"
    Purpose     = "Learning-DevOps"
  }
}

# Elastic IPs for NAT Gateways
resource "aws_eip" "nat" {
  count = 3
  domain = "vpc"

  tags = {
    Name        = "${var.cluster_name}-nat-eip-${count.index + 1}"
    Environment = var.environment
    Project     = "Task-Management-System"
    Purpose     = "Learning-DevOps"
  }
}

# NAT Gateways
resource "aws_nat_gateway" "main" {
  count         = 3
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id

  tags = {
    Name        = "${var.cluster_name}-nat-${count.index + 1}"
    Environment = var.environment
    Project     = "Task-Management-System"
    Purpose     = "Learning-DevOps"
  }

  depends_on = [aws_internet_gateway.main]
}

# Public Route Table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name        = "${var.cluster_name}-public-rt"
    Environment = var.environment
    Project     = "Task-Management-System"
    Purpose     = "Learning-DevOps"
  }
}

# Private Route Tables
resource "aws_route_table" "private" {
  count  = 3
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[count.index].id
  }

  tags = {
    Name        = "${var.cluster_name}-private-rt-${count.index + 1}"
    Environment = var.environment
    Project     = "Task-Management-System"
    Purpose     = "Learning-DevOps"
  }
}

# Database Route Tables
resource "aws_route_table" "database" {
  count  = 3
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[count.index].id
  }

  tags = {
    Name        = "${var.cluster_name}-database-rt-${count.index + 1}"
    Environment = var.environment
    Project     = "Task-Management-System"
    Purpose     = "Learning-DevOps"
  }
}

# Route Table Associations
resource "aws_route_table_association" "public" {
  count          = 3
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count          = 3
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

resource "aws_route_table_association" "database" {
  count          = 3
  subnet_id      = aws_subnet.database[count.index].id
  route_table_id = aws_route_table.database[count.index].id
}

# Data Sources
data "aws_availability_zones" "available" {
  state = "available"
}
