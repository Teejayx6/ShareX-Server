# ShareX Server

---

## I am not sure why I made this but it was fun

It is not very advanced, I just wanted to make one that had enough features that I could actually use it.
Feel free to PR it if you find any flaws in the code.

---

## To do list:

### 1. Figure out how to redirect a request if from a web browser only

---

Example config.json
```json
{
    "port": 80,
    "url": "localhost",
    "protocol": "http://",
    "fileSizeLimits": 268435456,
    "webhookurl": "DISCORD WEBHOOK URL",
    "atlas": {
        "username": "USERNAME",
        "password": "PASSWORD",
        "cluster": "CLUSTER"
    }
}
```

---

Example ShareX Config
```json
{
  "Version": "13.1.0",
  "DestinationType": "ImageUploader, FileUploader",
  "RequestMethod": "POST",
  "RequestURL": "http(s)://YOURURL/upload",
  "Body": "MultipartFormData",
  "Arguments": {
    "FNL": "FILENAMELENGTHHERE",
    "key": "YOURKEYHERE"
  },
  "FileFormName": "file",
  "URL": "$json:file.url$",
  "DeletionURL": "$json:file.delete_url$"
}
```
