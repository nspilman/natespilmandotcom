---
favorite: true
title: Well, I guess I use VIM now
description: enabling VIM keybindings in Obsidian
date: 2025-05-14
published: true
---
It was an afterthought in [yesterday's post](https://natespilman.com/blog/2025-05-13-intention-to-write-more) that my[ the video that inspired me](https://www.youtube.com/watch?v=sqm4-B07LsE) to write more was also trying to convince me to learn [VIM](https://www.vim.org/), but now here we are. 

The argument for using VIM that convinced me was that its key bindings can be enabled in nearly every modern software application, and therefore it can serve as a universal keyboard based interface to my computer. 

The final thing that I was missing was a way to gamify my learning. I went through the first three levels of [https://$vim-adventures.com]($vim-adventures.com) and purchased access to the rest. I'm now on level seven. 

## So far I've learned - 

Basic navigation - 
- h - left
- j - down 
- k - up
- l - right
- $ - end of line
- 0 - beginning of line
- ^ - first white space of line 
- w - jump to start of next word 
- e - jump to end of this or next word
- b - jump to beginning of previous word 

There are some differences between `w and W` and etc that I don't recall specifically, but I know the capital version includes things like punctuation as the same word, where lower case `w` splits out punctuation. 

Deletion actions - 
- x - delete selected char
- X - delete previous char (like backspace)
- dd -  delete whole line 
- d$ or D - delete rest of line from this point on 
- db - delete previous word
- dw - delete next word 
- de - delete the rest of the word

This is all from memory - some of it might be wrong. 

## Enabling VIM keybindings in Obsidian
Now that I'm a VIM user, it was time to enable VIM keybindings in Obsidian. 

I greatly appreciate the following confirmation message confirming I know how to exit VIM befoe allowing me to turn it on. 

![VIM keybindings confirmation screen](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-05-14/learning-vim/obsidian-enable-vim.png)
*it's :q, btw*

The funny thing is I just tried running `:q` on this file, and `Obsidian` doesn't have a command for it. 

Huge shout out to [No Boilerplate](https://www.youtube.com/@NoBoilerplate/videos) for the push I needed and for pointing me in the direction of [VIM Adventures](https://$vim-adventures.com) to get started.  