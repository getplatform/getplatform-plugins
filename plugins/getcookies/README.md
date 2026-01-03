# GetCookies Plugin for Claude Code

Cookie consent management directly in your IDE.

## Features

- **Scan Domains** - Detect cookies and tracking technologies
- **Configure Widgets** - Set up consent banners with customization
- **Check Compliance** - Verify GDPR, CCPA, and other regulations
- **Generate Declarations** - Create cookie policy documentation

## Installation

### From GetPlatform Marketplace
```
/plugin marketplace add getplatform/getplatform-plugins
/plugin install getcookies@getplatform
```

### From Official Marketplace (when approved)
```
/plugin install getcookies
```

## Commands

| Command | Description |
|---------|-------------|
| `/getcookies-scan [domain]` | Scan a domain for cookies |
| `/getcookies-widget [domain]` | Configure consent banner |
| `/getcookies-compliance [domain]` | Check regulatory compliance |
| `/getcookies-declare [domain]` | Generate cookie declaration |

## Configuration

Set your API key in environment or Claude settings:

```bash
export GETCOOKIES_API_KEY="your-api-key"
```

Or in `.claude/settings.json`:
```json
{
  "env": {
    "GETCOOKIES_API_KEY": "your-api-key"
  }
}
```

## Examples

### Scan your website
```
/getcookies-scan example.com
```

Output:
```
Domain: example.com
Cookies Found: 23
├── Necessary: 5
├── Analytics: 8
├── Marketing: 6
└── Unknown: 4

Recommendations:
- Classify 4 unknown cookies
- Add consent banner
```

### Generate embed code
```
/getcookies-widget example.com
```

### Check compliance
```
/getcookies-compliance example.com
```

## MCP Tools

The plugin also provides MCP tools for programmatic access:

- `getcookies_list_domains` - List all domains
- `getcookies_scan_domain` - Initiate a scan
- `getcookies_get_cookies` - Get detected cookies
- `getcookies_configure_widget` - Set widget config
- `getcookies_get_consent_stats` - Get analytics

## Requirements

- GetCookies account (https://getcookies.co)
- API key from GetCookies dashboard
- Claude Code 1.0+

## Links

- [GetCookies Website](https://getcookies.co)
- [API Documentation](https://getcookies.co/docs/api)
- [Support](mailto:support@getcookies.co)

## License

MIT
