# Claude Weather Tool Sample
This is a mock api intended for use in [openapi-mcp-server](https://github.com/snaggle-ai/openapi-mcp-server)

## Usage
- clone this repo

- run local server
```
$cd claude-weather-api
$touch .dev.vars

# add the following to .dev.vars
# BEARER_TOKEN=your_bearer_token

$pnpm install
$pnpm dev
```

- set up `claude_desktop_config.json`.

```json
  "mcpServers": {
    [...]
    "weather": {
      "command": "npx",
      "args": [
        "openapi-mcp-server",
        "http://localhost:8787/doc"
      ]
    }
  }
```

- Ask "What is the weather of Tokyo (or London)" on Claude Desktop.
