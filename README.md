# 🔥 roast

AI code reviewer that roasts your code (with love).

Because every developer needs a brutally honest code review from an AI with a sense of humor.

## What is this?

`roast` is a CLI tool that uses Claude to review your code and deliver feedback that's:
- **Accurate** - Real issues, not generic fluff
- **Funny** - Because code review doesn't have to be boring
- **Useful** - Actual suggestions you can apply
- **Shareable** - Perfect for Twitter/Discord flexing

Think Gordon Ramsay meets your senior developer.

## Installation

```bash
npm install -g @muin/roast
```

Or run directly:
```bash
npx @muin/roast your-file.js
```

## Setup

Get your Anthropic API key at [console.anthropic.com](https://console.anthropic.com/settings/keys)

```bash
export ANTHROPIC_API_KEY="your-key-here"
```

## Usage

### Roast mode (default)
```bash
roast src/app.js
```

### Serious mode
```bash
roast --serious src/app.js
```

### Custom model
```bash
roast --model claude-opus-4 src/app.js
```

## Examples

**Roast mode:**
```
🔥 CODE ROAST 🔥
Victim: bubble-sort.js (JavaScript)
──────────────────────────────────────────────────

🔥 Oh boy, bubble sort in 2026? What's next, a floppy disk driver?

🔥 This function mutates the input array. That's like borrowing 
someone's car and returning it as a motorcycle.

💡 Use `Array.prototype.toSorted()` if you're on Node 20+, or 
at least clone the array first: `const sorted = [...arr]`

🔥 No input validation. Passing a string? Enjoy your runtime error.

✨ At least you got the algorithm right. It's bad, but it's 
correctly bad.

──────────────────────────────────────────────────
Roasted with ❤️  by Claude
```

**Serious mode:**
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

## Why?

Because:
1. Code review should be fun
2. AI feedback is usually boring
3. Developers love roasting each other's code
4. Sometimes you need honesty, not cheerleading

## License

MIT

## Credits

Built with:
- [Anthropic Claude](https://anthropic.com) - The AI doing the roasting
- [Commander.js](https://github.com/tj/commander.js) - CLI framework
- [Chalk](https://github.com/chalk/chalk) - Terminal colors

---

Made with 🔥 by [muin](https://github.com/muin)

*Roast responsibly. Don't roast production code in public without permission.*
