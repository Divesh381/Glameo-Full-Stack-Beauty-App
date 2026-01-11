# Glameo-Full-Stack-Beauty-App:
--> Glameo is a modern full-stack beauty application that provides users with a seamless platform to explore, book, and manage beauty services. This application demonstrates a complete DevOps deployment flow, containerization with Docker, and orchestration with Kubernetes, including Ingress-based routing for production-ready deployment.

🚀 Features:

    • User authentication and profile management.
    • Browse and book beauty services.
    • Admin panel for managing services and users.
    • Responsive and user-friendly UI.
    • Full-stack architecture with front-end, back-end, and database.
    • Production-ready deployment using Kubernetes with Ingress

🛠️ Tech Stack:

    • Front-End: React.
    • Back-End:  Python / Flask (choose your backend).
    • Database:  PostgreSQL (choose your database).
    • Containerization: Docker.
    • Orchestration & Deployment: Kubernetes (K8s).
    • Ingress: Nginx Ingress Controller for routing.
    • CI/CD: (Optional) GitHub Actions.

📦 Deployment Flow:

Glameo is deployed using a full Kubernetes workflow.

    1. Dockerization
        ◦ Each microservice (frontend, backend, database) is containerized using Docker.
        ◦ Docker images are built and pushed to a container registry.
    2. Kubernetes Orchestration
        ◦ Deployment manifests define pods, services, and environment variables.
        ◦ Kubernetes handles scaling, networking, and service discovery.
    3. Ingress Setup
        ◦ Nginx Ingress Controller routes traffic to different services.
        ◦ Supports HTTP/HTTPS routing, allowing access to frontend and APIs via a single domain.
    4. Optional CI/CD
        ◦ Automated builds, tests, and deployments can be integrated with GitHub Actions or Jenkins.

⚡ Installation & Running Locally:

Make sure you have Docker and kubectl installed

Clone the repository:


```
git clone https://github.com/yourusername/Glameo-Full-Stack-Beauty-App.git
cd Glameo-Full-Stack-Beauty-App

```

 Build Docker images:

 ```
docker build -t glameo-frontend ./frontend
docker build -t glameo-backend ./backend

 ```

Deploy on Kubernetes:

```
kubectl apply -f k8s/
```

Access via Ingress:

```
# Check the ingress endpoint
kubectl get ingress
# Visit http://<your-ingress-domain> in your browser

```

🌐 Architecture:

 ```
                 +----------------------+
                |       Ingress        |
                +----------------------+
                 |         |          |
       ----------+---------+----------+----------
       |                    |                     |
+---------------+    +---------------+    +---------------+
| Frontend      |    | Backend       |    | PostgreSQL    |
| Service       |    | Service       |    | Service       |
+-------+-------+    +-------+-------+    +-------+-------+
        |                    |                    |
  +-----v-----+        +-----v-----+        +-----v-----+
  | Deployment|        | Deployment|        | Deployment|
  +-----+-----+        +-----+-----+        +-----+-----+
        |                    |                    |
  +-----v-----+        +-----v-----+        +-----v-----+
  | Pod       |        | Pod       |        | Pod       |
  +-----+-----+        +-----+-----+        +-----+-----+
        |                    |                    |
  +-----v-----+        +-----v-----+        +-----v-----+
  | Docker    |        | Docker    |        | Docker    |
  | Container |        | Container |        | Container |
  +-----+-----+        +-----+-----+        +-----+-----+
        |                    |                    |
  +-----v-----+        +-----v-----+        +-----v-----+
  | fronted  |        | backend  |      |  postgres |
  +-----------+        +-----------+        +-----------+

```
# How to deploy backend, fronted and postgres using k8s? 

1️⃣ Prerequisites for docker:

```
		# Step 1: Update system packages
		sudo apt update
		
		# Step 2: Remove old Docker versions (if any)
		sudo apt remove docker docker-engine docker.io containerd runc -y
		
		# Step 3: Install required dependencies
		sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
		
		# Step 4: Add Docker official GPG key
		curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
		sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
		
		# Step 5: Add Docker repository
		echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
		https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
		sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
		
		# Step 6: Update package index after adding repo
		sudo apt update
		
		# Step 7: Install Docker Engine, CLI & Docker Compose
		sudo apt install docker-ce docker-ce-cli containerd.io \
		docker-buildx-plugin docker-compose-plugin -y
		
		# Step 8: Start & enable Docker service
		sudo systemctl start docker
		sudo systemctl enable docker
		
		# Step 9: Add current user to docker group (run docker without sudo)
		sudo usermod -aG docker $USER
		newgrp docker   # reload group without logout
		
		# Step 10: Test Docker installation
		docker run hello-world
		
		# Docker version check
		docker --version
		
		# Docker Compose version
		docker compose version
	
```
			
2️⃣ Installation for kubernetes, kind, minikube:


