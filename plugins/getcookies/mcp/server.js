#!/usr/bin/env node

/**
 * GetCookies MCP Server
 *
 * Provides Claude Code with direct access to GetCookies API for:
 * - Domain management
 * - Cookie scanning
 * - Widget configuration
 * - Compliance checking
 * - Consent analytics
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const API_BASE = process.env.GETCOOKIES_API_URL || "https://getcookies.co/api/v1";
const API_KEY = process.env.GETCOOKIES_API_KEY;

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
  { name: "getcookies", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Define tools
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "getcookies_list_domains",
      description: "List all domains in the GetCookies account",
      inputSchema: {
        type: "object",
        properties: {
          limit: { type: "number", description: "Number of domains to return", default: 20 }
        }
      }
    },
    {
      name: "getcookies_scan_domain",
      description: "Initiate a cookie scan for a domain",
      inputSchema: {
        type: "object",
        properties: {
          domain_id: { type: "string", description: "Domain ID to scan" }
        },
        required: ["domain_id"]
      }
    },
    {
      name: "getcookies_get_scan",
      description: "Get the status and results of a cookie scan",
      inputSchema: {
        type: "object",
        properties: {
          scan_id: { type: "string", description: "Scan ID to check" }
        },
        required: ["scan_id"]
      }
    },
    {
      name: "getcookies_get_cookies",
      description: "Get detected cookies from a scan",
      inputSchema: {
        type: "object",
        properties: {
          scan_id: { type: "string", description: "Scan ID to get cookies from" },
          category: { type: "string", description: "Filter by category (necessary, functional, analytics, marketing)" }
        },
        required: ["scan_id"]
      }
    },
    {
      name: "getcookies_get_widget",
      description: "Get widget configuration for a domain",
      inputSchema: {
        type: "object",
        properties: {
          domain_id: { type: "string", description: "Domain ID" }
        },
        required: ["domain_id"]
      }
    },
    {
      name: "getcookies_configure_widget",
      description: "Configure the consent widget for a domain",
      inputSchema: {
        type: "object",
        properties: {
          domain_id: { type: "string", description: "Domain ID" },
          position: { type: "string", enum: ["bottom", "bottom-left", "bottom-right", "top", "center"] },
          theme: { type: "string", enum: ["light", "dark", "custom"] },
          primary_color: { type: "string", description: "Primary color hex code" },
          compliance_mode: { type: "string", enum: ["gdpr", "ccpa", "tcf", "all"] }
        },
        required: ["domain_id"]
      }
    },
    {
      name: "getcookies_get_consent_stats",
      description: "Get consent statistics for a domain",
      inputSchema: {
        type: "object",
        properties: {
          domain_id: { type: "string", description: "Domain ID" },
          days: { type: "number", description: "Number of days to include", default: 30 }
        },
        required: ["domain_id"]
      }
    },
    {
      name: "getcookies_generate_declaration",
      description: "Generate a cookie declaration for privacy policy",
      inputSchema: {
        type: "object",
        properties: {
          domain_id: { type: "string", description: "Domain ID" },
          format: { type: "string", enum: ["html", "markdown", "json"], default: "markdown" }
        },
        required: ["domain_id"]
      }
    }
  ]
}));

// Handle tool calls
server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "getcookies_list_domains":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(`/domains?limit=${args.limit || 20}`), null, 2) }] };

      case "getcookies_scan_domain":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(`/domains/${args.domain_id}/scans`, { method: "POST" }), null, 2) }] };

      case "getcookies_get_scan":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(`/scans/${args.scan_id}`), null, 2) }] };

      case "getcookies_get_cookies":
        const url = args.category ? `/scans/${args.scan_id}/cookies?category=${args.category}` : `/scans/${args.scan_id}/cookies`;
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(url), null, 2) }] };

      case "getcookies_get_widget":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(`/domains/${args.domain_id}/widget`), null, 2) }] };

      case "getcookies_configure_widget":
        const { domain_id, ...config } = args;
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(`/domains/${domain_id}/widget`, { method: "POST", body: JSON.stringify(config) }), null, 2) }] };

      case "getcookies_get_consent_stats":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(`/domains/${args.domain_id}/consent-logs/stats?days=${args.days || 30}`), null, 2) }] };

      case "getcookies_generate_declaration":
        return { content: [{ type: "text", text: JSON.stringify(await apiRequest(`/domains/${args.domain_id}/declaration?format=${args.format || 'markdown'}`), null, 2) }] };

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
