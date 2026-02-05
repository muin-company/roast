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

## Tips

- **Share your roasts** - They're designed to be screenshot-friendly
- **Use serious mode for PRs** - Save the humor for your own code
- **Review before committing** - Catch bugs before your CI does
- **Roast legacy code** - Therapeutic and educational

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
