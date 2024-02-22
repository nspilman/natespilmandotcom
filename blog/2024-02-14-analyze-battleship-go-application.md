---
favorite: true
title: Learning Go through study of a professional Go developer's application
description: 
date: 2024-02-14
published:
---
https://github.com/treyburn/battleship

Top level file structure - 

```ssh
/cmd/cli
/interal 
/test
/tools 
.gitignore
Makefile
NOTES.md
README.md
go.mod
go.sum
```


### go.sum file - 
Works similarly to a `package-lock.json` or a `yarn.lock` file in that it helps with dependency tracking. It doesn't lock your dependencies the same way, but holds the cryptographic hash for all your dependencies - I guess to ensure you're always running the correct program - and also keeps track of dependencies of dependencies. This file does not need to be touched directly. 

From ChatGPT - 
- **Module Paths and Versions:** Each line starts with a module path (like `github.com/cpuguy83/go-md2man/v2`) and a version (`v2.0.3`). This tells you which module version the project depends on.
    
- **Checksums:** After the version, you see a hash (e.g., `h1:tgQtvFlXSQOSOSIRvRPT7W67SCa46tRHOmNcaadrF8o=`). This is the checksum, specifically SHA-256 in base64, ensuring the integrity of the module version. If someone tries to tamper with the module or if something goes wrong in transmission, the checksum won't match, and Go will give you a heads up.
    
- **`/go.mod` Suffix:** Some lines end with `/go.mod` followed by a hash. This refers specifically to the module's `go.mod` file rather than its entire codebase. It ensures the `go.mod` file itself hasn't been altered, which is crucial for managing dependencies accurately.

### go.mod file
The `go.mod` file is like Go's `package.json` file. Here you declare the module name, version of Go you're using and both direct and indirect dependencies. It's standard to name your modules `[domain]/[user]/[project-name]` - in this case Travis has his as `module github.com/treyburn/battleship` - which is super convenient, as that's the location on Github as well. 


### `/cmd/cli`

This directory is commonly used to store the main application entry points. Each subdirectory under `/cmd` usually corresponds to an executable your project will generate. In this case, `cli` suggests a command-line interface application. You'd typically find a `main.go` file here that initializes and runs your application.

### `/internal`

The `/internal` directory is a special path recognized by the Go toolchain. It contains your project's private code. Code within this directory is not importable by other projects directly, providing a mechanism to encapsulate your internal implementation. You might structure code here by its purpose within the project, such as business logic, utility functions, and more.



Questions - 
- in `/cmd/cli/main.go` you defined `main`  and `buildGameSetup`. in `main`, you fire off ` rootCmd.Execute()`. This function, in `root.go` references the function in `main.go`. Wouldn't it make more sense to put `buildGameSetup` in `root.go` ? since theyre in the same `main` module, does it not matter at all?

