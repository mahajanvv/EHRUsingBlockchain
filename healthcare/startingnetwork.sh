composer network install --card PeerAdmin@hlfv1 --archiveFile healthcare@0.0.1.bna
composer network start --networkName healthcare --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file healthcarenetworkadmin.card
composer network ping --card admin@healthcare
composer-rest-server -c admin@healthcare -n never -u true -w true


