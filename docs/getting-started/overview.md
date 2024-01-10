# Overview

!> **Threadly is still under development, and isn't usable for production yet. [View the v1.0.0 roadmap!](https://github.com/users/SpideyZac/projects/2)**

Threadly is a lightweight and modern concurrency scripting language designed to simplify parallel execution and asynchronous programming tasks. It provides a concise syntax and essential built-in actions, making it easy to handle concurrent workflows, execute HTTP requests, manage files, and control timing within your scripts.

> Want to leap right in? Check out the [Quickstart](getting-started/quickstart.md).

## Syntax

Threadly provides a simple to use syntax that is easy to understand.

## Concurrent tasks

Threadly makes it easy to run your tasks concurrently with full control! Heres an example:

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

For more, check out [examples](https://github.com/SpideyZac/Threadly/tree/master/examples)

## Performance

Currently, you must use Threadly with [Bun](https://bun.sh), a blazingly fast JavaScript runtime that's heavily optimized and provides a great DX, including TypeScript support
out of the box.

## Benchmarks

Coming soon!