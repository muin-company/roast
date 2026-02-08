# roast

AI code reviewer that roasts your code with humor and honesty.

[![npm version](https://badge.fury.io/js/@muin%2Froast.svg)](https://www.npmjs.com/package/@muin/roast)
[![npm downloads](https://img.shields.io/npm/dm/@muin/roast.svg)](https://www.npmjs.com/package/@muin/roast)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/@muin/roast.svg)](https://nodejs.org)
[![GitHub stars](https://img.shields.io/github/stars/muinmomin/roast.svg?style=social)](https://github.com/muinmomin/roast)
[![GitHub issues](https://img.shields.io/github/issues/muinmomin/roast.svg)](https://github.com/muinmomin/roast/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/muinmomin/roast/pulls)

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

JavaScript, TypeScript, Python, Go, Rust, Java, C, C++, Ruby, PHP, Swift, Kotlin, Shell, SQL, HTML, CSS, and more.

## Options

```
-s, --serious              Professional review mode (no humor)
--severity <level>         Roast severity: mild, medium, harsh (default: medium)
-m, --model <model>        AI model to use (default: claude-sonnet-4-5)
--no-color                 Disable colors
-V, --version              Output version
-h, --help                 Display help
```

### Severity Levels

**Mild** (😊 Be Nice Mode): Friendly, encouraging feedback. Perfect for beginners or when you want constructive criticism with a supportive tone.
```bash
roast --severity mild src/app.js
```

**Medium** (🔥 Default): Balanced mix of humor and criticism. Sarcastic but helpful, like a senior dev at code review.
```bash
roast src/app.js
# or explicitly:
roast --severity medium src/app.js
```

**Harsh** (💀 No Mercy): Brutally honest, savage roasts. Only use this if you can handle the truth. Gordon Ramsay mode.
```bash
roast --severity harsh src/app.js
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
   Will crash on startup if JWT_SECRET is not set

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

---

### Example 6: Mild severity for learning

```bash
$ roast --severity mild beginner-script.py

😊 Friendly Code Review
Victim: beginner-script.py (Python)
──────────────────────────────────────────────────

💡 Great start! Your code works, which is the most important part.

💛 Small improvement: Instead of opening files without 'with',
   try using context managers:
   
   with open('file.txt', 'r') as f:
       data = f.read()
   
   This automatically closes the file for you!

💡 You're using global variables. As your program grows,
   consider passing data as function parameters instead.

✨ Your variable names are clear and descriptive. Keep that up!

──────────────────────────────────────────────────
```

---

### Example 7: Harsh mode for reality check

```bash
$ roast --severity harsh legacy-spaghetti.php

💀 BRUTAL CODE ROAST 💀
Victim: legacy-spaghetti.php (PHP)
──────────────────────────────────────────────────

💀 This code is a war crime. The Geneva Convention should cover this.

💀 mysql_* functions were deprecated 11 years ago. This isn't
   legacy code, it's a fossil.

💀 SQL injection vulnerabilities everywhere. You're concatenating
   user input into queries like it's 1999. It was bad in 1999 too.

💀 Password stored in plaintext. Just... why? WHY?!

💀 4 levels of nested if statements with no clear logic. This is
   a crime scene where the detective gave up and went home.

💀 Variable names like $a, $tmp, $data2. Were descriptive names
   too expensive?

Reality check: This needs a complete rewrite. I'm not even sure
where to start. Maybe with fire.

──────────────────────────────────────────────────
Roasted with absolute honesty by Claude
```

---

### Example 8: TypeScript React component

```bash
$ roast src/components/UserDashboard.tsx

🔥 CODE ROAST 🔥
Victim: UserDashboard.tsx (TypeScript/React)
──────────────────────────────────────────────────

🔥 850 lines in one component. This isn't a component, it's a
   monolith. Break it down before it breaks you.

🔥 useEffect with 12 dependencies? That's not reactive programming,
   that's chaos with extra steps.

💡 Extract at least 4 sub-components:
   - UserHeader
   - ActivityFeed  
   - SettingsPanel
   - NotificationCenter

🔥 Inline styles everywhere instead of styled-components or CSS modules.
   Your future self will hate present you.

✨ Props are properly typed. That's good! Now use that discipline
   everywhere else.

──────────────────────────────────────────────────
```

---

### Example 9: Shell script review

```bash
$ roast deploy.sh

🔥 CODE ROAST 🔥
Victim: deploy.sh (Shell)
──────────────────────────────────────────────────

🔥 No 'set -e' at the top. If step 1 fails, steps 2-10 will
   still run and cause chaos.

🔥 rm -rf without any confirmation? Living dangerously, I see.

💡 Add error handling:
   set -euo pipefail
   
   This will:
   - Exit on error (e)
   - Fail on undefined variables (u)
   - Catch errors in pipes (pipefail)

🔥 Hardcoded paths and credentials. Use environment variables:
   ${DB_HOST:-localhost}

✨ At least you have comments. That's rare for shell scripts.

──────────────────────────────────────────────────
```

---

### Example 10: SQL query review

```bash
$ roast db/queries.sql

🔥 CODE ROAST 🔥
Victim: queries.sql (SQL)
──────────────────────────────────────────────────

🔥 SELECT * in production queries. Your DBA is crying somewhere.
   List the exact columns you need.

🔥 No indexes on the WHERE clause columns. This will be fast now
   with 100 rows. With 1,000,000 rows? Enjoy your 30-second queries.

💡 Add indexes:
   CREATE INDEX idx_users_email ON users(email);
   CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);

🔥 LEFT JOIN without understanding why. If you need all rows from
   both tables, that's a FULL JOIN (or you don't actually need all rows).

✨ Query is at least readable and properly formatted.

──────────────────────────────────────────────────
```

---

### Example 11: Rust code review

```bash
$ roast src/main.rs

🔥 CODE ROAST 🔥
Victim: main.rs (Rust)
──────────────────────────────────────────────────

🔥 .unwrap() everywhere. You learned Rust yesterday, didn't you?

💡 Use proper error handling:
   // Instead of:
   let file = File::open("data.txt").unwrap();
   
   // Use:
   let file = File::open("data.txt")?;
   // or
   let file = File::open("data.txt")
       .expect("Failed to open data.txt");

🔥 Cloning everything to avoid fighting the borrow checker.
   That's like buying a sports car and only driving in first gear.

✨ You're using match instead of if-let. Good! Pattern matching
   is the way.

💡 Learn lifetimes. They're scary at first, but they'll save you
   from these clones.

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

## Use Cases

### 1. **Solo Developer - Be Your Own Code Reviewer**

Working alone? No team to review your code? `roast` fills that gap.

```bash
$ roast src/new-feature.js
```

**Benefit:** Catch bugs, security issues, and bad patterns before they hit production. Get a second pair of (AI) eyes on your work.

**When to use:**
- Before committing new features
- After refactoring
- When learning a new language/framework
- Before deploying to production

---

### 2. **Learning & Skill Building**

Picked up a new language? `roast` teaches by critiquing.

```bash
# First Python script
$ roast my_first_app.py

# First Rust program
$ roast --serious main.rs
```

**Benefit:** Learn best practices, idioms, and common pitfalls by seeing them in your own code. Use `--severity mild` for encouragement while learning.

---

### 3. **Pre-Commit Quality Gate**

Add `roast` to your git hooks to enforce quality before commits.

```bash
# .git/hooks/pre-commit
#!/bin/bash
git diff --cached --name-only --diff-filter=ACM | \
  grep -E '\.(js|ts|py|go)$' | \
  xargs -I {} roast --serious {} || exit 1
```

**Benefit:** Automate code quality checks. Catch issues before CI, before code review, before your team sees them.

---

### 4. **Onboarding to New Codebases**

Just joined a team with a large codebase? Use `roast` to understand patterns.

```bash
$ roast src/core/auth-handler.js --serious
```

The AI will explain what the code does, highlight concerns, and suggest improvements. It's like having a senior dev walk you through the code.

**Benefit:** Faster onboarding. Understand existing patterns and anti-patterns.

---

### 5. **Legacy Code Assessment**

Inherited a legacy project? Get an honest assessment of what you're dealing with.

```bash
$ roast legacy/modules/payment-v1.php --severity harsh
```

**Benefit:** Prioritize refactoring. Know what's salvageable and what needs rewriting.

---

### 6. **Teaching & Mentoring**

Teaching someone to code? Show them what good vs. bad looks like.

```bash
# Student's code
$ roast student-assignment.py --severity mild

# Show them both roast and serious mode
$ roast --serious student-assignment.py
```

**Benefit:** Consistent, patient feedback. Teaches best practices without judgment.

---

### 7. **Code Review Prep (Before Human Review)**

Before requesting a PR review from teammates, run `roast` to catch obvious issues.

```bash
$ git diff main...feature-branch | roast --serious
```

Fix the issues `roast` finds, THEN request human review.

**Benefit:** Don't waste teammates' time on trivial issues. Submit cleaner PRs. Build a reputation for quality.

## Performance Tips

### 1. **Use Shell Aliases for Common Workflows**

Create shortcuts for frequent roast scenarios:

```bash
# Add to ~/.bashrc or ~/.zshrc
alias roast-js='roast --serious'
alias roast-diff='git diff | roast --serious'
alias roast-mild='roast --severity mild'
alias roast-harsh='roast --severity harsh'
```

Now just type:
```bash
$ roast-diff  # Review uncommitted changes
$ roast-js src/app.js  # Serious review
```

---

### 2. **Batch Review Multiple Files**

Use shell loops for bulk reviews:

```bash
# Review all JavaScript files in src/
for file in src/**/*.js; do
  echo "=== $file ==="
  roast --serious "$file"
done

# Or with find
find src -name "*.py" -exec roast --serious {} \;
```

**Save results:**
```bash
for file in src/**/*.js; do
  roast --serious "$file" > "reviews/$(basename $file).review.txt"
done
```

---

### 3. **Optimize API Costs**

Roasting uses Anthropic's API. To reduce costs:

**a) Review only changed files:**
```bash
git diff --name-only | grep -E '\.(js|ts|py)$' | xargs -I {} roast {}
```

**b) Use haiku model for simple reviews** (modify source code):
```javascript
// In lib/roast.js, change:
model: 'claude-haiku-4-5'  // Faster, cheaper, less detailed
```

**c) Review smaller code sections:**
```bash
# Instead of entire 1000-line file
$ head -100 large-file.js | roast
```

---

### 4. **Cache Reviews Locally (Manual)**

For files you review repeatedly:

```bash
# Save review for later reference
$ roast src/utils.js > reviews/utils-2026-02-08.txt

# Compare with previous review
$ diff reviews/utils-2026-02-01.txt reviews/utils-2026-02-08.txt
```

---

### 5. **Combine with Git Hooks for Automation**

**Pre-commit hook** (review before committing):
```bash
#!/bin/bash
# .git/hooks/pre-commit
git diff --cached --name-only | \
  grep -E '\.(js|ts)$' | \
  xargs -I {} roast --serious {}

read -p "Proceed with commit? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  exit 1
fi
```

**Pre-push hook** (final check before pushing):
```bash
#!/bin/bash
# .git/hooks/pre-push
git diff origin/main...HEAD --name-only | \
  grep -E '\.(py|js|go)$' | \
  xargs -I {} roast --serious {} > /tmp/pre-push-review.txt

cat /tmp/pre-push-review.txt
```

---

### 6. **Parallel Processing for Large Projects**

Use GNU parallel for speed:

```bash
# Install: brew install parallel (macOS) or apt-get install parallel (Linux)

# Review all files in parallel (4 at a time)
find src -name "*.js" | parallel -j 4 roast --serious {} > reviews.txt
```

---

### 7. **Smart File Selection**

Don't roast everything. Focus on:

**New/changed files:**
```bash
git diff --name-only main | xargs -I {} roast {}
```

**Complex files (high line count):**
```bash
find src -name "*.js" -exec wc -l {} \; | \
  sort -rn | head -10 | \
  awk '{print $2}' | xargs -I {} roast {}
```

**Files with recent bugs (from git history):**
```bash
git log --format=format: --name-only | \
  sort | uniq -c | sort -rn | \
  head -10 | awk '{print $2}' | \
  xargs -I {} roast --serious {}
```

## Troubleshooting

### 1. **"ANTHROPIC_API_KEY not set" error**

**Problem:**
```bash
$ roast src/app.js
💥 Error: ANTHROPIC_API_KEY environment variable is required
```

**Solutions:**

a) Set for current session:
```bash
export ANTHROPIC_API_KEY="sk-ant-your-key-here"
```

b) Make it permanent (add to shell config):
```bash
# For bash
echo 'export ANTHROPIC_API_KEY="sk-ant-your-key"' >> ~/.bashrc
source ~/.bashrc

# For zsh
echo 'export ANTHROPIC_API_KEY="sk-ant-your-key"' >> ~/.zshrc
source ~/.zshrc
```

c) Get your API key:
Visit [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)

