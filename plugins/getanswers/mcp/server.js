#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const API_BASE = process.env.GETANSWERS_API_URL || "https://heyanswer.ai/api";
const API_KEY = process.env.GETANSWERS_API_KEY;

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json", ...options.headers },
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

const server = new Server({ name: "getanswers", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler("tools/list", async () => ({
  tools: [
    { name: "getanswers_ask", description: "Ask a question", inputSchema: { type: "object", properties: { question: { type: "string" }, kb_id: { type: "string" } }, required: ["question"] } },
    { name: "getanswers_list_kbs", description: "List knowledge bases", inputSchema: { type: "object", properties: {} } },
    { name: "getanswers_add_source", description: "Add content source", inputSchema: { type: "object", properties: { kb_id: { type: "string" }, url: { type: "string" }, content: { type: "string" } }, required: ["kb_id"] } },
    { name: "getanswers_list_sources", description: "List sources in KB", inputSchema: { type: "object", properties: { kb_id: { type: "string" } }, required: ["kb_id"] } },
    { name: "getanswers_train", description: "Trigger KB training", inputSchema: { type: "object", properties: { kb_id: { type: "string" } }, required: ["kb_id"] } },
    { name: "getanswers_analytics", description: "Get question analytics", inputSchema: { type: "object", properties: { kb_id: { type: "string" }, period: { type: "string" } } } },
    { name: "getanswers_unanswered", description: "Get unanswered questions", inputSchema: { type: "object", properties: { kb_id: { type: "string" } }, required: ["kb_id"] } }
  ]
}));

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;
  try {
    let result;
    switch (name) {
      case "getanswers_ask": result = await apiRequest(`/ask`, { method: "POST", body: JSON.stringify(args) }); break;
      case "getanswers_list_kbs": result = await apiRequest(`/knowledge-bases`); break;
      case "getanswers_add_source": result = await apiRequest(`/knowledge-bases/${args.kb_id}/sources`, { method: "POST", body: JSON.stringify(args) }); break;
      case "getanswers_list_sources": result = await apiRequest(`/knowledge-bases/${args.kb_id}/sources`); break;
      case "getanswers_train": result = await apiRequest(`/knowledge-bases/${args.kb_id}/train`, { method: "POST" }); break;
      case "getanswers_analytics": result = await apiRequest(`/analytics?${new URLSearchParams(args)}`); break;
      case "getanswers_unanswered": result = await apiRequest(`/knowledge-bases/${args.kb_id}/unanswered`); break;
      default: throw new Error(`Unknown tool: ${name}`);
    }
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (error) { return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true }; }
});

const transport = new StdioServerTransport();
await server.connect(transport);
