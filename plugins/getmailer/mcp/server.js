#!/usr/bin/env node

/**
 * GetMailer MCP Server
 *
 * Provides Claude Code with direct access to GetMailer API for:
 * - Sending emails
 * - Managing templates
 * - Monitoring reputation
 * - Domain verification
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const API_BASE = process.env.GETMAILER_API_URL || "https://getmailer.co/api";
const API_KEY = process.env.GETMAILER_API_KEY;

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.status}`);
  }

  return response.json();
}

const server = new Server(
  { name: "getmailer", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Define tools
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "getmailer_send_email",
      description: "Send an email via GetMailer",
      inputSchema: {
        type: "object",
        properties: {
          to: { type: "string", description: "Recipient email address" },
          from: { type: "string", description: "Sender email address" },
          subject: { type: "string", description: "Email subject" },
          html: { type: "string", description: "HTML content" },
          text: { type: "string", description: "Plain text content" },
          templateId: { type: "string", description: "Template ID to use" },
          variables: { type: "object", description: "Template variables" },
          testMode: { type: "boolean", description: "Enable test mode", default: false }
        },
        required: ["to", "subject"]
      }
    },
    {
      name: "getmailer_list_templates",
      description: "List all email templates",
      inputSchema: {
        type: "object",
        properties: {
          limit: { type: "number", description: "Number of templates to return", default: 20 },
          search: { type: "string", description: "Search query" }
        }
      }
    },
    {
      name: "getmailer_get_template",
      description: "Get a specific email template",
      inputSchema: {
        type: "object",
        properties: {
          template_id: { type: "string", description: "Template ID" }
        },
        required: ["template_id"]
      }
    },
    {
      name: "getmailer_create_template",
      description: "Create a new email template",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Template name" },
          subject: { type: "string", description: "Email subject" },
          html: { type: "string", description: "HTML content" },
          text: { type: "string", description: "Plain text content" }
        },
        required: ["name", "subject", "html"]
      }
    },
    {
      name: "getmailer_preview_template",
      description: "Preview a template with sample data",
      inputSchema: {
        type: "object",
        properties: {
          template_id: { type: "string", description: "Template ID" },
          variables: { type: "object", description: "Variables to substitute" }
        },
        required: ["template_id"]
      }
    },
    {
      name: "getmailer_get_reputation",
      description: "Get sending reputation and metrics",
      inputSchema: {
        type: "object",
        properties: {
          domain: { type: "string", description: "Specific domain to check" },
          days: { type: "number", description: "Number of days", default: 7 }
        }
      }
    },
    {
      name: "getmailer_list_domains",
      description: "List all configured sending domains",
      inputSchema: {
        type: "object",
        properties: {}
      }
    },
    {
      name: "getmailer_add_domain",
      description: "Add a new sending domain",
      inputSchema: {
        type: "object",
        properties: {
          domain: { type: "string", description: "Domain name to add" }
        },
        required: ["domain"]
      }
    },
    {
      name: "getmailer_verify_domain",
      description: "Verify domain DNS configuration",
      inputSchema: {
        type: "object",
        properties: {
          domain_id: { type: "string", description: "Domain ID to verify" }
        },
        required: ["domain_id"]
      }
    },
    {
      name: "getmailer_get_dns_records",
      description: "Get required DNS records for a domain",
      inputSchema: {
        type: "object",
        properties: {
          domain_id: { type: "string", description: "Domain ID" }
        },
        required: ["domain_id"]
      }
    },
    {
      name: "getmailer_get_email_status",
      description: "Get the delivery status of a sent email",
      inputSchema: {
        type: "object",
        properties: {
          email_id: { type: "string", description: "Email message ID" }
        },
        required: ["email_id"]
      }
    },
    {
      name: "getmailer_list_broadcasts",
      description: "List email broadcasts/campaigns",
      inputSchema: {
        type: "object",
        properties: {
          status: { type: "string", enum: ["draft", "scheduled", "sending", "sent"], description: "Filter by status" },
          limit: { type: "number", default: 20 }
        }
      }
    }
  ]
}));

// Handle tool calls
server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "getmailer_send_email":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest("/emails/send", { method: "POST", body: JSON.stringify(args) }), null, 2) }] };

      case "getmailer_list_templates":
        const templateUrl = args.search ? `/templates?search=${encodeURIComponent(args.search)}&limit=${args.limit || 20}` : `/templates?limit=${args.limit || 20}`;
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(templateUrl), null, 2) }] };

      case "getmailer_get_template":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(`/templates/${args.template_id}`), null, 2) }] };

      case "getmailer_create_template":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest("/templates", { method: "POST", body: JSON.stringify(args) }), null, 2) }] };

      case "getmailer_preview_template":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(`/templates/${args.template_id}/preview`, { method: "POST", body: JSON.stringify({ variables: args.variables || {} }) }), null, 2) }] };

      case "getmailer_get_reputation":
        const repUrl = args.domain ? `/reputation?domain=${args.domain}&days=${args.days || 7}` : `/reputation?days=${args.days || 7}`;
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(repUrl), null, 2) }] };

      case "getmailer_list_domains":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest("/domains"), null, 2) }] };

      case "getmailer_add_domain":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest("/domains", { method: "POST", body: JSON.stringify({ domain: args.domain }) }), null, 2) }] };

      case "getmailer_verify_domain":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(`/domains/${args.domain_id}/verify`, { method: "POST" }), null, 2) }] };

      case "getmailer_get_dns_records":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(`/domains/${args.domain_id}/dns`), null, 2) }] };

      case "getmailer_get_email_status":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(`/emails/${args.email_id}`), null, 2) }] };

      case "getmailer_list_broadcasts":
        const broadcastUrl = args.status ? `/broadcasts?status=${args.status}&limit=${args.limit || 20}` : `/broadcasts?limit=${args.limit || 20}`;
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(broadcastUrl), null, 2) }] };

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
  }
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
