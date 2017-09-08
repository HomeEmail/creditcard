

### 启动

```
supervisor server/bin/www

//或者//https://blog.linuxeye.com/435.html
pm2 start server/bin/www --watch


```


##启动redis服务

在安装根目录下执行命令

window:
cmd运行 redis-server.exe redis.windows.conf 

mac:


##启动redis客户端

在安装根目录下执行命令,默认端口 6379

redis-cli -h host -p port -a password