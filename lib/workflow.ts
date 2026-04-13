import { Client, WorkflowClient } from "@upstash/workflow"
import config from "./config"


export const workflowClient = new Client({
  baseUrl: config.workflow.qstashUrl,
  enableTelemetry: true,
  token: config.workflow.qstashToken,
})