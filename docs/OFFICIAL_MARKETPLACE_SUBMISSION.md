# Official Claude Code Marketplace Submission Guide

This document outlines how to submit GetCookies and GetMailer plugins to the official Claude Code marketplace (`claude-plugins-official`).

## Prerequisites

1. Plugins must be hosted in a public GitHub repository
2. Each plugin should be in its own directory or repo
3. Must include a valid `plugin.json` manifest
4. Should include documentation and examples

## Submission Process

### Option 1: Submit via Plugin Registry PR

1. Fork the official `claude-plugins-official` repository
2. Add your plugin entry to the registry
3. Submit a Pull Request with:
   - Plugin source (link to GitHub repo)
   - Description and keywords
   - Screenshots/demos if applicable

### Option 2: Submit via Plugin Submission Form

Visit https://code.claude.com/plugins/submit and provide:
- Plugin GitHub URL
- Author information
- Category tags
- Brief description

## Plugin Requirements for Official Marketplace

### Required Files
```
plugin-name/
├── .claude-plugin/
│   └── plugin.json          # Required: Plugin manifest
├── README.md                 # Required: Documentation
├── LICENSE                   # Required: License file
├── commands/                 # Slash commands (if any)
├── skills/                   # Agent skills (if any)
└── mcp/                      # MCP server (if any)
```

### plugin.json Requirements
- `name`: Unique plugin identifier (lowercase, hyphens only)
- `displayName`: Human-readable name
- `description`: Clear description of functionality
- `version`: Semantic versioning (e.g., "1.0.0")
- `author`: Name, email, and optional URL
- `repository`: GitHub repository URL
- `license`: SPDX license identifier
- `keywords`: Array of relevant tags

### Quality Guidelines
- Clear documentation with examples
- No hardcoded secrets
- Proper error handling
- Tested on latest Claude Code version
- Follows Claude Code plugin best practices

## GetCookies Submission

**Repository:** `github.com/hatlem/getcookies-claude-plugin`

**Category:** Privacy & Compliance

**Description:**
Cookie consent management plugin for Claude Code. Scan websites for cookies, configure consent banners, and ensure GDPR/CCPA compliance directly from your IDE.

**Keywords:** privacy, gdpr, ccpa, cookies, consent, compliance, widget

## GetMailer Submission

**Repository:** `github.com/hatlem/getmailer-claude-plugin`

**Category:** Developer Tools / Email

**Description:**
Email marketing and deliverability plugin for Claude Code. Send emails, manage templates, monitor reputation, and configure sending domains without leaving your IDE.

**Keywords:** email, marketing, smtp, templates, deliverability, transactional

## Post-Submission

After submission:
1. Anthropic reviews the plugin for security and quality
2. If approved, plugin appears in `/plugin` discovery
3. Users can install with: `/plugin install getcookies` or `/plugin install getmailer`
4. Monitor issues and update as needed

## Contact

For questions about official marketplace submission:
- Email: plugins@anthropic.com
- Discord: Claude Code community
