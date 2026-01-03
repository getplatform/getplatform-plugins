#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const API_BASE = process.env.GETPOAS_API_URL || "https://getpoas.com/api";
const API_KEY = process.env.GETPOAS_API_KEY;

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json", ...options.headers },
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

const server = new Server({ name: "getpoas", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler("tools/list", async () => ({
  tools: [
    { name: "getpoas_calculate", description: "Calculate POAS for campaigns/products", inputSchema: { type: "object", properties: { campaign_id: { type: "string" }, product_id: { type: "string" }, period: { type: "string", default: "30d" } } } },
    { name: "getpoas_report", description: "Generate profitability report", inputSchema: { type: "object", properties: { period: { type: "string" }, group_by: { type: "string", enum: ["campaign", "product", "channel"] } } } },
    { name: "getpoas_set_costs", description: "Set product costs (COGS)", inputSchema: { type: "object", properties: { product_id: { type: "string" }, cogs: { type: "number" }, shipping: { type: "number" } }, required: ["product_id", "cogs"] } },
    { name: "getpoas_alerts", description: "Manage profitability alerts", inputSchema: { type: "object", properties: { action: { type: "string", enum: ["list", "create", "delete"] }, threshold: { type: "number" }, campaign_id: { type: "string" } } } },
    { name: "getpoas_trends", description: "View POAS trends over time", inputSchema: { type: "object", properties: { period: { type: "string" }, granularity: { type: "string", enum: ["daily", "weekly", "monthly"] } } } }
  ]
}));

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;
  try {
    let result;
    switch (name) {
      case "getpoas_calculate": result = await apiRequest(`/calculate?${new URLSearchParams(args)}`); break;
      case "getpoas_report": result = await apiRequest(`/reports?${new URLSearchParams(args)}`); break;
      case "getpoas_set_costs": result = await apiRequest(`/products/${args.product_id}/costs`, { method: "PUT", body: JSON.stringify(args) }); break;
      case "getpoas_alerts": result = await apiRequest(`/alerts`, { method: args.action === "list" ? "GET" : "POST", body: args.action !== "list" ? JSON.stringify(args) : undefined }); break;
      case "getpoas_trends": result = await apiRequest(`/trends?${new URLSearchParams(args)}`); break;
      default: throw new Error(`Unknown tool: ${name}`);
    }
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (error) { return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true }; }
});

const transport = new StdioServerTransport();
await server.connect(transport);
