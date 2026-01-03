# GetMailer Plugin for Claude Code

Email marketing and deliverability directly in your IDE.

## Features

- **Send Emails** - Quick test and transactional emails
- **Manage Templates** - Create, edit, and preview templates
- **Monitor Reputation** - Track deliverability metrics
- **Configure Domains** - Set up DKIM, SPF, DMARC

## Installation

### From GetPlatform Marketplace
```
/plugin marketplace add hatlem/getplatform-plugins
/plugin install getmailer@getplatform
```

### From Official Marketplace (when approved)
```
/plugin install getmailer
```

## Commands

| Command | Description |
|---------|-------------|
| `/getmailer-send` | Send a test or transactional email |
| `/getmailer-template [action]` | Manage email templates |
| `/getmailer-reputation` | Check sending reputation |
| `/getmailer-domain [action]` | Manage sending domains |

## Configuration

Set your API key in environment or Claude settings:

```bash
export GETMAILER_API_KEY="your-api-key"
export GETMAILER_DEFAULT_FROM="noreply@yourdomain.com"
export GETMAILER_TEST_EMAIL="test@yourdomain.com"
```

Or in `.claude/settings.json`:
```json
{
  "env": {
    "GETMAILER_API_KEY": "your-api-key",
    "GETMAILER_DEFAULT_FROM": "noreply@yourdomain.com"
  }
}
```

## Examples

### Send a test email
```
/getmailer-send --to test@example.com --subject "Test"
```

### Create a template
```
/getmailer-template create welcome
```

### Check reputation
```
/getmailer-reputation
```

Output:
```
Reputation Score: 94/100 ✅

Metrics (7 days):
├── Delivery Rate: 98.5%
├── Bounce Rate: 0.8%
├── Open Rate: 24.3%
└── Click Rate: 3.2%

Status: Excellent - Full sending capacity
```

### Add a sending domain
```
/getmailer-domain add example.com
```

## MCP Tools

The plugin provides MCP tools for programmatic access:

- `getmailer_send_email` - Send emails
- `getmailer_list_templates` - List templates
- `getmailer_create_template` - Create template
- `getmailer_preview_template` - Preview with data
- `getmailer_get_reputation` - Get reputation
- `getmailer_list_domains` - List domains
- `getmailer_verify_domain` - Verify DNS

## Template Variables

Standard variables:
- `{{firstName}}`, `{{lastName}}` - Contact name
- `{{email}}` - Recipient email
- `{{unsubscribeUrl}}` - Unsubscribe link
- Custom variables as needed

## Requirements

- GetMailer account (https://getmailer.co)
- API key from GetMailer dashboard
- Claude Code 1.0+

## Links

- [GetMailer Website](https://getmailer.co)
- [API Documentation](https://getmailer.co/docs/api)
- [Support](mailto:support@getmailer.co)

## License

MIT
