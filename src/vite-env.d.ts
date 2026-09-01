/// <reference types="vite/client" />

interface ModelContextToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<unknown> | unknown;
  annotations?: { readOnlyHint?: boolean };
}

interface ModelContext {
  registerTool: (
    tool: ModelContextToolDefinition,
    options?: { signal?: AbortSignal; exposedTo?: string[] },
  ) => Promise<void> | void;
  getTools?: () => Promise<unknown[]>;
  executeTool?: (tool: unknown, input: string) => Promise<unknown>;
}

interface Document {
  modelContext?: ModelContext;
}

interface Navigator {
  modelContext?: ModelContext;
}