---

### 2. **"Cannot find file" error**

**Problem:**
```bash
$ roast src/app.js
💥 Error: ENOENT: no such file or directory
```

**Solutions:**

a) Check the file path:
```bash
$ ls -la src/app.js  # Verify file exists
```

b) Use absolute path:
```bash
$ roast /full/path/to/src/app.js
```

c) Check current directory:
```bash
$ pwd
$ roast ./src/app.js
```

---

### 3. **Empty or generic roast output**

**Problem:**
```bash
$ roast my-code.js

🔥 CODE ROAST 🔥
──────────────────────────────────────────────────
This code looks fine.
──────────────────────────────────────────────────
```

**Solutions:**

a) File might be too small/simple:
```bash
# The code might genuinely be fine!
$ wc -l my-code.js  # Check line count
```

b) Language not detected. Rename file with proper extension:
```bash
$ mv script script.py  # Add .py extension
$ roast script.py
```

c) Use verbose mode (if available) or try serious mode:
```bash
$ roast --serious my-code.js
```

---

### 4. **"Invalid severity level" error**

**Problem:**
```bash
$ roast --severity extreme src/app.js
💥 Error: Invalid severity level: extreme
Valid options: mild, medium, harsh
```

**Solutions:**

a) Use valid severity:
```bash
$ roast --severity harsh src/app.js
```

