apt-get update
apt-get install nginx
sudo nginx
cp -f ./nginx.conf /etc/nginx/nginx.conf
cp -f ./default /etc/nginx/sites-available/default
sudo nginx -s reload
apt update
apt install apt-transport-https ca-certificates curl software-properties-common
apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker

