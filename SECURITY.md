# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < Latest | :x:               |

## Reporting a Vulnerability

If you discover a security vulnerability in Flora Atlas, please report it responsibly.

**Please do NOT open a public GitHub issue for security vulnerabilities.**

### How to Report

1. **GitHub Private Vulnerability Reporting**: Use the [Security Advisories](https://github.com/WuSuBuDuoMing/flora-atlas/security/advisories/new) feature on GitHub for private disclosure.

2. **Email**: Send an email to WuSuBuDuoMing@users.noreply.github.com with:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact assessment
   - Any suggested fix (if applicable)

### What to Include

- **Description**: Clear description of the vulnerability
- **Steps to Reproduce**: How to trigger the vulnerability
- **Impact**: What an attacker could achieve
- **Environment**: Node.js version, OS, browser (if relevant)

### Response Timeline

| Severity | Initial Response | Fix Target |
|----------|-----------------|------------|
| Critical | 24-48 hours     | 7 days     |
| High     | 48-72 hours     | 14 days    |
| Medium   | 5-7 days        | 30 days    |
| Low      | 7-14 days       | Next release |

### What to Expect

- Acknowledgment of your report within the timeline above
- Updates on our progress toward a fix
- Credit in the release notes (unless you prefer to remain anonymous)
- A public disclosure coordinated with you after the fix is released

## Security Best Practices for Contributors

- Never commit API keys, tokens, or secrets to the repository
- Use environment variables for sensitive configuration
- Validate all user input on the server side
- Keep dependencies up to date (`npm audit`)
- Run `npm audit` before submitting PRs

## Acknowledgments

We thank the security research community for helping keep Flora Atlas safe for everyone.
