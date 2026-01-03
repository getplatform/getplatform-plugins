# Introducing GetPlatform Plugins for Claude Code

**Manage your marketing stack without leaving your IDE**

We're excited to announce the release of 8 new Claude Code plugins for the GetPlatform suite of marketing and sales tools. Now you can manage cookie consent, send emails, run ad campaigns, track calls, and more—all from your terminal.

## What's Claude Code?

[Claude Code](https://code.claude.com) is Anthropic's CLI tool for AI-assisted development. With plugins, you can extend its capabilities to interact with external services directly from your IDE.

## The GetPlatform Plugin Suite

### Marketing & Compliance

**GetCookies** - Cookie consent management
```
/getcookies-scan example.com
/getcookies-compliance check
```

**GetMailer** - Email marketing & deliverability
```
/getmailer-send --to user@example.com --template welcome
/getmailer-reputation check
```

**GetChannel** - Multi-platform ad campaigns
```
/getchannel-campaigns list --platform google
/getchannel-metrics --last 7d
```

### Analytics & E-commerce

**GetPoas** - Profit on Ad Spend
```
/getpoas-calculate --campaign-id 123
```

**GetFeeder** - Product feed management
```
/getfeeder-sync google --validate
```

### Sales & Support

**GetAnswers** - AI knowledge base
```
/getanswers-ask "How do I reset my password?"
```

**CallTracker** - Call tracking & attribution
```
/calltracker-calls today --source google-ads
```

**Leadyen** - B2B sales intelligence
```
/leadyen-search "CTO fintech New York"
```

## Getting Started

Install all GetPlatform plugins with one command:

```bash
/marketplace add https://github.com/getplatform/getplatform-plugins
```

Then enable the plugins you need:

```bash
/plugin enable getcookies
/plugin enable getmailer
# ... etc
```

## Why IDE Integration?

1. **No context switching** - Stay in your flow while managing marketing tools
2. **AI-assisted workflows** - Claude helps you configure and troubleshoot
3. **Automation-friendly** - Script and automate marketing tasks
4. **Developer-first** - Built for technical teams who live in the terminal

## Open Source

All plugins are open source and available on GitHub:
https://github.com/getplatform/getplatform-plugins

We welcome contributions, bug reports, and feature requests!

## What's Next?

We're also submitting these plugins to the official Claude Code marketplace. Once approved, you'll be able to discover them directly in `/plugin > Discover`.

---

**Try it today:**

1. Install Claude Code: https://code.claude.com
2. Add our marketplace: `/marketplace add https://github.com/getplatform/getplatform-plugins`
3. Enable plugins and start managing your marketing stack from the terminal

Questions? Reach out at plugins@getplatform.co

---

*Published by GetPlatform - The marketing stack for modern teams*
