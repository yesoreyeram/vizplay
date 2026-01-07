# GitHub Actions Workflows

This directory contains automated workflows for the VizPlay project.

## Workflows

### 🔄 CI (`ci.yml`)
**Triggers**: Push to main/develop/claude branches, Pull Requests

**Jobs**:
- **Lint & Build**: Runs ESLint, TypeScript type checking, and builds the project
- **Security Audit**: Checks for npm package vulnerabilities

**Node Versions**: 20.x

**Artifacts**: Build output (retained for 7 days)

---

### 🔒 Security Scan (`security-scan.yml`)
**Triggers**:
- Daily at 2 AM UTC (scheduled)
- Manual dispatch
- Push to main when package files change

**Jobs**:
- **Dependency Audit**: Runs npm audit and checks for outdated packages
- **CodeQL Analysis**: Static code analysis for security vulnerabilities

**Permissions**: Requires security-events write access for CodeQL

---

### ✨ Code Quality (`code-quality.yml`)
**Triggers**: Pull Requests to main/develop

**Checks**:
- ESLint with code annotations
- Console statement detection (warns about console.log)
- Bundle size analysis
- TypeScript strict mode verification

---

## Badge Status

Add these badges to your README.md:

```markdown
![CI](https://github.com/yesoreyeram/vizplay/workflows/CI/badge.svg)
![Security Scan](https://github.com/yesoreyeram/vizplay/workflows/Security%20Scan/badge.svg)
![Code Quality](https://github.com/yesoreyeram/vizplay/workflows/Code%20Quality/badge.svg)
```

## Local Testing

To test workflows locally, you can use [act](https://github.com/nektos/act):

```bash
# Install act
brew install act  # macOS
# or
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run CI workflow locally
act pull_request -W .github/workflows/ci.yml

# Run security scan
act workflow_dispatch -W .github/workflows/security-scan.yml
```

## Workflow Configuration

All workflows use:
- Node.js 20.x
- npm ci for faster, reproducible installs
- Caching for node_modules to speed up builds

## Maintenance

- Workflows are automatically maintained via Dependabot
- Update Node.js version across all workflows when upgrading
- Review security scan results daily