b) Check available options:
```bash
$ roast --help
```

---

### 5. **Command not found: roast**

**Problem:**
```bash
$ npm install -g @muin/roast
$ roast src/app.js
zsh: command not found: roast
```

**Solutions:**

a) Check npm global bin directory is in PATH:
```bash
$ npm config get prefix
# Should show something like /usr/local or ~/.npm-global

$ echo $PATH
# Should include the bin directory from above
```

b) Fix PATH (add to ~/.bashrc or ~/.zshrc):
```bash
export PATH="$PATH:$(npm config get prefix)/bin"
source ~/.bashrc  # or ~/.zshrc
```

c) Use npx instead (doesn't require global install):
```bash
$ npx @muin/roast src/app.js
```

---

### 6. **API rate limit errors**

**Problem:**
```bash
$ roast src/app.js
💥 Error: rate_limit_error: You have exceeded your API rate limit
```

**Solutions:**

a) Wait a minute and retry (Anthropic has per-minute limits)

b) Check your rate limits:
Visit [console.anthropic.com/settings/limits](https://console.anthropic.com/settings/limits)

c) For batch processing, add delays:
```bash
for file in src/*.js; do
  roast "$file"
  sleep 3  # Wait 3 seconds between calls
done
```

d) Upgrade to higher tier if you hit limits regularly

