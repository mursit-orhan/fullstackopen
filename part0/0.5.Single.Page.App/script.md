title Creates a new Note

note right of browser: add a new note (user input)
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
server-->browser: HTTP status code 302 (URL redirect)
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js
note right of browser: browser starts executing js-code \n that requests JSON data from server
browser->server:HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{content: "HTML is easy", date: "2019-05-23"}]
note right of browser: browser executes the event handler\n that renders notes to display

LINK:

https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgQ3JlYXRlcyBhIG5ldyBOb3RlCgpub3RlIHJpZ2h0IG9mIGJyb3dzZXI6IGFkZAAgBwAcBSh1c2VyIGlucHV0KQoAHgctPnNlcnZlcjogSFRUUCBQT1NUIGh0dHBzOi8vc3R1ZGllcy5jcy5oZWxzaW5raS5maS9leGFtcGxlYXBwL25ld19ub3RlCgA_Bi0tPgBzCQBKBXN0YXR1cyBjb2RlIDMwMiAoVVJMIHJlZGlyZWMAaxlHRQBWLW90ZXMAaxVNTC1jb2RlACFFbWFpbi5jcwBVFAASCQAfSWoAThlqcwCDUxgAg20HIHN0YXJ0cyBleGVjdXRpbmcganMAggEFIFxuIHRoYXQgcmVxdWVzdHMgSlNPTiBkYXRhIGZyb20gAIQBBgCEBhEAgl8zZGF0YS5qc29uAIQDE1t7Y29udGVudDogIkhUTUwgaXMgZWFzeSIsIGRhdGU6ICIyMDE5LTA1LTIzIn1dAIFOIACBYQZlcyB0aGUgZXZlbnQgaGFuZGxlcgCBZQpuZGVycwCFfAVzIHRvIGRpc3BsYXkKCgoK&s=default
