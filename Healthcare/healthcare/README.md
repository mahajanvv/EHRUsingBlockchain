# healthcare

This is EHR system


export COMPOSER_PROVIDERS='{
  "github": {
    "provider": "github",
    "module": "passport-github",
    "clientID": "0865f0c645f4c205a706",                    
    "clientSecret": "6f84a424231a8c45c8532af2277bc2b678a1ec6b",               
    "authPath": "/auth/github",
    "callbackURL": "/auth/github/callback",
    "successRedirect": "/",
    "failureRedirect": "/"
  }
}'