---

### 7. **Colored output broken / weird characters**

**Problem:**
```bash
$ roast src/app.js
[31m🔥[0m [1mCODE ROAST[0m...
```

**Solutions:**

a) Disable colors:
```bash
$ roast --no-color src/app.js
```

b) Check terminal color support:
```bash
$ echo $TERM
# Should be xterm-256color or similar

# If it's 'dumb', set it:
export TERM=xterm-256color
```

c) Redirect to file (colors auto-disabled):
```bash
$ roast src/app.js > review.txt
```

---

### 8. **Very slow responses (>30 seconds)**

**Problem:**
```bash
$ roast very-large-file.js
# ...waiting forever...
```

**Solutions:**

a) File might be too large. Claude has token limits (~100k tokens ≈ 75k words).

Check file size:
```bash
$ wc -l very-large-file.js
5000 very-large-file.js  # Too large!
```

b) Split into smaller files:
```bash
$ split -l 500 large-file.js part-
$ roast part-aa
$ roast part-ab
```

c) Review only a section:
```bash
$ head -300 large-file.js | roast  # First 300 lines
```

d) Check Anthropic API status:
```bash
$ curl -I https://api.anthropic.com
```

---

### 9. **Model not found error**

**Problem:**
```bash
$ roast --model claude-opus-99 src/app.js
💥 Error: model 'claude-opus-99' not found
```

