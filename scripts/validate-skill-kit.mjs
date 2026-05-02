import fs from "node:fs";
import path from "node:path";

const rootDir = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(process.cwd(), "products/hardless-skill-kit");

const manifestPath = path.join(rootDir, "manifests", "kit-manifest.json");
const namingPolicyPath = path.join(rootDir, "manifests", "naming-policy.json");

const fail = (message) => {
  console.error(`Validation failed: ${message}`);
  process.exit(1);
};

if (!fs.existsSync(rootDir)) {
  fail(`root directory not found: ${rootDir}`);
}

if (!fs.existsSync(manifestPath)) {
  fail(`missing manifest: ${manifestPath}`);
}

if (!fs.existsSync(namingPolicyPath)) {
  fail(`missing naming policy: ${namingPolicyPath}`);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const namingPolicy = JSON.parse(fs.readFileSync(namingPolicyPath, "utf8"));

if (!Array.isArray(manifest.requiredFiles) || manifest.requiredFiles.length === 0) {
  fail("kit-manifest.json must declare requiredFiles");
}

const missingFiles = manifest.requiredFiles.filter((relativePath) => {
  return !fs.existsSync(path.join(rootDir, relativePath));
});

if (missingFiles.length > 0) {
  fail(`missing required files:\n${missingFiles.join("\n")}`);
}

const forbiddenPatterns = Array.isArray(namingPolicy.forbiddenPatterns)
  ? namingPolicy.forbiddenPatterns
  : [];

const allowedExtensions = new Set([
  ".md",
  ".template",
  ".json",
  ".mjs"
]);

const collectedFiles = [];

const walk = (dirPath) => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".git") {
      continue;
    }

    if (entry.name === ".gitkeep") {
      continue;
    }

    const absolutePath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(absolutePath);
      continue;
    }

    collectedFiles.push(absolutePath);
  }
};

walk(rootDir);

const unsupportedFiles = collectedFiles.filter((filePath) => {
  const ext = path.extname(filePath);
  return !allowedExtensions.has(ext);
});

if (unsupportedFiles.length > 0) {
  fail(`unsupported file types found:\n${unsupportedFiles.join("\n")}`);
}

const violations = [];

for (const filePath of collectedFiles) {
  const ext = path.extname(filePath);
  if (!allowedExtensions.has(ext)) {
    continue;
  }

  const relativePath = path.relative(rootDir, filePath);
  if (relativePath === path.join("manifests", "naming-policy.json")) {
    continue;
  }

  const contents = fs.readFileSync(filePath, "utf8");
  for (const rawPattern of forbiddenPatterns) {
    const pattern = String(rawPattern).trim();
    if (pattern.length === 0) {
      continue;
    }
    const matcher = new RegExp(pattern, "i");
    if (matcher.test(contents)) {
      violations.push(`${relativePath} -> ${pattern}`);
    }
  }
}

if (violations.length > 0) {
  fail(`forbidden naming policy violations found:\n${violations.join("\n")}`);
}

const requiredTopLevelFiles = ["README.md", "SKILL.md"];
for (const filename of requiredTopLevelFiles) {
  if (!fs.existsSync(path.join(rootDir, filename))) {
    fail(`missing top-level file: ${filename}`);
  }
}

const indexTemplateDir = path.join(rootDir, "templates", "agents", "index");
if (fs.existsSync(indexTemplateDir)) {
  const missingIndexTargets = [];
  const indexTemplates = fs
    .readdirSync(indexTemplateDir)
    .filter((filename) => filename.endsWith(".md.template"));

  for (const filename of indexTemplates) {
    const indexPath = path.join(indexTemplateDir, filename);
    const contents = fs.readFileSync(indexPath, "utf8");
    const linkedPaths = [...contents.matchAll(/`(agents\/(?:rules|reference)\/[^`]+\.md)`/g)].map(
      (match) => match[1],
    );

    for (const linkedPath of linkedPaths) {
      const expectedTemplatePath = path.join(rootDir, "templates", `${linkedPath}.template`);
      if (!fs.existsSync(expectedTemplatePath)) {
        missingIndexTargets.push(`${path.relative(rootDir, indexPath)} -> ${linkedPath}`);
      }
    }
  }

  if (missingIndexTargets.length > 0) {
    fail(`index templates reference missing rule/reference templates:\n${missingIndexTargets.join("\n")}`);
  }
}

console.log("Hardless Skill Kit validation passed.");
