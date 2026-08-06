# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| latest (`medical-ai` branch) | ✅ |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in CLERIFYMED, email us directly:

📧 **siyammalik188@gmail.com**

Include in your report:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fix (optional)

You will receive a response within **48 hours**. We will work with you to understand and resolve the issue before any public disclosure.

## Security Considerations

CLERIFYMED handles medical documents (lab reports) which may contain personal health information (PHI). We take this seriously:

- All API routes require authentication via httpOnly JWT cookies
- Analyses are scoped strictly to the authenticated user — no cross-user data access
- Passwords are hashed with bcrypt
- Login attempts are rate-limited per IP + email
- No credentials are stored in source control

## Dependency Security

This project uses Dependabot to automatically flag known vulnerabilities in dependencies. See `.github/dependabot.yml`.