**Solutions:**

a) Use a valid model name:
```bash
$ roast --model claude-sonnet-4-5 src/app.js
$ roast --model claude-opus-4 src/app.js
$ roast --model claude-haiku-4-5 src/app.js
```

b) Check available models at [docs.anthropic.com](https://docs.anthropic.com/en/docs/models-overview)

c) Omit the flag to use default:
```bash
$ roast src/app.js  # Uses default model
```

---

### 10. **Network/connection errors**

**Problem:**
```bash
$ roast src/app.js
💥 Error: connect ETIMEDOUT
```

**Solutions:**

a) Check internet connection:
```bash
$ ping api.anthropic.com
```

b) Check if firewall/VPN is blocking:
```bash
$ curl https://api.anthropic.com
```

c) Set proxy if behind corporate firewall:
```bash
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
```

---

### 11. **Permission errors on Windows**

**Problem:**
```bash
C:\> npm install -g @muin/roast
Error: EACCES: permission denied
```

**Solutions:**

a) Run as Administrator (PowerShell):
```powershell
# Right-click PowerShell → "Run as Administrator"
PS> npm install -g @muin/roast
```

b) Or use npx (no install needed):
```powershell
PS> npx @muin/roast src/app.js
```

---

### 12. **File encoding issues (non-UTF8)**

**Problem:**
```bash
$ roast legacy-code.php
💥 Error: Invalid UTF-8 sequence
```

**Solutions:**

a) Convert file to UTF-8:
```bash
$ iconv -f ISO-8859-1 -t UTF-8 legacy-code.php > legacy-code-utf8.php
$ roast legacy-code-utf8.php
```

b) Check current encoding:
```bash
$ file legacy-code.php
legacy-code.php: PHP script, ISO-8859 text
```

## Frequently Asked Questions (FAQ)

### 1. **Is my code sent to Anthropic's servers?**

**Yes.** When you run `roast`, the file contents are sent to Anthropic's Claude API for analysis.

**Security note:** Do NOT roast files containing:
- API keys, passwords, or secrets
- Proprietary algorithms (if you have strict confidentiality agreements)
- PII (personally identifiable information) in test data
- Anything you wouldn't share with a third party

Anthropic's privacy policy: https://www.anthropic.com/legal/privacy

---

### 2. **How much does it cost to use?**

`roast` itself is free and open-source. However, it uses Anthropic's Claude API which has usage costs:

