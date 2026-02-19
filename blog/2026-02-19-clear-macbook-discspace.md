---
title: How I reclaimed 27 GB on my 256 GB MacBook Air
description: Without losing any of my files
date: 2026-02-19
published: true
tags:
  - 
favorite: true
---
I got the "Your disk is almost full" energy the other day. Opened Disk Utility and saw **3.79 GB free** on a 256 GB drive. Not great.

I didn't want to delete any actual projects or files. I just wanted to find all the invisible developer cruft that builds up over months of work — build caches, node_modules graveyards, toolchain artifacts, etc. I ended up reclaiming over 27 GB without losing anything I cared about.

Here's what I did, in the order I did it.

## First — figure out where the space is going

Before deleting anything, I ran some reconnaissance:

```bash
df -h /
du -sh ~/Library/Developer/*
du -sh ~/Library/Caches/* | sort -hr | head -20
du -sh ~/Library/Application\ Support/* | sort -hr | head -15
du -sh ~/Repos/* | sort -hr | head -20
```

Adjust `~/Repos` to wherever you keep your projects. The goal is just to see what's fat.

## Xcode DerivedData

If you have Xcode installed, check this first:

```bash
du -sh ~/Library/Developer/Xcode/DerivedData
```

Mine was 3.5 GB. This is just build cache — Xcode regenerates it next time you build. Safe to nuke.

```bash
rm -rf ~/Library/Developer/Xcode/DerivedData
```

While you're at it, check for old iOS simulator runtimes. I had a 6.8 GB iOS 17.5 simulator just sitting there:

```bash
xcrun simctl runtime list
xcrun simctl delete unavailable
xcrun simctl runtime delete <runtime-name-or-UUID>
```

## The node_modules graveyard

This is probably the biggest win for most JS/TS developers. Every project has a `node_modules` folder that can be 200 MB to over a gig. If you're not actively working on a project, there's no reason to keep it around. Just `npm install` when you pick the project back up.

Find all of them:

```bash
find ~/Repos -name "node_modules" -type d -maxdepth 4 | xargs du -sh 2>/dev/null | sort -hr
```

For a monorepo with nested `node_modules` everywhere, this is the nuclear option:

```bash
find ~/Repos/my-project -name "node_modules" -type d -prune -exec rm -rf {} +
```

I had about 6 GB of node_modules across repos I wasn't actively touching.

## Next.js .next folders

If you use [Next.js](https://nextjs.org/), the `.next` build cache can get big — especially in monorepos. Mine was 1.3 GB in one project.

```bash
find ~/Repos -name ".next" -type d -maxdepth 5 | xargs du -sh 2>/dev/null | sort -hr
find ~/Repos -name ".next" -type d -prune -exec rm -rf {} +
```

## Rust target directories

If you've ever run `cargo build`, the `target` folder is almost certainly massive. I had a [Tauri](https://tauri.app/) project with a 3.1 GB `target` folder. This is compiled output — completely safe to delete, and `cargo build` regenerates everything.

```bash
rm -rf ~/Repos/my-rust-project/src-tauri/target
```

## Application caches

macOS apps cache aggressively in `~/Library/Caches`. These are all safe to delete — the apps rebuild them as needed.

```bash
du -sh ~/Library/Caches/* | sort -hr | head -20
```

I cleared out caches for Brave, Spotify, pnpm, bun, Cypress, Playwright, pypoetry, CocoaPods, node-gyp, and Homebrew. That was about 7 GB.

```bash
rm -rf ~/Library/Caches/BraveSoftware
rm -rf ~/Library/Caches/com.spotify.client
rm -rf ~/Library/Caches/pnpm
rm -rf ~/Library/Caches/bun
rm -rf ~/Library/Caches/Cypress
rm -rf ~/Library/Caches/ms-playwright
rm -rf ~/Library/Caches/pypoetry
rm -rf ~/Library/Caches/CocoaPods
rm -rf ~/Library/Caches/node-gyp
rm -rf ~/Library/Caches/Homebrew
```

Also worth running:

```bash
brew cleanup
npm cache clean --force
```

## Electron app leftovers

Code editors and desktop apps built on Electron store a lot of data in `~/Library/Application Support/`. If you've stopped using an editor or tool, its data sticks around.

```bash
du -sh ~/Library/Application\ Support/* | sort -hr | head -15
```

I had about 2 GB from editors I wasn't using anymore. Be careful here though — deleting Application Support data for active apps will reset your settings and sign you out.

## Claude Code vm_bundles

This one caught me off guard. Claude's `vm_bundles` folder was **12 GB**.

```bash
du -sh ~/Library/Application\ Support/Claude/*
```

```bash
rm -rf ~/Library/Application\ Support/Claude/vm_bundles
rm -rf ~/Library/Application\ Support/Claude/Cache
rm -rf ~/Library/Application\ Support/Claude/Code\ Cache
```

Claude re-downloads what it needs next time you use those features.

## Docker

If you use Docker (I use [Colima](https://github.com/abiosoft/colima)), check for unused images and containers:

```bash
docker system df
docker system prune -a
```

Mine was clean, but this can easily be 5-10 GB if you've been pulling images over time.

## What I left alone

- **`/private/var/folders`** — This is macOS's temp directory. The OS manages it. Don't touch it.
- **Application Support for active apps** — Deleting these resets settings. Not worth it.
- **Language toolchains** (`~/.cargo`, `~/.rustup`, `~/.bun`) — I'm still using these, so I kept them. But if you're done with a language, uninstalling the toolchain can free up 1-2 GB.

## Would a restart have fixed this?

No. Almost none of this gets cleaned up by restarting. A restart flushes some temp files and swap, but build artifacts, caches, node_modules, and toolchain data persist indefinitely. This kind of cleanup is manual.

## The quick version

If you just want to run through this fast, here's a script. **Read through it first** and comment out anything that doesn't apply to you:

```bash
#!/bin/bash

# Xcode
rm -rf ~/Library/Developer/Xcode/DerivedData

# Node.js build artifacts (adjust path to your repos)
find ~/Repos -name "node_modules" -type d -prune -exec rm -rf {} +
find ~/Repos -name ".next" -type d -prune -exec rm -rf {} +

# Rust build artifacts
find ~/Repos -name "target" -type d -prune -exec rm -rf {} +

# Package manager caches
brew cleanup 2>/dev/null
npm cache clean --force 2>/dev/null
rm -rf ~/Library/Caches/pnpm
rm -rf ~/Library/Caches/bun
rm -rf ~/Library/Caches/Homebrew
rm -rf ~/Library/Caches/CocoaPods
rm -rf ~/Library/Caches/node-gyp
rm -rf ~/Library/Caches/pypoetry

# App caches
rm -rf ~/Library/Caches/BraveSoftware
rm -rf ~/Library/Caches/com.spotify.client
rm -rf ~/Library/Caches/Cypress
rm -rf ~/Library/Caches/ms-playwright

# Claude Code
rm -rf ~/Library/Application\ Support/Claude/vm_bundles
rm -rf ~/Library/Application\ Support/Claude/Cache
rm -rf ~/Library/Application\ Support/Claude/Code\ Cache

# Docker (if applicable)
docker system prune -a 2>/dev/null

echo "Done! Check your free space with: df -h /"
```

I went from 3.79 GB to 31 GB free. Not bad for an afternoon of `rm -rf`.
