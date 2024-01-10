# Threadly

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SpideyZac/Threadly)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/threadly)

Threadly is a lightweight and modern concurrency scripting language designed to simplify parallel execution and asynchronous programming tasks. It provides a concise syntax and essential built-in actions, making it easy to handle concurrent workflows, execute HTTP requests, manage files, and control timing within your scripts.

[View the v1.0.0 roadmap!](https://github.com/users/SpideyZac/projects/2)

# Example (Check out `examples/`)
```threadly
task log1
    sleep(3000)
    log("Hello World! (hi)")
endtask

task log2
    log("Hi!")
    !log1
endtask

parallel
    !log1
    !log2
```

# Installation

[If you haven't already, install Bun to run the interpreter.](https://bun.sh/docs/installation)

```bash
bunx threadly --help
```

# Run

**For now, as Threadly is in very early beta, you must use Bun to run the interpreter!**

```bash
bunx threadly --file <file to run here>
```

# Docs

[**Coming Soon!**](https://threadly.js.org)