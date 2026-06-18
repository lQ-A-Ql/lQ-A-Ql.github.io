
# 獬豸杯（4——计算机/服务器取证）
> 事先声明：仅供参考 我不知道正确答案，所以不包对哈，要是出错了 还请指出 感谢

## 检材基本信息
| 属性        | 值                                  |
| --------- | ---------------------------------- |
| 文件名       | 检材2.E01                            |
| 格式        | EWF (Expert Witness Format)        |
| 原始镜像大小    | 100.6 GB (108,018,008,064 bytes)   |
| E01压缩文件大小 | 17.83 GB                           |
| MD5       | `56674dba14308a8dee1ed07298b4b645` |
| 扇区大小      | 512 bytes                          |
| 分区表类型     | DOS (MBR)                          |
| 系统        | Windows                            |

| 属性  | 值       |
| --- | ------- |
| 文件名 | 检材3.E01 |
| 格式  | EWF     |
| 系统  | Linux   |

### 仿真
先在FTK中把`C:\Windows\System32\config`扒下来丢到工具里拿哈希
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617213711444.png)
`31d6cfe0d16ae931b73c59d7e0c089c0`
接着丢给这个站爆破一下下 https://hashes.com/zh/decrypt/hash
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617213856787.png)
似乎没有密码？有意思
然后转换一下格式，将E01转换成虚拟磁盘
```bash
mkdir windows_mount
ewfmount ./检材2.E01 ./windows_mount/  # 挂载镜像

qemu-img convert -f raw -O vmdk ./windows_mount/ewf1 ./windows.vmdk # 转换 需要等待~~
```
然后正常创建虚拟机 （注意引导选BIOS~）
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617220632790.png)
然后就直接进来了，真没密码
## 计算机部分

### 1.请分析检材2：密码连续错误输入多少次数后，系统会自动锁定用户账户？【答案格式：1】
查看账户策略喵
```powershell
net accounts
```
![](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617221141230.png)
很明显的`3`
### 2.请分析检材2：检材中对应的微信 wxid 是多少？【答案格式：wxid_1a2b3c4d5e6f】
文档里有一个`xwechat_files` 微信的文件夹
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617221605570.png)
进去就能看到一个以微信号命名的子文件夹
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617221715168.png)
所以答案是`wxid_q1w2e3r4t5y6u7i8o9`
### 3.请分析检材2：E盘 BitLocker 恢复密钥末尾六位是多少？【答案格式：616912】
桌面有一个bitlocker文档 但是密钥和磁盘不匹配（想骂人）
但是`MsgAttach`下有俩豆包儿生成的带二维码的图
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617222134743.png)
这个扫码扫出来是
```test
恢复密钥: 288299-415613-320683-425546-455752-701327-044110-126269
```
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617222227816.png)
这个扫码扫出来是
```text
恢复密钥: 288299-415613-320683-425546-455752-701327-044110
```
只有七段，有点好笑 那么答案很明显了`126269`
顺便解密磁盘
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617222737742.png)
记住这个数据库 后面要考
### 4.请分析检材2：VC加密容器的外层加密卷密码是什么？【答案格式：根据实际值填写】
D盘有一个`1`和`1.png`  其中`1` 应该就是加密卷 （1个G呢）

将`1.png`用记事本打开就能看到答案 
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617223420828.png)
`JHTJ!@#¥A313`
### 5.请分析检材2：带有“豆包AI生成”水印的图片一共有多少张？【答案格式：1】
算上题3的2张  图片目录下还有4张 总共6张
### 6.请分析检材2：VC加密容器的隐藏加密卷密码是什么？【答案格式：根据实际值填写】
其实到现在 盘里有用的东西已经不多了，最可疑的就是那几张还没有用到的图片  所以接下来考虑一下图片隐写

结合上题 优先考虑一下豆包生成的图，拖到随波逐流一把梭嘻嘻

