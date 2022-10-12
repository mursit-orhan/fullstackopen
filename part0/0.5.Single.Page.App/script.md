browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML-code (spa)
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note

LINK:

https://www.websequencediagrams.com/cgi-bin/cdraw?lz=YnJvd3Nlci0-c2VydmVyOiBIVFRQIEdFVCBodHRwczovL3N0dWRpZXMuY3MuaGVsc2lua2kuZmkvZXhhbXBsZWFwcC9zcGEKADkGLS0-AEoHOiBIVE1MLWNvZGUgKHNwYSkKACZEbWFpbi5jc3MAXBMAEgkAgQtHLmoAUhQAEgcKbm90ZSBvdmVyIACBaAgAgVgIIHN0YXJ0cyBleGVjdXRpbmcganMAggIFCnRoYXQgcmVxdWVzdHMgSlNPTiBkYXRhIGZyb20gAIJ5BiAKZW5kIG5vdGUKAIFrRWRhdGEuanNvbgCDDRNbeyBjb250ZW50OiAiSFRNTCBpcyBlYXN5IiwgZGF0ZTogIjIwMTktMDUtMjMiIH0sIC4uLl0AgV4dAIFuBmVzIHRoZSBldmVudCBoYW5kbGVyAIF1CG5kZXJzAIFcBXMgdG8gZGlzcGxheQCBbQk&s=default