composer network install --card PeerAdmin@hlfv1 --archiveFile healthcare@0.0.1.bna
composer network start --networkName healthcare --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file healthcarenetworkadmin.card
composer network ping --card admin@healthcare

composer-rest-server -c admin@healthcare -n never -u true -w true

#export COMPOSER_PROVIDERS='{"github":{"provider":"github","module":"passport-github","clientID":"0865f0c645f4c205a706","clientSecret":"6f84a424231a8c45c8532af2277bc2b678a1ec6b","authPath":"/auth/github","callbackURL":"/auth/github/callback","successRedirect":"/","failureRedirect":"/"}}'
#composer-rest-server --card admin@healthcare -n "never" -p 3000 -a true -m true
#composer card export -c admin@healthcare -f admin-plus-cert.card



#composer card export -c admin@<my-network> -f admin-plus-cert.card