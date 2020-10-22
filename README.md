# ShareX Server

## About

This is a ShareX server that I made.
Written in around seven weeks so far.
  
---

## Requirements to run

- A DB properly configured

- Domain name or IP pointing to the server

- ShareX or a similar application

---

## TODO

- Comment my code

- frontend

---

## Setup

1. Clone the git repo.

2. cd to src directory

3. Create and setup the config.json file.

4. Use a process manager such as pm2 to run the server 24/7.

---

## Info

### Example config.json

```json
{  
  "maxFileSize": 9007199254740991,  
  "connectURI": "mongodb://localhost/sharex",  
  "mainURL": "https://example.com",  
  "token": "[DISCORD BOT TOKEN]",  
  "database": "mongo",
  "mongo": {
    "connectURI": "mongodb://localhost/sharex",
    "connectOptions": {}
  },
}
```

### Example ShareX custom uploader
```json
{
  "Version": "13.1.0",
  "Name": "CUSTOM UPLOADER",
  "DestinationType": "ImageUploader, TextUploader, FileUploader",
  "RequestMethod": "POST",
  "RequestURL": "https://example.com/api/upload",
  "Headers": {
    "key": "[KEY CREATED BY DISCORD BOT]"
  },
  "Body": "MultipartFormData",
  "Arguments": {
    "fnl": "5"
  },
  "FileFormName": "file",
  "URL": "$response$",
}
```

### Example ShareX url shortener
```json
{
  "Version": "13.1.0",
  "Name": "CUSTOM URL SHORTENER",
  "DestinationType": "URLShortener, URLSharingService",
  "RequestMethod": "POST",
  "RequestURL": "https://example.com/api/url",
  "Headers": {
    "key": "[KEY CREATED BY DISCORD BOT]"
  },
  "Body": "MultipartFormData",
  "Arguments": {
    "url": "$input$"
  },
  "URL": "$response$"
}
```

### Contributors

- [Roki](https://github.com/Roki100)