最后在`3.png` 里梭出一张二维码
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618181458375.png)
扫码
```text
隐藏加密卷密码：ClearSky@SecretSignal#SevenMileJasmine
```
### 7.请分析检材2：接上题，嫌疑人的接头暗号是什么？【答案格式：根据实际值填写】
直接用上一题密码解密会失败 这时候注意到 桌面的一个图片
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618182639484.png)
显眼的`PASSWORD` 将其作为密钥文件再次解密，顺利挂载
![](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618182802719.png)
很多音频啊 继续往隐写考虑，拖进这个叫什么`Audacity`
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618183011321.png)
答案很清晰 `步行9千米`
### 8.请分析检材2：接上题，嫌疑人的接头地点在哪里？【答案格式：天津117大厦201室】
之前看 图片目录的时候不是四张挂着二进制的图片嘛
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618183428521.png)
OCR一下
```text
5.png                   
	10001110 10111011 10110011 10101010 10111111 10110011 11111010	

6.png
	11101011 11101010 11101011 11111010 10111000 10101111 10110011

7.png
	10110110 10111110 10110011 10110100 10111101 11111010 11101111

8.png
	11101010 11101000 11111010 10101000 10110101 10110101 10110111
```
但是无法直接转换回字符串，注意上一题中容器里的`异或密钥.txt`，明示了需要进行一次异或 里面是 `11011010`

因此可以写出脚本
```python
from operator import xor

def _xor(lst, key):
    res_str = ""
    for bin in lst:
        res = xor(int(bin, 2), key)
        res_str += chr(res)
    print(res_str, end="")

key = int("11011010", 2)

png5=["10001110", "10111011", "10110011", "10101010", "10111111", "10110011", "11111010"]  
png6=["11101011", "11101010", "11101011", "11111010", "10111000", "10101111", "10110011"]
png7=["10110110", "10111110", "10110011", "10110100", "10111101", "11111010", "11101111"]
png8=["11101010", "11101000", "11111010", "10101000", "10110101", "10110101", "10110111"]

_xor(png5, key)
_xor(png6, key)
_xor(png7, key)
_xor(png8, key)
```
结果是`Taipei 101 building 502 room` 按格式来就是`台北101大厦502室`
### 9.请分析检材2：木马残留样本中，核心信息窃取配置数量为多少？【答案格式：1】
残留样本在bitlocker盘中
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618191114418.png)
接下来开始分析源码

第一个 键盘记录
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618192825547.png)
第二个 屏幕截图
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618192846696.png)
第三，四个 浏览器的数据库和Cookie
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618192919605.png)
第五个 内存注入函数 会窃取系统信息
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618203224553.png)
总共`5`个
### 10.请分析检材2：木马残留样本中，申请的内存保护标志是什么？（尤其注意格式）【答案格式：PAGE_READWRITE (0x04)】
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618204929614.png)
`PAGE_EXECUTE_READWRITE(0x40)`
### 11.请分析检材2：嫌疑人涉案交易使用的银行卡号是什么？【答案格式：纯数字】
注意文档目录下的这俩
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618194801122.png)
`密码.txt`给出了格式
```text
【4个字母前缀】 + 【1个特殊符号分隔符】 + 【8位当天日期】
```
日期已经有了`20260512`
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618195001694.png)
接着就是掩码爆破 

先来拿个哈希
https://hashes.com/zh/johntheripper/office2john
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618231214943.png)
然后喊出哈希猫猫
```bash
hashcat -m 9400 -a 3 '$office$*2007*20*128*16*3fde2e2b8469111ac5658b678c6f9478*d078ba8c0688890eeca29f194d9d0ff7*944188dc1201c83e810306030748805ccf9e1570' -1 ?l?u ?1?1?1?1?s20260512 -O
```
一个小时后~~~ （要哭了）
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618231052090.png)
拿到密码`JUHE@20260512`
解密文档
![](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618231328482.png)
`6221882234367490125`

### 12.请分析检材2：AI 换脸图片大概率使用的 AI 模型是哪一个？【答案格式：根据实际值填写】
可以用 https://hivedetect.ai/ 查 

