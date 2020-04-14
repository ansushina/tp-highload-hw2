apt-get update -y
apt-get install nginx -y
sudo nginx
cp -f ./nginx.conf /etc/nginx/nginx.conf
cp -f ./default /etc/nginx/sites-available/default
sudo nginx -s reload
apt update -y
apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
apt update -y
apt-cache policy docker-ce
sudo apt install docker-ce -y
./start.sh
sudo systemctl status docker
