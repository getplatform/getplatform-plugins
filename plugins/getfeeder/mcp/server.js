#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const API_BASE = process.env.GETFEEDER_API_URL || "https://getfeeder.co/api";
const API_KEY = process.env.GETFEEDER_API_KEY;

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json", ...options.headers },
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

const server = new Server({ name: "getfeeder", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler("tools/list", async () => ({
  tools: [
    { name: "getfeeder_list_feeds", description: "List all product feeds", inputSchema: { type: "object", properties: {} } },
    { name: "getfeeder_sync_feed", description: "Trigger feed sync", inputSchema: { type: "object", properties: { feed_id: { type: "string" }, platform: { type: "string" }, force: { type: "boolean" } }, required: ["feed_id"] } },
    { name: "getfeeder_validate", description: "Validate feed products", inputSchema: { type: "object", properties: { feed_id: { type: "string" } }, required: ["feed_id"] } },
    { name: "getfeeder_status", description: "Get sync status", inputSchema: { type: "object", properties: { feed_id: { type: "string" } }, required: ["feed_id"] } },
    { name: "getfeeder_errors", description: "Get product errors", inputSchema: { type: "object", properties: { feed_id: { type: "string" }, platform: { type: "string" } }, required: ["feed_id"] } },
    { name: "getfeeder_product", description: "Get product details", inputSchema: { type: "object", properties: { product_id: { type: "string" } }, required: ["product_id"] } },
    { name: "getfeeder_update_product", description: "Update product data", inputSchema: { type: "object", properties: { product_id: { type: "string" }, data: { type: "object" } }, required: ["product_id", "data"] } }
  ]
}));

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;
  try {
    let result;
    switch (name) {
      case "getfeeder_list_feeds": result = await apiRequest(`/feeds`); break;
      case "getfeeder_sync_feed": result = await apiRequest(`/feeds/${args.feed_id}/sync`, { method: "POST", body: JSON.stringify(args) }); break;
      case "getfeeder_validate": result = await apiRequest(`/feeds/${args.feed_id}/validate`); break;
      case "getfeeder_status": result = await apiRequest(`/feeds/${args.feed_id}/status`); break;
      case "getfeeder_errors": result = await apiRequest(`/feeds/${args.feed_id}/errors?platform=${args.platform || ''}`); break;
      case "getfeeder_product": result = await apiRequest(`/products/${args.product_id}`); break;
      case "getfeeder_update_product": result = await apiRequest(`/products/${args.product_id}`, { method: "PATCH", body: JSON.stringify(args.data) }); break;
      default: throw new Error(`Unknown tool: ${name}`);
    }
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (error) { return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true }; }
});

const transport = new StdioServerTransport();
await server.connect(transport);
