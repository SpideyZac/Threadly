# Threadly

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SpideyZac/Threadly)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Threadly is a lightweight and modern concurrency scripting language designed to simplify parallel execution and asynchronous programming tasks. It provides a concise syntax and essential built-in actions, making it easy to handle concurrent workflows, execute HTTP requests, manage files, and control timing within your scripts.

# Example
```threadly
task downloadAndWrite
data = downloadFile("http://example.com/file/1.png")
signal("downloadLog")
endtask

task runCommand
executeCommand("python main.py")
endtask

task log
waitFor("downloadLog")
log("Donwloaded and Wrote!")
runCommand()
endtask

parallel
!downloadAndWrite
!log
```

# Installation

```bash
bun install
```

# Run

**For now, as Threadly is in very early beta, you must change `src.index.ts.input` to use your script**

```bash
bun --bun start
```