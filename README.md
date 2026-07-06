# GetPlatform Plugins for Claude Code

Official Claude Code plugins for GetPlatform SaaS products.

## Available Plugins

### GetCookies
Cookie consent management platform integration:
- `/getcookies-scan` - Scan domains for cookies
- `/getcookies-widget` - Configure consent banners
- `/getcookies-compliance` - Check GDPR/CCPA compliance
- `/getcookies-declare` - Generate cookie declarations

### GetMailer
Email marketing & deliverability platform:
- `/getmailer-send` - Send test emails
- `/getmailer-template` - Create/manage email templates
- `/getmailer-reputation` - Check sending reputation
- `/getmailer-domain` - Verify sending domains

### Ad Effectiveness
Evaluate and brief advertising creative with System1 Group science (no product API required):
- Fame / Feeling / Fluency framework and 1–5 Star rating calibration
- Creative-brief template and evaluation rubric for assessing agency work
- AI-render video ad briefs (Higgsfield / Veo / Runway / Sora) as self-contained paste docs
- Right-brain / left-brain render scorecard to score every generated shot before spend

## Installation

### Add the GetPlatform Marketplace
```
/plugin marketplace add getplatform/getplatform-plugins
```

### Install Individual Plugins
```
/plugin install getcookies@getplatform
/plugin install getmailer@getplatform
```

### Install All Plugins
```
/plugin install getcookies@getplatform getmailer@getplatform
```

## Configuration

Both plugins require API keys. Set them in your environment or `.claude/settings.json`:

```json
{
  "env": {
    "GETCOOKIES_API_KEY": "your-getcookies-api-key",
    "GETMAILER_API_KEY": "your-getmailer-api-key"
  }
}
```

## Links

- [GetCookies](https://getcookies.co) - Cookie Consent Management
- [GetMailer](https://getmailer.co) - Email Marketing Platform
- [GetPlatform](https://getplatform.co) - SaaS Venture Studio

## License

MIT
