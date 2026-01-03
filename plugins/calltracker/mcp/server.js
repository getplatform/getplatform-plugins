#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const API_BASE = process.env.CALLTRACKER_API_URL || "https://calltracker.dev/api";
const API_KEY = process.env.CALLTRACKER_API_KEY;

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json", ...options.headers },
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

const server = new Server({ name: "calltracker", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler("tools/list", async () => ({
  tools: [
    { name: "calltracker_list_calls", description: "List recent calls", inputSchema: { type: "object", properties: { period: { type: "string" }, status: { type: "string" }, limit: { type: "number" } } } },
    { name: "calltracker_get_call", description: "Get call details", inputSchema: { type: "object", properties: { call_id: { type: "string" } }, required: ["call_id"] } },
    { name: "calltracker_list_numbers", description: "List tracking numbers", inputSchema: { type: "object", properties: {} } },
    { name: "calltracker_create_number", description: "Create tracking number", inputSchema: { type: "object", properties: { name: { type: "string" }, forward_to: { type: "string" }, source: { type: "string" } }, required: ["name", "forward_to"] } },
    { name: "calltracker_analytics", description: "Get call analytics", inputSchema: { type: "object", properties: { period: { type: "string" }, group_by: { type: "string" } } } },
    { name: "calltracker_attribution", description: "Get attribution report", inputSchema: { type: "object", properties: { period: { type: "string" } } } },
    { name: "calltracker_recording", description: "Get call recording", inputSchema: { type: "object", properties: { call_id: { type: "string" } }, required: ["call_id"] } }
  ]
}));

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;
  try {
    let result;
    switch (name) {
      case "calltracker_list_calls": result = await apiRequest(`/calls?${new URLSearchParams(args)}`); break;
      case "calltracker_get_call": result = await apiRequest(`/calls/${args.call_id}`); break;
      case "calltracker_list_numbers": result = await apiRequest(`/numbers`); break;
      case "calltracker_create_number": result = await apiRequest(`/numbers`, { method: "POST", body: JSON.stringify(args) }); break;
      case "calltracker_analytics": result = await apiRequest(`/analytics?${new URLSearchParams(args)}`); break;
      case "calltracker_attribution": result = await apiRequest(`/attribution?${new URLSearchParams(args)}`); break;
      case "calltracker_recording": result = await apiRequest(`/calls/${args.call_id}/recording`); break;
      default: throw new Error(`Unknown tool: ${name}`);
    }
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (error) { return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true }; }
});

const transport = new StdioServerTransport();
await server.connect(transport);
