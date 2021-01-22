#!/bin/bash
sudo screen -S frontend -X quit;
sleep 1;
sudo screen -dmS frontend -L bash -c ' sleep 2; cd /var/lib/jenkins/workspace/brzaklopa_frontend; sleep 1; npm run start:prod'