我查出来是`reve`
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618220529995.png)
但是别的佬查出来是`steadydancer`

emmm...... 以后再说嘻嘻
### 13.请分析检材2：萤小石的身份证号码是什么？【答案格式：纯数字】
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618220002819.png)
能看到一个身份证文件夹 但是里面的身份证号码被抹掉了

还有一个加密压缩包 但是找不到密码 考虑一下伪加密 随波逐流一把梭
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618220116613.png)
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618220146974.png)
还是没有（想骂人），继续考虑图片隐写，在文件末尾找到身份证号
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618220228146.png)
`330122199801209527`（还算半个老乡？）
### 14.请分析检材2：小众通联工具绑定的手机号码为多少？【答案格式：纯数字】
BitLocker盘里有一个雷电模拟器的备份文件
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618213810209.png)
打开呢就能看到我们的老朋友i聊
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618213725331.png)
老位置
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618214234302.png)
不过这里`msg_0.db`是空的 来看`im.db`
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618214527392.png)
在`userinfo`表里找到我们萤小石头的手机号`18136091921`
### 15.请分析检材2：小众通联工具添加好友的具体时间是什么？【答案格式：2025-01-01 01:01:01】
同一个表 `add_time`字段
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618214734380.png)
换算一下
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618214811244.png)
`2026-05-13 16:12:37`
### 16.请分析检材2：挖矿程序（请勿在本地运行）的版本是什么？【答案格式：1.00.1】
翻目录的时候能看到`Windows`下还有一个`windows`，很可疑的好吧
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618214916426.png)

进来呢就看到了我们的xmrig
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618215011284.png)
拖进010搜索
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618215913010.png)
`6.26.0`
### 17.请分析检材2：门罗币钱包地址后6位是什么？【答案格式：根据实际值填写】
看`config.json`
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618215425565.png)
`6soTWp`
## 服务器部分
### 仿真
在FTK里翻`/etc/shadow`查看一下当前系统存在哪些用户及其密码哈希
```bash
root:$6$Dr/jD4GDuyU.3Jxv$zhR1xXCN6x4Nz0LR5Mmvmgn/KfJI6zMUV/1L8O.pCuhzazEWgJutz9yL86hYDGCFMRYwQkdHqfG8X412/huMC1::0:99999:7:::

ahao:$6$woSPwPD0uy$KSMnhzrYbDlMYZS3yt6nL7XcNSp6.zPm9cYrC43nImVT/jAv/5yEEGicdgTh9pv.vH/t.lhqUrhl09XiG0dNg0:20587:0:99999:7:::
```
注意这两个 然后用`hashcat`爆破，最后能爆出`root`的密码`1234`
```bash
hashcat -m 1800 -a 0 '$6$Dr/jD4GDuyU.3Jxv$zhR1xXCN6x4Nz0LR5Mmvmgn/KfJI6zMUV/1L8O.pCuhzazEWgJutz9yL86hYDGCFMRYwQkdHqfG8X412/huMC1'  /usr/share/wordlists/rockyou.txt
```
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617155423092.png)

接下来需要将镜像转换成虚拟磁盘
```bash
mkdir linux_mount
ewfmount ./检材3.E01 ./linux_mount/  # 挂载镜像

qemu-img convert -f raw -O vmdk ./linux_mount/ewf1 ./linux.vmdk # 转换 需要等待~~
```
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617160959847.png)
然后创建虚拟机

期间可能会遇到 包括但不限于 `xfs` 错误 识别不到盘 卡在服务启动等等...
![屏幕截图 2026-06-17 170110.png|591](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-06-17%20170110.png)
emmm....差不多就是这样的

解决起来有点麻烦 重启在`GRUB`页时按`e` 找到`linux16`开头的那行 在末尾加上`systemd.unit=rescue.target`然后按`ctrl+x`启动进入`rescue shell`

