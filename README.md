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
