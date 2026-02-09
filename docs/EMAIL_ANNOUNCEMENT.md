# Email Announcement Templates

## Subject Lines (A/B Test)

**Option A:** New: Manage [ProductName] from Claude Code
**Option B:** [ProductName] now has a Claude Code plugin
**Option C:** Skip the dashboard—use [ProductName] from your terminal

---

## Email Template (Personalize per product)

### For GetCookies Users

**Subject:** New: Manage GetCookies from Claude Code

Hi {firstName},

We just launched a Claude Code plugin for GetCookies!

Now you can scan websites for cookies, check compliance status, and configure consent banners—all without leaving your IDE.

**Quick Start:**
```
/marketplace add https://github.com/getplatform/getplatform-plugins
/plugin enable getcookies
/getcookies-scan yourdomain.com
```

**What you can do:**
• Scan domains for cookies and trackers
• Check GDPR/CCPA compliance status
• Configure consent widget settings
• Declare cookies and their purposes

Perfect for:
- Pre-launch compliance checks
- CI/CD pipeline integration
- Managing multiple sites

[Try the Plugin →](https://getcookies.co/integrations/claude-code)

Questions? Just reply to this email.

— The GetCookies Team

---

### For GetMailer Users

**Subject:** Send emails from your IDE with Claude Code

Hi {firstName},

Big news: GetMailer now has a Claude Code plugin!

Send test emails, manage templates, and check deliverability scores—all from your terminal.

**Quick Start:**
```
/marketplace add https://github.com/getplatform/getplatform-plugins
/plugin enable getmailer
/getmailer-send --to test@example.com --subject "Hello"
```

**What you can do:**
• Send transactional and test emails
• Create and preview templates
• Check sender reputation
• Verify domain DNS settings

No more switching between your code editor and email dashboard.

[Try the Plugin →](https://getmailer.co/integrations/claude-code)

— The GetMailer Team

---

### Generic Template (All Products)

**Subject:** New Claude Code integration for your GetPlatform tools

Hi {firstName},

We're excited to announce that your GetPlatform tools now integrate with Claude Code!

Manage your marketing stack directly from your IDE:

✅ **GetCookies** - Scan sites, check compliance
✅ **GetMailer** - Send emails, manage templates
✅ **GetChannel** - View campaigns, check metrics
✅ **GetPoas** - Calculate profitability
✅ **GetFeeder** - Sync product feeds
✅ **GetAnswers** - Query your knowledge base
✅ **CallTracker** - View call analytics
✅ **Leadyen** - Search for leads

**Install all plugins:**
```
/marketplace add https://github.com/getplatform/getplatform-plugins
```

Then enable the ones you need:
```
/plugin enable getcookies
/plugin enable getmailer
```

[View Documentation →](https://github.com/getplatform/getplatform-plugins)

Happy coding!

— The GetPlatform Team

---

## Segment Targeting

| Segment | Products to Highlight | Send Priority |
|---------|----------------------|---------------|
| Developers | All plugins | High |
| Marketing teams | GetMailer, GetChannel | Medium |
| E-commerce | GetFeeder, GetPoas | Medium |
| Sales teams | Leadyen, CallTracker | Medium |
| Compliance teams | GetCookies | High |

---

## Send Schedule

1. **Day 1:** Developers segment (most likely to use CLI)
2. **Day 3:** Compliance teams (GetCookies focus)
3. **Day 5:** Marketing teams (GetMailer, GetChannel)
4. **Day 7:** E-commerce (GetFeeder, GetPoas)
5. **Day 10:** Sales teams (Leadyen, CallTracker)

---

## Footer

```
You're receiving this because you're a [ProductName] user.
Unsubscribe | Manage Preferences

GetPlatform · [Address]
```
