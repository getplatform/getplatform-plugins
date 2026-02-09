# GetPlatform Plugins Distribution Plan

## 1. Official Claude Code Marketplace (Priority)

Submit to the official marketplace so plugins appear in `/plugin search`:

```bash
# Fork and submit PR to official marketplace
gh repo fork anthropics/claude-plugins-official
# Add our marketplace entry and submit PR
```

**Action**: Submit PR to https://github.com/anthropics/claude-plugins-official

---

## 2. Product Website Integration

Add "Claude Code Plugin" section to each product's website:

### Pages to Update:

| Product | URL | Add Plugin Section |
|---------|-----|-------------------|
| GetCookies | https://getcookies.co/integrations | ⬜ |
| GetMailer | https://getmailer.co/integrations | ⬜ |
| GetChannel | https://getchannel.co/integrations | ⬜ |
| GetPoas | https://getpoas.com/integrations | ⬜ |
| GetFeeder | https://getfeeder.co/integrations | ⬜ |
| GetAnswers | https://heyanswer.ai/integrations | ⬜ |
| CallTracker | https://calltracker.dev/integrations | ⬜ |
| Leadyen | https://leadyen.com/integrations | ⬜ |

### Suggested Copy:

```markdown
## Claude Code Integration

Manage [ProductName] directly from your IDE with our Claude Code plugin.

### Install
```
/marketplace add https://github.com/getplatform/getplatform-plugins
/plugin enable [pluginname]
```

### Features
- [Feature 1]
- [Feature 2]
- [Feature 3]
```

---

## 3. Documentation Sites

Add to each product's docs:

- `/docs/integrations/claude-code.md`
- Link from main integrations page
- Add to API documentation

---

## 4. GitHub Discoverability

### Add Topics to Repo:
```bash
gh repo edit getplatform/getplatform-plugins --add-topic claude-code,claude-code-plugin,mcp,ai-tools,developer-tools
```

### Cross-link from Product Repos:
Add to each product's README.md:
```markdown
## IDE Integration

📦 **Claude Code Plugin**: `/marketplace add https://github.com/getplatform/getplatform-plugins`
```

---

## 5. AI Directory Submissions

When submitting to AI directories (see AI_DIRECTORY_SUBMISSION.md), mention:

> "Includes Claude Code plugin for IDE integration"

This differentiates from competitors who don't have IDE plugins.

---

## 6. Social/Content Marketing

### Blog Posts:
- [ ] "Introducing GetPlatform Plugins for Claude Code"
- [ ] "Manage Your Ad Campaigns Without Leaving Your IDE"
- [ ] "Cookie Compliance Scanning from the Command Line"

### Social Posts:
- Twitter/X announcement
- LinkedIn for B2B products (Leadyen, CallTracker)
- Dev.to / Hashnode technical posts
- Reddit: r/ClaudeAI, r/programming, r/webdev

### Demo Videos:
- [ ] YouTube walkthrough of each plugin
- [ ] GIF demos for GitHub README

---

## 7. Developer Communities

Post announcements in:
- [ ] Claude Code Discord/Community (if exists)
- [ ] Anthropic developer forums
- [ ] Hacker News (Show HN)
- [ ] Product Hunt (as a collection)
- [ ] IndieHackers

---

## 8. Email Existing Users

Send announcement email to existing customers:

**Subject**: "New: Manage [Product] from Claude Code"

Highlight:
- No context switching
- AI-assisted workflows
- Quick commands

---

## Quick Start Checklist

1. [ ] Submit PR to official Claude Code marketplace
2. [ ] Add GitHub topics for discoverability
3. [ ] Add plugin section to product websites
4. [ ] Create blog announcement post
5. [ ] Tweet/post announcement
6. [ ] Email existing users
7. [ ] Submit to AI directories with plugin mention

---

## Tracking

| Channel | Date | Status | Results |
|---------|------|--------|---------|
| Official Marketplace PR | | ⬜ | |
| Product websites | | ⬜ | |
| GitHub topics | | ⬜ | |
| Blog post | | ⬜ | |
| Social announcement | | ⬜ | |
| Email campaign | | ⬜ | |
| AI directories | | ⬜ | |