- **Free tier:** $5 credit (enough for ~100-300 roasts depending on file size)
- **After that:** ~$0.01-0.05 per roast (1-5 cents)
- **Monthly estimate:** If you roast 20 files/day: ~$10-30/month

Check pricing: https://www.anthropic.com/pricing

---

### 3. **Can I use this offline?**

**No.** `roast` requires internet connection to reach Anthropic's API.

**Alternatives for offline:**
- Set up a local LLM (complex, beyond scope)
- Use traditional linters (eslint, pylint, etc.)
- Manual code review

---

### 4. **Is the humor offensive?**

**Roast mode:** Sarcastic and blunt, but never personal. It criticizes code, not people.

**Serious mode:** Professional, no humor.

**Severity levels:**
- **Mild:** Friendly and encouraging
- **Medium:** Sarcastic but constructive (default)
- **Harsh:** Very direct, can be brutal

Use `--serious` for team PRs or `--severity mild` for beginners.

---

### 5. **Does it actually improve code quality?**

**Yes, when used correctly:**

✅ Catches security issues (SQL injection, XSS, unsafe eval)  
✅ Identifies performance problems (O(n²) loops, memory leaks)  
✅ Highlights maintainability issues (long functions, tight coupling)  
✅ Suggests modern best practices  
✅ Teaches by explaining WHY something is bad  

**But:**
- AI can miss context-specific issues
- It's a tool, not a replacement for human review
- Always verify suggestions before applying

---

### 6. **Can I customize the roast style?**

**Currently:** Severity levels (mild/medium/harsh) and serious mode.

**Not yet:** Custom roast personas (e.g., "roast like Linus Torvalds" or "review like Uncle Bob").

**Future:** Customizable prompts/styles are on the roadmap.

---

### 7. **What languages are supported?**

✅ JavaScript / TypeScript / Node.js  
✅ Python  
✅ Go  
✅ Rust  
✅ Java / Kotlin  
✅ C / C++  
✅ Ruby  
✅ PHP  
✅ Swift  
✅ Shell / Bash  
✅ SQL  
✅ HTML / CSS  
✅ And more...

Claude has broad training, so even niche languages often get good results.

---

### 8. **Does it work with frameworks (React, Django, etc.)?**

**Yes!** The AI understands framework-specific patterns:

- **React:** Hooks, component structure, props, state management
- **Django:** ORM patterns, views, middleware
- **Express:** Route handlers, middleware, error handling
- **Rails:** ActiveRecord, controllers, migrations
- etc.

It will roast framework-specific anti-patterns (e.g., prop drilling in React, N+1 queries in ORMs).

---

### 9. **Can I use this for production code reviews?**

**Yes, but:**

✅ Great for initial screening  
✅ Catches obvious bugs and security issues  
✅ Ensures code meets basic quality standards  

⚠️ Should NOT replace human code review for:
- Business logic validation
- Architecture decisions
- Team-specific conventions
- Nuanced judgment calls

**Best practice:** Use `roast --serious` BEFORE requesting human review. Fix what it finds, then get human eyes on it.

---

### 10. **Will it give different results each time?**

**Yes, slightly.** AI models have some randomness (temperature setting).

**Typically:**
- Core issues will always be flagged
- Phrasing may vary
- Severity of roast may differ slightly

For consistent results, use `--serious` mode which is more deterministic.

---

### 11. **Can I contribute to the project?**

**Absolutely!** Contributions are very welcome:

- Report bugs via GitHub Issues
- Suggest features
- Submit pull requests
- Improve roast quality
- Add language support
- Write tests

