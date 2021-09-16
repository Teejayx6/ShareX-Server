# ShareX Server

## About

This is a ShareX server that I made.
Written in around one week so far.
  
---

## Requirements to run

- MongoDB server running

- Domain name or IP pointing to the server

- ShareX or a similar application

---

## TODO

- Comment my code

---

## Setup

1. Clone the git repo.

2. Create and setup the config.json file.

3. Use a process manager such as pm2 to run the server 24/7.

---

## Info

### Example config.json
```json
{  
  "maxFileSize": 9007199254740991,  
  "connectURI": "mongodb://localhost/sharex",  
  "mainURL": "https://example.com",  
  "token": "[DISCORD BOT TOKEN]",  
  "userID": "277183033344524288",
  "uploadURL": "https://exmample.com/api/url"

}
```

### Example ShareX custom uploader
```json
{
  "Version": "13.1.0",
  "Name": "CUSTOM UPLOADER",
  "DestinationType": "ImageUploader, TextUploader, FileUploader",
  "RequestMethod": "POST",
  "RequestURL": "http://example.com:1234/api/upload",
  "Headers": {
    "key": "[KEY CREATED BY DISCORD BOT]"
  },
  "Body": "MultipartFormData",
  "Arguments": {
    "fnl": "4"
  },
  "FileFormName": "file",
  "URL": "$json:file.url$",
  "DeletionURL": "$json:file.delete_url$"
}
```

### Example ShareX url shortener
```json
{
  "Version": "13.1.0",
  "Name": "CUSTOM URL SHORTENER",
  "DestinationType": "URLShortener, URLSharingService",
  "RequestMethod": "POST",
  "RequestURL": "http://example.com/api/url",
  "Headers": {
    "key": "[KEY CREATED BY DISCORD BOT]"
  },
  "Body": "MultipartFormData",
  "Arguments": {
    "url": "$input$"
  },
  "URL": "$json:url$"
}
```
