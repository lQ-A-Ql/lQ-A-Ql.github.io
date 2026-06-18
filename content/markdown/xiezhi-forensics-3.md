
# 獬豸杯（3——内存取证）
> 事先声明：仅供参考 我不知道正确答案，所以不包对哈，要是出错了 还请指出 感谢

## 检材基本信息

| 属性     | 值                                                                                     |
| ------ | ------------------------------------------------------------------------------------- |
| 样本文件   | HACKER-20260606-174920.dmp                                                            |
| SHA256 | a83b4e74d44ce351aac81ab3fa44657309561a8f0c61fac9c9ee9d5c677e7272                      |
| 文件大小   | 8,588,783,616 字节                                                                      |
| 系统     | Windows 10.0.26100 (X64)                                                              |
| 背景     | 公司某员工的电脑感染了勒索病毒，所有办公文档都被加密。安全团队在病毒仍在运行时制作了内存镜像。要求从内存镜像中提取加密密钥，解密被加密的最重要文档，获取其中的 flag。 |

## 解题过程
### 1.该勒索进程的进程标识号（PID）是多少？【按实际值填写】
第一题呢可能需要一点英语基础
```powershell
vol -f .\HACKER-20260606-174920.dmp windows.pslist
```
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616192747336.png)
注意这个`ransom.exe`
`ransom`可以是`Ransomware(勒索病毒)`的简称，并且本身又有胁迫的意思
所以这个就是勒索进程 答案就是`8804`
### 2.受害计算机的主机名（COMPUTERNAME）是什么？ 【答案格式：ABC】
看进程环境变量
```powershell
vol -f .\HACKER-20260606-174920.dmp windows.envars --pid 8804
```
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616193413015.png)
`HACKER`
### 3.勒索软件将用户桌面下哪个子目录中的文件进行了批量加密？【仅写目录名，答案格式：abc1234_abc1234】
先找一下这个程序在哪叭
```bash
vol -f ./HACKER-20260606-174920.dmp windows.file | grep ransom
```
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616194216384.png)
在桌面 
然后用memprocfs挂载一下叭
```powershell
MemProcFS.exe -device .\HACKER-20260606-174920.dmp -forensic 4
```
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616194358277.png)
找到勒索程序

> 这里直接用vol也行 只是想玩玩memprocfs
> `vol -f ./HACKER-20260606-174920.dmp windows.dumpfiles --pid 8804`

