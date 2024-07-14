HUSTL
### Vision

HUSTL is a decentralized application designed to empower the Web3 community by incentivizing users to solve queries and share their knowledge. By earning upvotes based on the quality of their answers, solution providers accumulate reputation scores. Unlike centralized platforms like Reddit, HUSTL leverages the power of the Stellar network to reward contributors with tokens, fostering engagement and knowledge-sharing in a decentralized environment. Our long-term vision includes enabling users to generate passive income or create a side hustle through their contributions, ultimately enriching their knowledge and the community as a whole.
### Tech Stack

    Frontend: React, JavaScript, TypeScript
    Backend: Express, Prisma, PostgreSQL
    Smart Contracts: Rust, Stellar SDK

### Features

    Decentralized query and solution platform
    Reputation system based on upvotes
    Token rewards on the Stellar network
    Potential for passive income

### Installation Prerequisites

Ensure you have the following installed on your machine:

    Node.js
    npm or yarn
    PostgreSQL

### Backend Setup

    Clone the Repository


    git clone https://github.com/kishore-mk/hustl.git
    cd hustl

### Install Backend Dependencies


cd backend
npm install

### Set Up Environment Variables

Create a .env file in the backend directory

### env

DATABASE_URL="postgresql://user:password@localhost:5432/hustldb"

### Migrate the Database


npx prisma migrate dev 

### Start the Backend Server

 cd backend

    npm run dev

Frontend Setup
    cd frontend
    npm install

cd ../frontend
npm install

### Start the Frontend Server

    

    npm start

### Smart Contracts Setup

    Install Rust

    Follow the instructions to install Rust from here.

    Install Stellar SDK

    Add the Stellar SDK to your project:

    cargo install stellar-sdk

### Build Smart Contracts
    deployed contract address CAJBGPTLMJ4VFTETMY5VPSA2C6IR4XK4S2EHU6O3GR5LFQIUWJSPBWOP

    cd ../contracts
    cargo build --release

### Deployment Prerequisites

    AWS, Heroku, or any preferred cloud service for deployment
    Docker (optional for containerized deployment)

### Deploying Backend

    Build Docker Image (Optional)

    sh

    cd backend
    docker build -t hustl-backend .

    Deploy to Cloud Service

    Follow your chosen cloud service’s instructions to deploy a Node.js application. If using Docker, push your Docker image to a container registry and deploy it from there.

### Deploying Frontend

    Build Frontend

    sh

    cd ../frontend
    npm run build

    Deploy to Cloud Service

    Follow your chosen cloud service’s instructions to deploy a static website. If using Docker, you can create a Docker image for the frontend and deploy it similarly to the backend.

### Deploying Smart Contracts

    Deploy Contracts to Stellar Network

    Follow the Stellar SDK documentation for deploying your smart contracts to the Stellar network. Ensure you have the necessary credentials and configurations for deploying to the network.

### Contribution

We welcome contributions from the community. To contribute:

    Fork the repository
    Create a new branch
    Make your changes
    Submit a pull request