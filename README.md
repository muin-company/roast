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

### Example 8: Database query optimization check

```bash
$ roast src/queries.js

🔥 CODE ROAST 🔥
Victim: queries.js (JavaScript)
──────────────────────────────────────────────────

🔥 You're fetching the entire users table with SELECT * and THEN 
filtering in JavaScript. Congratulations, you've reinvented the 
world's worst database.

🔥 N+1 query problem in getUserPosts(). You're making 1 query for 
users, then 1 query per user for posts. For 100 users that's 101 
queries. Your database called, it wants a divorce.

💡 Use JOIN:
   SELECT users.*, posts.* FROM users 
   LEFT JOIN posts ON users.id = posts.user_id

🔥 No connection pooling. Every request opens a new connection. 
You're treating database connections like disposable coffee cups.

💡 Use a connection pool:
   const pool = mysql.createPool({ ... });

✨ At least you're using prepared statements. That's the only thing 
standing between you and a SQL injection disaster.

──────────────────────────────────────────────────
```

---

### Example 9: TypeScript migration review

```bash
$ roast --serious src/legacy-migrated.ts

📋 Professional Code Review
File: legacy-migrated.ts (TypeScript)
──────────────────────────────────────────────────

⚠️  80% of types are 'any' - defeats the purpose of TypeScript
    Found: function processData(data: any, config: any): any

🚨 Type assertion 'as any' used 47 times throughout the file
   This is TypeScript surrender, not TypeScript migration

⚠️  @ts-ignore comments covering actual type errors
   Line 23: @ts-ignore
   Line 45: @ts-ignore  
   Line 67: @ts-ignore

💡 Gradual migration approach:
   1. Start with proper interface definitions
   2. Replace 'any' one function at a time
   3. Remove @ts-ignore, fix the actual issues
   4. Enable strict mode: "strict": true in tsconfig.json

✅ Good: Converted var to const/let consistently
✅ Good: Removed jQuery dependencies

Current grade: D+ (compiles but doesn't provide type safety)
Recommended: Dedicate sprint to proper typing before adding features

──────────────────────────────────────────────────
```

---

### Example 10: Performance bottleneck detection

```bash
$ roast --severity harsh performance/data-processor.py

🔥 CODE ROAST 🔥
Victim: data-processor.py (Python)
Severity: 💀 NO MERCY MODE
──────────────────────────────────────────────────

💀 Nested loops with O(n³) complexity processing a 10,000 item list.
Your runtime complexity is "heat death of the universe."

💀 You're reading the same CSV file 500 times inside a loop. I've 
seen people use AWS more efficiently than this, and I've seen people 
mine Bitcoin on Raspberry Pis.

💀 Loading entire 2GB JSON file into memory with json.load(). 
You're one large file away from an OOMKiller visit.

💡 Use streaming JSON parser:
   import ijson
   for item in ijson.items(file, 'item'):
       process(item)

💀 Pandas DataFrame.iterrows() in production code. Did you even 
read the Pandas docs? They literally beg you not to do this.

💡 Use vectorized operations:
   df['result'] = df['col1'] * df['col2']  # 1000x faster

💀 No caching, no memoization, no optimization whatsoever. You're 
recalculating the same Fibonacci sequence 50,000 times.

💡 Add @lru_cache decorator:
   from functools import lru_cache
   @lru_cache(maxsize=128)
   def expensive_calc(n): ...

The good news: This code works.
The bad news: It'll work sometime next Tuesday.

──────────────────────────────────────────────────
```

## Tips

- **Share your roasts** - They're designed to be screenshot-friendly
- **Use serious mode for PRs** - Save the humor for your own code
- **Review before committing** - Catch bugs before your CI does
- **Roast legacy code** - Therapeutic and educational
- **Pipe from git diff** - Review only what changed: `git diff | roast`
- **Works with stdin** - `cat sketch.py | roast` or `pbpaste | roast`

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
