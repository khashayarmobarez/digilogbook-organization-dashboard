pipeline {
    agent any

    stages {
        
        stage('Install') {
            steps {
                // bat 'corepack enable'
                // bat 'corepack prepare pnpm@latest-9 --activate'
                bat 'pnpm install'
            }
        }
        stage('Build') {
            steps {
                bat 'pnpm build'
            }
        }
    }
    
    post {
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
