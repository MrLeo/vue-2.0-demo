#=>选择官方的 node 镜像作为项目的基础镜像
FROM node:4.2.2

MAINTAINER Leo "lxbin6819@vip.qq.com"

RUN apt-key adv --keyserver pgp.mit.edu --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
RUN echo "deb http://nginx.org/packages/mainline/debian/ wheezy nginx" >> /etc/apt/sources.list

ENV NGINX_VERSION 1.7.12-1~wheezy

RUN apt-get update && \
    apt-get install -y ca-certificates nginx && \
    rm -rf /var/lib/apt/lists/*

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

#=>进入项目目录
WORKDIR /app
COPY . /app/

#=>构建项目
RUN npm install
RUN npm run build

#=>将构建生成的静态文件复制到 Web 根目录
RUN cp -R /app/dist/*  /usr/share/nginx/html

#=>设置 Docker 默认运行命令，启动 Nginx 为前台运行
CMD ["nginx", "-g", "daemon off;"]