接着，拖入ida开始逆向
通过字符串很容易就能找到主逻辑函数`sub_140009000`
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616201930402.png)
答案很清晰啦 `2026xzb_enc`
### 4.附件 secret_project4.docx.enc 采用勒索家族自定义封装格式。请对该文件进行十六进制分析，该加密文件开头的 5 字节魔数（Magic）是什么？【答案格式：ABCDe 大小写需完全一致】
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616202038740.png)
`RNSMa`
### 5.真正的密文数据从文件起始偏移多少字节处开始？（从 0 计）【答案格式：数字】
这里要去看核心加密函数`sub_1400014C0`啦
注意这个
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616212854939.png)
第一个`fwrite`写入字符串`RNSM`
第二个`fwrite`写入一个4字节大小的整数`Size`
然后才是填入加密内容
因此从偏移8字节开始 答案是`8`
### 6.请从内存镜像中提取本次加密所使用的对称密钥，该密钥的长度是多少字节？【答案格式：数字】
来看这一段，注释我已经标上啦，最后答案是 `24-8=16` 
```C
 v5 = HeapAlloc(ProcessHeap, 8u, 24u);  //分配24字节空间
  qword_14000F030 = (__int64)v5;        //赋给全局指针
  if ( v5 )
  {
    *v5 = -559038242;                   //头部4字节标识 DEAD C0DE  
    v5[5] = -889275714;                 //尾部4字节标识 CAFE BABE
    if ( CryptAcquireContextW(&phProv, 0, 0, 1u, 0xF0000000) )
    {
      if ( CryptGenRandom(phProv, 0x10u, (BYTE *)(qword_14000F030 + 4)) ) //密钥流初始化
```
### 7.请写出密钥的完整十六进制表示【答案格式：无空格、无 0x】
先dump进程内存
```bash
vol -f ./HACKER-20260606-174920.dmp windows.memmap --pid 8804 --dump
```
然后将dump下来的内存拖到 010 中直接搜标识（这里要注意一下端序~，ida中看到的是小端 010中是大端）
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616205528334.png)
最后答案就是 `cb8978dde5b08227aac1c40ba91849c5`
### 8.请结合内存样本、导入表或静态逆向分析，对 .enc 文件中密文部分所采用的加密算法名称是什么？【答案格式：大写】
来分析他具体的加密逻辑
初始化S盒
```C
              v12 = v51;
              v13 = _mm_loadu_si128((const __m128i *)&xmmword_14000B180);
              v14 = qword_14000F030 + 4;
              v15 = (__m128i *)v51;
              v16 = _mm_srli_epi16((__m128i)-1LL, 8u);
              v17 = _mm_shuffle_epi32(_mm_cvtsi32_si128(12u), 0);
              v18 = _mm_shuffle_epi32(_mm_cvtsi32_si128(16u), 0);
              v19 = _mm_shuffle_epi32(_mm_cvtsi32_si128(4u), 0);
              v20 = _mm_shuffle_epi32(_mm_cvtsi32_si128(8u), 0);
```
标准KSA
```C
              do
              {
                v34 = v33;
                v35 = *v12;
                ++v33;
                ++v12;
                v32 = (unsigned __int8)(v35 + *(_BYTE *)(v14 + (v34 & 0xF)) + v32);
                *(v12 - 1) = v51[v32];
                v51[v32] = v35;
              }
              while ( v33 != 256 );
```
标准PRGA
```C
				do{
                  v7 = (unsigned __int8)(v7 + 1);
                  v39 = v51[v7];
                  v37 = (unsigned __int8)(v39 + v37);
                  v51[v7] = v51[v37];
                  v51[v37] = v39;
                  *v36++ ^= v51[(unsigned __int8)(v51[v7] + v39)];
	            }
	            while ( v38 != v36 );
```
嗯...标准 `RC4`
### 9.程序在启动加密前，通过哪个 Windows CryptoAPI 函数生成了随机密钥？（写出函数名）【答案格式：全小写】
题6中说喽
`cryptGenRandom`
### 10.勒索程序在加密完成后会向用户展示勒索提示。请从内存镜像或提取的样本字符串中分析，攻击者要求的赎金金额是多少？【答案格式：99.9 BTC】
IDA 中能看到一封勒索信
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616212200225.png)
只要`0.5 BTC` (~~好便宜 之前有个勒索我的要了800 BTC~~)
### 11.攻击者留下的联系邮箱是什么？【按实际值填写】
同上题 `n0t_r3al@pr0ton.me`
### 12.内存镜像中还残留了受害者小张写在桌面上的一份文本文件内容。请根据镜像中的相关信息回答，该日记文件的完整文件名是什么？【按实际值填写】
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616211756723.png)
嗯哼 还记得题3么?
答案很明显 `摸鱼日记.txt`
### 13.日记中，小张在下午 2:52 联系上的那位安全同事，在电话里对他说了什么？【答案格式：引号内原文】
到了最期待的偷看日记环节
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616211938291.png)
`别关机，等我`
### 14.解密后文件的大小是多少字节？【答案格式：99999】
注意这一段
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616214508454.png)
从这里不难看出`Size`也就是加密文件中的4-8字节（第五题提到的）存放的就是原始文件的大小
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616214644155.png)
这里 仍然需要注意一下端序
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616214726964.png)

最后答案是`10081`
### 15.解密后的内部文档记载了一份供备份系统使用的认证令牌。请完整写出该 flag。【按实际值填写】
已经知道了加密方式和key 那么解密脚本就很简单啦
```python
from Crypto.Cipher import ARC4

with open("secret_project4.docx.enc", "rb") as file:
    enc = file.read()[8:]
    file.close()
    
key = bytes.fromhex("cb8978dde5b08227aac1c40ba91849c5")
rc4 = ARC4.new(key)

plain = rc4.decrypt(enc)

with open("secret_project4.docx", "wb") as file:
    file.write(plain)
    file.close()
```
![image.png](https://raw.githubusercontent.com/lQ-A-Ql/blog-image/main/20260616211656550.png)
最后答案就是`flag{m3m0ry_f0r3ns1cs_rc4_k3y_hunt_2026}`