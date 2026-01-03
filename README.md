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
