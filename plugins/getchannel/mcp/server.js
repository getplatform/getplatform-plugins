#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const API_BASE = process.env.GETCHANNEL_API_URL || "https://getchannel.co/api";
const API_KEY = process.env.GETCHANNEL_API_KEY;

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json", ...options.headers },
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

const server = new Server({ name: "getchannel", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler("tools/list", async () => ({
  tools: [
    { name: "getchannel_list_campaigns", description: "List all ad campaigns", inputSchema: { type: "object", properties: { platform: { type: "string", enum: ["google", "meta", "tiktok", "linkedin"] }, status: { type: "string", enum: ["active", "paused", "ended"] } } } },
    { name: "getchannel_get_campaign", description: "Get campaign details", inputSchema: { type: "object", properties: { campaign_id: { type: "string" } }, required: ["campaign_id"] } },
    { name: "getchannel_pause_campaign", description: "Pause a campaign", inputSchema: { type: "object", properties: { campaign_id: { type: "string" } }, required: ["campaign_id"] } },
    { name: "getchannel_resume_campaign", description: "Resume a campaign", inputSchema: { type: "object", properties: { campaign_id: { type: "string" } }, required: ["campaign_id"] } },
    { name: "getchannel_get_metrics", description: "Get performance metrics", inputSchema: { type: "object", properties: { campaign_id: { type: "string" }, period: { type: "string", default: "7d" } } } },
    { name: "getchannel_update_budget", description: "Update campaign budget", inputSchema: { type: "object", properties: { campaign_id: { type: "string" }, daily_budget: { type: "number" } }, required: ["campaign_id", "daily_budget"] } },
    { name: "getchannel_list_adsets", description: "List ad sets in a campaign", inputSchema: { type: "object", properties: { campaign_id: { type: "string" } }, required: ["campaign_id"] } },
    { name: "getchannel_generate_copy", description: "Generate ad copy suggestions", inputSchema: { type: "object", properties: { product: { type: "string" }, audience: { type: "string" }, tone: { type: "string" } }, required: ["product"] } }
  ]
}));

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;
  try {
    let result;
    switch (name) {
      case "getchannel_list_campaigns": result = await apiRequest(`/campaigns?${new URLSearchParams(args)}`); break;
      case "getchannel_get_campaign": result = await apiRequest(`/campaigns/${args.campaign_id}`); break;
      case "getchannel_pause_campaign": result = await apiRequest(`/campaigns/${args.campaign_id}/pause`, { method: "POST" }); break;
      case "getchannel_resume_campaign": result = await apiRequest(`/campaigns/${args.campaign_id}/resume`, { method: "POST" }); break;
      case "getchannel_get_metrics": result = await apiRequest(`/metrics?campaign_id=${args.campaign_id || ''}&period=${args.period || '7d'}`); break;
      case "getchannel_update_budget": result = await apiRequest(`/campaigns/${args.campaign_id}/budget`, { method: "PATCH", body: JSON.stringify({ daily_budget: args.daily_budget }) }); break;
      case "getchannel_list_adsets": result = await apiRequest(`/campaigns/${args.campaign_id}/adsets`); break;
      case "getchannel_generate_copy": result = await apiRequest(`/ai/generate-copy`, { method: "POST", body: JSON.stringify(args) }); break;
      default: throw new Error(`Unknown tool: ${name}`);
    }
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (error) { return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true }; }
});

const transport = new StdioServerTransport();
await server.connect(transport);
