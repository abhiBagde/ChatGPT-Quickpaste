#🚀 ChatGPT Quick Paste – Chrome Extension

A lightweight Chrome extension that lets you right-click on any selected text and instantly send it to ChatGPT. No manual copy-paste, no tab juggling — just faster workflows.

##✨ Features

Adds a context menu option ("Send to ChatGPT") on text selection.

Automatically pastes content into ChatGPT’s input box.

Handles ChatGPT’s dynamic DOM by injecting content via content.js.

Smooth message passing between background.js → content.js.

##⚙️ Implementation

background.js: Creates and manages the right-click context menu.

content.js: Finds ChatGPT’s input area and injects text.

options.html & options.js: Basic extension settings (if needed).

##🔧 Installation (Developer Mode)

Clone this repo:

git clone https://github.com/yourusername/chatgpt-quick-paste.git


Open Chrome → Extensions → Enable Developer mode.

Click Load unpacked → select this repo folder.

Highlight text → Right-click → Send to ChatGPT.