See [Contributing](#contributing) section.

---

### 12. **Does it store my code or reviews?**

**No local storage.** `roast` doesn't save files or reviews on your machine (unless you manually redirect output).

**API-side:** Anthropic may temporarily log requests for abuse prevention. Check their privacy policy for retention details.

## Tips

- **Share your roasts** - They're designed to be screenshot-friendly
- **Use serious mode for PRs** - Save the humor for your own code
- **Review before committing** - Catch bugs before your CI does
- **Roast legacy code** - Therapeutic and educational
- **Pipe from git diff** - Review only what changed: `git diff | roast`
- **Works with stdin** - `cat sketch.py | roast` or `pbpaste | roast`

**Create project-specific wrappers:**
```bash
# scripts/review.sh
#!/bin/bash
find src -name "*.js" -mtime -1 | xargs -I {} roast --serious {}
```

**Combine with other tools:**
```bash
# Lint first, then roast
$ eslint src/app.js && roast src/app.js

# Roast, then test
$ roast src/app.js && npm test
```

**Team usage:**
```bash
# Add to CI pipeline
- name: AI Code Review
  run: |
    git diff origin/main...HEAD --name-only | \
      grep -E '\.(js|ts|py)$' | \
      xargs -I {} npx @muin/roast --serious {}
```

## Roadmap

### v0.2 (Next Release)
- [ ] **JSON output mode** - Structured output for CI integration
- [ ] **Config file support** - `.roastrc` for defaults (severity, model, etc.)
- [ ] **Multi-file batch mode** - `roast src/*.js` in one API call
- [ ] **Ignore patterns** - `.roastignore` like `.gitignore`
- [ ] **Diff mode** - Compare changes: `roast --diff main...feature`

### v0.3
- [ ] **Custom roast personalities** - "Roast like Linus", "Review like Uncle Bob"
- [ ] **Fix suggestions with diffs** - Show exact code changes to apply
- [ ] **Performance scoring** - Rate code quality 0-100
- [ ] **Security scan mode** - Focus on vulnerabilities only
- [ ] **HTML report generation** - `roast --html src/ > report.html`

### v1.0 (Future)
- [ ] **Auto-fix mode** - Apply suggested changes automatically
- [ ] **IDE plugins** - VS Code, IntelliJ, Vim
- [ ] **Team dashboard** - Track code quality over time
- [ ] **Learning mode** - Personalized feedback based on your skill level
- [ ] **Multi-model support** - Use GPT-4, Gemini, local models
- [ ] **Offline mode** - Local model integration

### Community Requests
- [ ] Web UI for drag-and-drop file roasting
- [ ] Slack/Discord bot integration
- [ ] GitHub PR comment automation
- [ ] GitLab CI/CD integration
- [ ] Pre-commit hook generator
- [ ] Support for Jupyter notebooks (.ipynb)

**Want a feature?** Open a GitHub issue or +1 existing ones!

## Development

```bash
# Clone repo
git clone https://github.com/muinmomin/roast.git
cd roast

# Install dependencies
npm install

# Link locally for testing
npm link

# Test with sample file
roast examples/bad-code.js

# Run tests (if available)
npm test
```

**Project structure:**
```
roast/
├── bin/
│   └── roast.js         # CLI entry point
├── lib/
│   └── roast.js         # Core logic
├── examples/
│   └── bad-code.js      # Test cases
├── package.json
└── README.md
```

**Testing:**
```bash
# Create test file
cat > test.js << 'EOF'
var x = 1;
eval(userInput);
EOF

$ roast test.js
```

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
- Follow existing code style (ESLint config included)
- Update README if adding options

**Code style:**
- Use ESLint
- Follow existing patterns
- Add JSDoc comments for functions
- Keep roasts clever, not cruel

**Ideas for contributions:**
- Better language detection
- Framework-specific roasting (React, Django, Rails patterns)
- Security vulnerability detection
- Performance analysis
- Custom roast templates

## License

MIT

## Credits

Built with:
- [Anthropic Claude](https://anthropic.com) - The AI doing the roasting
- [Commander.js](https://github.com/tj/commander.js) - CLI framework
- [Chalk](https://github.com/chalk/chalk) - Terminal colors

Inspired by every brutally honest code review you've ever received (or given).

---

Made by [muin](https://github.com/muinmomin)

*Roast responsibly. Don't roast production code in public without permission.*