```
		########################################
		# Kubernetes CLI (kubectl) Installation
		########################################
		
		# Step 1: Update system packages
		sudo apt update
		
		# Step 2: Install required packages
		sudo apt install -y apt-transport-https ca-certificates curl
		
		# Step 3: Add Kubernetes GPG key
		curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | \
		sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
		
		# Step 4: Add Kubernetes repository
		echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] \
		https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /" | \
		sudo tee /etc/apt/sources.list.d/kubernetes.list
		
		# Step 5: Update package index
		sudo apt update
		
		# Step 6: Install kubectl
		sudo apt install -y kubectl
		
		# Step 7: Verify kubectl installation
		kubectl version --client
		
		
		########################################
		# KIND (Kubernetes IN Docker) Installation
		########################################
		
		# Step 1: Download KIND binary
		curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-amd64
		
		# Step 2: Make binary executable
		chmod +x ./kind
		
		# Step 3: Move binary to PATH
		sudo mv ./kind /usr/local/bin/kind
		
		# Step 4: Verify KIND installation
		kind version
		
		
		########################################
		# KIND Cluster Setup
		########################################
		
		# Create a Kubernetes cluster using KIND
		kind create cluster --name kind-cluster
		
		# Verify cluster nodes
		kubectl get nodes
		
		# Delete KIND cluster (if required)
		# kind delete cluster --name kind-cluster
		
		
		########################################
		# Minikube Installation
		########################################
		
		# Step 1: Download Minikube binary
		curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
		
		# Step 2: Install Minikube
		sudo install minikube-linux-amd64 /usr/local/bin/minikube
		
		# Step 3: Verify Minikube installation
		minikube version
		
		
		########################################
		# Minikube Cluster Setup
		########################################
		
		# Start Minikube cluster using Docker driver
		minikube start --driver=docker
		
		# Check Minikube cluster status
		minikube status
		
		# Get Kubernetes nodes
		kubectl get nodes
		
		# Stop Minikube cluster
		# minikube stop
		
		# Delete Minikube cluster
		# minikube delete
	
 ```

#After setup Dokcer, kubernetes,kind, minikube:
#How to setup all docker,kubernetes, minikube ?

📂 Project Structure

```
   Glameo-Full-Stack-Beauty-App/
│
├── frontend/                  # Frontend app (React / Angular / Vue)
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── backend/                   # Backend API (FastAPI / Node / Django)
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│
├── k8s/                       # Kubernetes manifests
│   ├── namespace.yml
│   │
│   ├── backend-deployment.yml
│   ├── backend-service.yml
│   │
│   ├── frontend-deployment.yml
│   ├── frontend-service.yml
│   │
│   ├── postgres-deployment.yml
│   ├── postgres-service.yml
│   ├── postgres-pv.yml
│   ├── postgres-pvc.yml
│   │
│   └── ingress.yml
│
└── README.md

```




✅  CMD:

```
#####################################
# 1. Create Project Structure
#####################################

mkdir Glameo-Full-Stack-Beauty-App
cd Glameo-Full-Stack-Beauty-App

mkdir frontend backend k8s


#####################################
# 2. Backend Docker Image
#####################################

cd backend

# Create Dockerfile for backend
touch Dockerfile

# Login to Docker Hub
docker login
# Enter DockerHub username & password

# Build backend image
docker build -t <dockerhub-username>/glapp-backend:latest .

# Example:
# docker build -t diveshkumar1234/glapp-backend:latest .

# Push backend image to Docker Hub
docker push <dockerhub-username>/glapp-backend:latest

# Example:
# docker push diveshkumar1234/glapp-backend:latest

cd ..


#####################################
# 3. Frontend Docker Image
#####################################

cd frontend

# Create Dockerfile for frontend
touch Dockerfile

# Build frontend image
docker build -t <dockerhub-username>/glapp-frontend:latest .

# Example:
# docker build -t diveshkumar1234/glapp-frontend:latest .

# Push frontend image to Docker Hub
docker push <dockerhub-username>/glapp-frontend:latest

# Example:
# docker push diveshkumar1234/glapp-frontend:latest

cd ..


#####################################
# 4. Kubernetes Manifests
#####################################

cd k8s

# Create namespace
touch namespace.yml

# Backend
touch backend-deployment.yml
touch backend-service.yml

# Frontend
touch frontend-deployment.yml
touch frontend-service.yml

# PostgreSQL
touch postgres-pv.yml
touch postgres-pvc.yml
touch postgres-deployment.yml
touch postgres-service.yml

# Ingress
touch ingress.yml

cd ..


#####################################
# 5. Kubernetes Deployment Order
#####################################

# Create namespace
kubectl apply -f k8s/namespace.yml

# Apply storage
kubectl apply -f k8s/postgres-pv.yml
kubectl apply -f k8s/postgres-pvc.yml

# Deploy database
kubectl apply -f k8s/postgres-deployment.yml
kubectl apply -f k8s/postgres-service.yml

# Deploy backend
kubectl apply -f k8s/backend-deployment.yml
kubectl apply -f k8s/backend-service.yml

# Deploy frontend
kubectl apply -f k8s/frontend-deployment.yml
kubectl apply -f k8s/frontend-service.yml

# Apply ingress
kubectl apply -f k8s/ingress.yml

```