然后依次敲以下命令
```bash
mount -o remount,rw /    # 挂载分区可读写 

xfs_repair -L /dev/mapper/cl-root    # 修复xfs

mount -o rw /dev/mapper/centos-root /sysroot    # 挂载root分区

mount --bind /dev /sysroot/dev  
mount --bind /proc /sysroot/proc  
mount --bind /sys /sysroot/sys  
chroot /sysroot /bin/bash

exit  
reboot    # 重启
```
然后终于进系统了 我要哭了
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617192529390.png)
### 1.请分析检材3：服务器的内核版本号是多少？【答案格式：4.25.0】
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617193350577.png)
`3.10.0`
### 2.请分析检材3：嫌疑人将某普通用户加入特殊用户组，赋予其读取 /etc/shadow 的权限，请问该普通用户的用户名是什么？【答案格式：admin】
用`getfacl` 命令喵 （因为`/etc/group`很正常 因此怀疑通过ACL对用户进行授权）
```bash
getfacl /etc/shadow
```
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617194555659.png)
答案是`ahao` 当然这个系统除了`root`就是`ahao` 所以显而易见
### 3.请分析检材3：分析嫌疑人所使用的 Web 服务器，其具体名称及主版本号是什么？【答案格式：apache/2.40】
`/var/log`下能翻到`nginx`说明嫌疑人使用的是`nginx`，因此
```bash
nginx -v
```
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617195553032.png)
`1.20.1`
### 4.请分析检材3：嫌疑人借助 AI 部署 “守卫” 脚本，非管理员 IP 登录时将触发定时强制登出，该服务每隔几分钟触发一次？【答案格式：10】
已经体验到了ssh动不动重连() 

emm...应该是五分钟来的()
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617200531990.png)
第一思路一定是看定时任务，但是很烦人啊这个 `crontab -l` 展示的文件基本都删了 `/etc/cron*`下也没什么有用的东西，那么就换下一个思路

要想到 既然这个脚本一直在监控，那么说明他一直在执行 所以 `ps -aux` 看看当前进程
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617202007662.png)
果然看到一个`python`脚本 而且命名很规范奥 过去看一眼
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617202123309.png)
果然是`5`
> 有一说一 脚本AI味好重（）

### 5.请分析检材3：计算服务器内数据库备份文件，计算其SHA256哈希值，取后6位，字母大写。【答案格式：6DEF38】
先前看计划任务时其实能够看到一个自动备份脚本`autobackup.sh`
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617210801725.png)
`cat`一下啊

![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617211206762.png)
能找到备份的路径 
但是这里需要注意的是 由于是定时任务 因此上机的时候会自动执行备份并替换 导致样本失真，所以打算从原E01中拿 
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617211418988.png)
然后你就能发现这6个备份全是空的嘻嘻 （我真要骂人了）

但是还记得计算机检材翻出来的那个备份么？就是那个了 （`/opt`下还有一个`faka.sql` 但是那个日期太老了）

拉到服务器里计算
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618221042297.png)
`FF8180`
### 6.请分析检材3：MySQL 数据库 root 用户的登录密码是什么？【答案格式：根据实际值填写】
来翻网页源码
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617202751725.png)
答案显而易见  `Root@123456`

顺便导入一下数据库重建一下网站 
### 7.请分析检材3：外挂网站所对外开放的端口号是多少？【答案格式：1234】
翻`nginx`的配置文件 `/etc/nginx/nginx.conf`
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617203005677.png)
答案是`8081`
### 8.请分析检材3：嫌疑人为上传大型恶意插件修改文件上传限制，其最大上传限制是多少？【答案格式：100M】
在`/root/.viminfo`里能看到嫌疑人修改了`php.ini` 也就是php的配置文件 
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617205816560.png)
过去看看
```bash
cat /etc/php.ini | grep -v ";" # 过滤一下注释
```
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617210208475.png)
成功找到 `60M`
### 9.请分析检材3：嫌疑人设置数据库定时自动备份并上传至境外，请问该境外服务器的IP地址是多少？【答案格式：8.8.8.8]】
同题5
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260617210853867.png)
答案很明显 `8.208.44.202`
### 10.请分析检材3：嫌疑人登录后台的目录路径是什么？【答案格式：/abc/abc】
数据库`shua_logs`表下可以看到嫌疑人的IP和对应登录后台的记录
> 这个IP在刚进入系统时就能看到 不知道大家有没有注意
> ![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618232550900.png)

