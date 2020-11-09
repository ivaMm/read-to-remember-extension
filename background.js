chrome.runtime.onInstalled.addListener(function(details) {
   alert('You just made the best decision of today, by installing ReadToRemember extension!\n\nWe will now redirect you to your Amazon Kindle account so you can import all your highlights to ReadToRemember.');
  if ((details.reason === 'install') || (details.reason === 'update'))
  {
    refreshBrowser('read-amazon', true);
  }
});

function refreshBrowser(target, bringToForeground) {
  if (target !== 'read-amazon') return;
  chrome.windows.getAll({ populate: true }, function(windows)
  {
    var foundExisting = false;
    windows.forEach(function(win)
    {
      win.tabs.forEach(function(tab)
      {
        // Ignore tabs not matching the target.
        if (target === 'read-amazon') {
          if (!/https:\/\/read|lesen\.amazon\.com|de(\/kp)?\/notebook\?.*/.test(tab.url)) return;
        }
        else
        {
          return; // Unknown target.
        }
        // Reload the matching tab.
        chrome.tabs.reload(tab.id); // If this is the first one found, activate it.
        if (bringToForeground && !foundExisting)
        {
          chrome.tabs.update(tab.id, { active: true }); }
          foundExisting = true;
        });
      });
      // If no gmail tab found, just open a new one.
      if (bringToForeground && !foundExisting)

      {
        chrome.tabs.create({ url: "https://read.amazon.com/notebook?", active: true
      });
    }
  });
}
