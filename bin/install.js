#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const skillName = "witt-agent-workspace-builder";
const sourceRoot = path.resolve(__dirname, "..");
const defaultSkillsRoot = path.join(os.homedir(), ".agents", "skills");

function usage() {
  console.log(`Install ${skillName} into your local skills directory.

Usage:
  npx github:PENGLEI8686/${skillName}
  npx github:PENGLEI8686/${skillName} -- --force
  npx github:PENGLEI8686/${skillName} -- --dest /path/to/skills

Options:
  --dest <dir>   Skills root directory. Defaults to ~/.agents/skills
  --force        Overwrite an existing installation
  --help         Show this help
`);
}

function expandHome(inputPath) {
  if (inputPath === "~") {
    return os.homedir();
  }
  if (inputPath.startsWith("~/")) {
    return path.join(os.homedir(), inputPath.slice(2));
  }
  return inputPath;
}

function parseArgs(argv) {
  const options = {
    dest: defaultSkillsRoot,
    force: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--force" || arg === "-f") {
      options.force = true;
    } else if (arg === "--dest") {
      const value = argv[i + 1];
      if (!value) {
        throw new Error("--dest requires a directory path");
      }
      options.dest = path.resolve(expandHome(value));
      i += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function copyRecursive(source, target) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      if (entry === ".git" || entry === "node_modules" || entry === ".DS_Store") {
        continue;
      }
      copyRecursive(path.join(source, entry), path.join(target, entry));
    }
    return;
  }
  fs.copyFileSync(source, target);
}

function assertRequiredFiles(targetRoot) {
  const requiredFiles = [
    "SKILL.md",
    "references/templates.md",
    "agents/openai.yaml"
  ];

  const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(targetRoot, file)));
  if (missing.length > 0) {
    throw new Error(`Installation incomplete. Missing files: ${missing.join(", ")}`);
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage();
    return;
  }

  const installRoot = path.join(options.dest, skillName);
  if (fs.existsSync(installRoot)) {
    if (!options.force) {
      throw new Error(`${installRoot} already exists. Re-run with --force to overwrite.`);
    }
    fs.rmSync(installRoot, { recursive: true, force: true });
  }

  fs.mkdirSync(options.dest, { recursive: true });
  copyRecursive(sourceRoot, installRoot);
  assertRequiredFiles(installRoot);

  console.log(`Installed ${skillName} to ${installRoot}`);
  console.log("Restart Codex or use Force Reload Skills to pick it up.");
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
