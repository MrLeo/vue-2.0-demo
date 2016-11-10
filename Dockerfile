#=>选择官方的 node 镜像作为项目的基础镜像
FROM node:0.12.7-wheezy
MAINTAINER Leo "lxbin6819@vip.qq.com"

#=>由于该项目生成是纯静态文件，我们需要 Nginx 来作为 Web 服务器。
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
COPY .* /app

#=>构建项目，bower 默认不允许 Root 权限运行，所以要加入 --allow-root 参数
RUN npm install --allow-root
RUN npm run build --allow-root

#=>将构建生成的静态文件复制到 Web 根目录
RUN cp -R /app/dist/*  /usr/share/nginx/html

#=>设置 Docker 默认运行命令，启动 Nginx 为前台运行
CMD ["nginx", "-g", "daemon off;"]
