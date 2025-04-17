# Coding Quiz App with GitHub Actions CI/CD

A full-stack application that demonstrates GitHub Actions CI/CD integration with Cypress component testing and automated deployment to Render.

## Setup Instructions

### 1. Repository Setup

1. Create a repository on GitHub
2. Push the code to your repository
3. Create a `develop` branch:
   ```
   git checkout -b develop
   git push -u origin develop
   ```

### 2. Set Up MongoDB Atlas

1. Sign up for a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account
2. Create a new cluster (free tier is fine)
3. Set up a database user with password
4. Add your IP to the allowlist (or allow access from anywhere for development)
5. Get your connection string by clicking "Connect" > "Connect your application"
6. Your connection string will look like: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`
7. Replace `<username>`, `<password>`, `<cluster>`, and `<database>` with your information

### 3. Deploy to Render

1. Sign up for a [Render](https://render.com/) account
2. Create a new Web Service
3. Connect your GitHub repository to Render
4. Configure the Web Service:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add environment variables:
     - Key: `MONGODB_URI`
     - Value: Your MongoDB Atlas connection string
5. After deployment, turn off Auto-Deploy in the Render settings
6. Copy the Render Deploy Hook URL from Settings

### 3. Configure GitHub Secrets

1. In your GitHub repository, go to Settings > Secrets and variables > Actions
2. Add a new repository secret:
   - Name: `RENDER_DEPLOY_HOOK_URL`
   - Value: The Render Deploy Hook URL you copied in the previous step

### 4. CI/CD Workflow

The GitHub Actions workflows are already configured in the `.github/workflows` directory:

- `cypress-tests.yml`: Runs Cypress component tests when a PR is made to the `develop` branch
- `render-deploy.yml`: Deploys the application to Render when code is merged to the `main` branch

### 5. Development Workflow

1. Create feature branches from `develop` for new features
2. Open PRs to the `develop` branch
3. GitHub Actions will run Cypress tests on your PR
4. After successful tests, merge to `develop`
5. When ready for production, merge `develop` to `main` to trigger deployment

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Testing**: Cypress
- **CI/CD**: GitHub Actions
- **Deployment**: Render

## Available Scripts

- `npm install`: Install dependencies
- `npm run develop`: Run the app in development mode
- `npm run build`: Build the app for production
- `npm run test-component`: Run Cypress component tests
- `npm run test-gui`: Open Cypress test runner