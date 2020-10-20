## Required functions

### Files
| Function | Description | Args |
| - | - | - |
| addFileView | Make file views 1 greater than before | file name |
| getFile | Get a file's data | file name |
| saveFile | Create a new file in the DB | file data (Object) |
| delFile | Delete a file in the DB | file name |

### IP Logging
| Function | Description | Args |
| - | - | - |
| getIP | Get the IP data | IP (how ever you parse it) |
| saveIP | Create a new IP in the DB | IP data (Object) |
| delIP | Delete the IP from the DB | IP (how ever you parse it) |

### URL Redirects
| Function | Description | Args |
| - | - | - |
| addURLView | Make the url views 1 greater than before | URL ID |
| getURL | Get the URL data | URL ID |
| saveURL | Create a new URL in the DB | URL data (Object) |
| delURL | Delete the URL from the DB | URL ID |

### Users
| Function | Description | Args |
| - | - | - |
| addUserUpload | Make user Uploads 1 greater than before | user key |
| addUserRedirect | Make user Redirects 1 greater than before | user key |
| setDiscord | Set the user's discord ID | user key, discord id |
| getUserFromKey | Get a user from their key | user key |
| getUserFromDiscord | Get a user from their discord | discord id |
| getUserFromName | Get a user from their name | user name | 
| getAllUsers | Get all users | none |
| saveUser | Create a new user | user data (Object) |
| delUser | Delete a user | user key |

### Init
| Function | Description | Args |
| - | - | - |
| init | Called on start | none |