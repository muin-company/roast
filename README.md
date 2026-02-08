# roast

AI code reviewer that roasts your code with humor and honesty.

[![npm version](https://badge.fury.io/js/@muin%2Froast.svg)](https://www.npmjs.com/package/@muin/roast)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/muinmomin/roast.svg?style=social)](https://github.com/muinmomin/roast)

## What is this?

`roast` is a CLI tool that uses Claude to review your code and deliver feedback that's accurate, funny, and useful. Think Gordon Ramsay meets your senior developer.

## Why use this?

**Before:**
```
You: "Is this code good?"
Brain: "Probably fine..."
*ships to production*
*everything breaks*
```

**After:**
```bash
$ roast bubble-sort.js
```
```
🔥 Oh boy, bubble sort in 2026? What's next, a floppy disk driver?

🔥 This function mutates the input array. That's like borrowing 
someone's car and returning it as a motorcycle.

💡 Use Array.prototype.toSorted() if you're on Node 20+
```

**Real problems:**
- Code reviews take days
- Teammates are too nice to be honest
- You're working solo with no feedback
- CI catches bugs after you commit
- Writing tests doesn't catch design issues

`roast` gives you instant, brutally honest feedback before you commit. Use roast mode for your own code, serious mode for team reviews.

## Installation

```bash
npm install -g @muin/roast
```

Or run without installing:
```bash
npx @muin/roast your-file.js
```

## Setup

Get your Anthropic API key at [console.anthropic.com](https://console.anthropic.com/settings/keys)

```bash
export ANTHROPIC_API_KEY="your-key-here"
```

Add to `~/.bashrc` or `~/.zshrc` to make it permanent.

## Usage

### Roast mode (default)
```bash
roast src/app.js
```

Output:
```
🔥 CODE ROAST 🔥
Victim: bubble-sort.js (JavaScript)
──────────────────────────────────────────────────

🔥 Oh boy, bubble sort in 2026? What's next, a floppy disk driver?

🔥 This function mutates the input array. That's like borrowing 
someone's car and returning it as a motorcycle.

💡 Use Array.prototype.toSorted() if you're on Node 20+, or 
at least clone the array first: const sorted = [...arr]

🔥 No input validation. Passing a string? Enjoy your runtime error.

✨ At least you got the algorithm right. It's bad, but it's 
correctly bad.

──────────────────────────────────────────────────
Roasted with ❤️  by Claude
```

### Serious mode
```bash
roast --serious src/app.js
```

Output:
```
📋 Professional Code Review
File: api-handler.js (JavaScript)
──────────────────────────────────────────────────

🚨 No input sanitization on user data - SQL injection risk

⚠️  Synchronous file operations will block the event loop

💡 Consider using async/await with fs.promises

✅ Good error handling structure

──────────────────────────────────────────────────
```

### Custom model
```bash
roast --model claude-opus-4 src/app.js
```

## Supported Languages

JavaScript, TypeScript, Python, Go, Rust, Java, C, C++, Ruby, PHP, Swift, Kotlin, Shell, SQL, HTML, CSS

## Options

```
-s, --serious          Professional review mode (no humor)
-m, --model <model>    AI model to use (default: claude-sonnet-4-5)
--no-color             Disable colors
-V, --version          Output version
-h, --help             Display help
```

## Examples

### Example 1: Quick file roast

```bash
$ roast src/utils/array-helpers.js

🔥 CODE ROAST 🔥
Victim: array-helpers.js (JavaScript)
──────────────────────────────────────────────────

🔥 You wrote a custom array flatten function? Array.flat() 
has been in JavaScript since 2019. ES2019 is not "too new."

🔥 uniqueArray uses indexOf in a loop - O(n²) complexity.
Set([...arr]) is O(n) and already built in.

💡 Half these functions are one-liners with modern JS:
   flatten: arr.flat()
   unique: [...new Set(arr)]
   last: arr.at(-1)

✨ At least they work correctly. But you've essentially 
reinvented lodash, poorly.

──────────────────────────────────────────────────
```

### Example 2: Serious mode for team PR review

```bash
$ roast --serious src/api/auth.ts

📋 Professional Code Review
File: auth.ts (TypeScript)
──────────────────────────────────────────────────

🚨 Password comparison using === instead of timing-safe compare
   Risk: Timing attacks could leak password information

⚠️  JWT secret loaded from process.env without fallback check
   Will crash on startup if JWTOSECRET is not set

💡 Consider using express-validator for input sanitization

✅ Good: Proper async/await usage throughout
✅ Good: TypeScript types are well-defined

⚠️  Token expiration set to 30 days - consider shorter duration
   for sensitive operations

──────────────────────────────────────────────────
```

### Example 3: Review from stdin (pipe or paste)

```bash
$ cat suspicious-code.py | roast

🔥 CODE ROAST 🔥
Victim: stdin (Python)
──────────────────────────────────────────────────

🔥 eval() on user input? That's not a security vulnerability,
that's a welcome mat for hackers.

🔥 Bare except: catches everything including KeyboardInterrupt.
You can't even Ctrl+C out of this disaster.

🔥 Global variables modified inside functions with no documentation.
Reading this code is like a mystery novel where the butler did it,
but also the gardener, and maybe the protagonist.

💡 Use ast.literal_eval() for safe evaluation, or better yet,
json.loads() if you're parsing data.

──────────────────────────────────────────────────
```

### Example 4: Git diff review before commit

```bash
$ git diff src/payment-processor.js | roast --serious

📋 Professional Code Review
──────────────────────────────────────────────────

🚨 Changed error handling to swallow exceptions silently
   Original code logged errors, new code hides them

⚠️  Removed input validation for transaction amount
   Could now process negative or NaN values

🚨 API timeout increased from 5s to 60s
   May cause cascading failures under load

Recommendation: These changes reduce system reliability.
Suggest reverting the exception handling changes.

──────────────────────────────────────────────────
```

### Example 5: Custom model for complex code

```bash
$ roast --model claude-opus-4 src/distributed-lock.go

🔥 CODE ROAST 🔥
Victim: distributed-lock.go (Go)
──────────────────────────────────────────────────

🔥 Your distributed lock implementation has a race condition
between checking and acquiring. Classic "check-then-act" bug.

🔥 Lock timeout is hardcoded to 10 seconds. Production load
spikes will turn this into a deadlock factory.

💡 Redis SETNX is atomic - use it directly instead of GET + SET.
Or better yet, use Redlock algorithm for multi-node safety.

🔥 Panic on Redis connection error. In distributed systems,
network failures are features, not exceptions.

✨ Good use of context for cancellation. That's the one part
that won't cause a 3 AM page.

──────────────────────────────────────────────────
```

## Real-World Scenarios

### Pre-commit sanity check
```bash
# About to commit that refactor you've been working on
$ git diff HEAD src/auth.js | roast

🔥 You're exporting the private key in plaintext? Bold strategy.

🔥 This regex will match "admin@evil.com" as a valid admin email.
Better tighten that up unless you're running a very open company.

💡 hash.compare() is async but you're not awaiting it. This will
always return true. Always. Every time. 100% authentication success rate!

# ...okay maybe I should test this first
```

### Reviewing that "quick fix" from 2am
```bash
$ roast src/hotfix-do-not-touch.js

🔥 File name is literally "do-not-touch.js" - that's a red flag
wrapped in another red flag

🔥 You're catching errors and logging "it broke lol". When production
is on fire, your logs will just say "it broke lol" repeated 50,000 times.

🔥 This setTimeout is set to 86400000ms. That's 24 hours. Hope nobody's
waiting for this response.

✨ The actual logic is... fine? But please, for the love of debugging,
add better error messages.
```

### Checking tutorial code before copy-paste
```bash
$ curl -s https://example.com/tutorial.js | roast

🔥 This tutorial is using var in 2026. It was written during the
Mesozoic Era and hasn't been updated since.

⚠️  jQuery is loaded from an HTTP URL. That's a mixed content warning
waiting to happen.

💡 Modern replacement using fetch() would be 10 lines and zero
dependencies. Just saying.
```

### The "I learned this yesterday" review
```bash
# Just picked up Rust, wrote first program
$ roast hello.rs --serious

📋 Professional Code Review
──────────────────────────────────────────────────

✅ Proper error handling with Result type

⚠️  .unwrap() on line 8 will panic on error. Consider using
    expect() with a meaningful message, or propagate with ?

💡 String ownership is correct, but you're cloning unnecessarily
   on line 12. Use a reference: &user_name

✅ Good use of match for control flow

Overall: Solid first program. Remove the unwrap() and you're good to go.
```

### Legacy code archaeology
```bash
$ roast legacy/customer-import-final-v3-NEW-USE-THIS.php

🔥 Based on the filename, this has been "final" at least 3 times.
That's not a good sign.

🔥 mysql_connect() was deprecated in PHP 5.5 (2013) and removed in
PHP 7 (2015). This code is old enough to vote.

🔥 SQL query is concatenating user input directly. This is how
Little Bobby Tables drops your database.

🔥 No password hashing - passwords stored in plaintext. In the
event of a breach, this is "directly to jail, do not pass go" territory.

💡 Complete rewrite recommended. Start fresh with PDO and password_hash().
This is beyond roasting, this needs a Viking funeral.
```

### Team code style check
```bash
# Check if the new junior's code matches your style
$ roast --serious src/components/UserCard.jsx

📋 Professional Code Review
──────────────────────────────────────────────────

⚠️  Component is 450 lines long. Consider splitting into smaller pieces.

⚠️  Inline styles instead of CSS modules/styled-components

💡 Three useState hooks could be combined into useReducer

✅ Proper PropTypes definitions

✅ Good accessibility attributes (aria-labels, roles)

⚠️  useEffect missing dependency 'userId' - will cause stale closures

Recommendation: Works, but needs refactoring before it grows larger.
```

---

### Example 12: SQL Query Optimization Check

```bash
$ roast --serious db/queries/user-analytics.sql

📋 Professional Code Review
File: user-analytics.sql (SQL)
──────────────────────────────────────────────────

🚨 SELECT * in a query that joins 4 tables - fetching unnecessary columns

⚠️  Missing index on users.created_at for WHERE clause
   Recommendation: CREATE INDEX idx_users_created_at ON users(created_at)

⚠️  Subquery in SELECT executes for every row (N+1 query pattern)
   Better: Move to JOIN or use window functions

💡 LIKE '%search%' cannot use indexes - consider full-text search

✅ Proper use of prepared statement placeholders

Estimated performance impact:
  Current: ~2500ms for 10k users
  Optimized: ~80ms with indexes + query refactor

──────────────────────────────────────────────────
```

---

### Example 13: Infrastructure as Code Review

```bash
$ roast --serious terraform/aws-infrastructure.tf

📋 Professional Code Review
File: aws-infrastructure.tf (Terraform)
──────────────────────────────────────────────────

🚨 AWS access keys hard-coded in provider block
   Security risk: Keys exposed in git history
   Fix: Use AWS_ACCESS_KEY_ID environment variable or IAM roles

⚠️  No backend configuration - state stored locally
   Risk: Team members will have conflicting state
   Recommendation: Use S3 backend with state locking via DynamoDB

⚠️  Security group allows 0.0.0.0/0 on port 22 (SSH)
   Recommendation: Restrict to specific IP ranges or VPN

💡 No resource tagging - difficult to track costs and ownership
   Add: tags = { Environment = var.environment, Team = "platform" }

✅ Good use of variables for reusable configuration

✅ Proper use of data sources for AMI lookups

──────────────────────────────────────────────────
```

---

### Example 14: Algorithm Complexity Check

```bash
$ roast --serious src/utils/sort-algorithms.js

📋 Professional Code Review
File: sort-algorithms.js (JavaScript)
──────────────────────────────────────────────────

🔥 Bubble sort has O(n²) complexity. For n=10,000 this is 100 million operations.

🔥 Nested loops on arrays - quadratic time complexity
   Current: ~5 seconds for 10k items
   Array.sort(): ~10ms for same input

💡 Modern alternatives:
   - array.sort() - built-in, O(n log n)
   - array.toSorted() - non-mutating (Node 20+)
   
   Only implement custom sort if you need:
   - Stable sort guarantee
   - Custom comparison logic
   - Memory constraints (in-place sorting)

⚠️  No input validation - passing non-array will crash

Benchmark comparison:
  bubbleSort(10k items): 5.2s
  Array.sort(10k items): 8ms
  650x slower

──────────────────────────────────────────────────
```

---

### Example 15: Docker Multi-Stage Build Review

```bash
$ roast --serious Dockerfile

📋 Professional Code Review
File: Dockerfile
──────────────────────────────────────────────────

✅ Good: Multi-stage build reduces final image size

⚠️  Running as root user - security risk
   Add: USER node (for Node.js apps)

⚠️  Installing devDependencies in production image
   Fix: npm ci --only=production

💡 Not using layer caching optimally
   Move COPY package*.json before npm install
   Prevents reinstalling deps when only code changes:
   
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .  # ← This layer changes often

⚠️  Base image is 'node:latest' - unpredictable
   Use specific version: node:20-alpine

✅ HEALTHCHECK defined - good for orchestration

Size optimization:
  Current: 1.2 GB
  Optimized: ~150 MB (alpine + production deps only)

──────────────────────────────────────────────────
```

---

### Example 16: GraphQL Schema Design

```bash
$ roast --serious api/schema.graphql

📋 Professional Code Review
File: schema.graphql (GraphQL)
──────────────────────────────────────────────────

⚠️  Deeply nested queries allowed (no depth limiting)
   Risk: Malicious queries can DoS your API
   Recommendation: Implement query depth limiting (max 5-7 levels)

⚠️  No pagination on User.posts field
   Returning all posts will become a performance issue
   Use: posts(first: Int, after: String): PostConnection

💡 Overly broad queries - User type exposes password field
   Security: Remove sensitive fields from public schema
   Or use @auth directive to restrict access

⚠️  No rate limiting mentioned
   GraphQL allows expensive queries - add query cost analysis

✅ Good: Proper use of nullable vs non-nullable fields

✅ Good: Custom scalar types for Email, URL

Example of dangerous query (currently allowed):
  query ExpensiveQuery {
    users {
      posts {
        comments {
          author {
            posts {
              comments { ... infinite nesting }
            }
          }
        }
      }
    }
  }

──────────────────────────────────────────────────
```

---

### Example 17: Shell Script Best Practices

```bash
$ roast --serious scripts/deploy.sh

📋 Professional Code Review
File: deploy.sh (Shell)
──────────────────────────────────────────────────

🚨 No 'set -euo pipefail' - script continues after errors
   Critical: Failed deployment steps go unnoticed

🚨 Using 'rm -rf' without path validation
   Risk: Variable expansion failure could delete wrong files
   Fix: if [ -z "$DIR" ]; then echo "Error"; exit 1; fi

⚠️  Secrets passed as command arguments (visible in ps output)
   Better: Use environment variables or secret management

⚠️  No logging - debugging failures will be difficult
   Add: exec > >(tee deploy.log) 2>&1

💡 Hardcoded server IPs - difficult to maintain
   Better: Read from config file or inventory

⚠️  SSH without explicit key specification
   Recommendation: ssh -i ~/.ssh/deploy_key user@server

Example of dangerous pattern:
  DIR=$1  # No validation!
  rm -rf $DIR/*  # If $1 is empty, this is: rm -rf /*

Recommended additions:
  #!/bin/bash
  set -euo pipefail  # Exit on error, undefined vars, pipe failures
  trap 'echo "Deploy failed"; exit 1' ERR  # Error handler

──────────────────────────────────────────────────
```

---

### Example 18: React Performance Anti-Patterns

```bash
$ roast src/components/Dashboard.tsx

🔥 CODE ROAST 🔥
Victim: Dashboard.tsx (TypeScript)
──────────────────────────────────────────────────

🔥 Creating functions inside render - new function every render.
   That's not memoization, that's memory allocation.

   // Bad:
   {data.map(item => <Item onClick={() => handleClick(item.id)} />)}
   
   // Good:
   {data.map(item => <Item onClick={handleClick} data={item} />)}

🔥 useEffect with empty dependency array fetching data. That's not
   "component did mount", that's "I don't understand React 18".
   Use a library (React Query, SWR) or at least handle cleanup.

🔥 Five separate useState hooks for form fields. You've basically
   reinvented a worse version of useReducer.

💡 Inline object props cause re-renders:
   style={{ margin: 10 }}  ← New object every render
   Define outside component or use useMemo

✨ At least you're using TypeScript. The types are loose, but
   it's better than nothing.

Performance impact: Rendering 100 items causes 500+ unnecessary
re-renders. React DevTools Profiler would show you this in flames
(pun intended).

──────────────────────────────────────────────────
```

---

### Example 19: API Design Review

```bash
$ roast --serious api-spec.yaml

📋 Professional Code Review
File: api-spec.yaml (OpenAPI)
──────────────────────────────────────────────────

⚠️  Inconsistent naming: GET /users but POST /user/create
   REST convention: POST /users

⚠️  No versioning in API paths
   Breaking changes will affect existing clients
   Use: /v1/users or /api/v1/users

🚨 Passwords in query parameters: GET /login?password=...
   Security: Query params logged in browser history and server logs
   Use: POST with JSON body

⚠️  No rate limiting documented
   Add headers: X-RateLimit-Limit, X-RateLimit-Remaining

💡 PUT /users/:id allows partial updates
   HTTP semantics: PUT = full replace, PATCH = partial update

⚠️  Error responses lack consistent structure
   Recommendation:
   {
     "error": {
       "code": "USER_NOT_FOUND",
       "message": "User with ID 123 not found"
     }
   }

✅ Good: Proper HTTP status codes (200, 201, 404, 500)

✅ Good: Request/response examples provided

──────────────────────────────────────────────────
```

---

### Example 20: Security Vulnerability Scan

```bash
$ roast --serious src/auth/login.php

📋 Professional Code Review
File: login.php (PHP)
──────────────────────────────────────────────────

🚨 CRITICAL: SQL injection vulnerability
   Line 15: "SELECT * FROM users WHERE email='$email'"
   Fix: Use prepared statements with PDO or MySQLi

🚨 CRITICAL: Password stored in plaintext
   Line 42: if ($password == $row['password'])
   Fix: Use password_hash() and password_verify()

🚨 Session fixation vulnerability
   Missing session_regenerate_id() after login
   Attacker can hijack sessions

🚨 No CSRF protection on login form
   Add CSRF token validation

⚠️  Credentials in error messages
   "Login failed for user@example.com" - reveals valid emails
   Generic message: "Invalid credentials"

⚠️  No rate limiting - brute force attack possible
   Implement: max 5 attempts per 15 minutes per IP

Security score: 2/10
Recommendation: Complete rewrite required

──────────────────────────────────────────────────
```

## Advanced Features

### Comparing Before/After Code

```bash
# Before refactor
$ git show HEAD~1:src/app.js | roast

# After refactor
$ roast src/app.js

# Or compare directly
$ git diff HEAD~1 src/app.js | roast --serious
```

---

### CI/CD Integration

**GitHub Actions:**

```yaml
# .github/workflows/code-review.yml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  roast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install roast
        run: npm install -g @muin/roast
      
      - name: Get changed files
        id: changed-files
        uses: tj-actions/changed-files@v35
      
      - name: Roast changed files
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          echo "## 🔥 AI Code Review" >> $GITHUB_STEP_SUMMARY
          for file in ${{ steps.changed-files.outputs.all_changed_files }}; do
            if [[ $file =~ \.(js|ts|py|go)$ ]]; then
              echo "### $file" >> $GITHUB_STEP_SUMMARY
              echo '```' >> $GITHUB_STEP_SUMMARY
              roast --serious "$file" >> $GITHUB_STEP_SUMMARY || true
              echo '```' >> $GITHUB_STEP_SUMMARY
            fi
          done
```

**GitLab CI:**

```yaml
# .gitlab-ci.yml
code_review:
  stage: test
  script:
    - npm install -g @muin/roast
    - git diff origin/main --name-only | grep -E '\.(js|ts|py)$' > changed_files.txt
    - |
      while read file; do
        echo "Reviewing $file"
        roast --serious "$file" || true
      done < changed_files.txt
  only:
    - merge_requests
```

---

### Pre-commit Hook

```bash
# .git/hooks/pre-commit
#!/bin/bash

echo "🔥 Running roast on staged files..."

# Get staged files
staged_files=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|ts|py|go|rs)$')

if [ -z "$staged_files" ]; then
  exit 0
fi

# Review each file
for file in $staged_files; do
  echo "Reviewing $file..."
  roast --serious "$file" > /tmp/roast-output.txt
  
  # Check for critical issues
  if grep -q "🚨" /tmp/roast-output.txt; then
    echo "❌ Critical issues found in $file:"
    cat /tmp/roast-output.txt
    echo ""
    read -p "Commit anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      exit 1
    fi
  fi
done

echo "✅ Code review complete"
```

---

### Custom Roast Styles

Create a `.roastrc` config file:

```json
{
  "style": "gordon-ramsay",
  "strictMode": false,
  "focusAreas": ["security", "performance", "maintainability"],
  "ignorePatterns": ["*.test.js", "*.spec.ts"],
  "customRules": [
    {
      "pattern": "console.log",
      "message": "console.log in production code? Really?",
      "severity": "warning"
    }
  ]
}
```

Use it:
```bash
$ roast --config .roastrc src/app.js
```

---

### Batch Processing

```bash
# Roast all JavaScript files in a directory
$ find src -name "*.js" -type f -exec roast --serious {} \; > code-review.txt

# Roast only modified files in last commit
$ git diff-tree --no-commit-id --name-only -r HEAD | xargs roast

# Roast files changed in a specific branch
$ git diff main..feature-branch --name-only | xargs roast --serious
```

---

### Output Formatting Options

```bash
# JSON output for parsing
$ roast --json src/app.js > review.json

# Markdown output for documentation
$ roast --format markdown src/app.js > REVIEW.md

# HTML report
$ roast --format html src/ > review.html

# Plain text (no colors, for logs)
$ roast --no-color src/app.js > review.log
```

---

## Roast Levels Explained

### Roast Mode (Default)
- Humorous but accurate
- Points out obvious mistakes with wit
- Best for: Solo development, learning, Twitter screenshots

### Serious Mode (`--serious`)
- Professional tone
- Security-focused
- Best for: Team reviews, PR comments, production code

### Custom Modes (via API)

```bash
# Educational mode - explain WHY things are wrong
$ roast --mode educational src/beginner-code.js

# Optimization mode - focus on performance
$ roast --mode performance src/slow-function.js

# Security audit mode
$ roast --mode security src/auth.js
```

## Tips

- **Share your roasts** - They're designed to be screenshot-friendly
- **Use serious mode for PRs** - Save the humor for your own code
- **Review before committing** - Catch bugs before your CI does
- **Roast legacy code** - Therapeutic and educational
- **Pipe from git diff** - Review only what changed: `git diff | roast`
- **Works with stdin** - `cat sketch.py | roast` or `pbpaste | roast`
- **Combine with linters** - Use alongside ESLint, Pylint for complete coverage
- **Set up automation** - Pre-commit hooks catch issues before they're committed
- **Don't take it personally** - The AI roasts code, not you
- **Learn from roasts** - Each roast is a mini code review lesson

## Contributing

Found a bug? Want to add a feature?

```bash
# Clone the repo
git clone https://github.com/muinmomin/roast.git
cd roast

# Install dependencies
npm install

# Test locally
npm link
roast test-file.js

# Run tests (if available)
npm test
```

Pull requests welcome! Please:
- Keep the humor sharp but not mean
- Add tests for new features
- Follow existing code style
- Update README if adding options

## License

MIT

## Credits

Built with:
- [Anthropic Claude](https://anthropic.com) - The AI doing the roasting
- [Commander.js](https://github.com/tj/commander.js) - CLI framework
- [Chalk](https://github.com/chalk/chalk) - Terminal colors

---

Made by [muin](https://github.com/muinmomin)

*Roast responsibly. Don't roast production code in public without permission.*
