import Anthropic from '@anthropic-ai/sdk';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { basename, extname } from 'path';

const LANGUAGE_MAP = {
  '.js': 'JavaScript',
  '.ts': 'TypeScript',
  '.jsx': 'React/JSX',
  '.tsx': 'React/TSX',
  '.py': 'Python',
  '.go': 'Go',
  '.rs': 'Rust',
  '.java': 'Java',
  '.c': 'C',
  '.cpp': 'C++',
  '.rb': 'Ruby',
  '.php': 'PHP',
  '.swift': 'Swift',
  '.kt': 'Kotlin',
  '.sh': 'Shell',
  '.sql': 'SQL',
  '.html': 'HTML',
  '.css': 'CSS',
};

const ROAST_PROMPT = `You're a senior developer with a sharp wit reviewing code. Your job:

1. Point out real issues (bugs, anti-patterns, performance problems, security holes)
2. Be funny but not mean - roast the code, not the person
3. Use developer humor (not corporate AI cheerleader vibes)
4. Be specific - quote the actual code you're roasting
5. End with 1-2 genuine compliments or useful tips

Style: Like a sarcastic but helpful senior dev at code review. Think "Gordon Ramsay for code" but constructive.

Format your response with:
- 🔥 for roasts/issues
- 💡 for suggestions
- ✨ for compliments
- 🚨 for serious bugs

Keep it under 400 words. Make it shareable.`;

const SERIOUS_PROMPT = `You're a senior developer conducting a professional code review. Analyze this code for:

1. Bugs and potential runtime errors
2. Security vulnerabilities
3. Performance issues
4. Code quality and maintainability
5. Best practices for the language/framework

Be thorough but concise. Format your response with:
- 🚨 Critical issues (security, bugs)
- ⚠️  Warnings (performance, code smell)
- 💡 Suggestions (improvements, best practices)
- ✅ Good practices observed

Keep it actionable and under 400 words.`;

export async function roastFile(filePath, options = {}) {
  // Read file
  const code = readFileSync(filePath, 'utf-8');
  const fileName = basename(filePath);
  const ext = extname(filePath);
  const language = LANGUAGE_MAP[ext] || 'code';

  // Check for API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      'ANTHROPIC_API_KEY not found in environment.\n' +
      'Get your key at: https://console.anthropic.com/settings/keys\n' +
      'Then run: export ANTHROPIC_API_KEY="your-key-here"'
    );
  }

  // Display header
  console.log('');
  if (options.serious) {
    console.log(chalk.blue.bold('📋 Professional Code Review'));
    console.log(chalk.gray(`File: ${fileName} (${language})`));
  } else {
    console.log(chalk.red.bold('🔥 CODE ROAST 🔥'));
    console.log(chalk.gray(`Victim: ${fileName} (${language})`));
  }
  console.log(chalk.gray('─'.repeat(50)));
  console.log('');

  // Call Anthropic API
  const client = new Anthropic({ apiKey });
  
  const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(`\r${chalk.cyan(spinner[i++ % spinner.length])} Analyzing...`);
  }, 80);

  try {
    const prompt = options.serious ? SERIOUS_PROMPT : ROAST_PROMPT;
    
    const message = await client.messages.create({
      model: options.model,
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `${prompt}\n\n\`\`\`${language}\n${code}\n\`\`\``
      }]
    });

    clearInterval(interval);
    process.stdout.write('\r' + ' '.repeat(20) + '\r');

    const review = message.content[0].text;
    
    // Colorize output
    const colorized = review
      .replace(/🔥/g, chalk.red('🔥'))
      .replace(/💡/g, chalk.yellow('💡'))
      .replace(/✨/g, chalk.green('✨'))
      .replace(/🚨/g, chalk.red.bold('🚨'))
      .replace(/⚠️/g, chalk.yellow('⚠️'))
      .replace(/✅/g, chalk.green('✅'));

    console.log(colorized);
    console.log('');
    console.log(chalk.gray('─'.repeat(50)));
    
    if (!options.serious) {
      console.log(chalk.gray.italic('Roasted with ❤️  by Claude'));
    }
    console.log('');

  } catch (error) {
    clearInterval(interval);
    process.stdout.write('\r' + ' '.repeat(20) + '\r');
    throw error;
  }
}
