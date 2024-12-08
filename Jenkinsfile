pipeline {
    agent any

    stages {
        
        stage('Install') {
            steps {
                bat 'corepack enable'
                bat 'corepack prepare pnpm@latest-9 --activate'
                bat 'pnpm install'
            }
        }
        stage('Build') {
            steps {
                bat 'pnpm build'
            }
        }
        
        stage('Restart IIS App Pool') {
            steps {
                bat "C:/Windows/System32/inetsrv/appcmd.exe recycle apppool /apppool.name:\"DigiLogBook.Organization\""
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
