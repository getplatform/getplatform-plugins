#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const API_BASE = process.env.LEADYEN_API_URL || "https://leadyen.com/api";
const API_KEY = process.env.LEADYEN_API_KEY;

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json", ...options.headers },
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

const server = new Server({ name: "leadyen", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler("tools/list", async () => ({
  tools: [
    { name: "leadyen_search", description: "Search for leads", inputSchema: { type: "object", properties: { query: { type: "string" }, role: { type: "string" }, company: { type: "string" }, industry: { type: "string" }, company_size: { type: "string" }, limit: { type: "number" } } } },
    { name: "leadyen_enrich_contact", description: "Enrich contact data", inputSchema: { type: "object", properties: { email: { type: "string" }, linkedin_url: { type: "string" } } } },
    { name: "leadyen_enrich_company", description: "Enrich company data", inputSchema: { type: "object", properties: { domain: { type: "string" }, company_name: { type: "string" } } } },
    { name: "leadyen_list_sequences", description: "List outreach sequences", inputSchema: { type: "object", properties: {} } },
    { name: "leadyen_create_sequence", description: "Create outreach sequence", inputSchema: { type: "object", properties: { name: { type: "string" }, steps: { type: "array" } }, required: ["name"] } },
    { name: "leadyen_add_to_sequence", description: "Add leads to sequence", inputSchema: { type: "object", properties: { sequence_id: { type: "string" }, lead_ids: { type: "array" } }, required: ["sequence_id", "lead_ids"] } },
    { name: "leadyen_verify_email", description: "Verify email address", inputSchema: { type: "object", properties: { email: { type: "string" } }, required: ["email"] } },
    { name: "leadyen_find_email", description: "Find email for person", inputSchema: { type: "object", properties: { first_name: { type: "string" }, last_name: { type: "string" }, domain: { type: "string" } }, required: ["first_name", "last_name", "domain"] } }
  ]
}));

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;
  try {
    let result;
    switch (name) {
      case "leadyen_search": result = await apiRequest(`/search`, { method: "POST", body: JSON.stringify(args) }); break;
      case "leadyen_enrich_contact": result = await apiRequest(`/enrich/contact`, { method: "POST", body: JSON.stringify(args) }); break;
      case "leadyen_enrich_company": result = await apiRequest(`/enrich/company`, { method: "POST", body: JSON.stringify(args) }); break;
      case "leadyen_list_sequences": result = await apiRequest(`/sequences`); break;
      case "leadyen_create_sequence": result = await apiRequest(`/sequences`, { method: "POST", body: JSON.stringify(args) }); break;
      case "leadyen_add_to_sequence": result = await apiRequest(`/sequences/${args.sequence_id}/leads`, { method: "POST", body: JSON.stringify({ lead_ids: args.lead_ids }) }); break;
      case "leadyen_verify_email": result = await apiRequest(`/verify`, { method: "POST", body: JSON.stringify(args) }); break;
      case "leadyen_find_email": result = await apiRequest(`/find-email`, { method: "POST", body: JSON.stringify(args) }); break;
      default: throw new Error(`Unknown tool: ${name}`);
    }
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (error) { return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true }; }
});

const transport = new StdioServerTransport();
await server.connect(transport);