🔥health-check commands

```

#####################################
# 1 Namespace Check
#####################################

# List namespaces
kubectl get ns

# Check your app namespace
kubectl get ns <namespace-name>


#####################################
# 2. Pod Health Check
#####################################

# List all pods in namespace
kubectl get pods -n <namespace-name>

# Watch pod status (CrashLoopBackOff check)
kubectl get pods -n <namespace-name> -w

# Describe a failing pod
kubectl describe pod <pod-name> -n <namespace-name>


#####################################
# 3. Logs Check
#####################################

# Backend logs
kubectl logs -n <namespace-name> deploy/backend-deployment

# Frontend logs
kubectl logs -n <namespace-name> deploy/frontend-deployment

# PostgreSQL logs
kubectl logs -n <namespace-name> deploy/postgres-deployment


#####################################
# 4. Service Check
#####################################

# List services
kubectl get svc -n <namespace-name>

# Describe backend service
kubectl describe svc backend-service -n <namespace-name>

# Describe frontend service
kubectl describe svc frontend-service -n <namespace-name>


#####################################
# 5. Database (PostgreSQL) Check
#####################################

# Check PV & PVC binding
kubectl get pv
kubectl get pvc -n <namespace-name>

# Exec into postgres pod
kubectl exec -it <postgres-pod-name> -n <namespace-name> -- psql -U postgres


#####################################
# 6. Ingress Check
#####################################

# List ingress
kubectl get ingress -n <namespace-name>

# Describe ingress
kubectl describe ingress glapp-ingress -n <namespace-name>

# For Minikube – enable ingress addon
minikube addons enable ingress

# Get Minikube IP
minikube ip


#####################################
# 7. Network Testing (Internal)
#####################################

# Test backend service from inside cluster
kubectl exec -it <frontend-pod-name> -n <namespace-name> -- curl http://backend-service:8000/health


#####################################
# 8. External Access Test
#####################################

# Port-forward backend (debug)
kubectl port-forward svc/backend-service 8000:8000 -n <namespace-name>

# Port-forward frontend (debug)
kubectl port-forward svc/frontend-service 3000:80 -n <namespace-name>


#####################################
# 9. Final Quick Status (One Command)
#####################################

kubectl get all -n <namespace-name>

```


🚀 Run pods 

```
############################################
# STEP 1: Make sure cluster & namespace OK
############################################

# Check cluster
kubectl get nodes

# Check namespace
kubectl get ns

# Switch context to your namespace (optional)
kubectl config set-context --current --namespace=<namespace-name>


############################################
# STEP 2: Check Pods are Running
############################################

# List all pods
kubectl get pods

# Watch pod startup
kubectl get pods -w

# If any pod is failing, check logs
# kubectl logs <pod-name>


############################################
# STEP 3: Check Services
############################################

# List services
kubectl get svc

# Backend & frontend services must be visible
# TYPE should be ClusterIP (recommended)
kubectl get svc backend-service
kubectl get svc frontend-service


############################################
# STEP 4: PORT-FORWARD (Primary Validation)
############################################

# Backend port-forward
kubectl port-forward svc/backend-service -n <namespace-name> 8000:8000
# Access backend:
# http://localhost:8000
# http://localhost:8000/health

# (Open new terminal)

# Frontend port-forward
kubectl port-forward svc/frontend-service -n <namespace-name> 3000:80
# Access frontend:
# http://localhost:3000


############################################
# STEP 5: Internal Service Connectivity Check
############################################

# Get frontend pod name
kubectl get pods

# Exec into frontend pod
kubectl exec -it <frontend-pod-name> -- sh

# Inside pod → test backend service DNS
curl http://backend-service:8000/health
exit


############################################
# After successfully run fornted and backend port-forward then stop both and run ingress
# STEP 6: If PORT-FORWARD WORKS → ENABLE INGRESS
############################################

# (Minikube only)
minikube addons enable ingress

# Verify ingress controller pods
kubectl get pods -n ingress-nginx


############################################
# STEP 7: APPLY INGRESS RESOURCE
############################################

kubectl apply -f k8s/ingress.yml

# Check ingress
kubectl get ingress
kubectl describe ingress glapp-ingress


############################################
# STEP 8: ACCESS APP VIA INGRESS
############################################

# Get Minikube IP
minikube ip

# Example:
# 192.168.49.2

# Update /etc/hosts
sudo nano /etc/hosts

# Add:
# 192.168.49.2   glameo.local


############################################
# STEP 9: TEST INGRESS
############################################

# Browser
http://glameo.local

# OR using curl
curl http://glameo.local

```

