

### 启动

```
supervisor server/bin/www

//或者//https://blog.linuxeye.com/435.html
pm2 start server/bin/www --watch


```


nodejs 解决中文乱码问题 ：使用iconv-lite 库

跑定时任务  node-schedule 


##启动redis服务

在安装根目录下执行命令

window:
cmd运行 redis-server.exe redis.windows.conf 

mac:
使用配置文件启动redis server 
$ redis-server /usr/local/etc/redis.conf

##启动redis客户端

在安装根目录下执行命令,默认端口 6379

redis-cli -h host -p port -a password


##nodejs 图像库

gm:

https://www.npmjs.com/package/gm

First download and install GraphicsMagick or ImageMagick. In Mac OS X, you can simply use Homebrew and do:

brew install imagemagick

brew install graphicsmagick

If you want WebP support with ImageMagick, you must add the WebP option:

brew install imagemagick --with-webp

then either use npm:

yarn add gm

images:

https://github.com/zhangyuanwei/node-images