![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618232108734.png)
注意要搜肯定搜最新的`2026-05-13 18:27:02`
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618233551522.png)
`static/login.php`
(搜老日期会是`/admin/login.php` 说明嫌疑人换过一次后台的)
### 11.请分析检材3：访问后台登录页面次数最多的 IP 地址是什么？【答案格式：192.168.1.1】
`192.168.203.135` 和上一题同一个表
### 12.请分析检材3：网站后台管理员的明文密码为多少？【答案格式：根据实际值填写】
来看登录源码
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618233724530.png)
加盐`SHA256`盐值是`2025baofu!`
然后再`shua_config`下可以找到哈希![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618233816817.png)
然后爆破
```bash
◆ QAQ ❯❯❯ hashcat -m 1410 -a 0 '94bd34e3010a6468f312eafe359e9d926fc16bba62c0b6cf646d041a5c281bf2:2025baofu!' /usr/share/wordlists/rockyou.**txt**
```
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618234139469.png)
拿到密码`abc12346` (好像拿yakit爆破网页也成)
### 13.请分析检材3：该网站支付接口所对接的第三方接入商名称是什么？【答案格式：根据实际值填写】
用拿到的密码登录后台 这里记得改下源码 把验证码关掉 不然会一直卡在验证码错误（想骂人）
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618235257235.png)
再后台写的很清楚 `无忧支付`
### 14.请分析检材3：网站的创建时间是什么时候？【答案格式：2026/5/20】
`shua_config` 表
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260618230354762.png)
`2018/12/14`
### 15请分析检材3：网站Git配置信息中，找出作者姓名是什么？【答案格式：根据实际值填写】
来看history
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260619011407382.png)
嫌疑人将git备份移动到了`/usr/share/icons/hicolor/48x48/app/...`下 过去看看（注意`...`是隐藏目录哦）
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260619011737086.png)
能看到`name`字段跟着一串`hex`

转成字符后看到一串`base64`
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260619011920491.png)
解码就有了答案
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260619011946267.png)
`ZhangSan_Sec`

### 16.请分析检材3：分析该网站 2025 年 6 月 1 日至 12 月 31 日的全部订单，其中状态为 "已完成" 的订单总成交金额为多少？【答案格式：1234】
看`shua_orders`表，日期都在范围内，就不用多余筛选了
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260619001128393.png)
总计`24073`
### 17.请分析检材3：分析 2025 年全年的订单数据，计算下单金额总计最高的那一天的总金额是多少？【答案格式：1234】
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260619001816596.png)
答案是`5442`
### 18.请分析检材3：统计全部订单数据，购买数量累计最高的应用名称是什么？【答案格式：根据实际值填写】
依旧先看`shua_orders`表 找销售量最高的`tid`
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260619004800024.png)
对应`1912`

接着去`shua_tools`翻对应的名称
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260619004855502.png)
`无畏契约自动扳机+透视+准星辅助`
### 19.请分析检材3：统计全部订单数据，用户累计购买总额最高的用户账号是哪个？【答案格式：admin】
同样的方式 找到消费最高的`zid` 
![](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260619005111005.png)
`23`

然后去`shua_site`里找对应的用户
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260619005317102.png)
答案就是`guoqi`


### 20.请分析检材3：嫌疑人创建的拥有 FILE 与 SUPER 权限的隐蔽 MySQL 账户，其用户名是什么？【答案格式：admin】
回服务器搜索
```sql
select User, Super_priv, File_priv from user where user.Super_priv = 'Y' and user.File_priv = 'Y' ;
```
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260619011012497.png)
答案是 `_tmp_z5m1w8`
