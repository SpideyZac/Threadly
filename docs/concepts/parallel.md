# Parallel Call

Your Threadly program will always conclude with a `Parallel Call`. Parallel Calls list of the tasks to execute

## Parallel Body

The Parallel Body is the list of tasks to execute parallelly, denoted by the `!` character.

```threadly
parallel
    !log1 // Will call thread/task log1
    !log2 // Will call thread/task log2
    // This will happen at the same time.
```

## Max Threads

The `Max Threads` is an optional number passed with the parallel call and denotes the max amount of threads that can be run at the same time.

Let's say we have this example:

```threadly
parallel 2 // Max threads of 2
    !log1
    !log2
    !log3
```

Threadly will begin to execute both `log1` and `log2` at the same time. At this point, we have reached the Max Threads defined.
When either `log1` or `log2` finishes, Threadly will immediately begin to execute `log3`.