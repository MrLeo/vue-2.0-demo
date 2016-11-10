#=> 选择官方的 node 镜像作为项目的基础镜像
FROM node:0.12.7-wheezy
MAINTAINER Leo "lxbin6819@vip.qq.com"

RUN npm install
RUN npm run build

#=> 由于该项目生成是纯静态文件，我们用 Nginx 来作为 Web 服务器
FROM nginx
COPY /dist /usr/share/nginx/html