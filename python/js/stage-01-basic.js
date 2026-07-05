// Stage 1: 入门基础
stages.push({
  name: "阶段一：入门基础（1-2 周）",
  chapters: [
    {
      num: 1,
      key: "s1c1",
      title: "安装与环境",
      content: `<h1>安装 Python 与环境配置</h1>
<p class="chapter-meta">第一章 · 入门基础</p>

<h2>安装 Python</h2>
<p>前往 <code>python.org/downloads</code> 下载并安装 Python 3.12 或更高版本。安装时务必勾选 <strong>"Add Python to PATH"</strong>。</p>
<pre><code># 验证安装
python --version    # Python 3.12.x
pip --version       # pip 24.x</code></pre>

<h2>选择编辑器</h2>
<table>
<tr><th>编辑器</th><th>特点</th><th>推荐度</th></tr>
<tr><td>VS Code</td><td>免费、插件丰富、轻量</td><td>★★★★★ 首选</td></tr>
<tr><td>PyCharm</td><td>专业 Python IDE，功能全面</td><td>★★★★☆</td></tr>
<tr><td>Vim/Neovim</td><td>终端编辑，高手之选</td><td>★★☆☆☆</td></tr>
</table>

<h2>配置 VS Code（推荐）</h2>
<ul>
<li>安装 Python 扩展（Microsoft 出品）</li>
<li>安装 Pylance 语言服务</li>
<li>可选：Black 格式化、Ruff 检查</li>
</ul>

<h2>虚拟环境</h2>
<pre><code># 创建虚拟环境
python -m venv venv

# 激活（Windows CMD）
venv\\Scripts\\activate.bat

# 激活（Windows PowerShell）
venv\\Scripts\\Activate.ps1

# 激活（Mac/Linux）
source venv/bin/activate

# 退出虚拟环境
deactivate

# 验证
which python    # 应指向 venv 内的 python</code></pre>

<blockquote><p><strong>提示：</strong>每次新项目都应该创建独立的虚拟环境，避免依赖冲突。</p></blockquote>

<h2>运行你的第一个程序</h2>
<pre><code># hello.py
print("Hello, World!")

# 命令行运行
python hello.py</code></pre>

<h3>配套练习</h3>
<ol>
<li>安装 Python 并验证版本</li>
<li>创建虚拟环境并激活</li>
<li>写一个打印自我介绍的程序</li>
<li>尝试用 <code>type()</code> 查看各种数据的类型</li>
</ol>`
    },
    {
      num: 2,
      key: "s1c2",
      title: "变量与数据类型",
      content: `<h1>变量与数据类型</h1>
<p class="chapter-meta">第二章 · 入门基础</p>

<h2>变量的本质</h2>
<p>变量是内存中存储数据的"标签"。Python 中赋值即绑定引用。</p>
<pre><code># 基本赋值
name = "Python"       # str 字符串
age = 25              # int 整数
height = 1.75         # float 浮点数
is_learning = True    # bool 布尔值
nothing = None        # NoneType 空值

# 多重赋值
x = y = z = 0
a, b, c = 1, 2, 3

# 交换变量（无需临时变量）
a, b = b, a

# 查看类型
print(type(name))     # &lt;class 'str'&gt;
print(isinstance(age, int))  # True</code></pre>

<h2>核心数据类型</h2>
<table>
<tr><th>类型</th><th>关键字</th><th>可变</th><th>示例</th></tr>
<tr><td>整数</td><td><code>int</code></td><td>不可变</td><td><code>42</code>, <code>-7</code></td></tr>
<tr><td>浮点数</td><td><code>float</code></td><td>不可变</td><td><code>3.14</code>, <code>-0.5</code></td></tr>
<tr><td>字符串</td><td><code>str</code></td><td>不可变</td><td><code>"hello"</code></td></tr>
<tr><td>布尔</td><td><code>bool</code></td><td>不可变</td><td><code>True</code>, <code>False</code></td></tr>
<tr><td>列表</td><td><code>list</code></td><td>可变</td><td><code>[1, 2, 3]</code></td></tr>
<tr><td>字典</td><td><code>dict</code></td><td>可变</td><td><code>{"a": 1}</code></td></tr>
<tr><td>元组</td><td><code>tuple</code></td><td>不可变</td><td><code>(1, 2)</code></td></tr>
<tr><td>集合</td><td><code>set</code></td><td>可变</td><td><code>{1, 2, 3}</code></td></tr>
</table>

<h2>类型转换</h2>
<pre><code># 显式转换
int("42")        # 42
float("3.14")    # 3.14
str(100)         # "100"
bool(1)          # True
bool(0)          # False
bool("")         # False
bool("hello")    # True

# 常用真值表
print(bool([]))      # False（空列表）
print(bool([1]))     # True（非空列表）
print(bool({}))      # False（空字典）
print(bool(None))    # False</code></pre>

<h2>数字类型详解</h2>
<pre><code># 整数运算
print(10 // 3)     # 3  整除
print(10 % 3)      # 1  取余
print(2 ** 10)     # 1024 幂运算

# 浮点数精度问题
print(0.1 + 0.2)   # 0.30000000000000004（注意！）
# 解决：使用 decimal 模块
from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2"))  # 0.3

# 复数
z = 3 + 4j
print(z.real)      # 3.0
print(z.imag)      # 4.0
print(z.conjugate())  # (3-4j)</code></pre>

<h3>配套练习</h3>
<ol>
<li>创建变量存储你的姓名、年龄、身高，用 <code>print()</code> 格式化输出</li>
<li>实现温度转换器：摄氏度转华氏度 <code>F = C * 9/5 + 32</code></li>
<li>交换两个变量的值（不使用第三方变量）</li>
<li>探索 <code>bool()</code> 对各种空值的转换结果</li>
</ol>`
    },
    {
      num: 3,
      key: "s1c3",
      title: "输入输出与格式化",
      content: `<h1>输入输出与字符串格式化</h1>
<p class="chapter-meta">第三章 · 入门基础</p>

<h2>print 输出</h2>
<pre><code># 基本输出
print("Hello")
print(42, "is the answer")  # 多个参数用空格分隔

# 自定义分隔符和结尾
print("a", "b", "c", sep="-")   # a-b-c
print("Loading", end="...")     # Loading...（不换行）
print("Done!")                  # Done!

# f-string 格式化（Python 3.6+，强烈推荐）
name = "小明"
age = 25
print(f"我叫{name}，今年{age}岁")
print(f"明年我就{age+1}岁了")

# 对齐和精度
pi = 3.14159265
print(f"pi = {pi:.2f}")    # pi = 3.14
print(f"|{'hello':&gt;10}|")  # |      hello|
print(f"|{'world':&lt;10}|")  # |world     |
print(f"|{'center':^10}|") # | center  |

# 千位分隔符
print(f"{1234567:,}")  # 1,234,567

# 旧式格式化
print("Hello, %s!" % name)
print("{0} is {1}".format("Python", "great"))</code></pre>

<h2>input 输入</h2>
<pre><code># input 永远返回字符串
name = input("请输入你的名字：")
print(f"你好，{name}！")

# 需要类型转换
age = int(input("请输入年龄："))
height = float(input("请输入身高："))

print(f"{name}，{age}岁，身高{height}米")

# 带默认值的输入
choice = input("选择(Y/N)，默认Y：") or "Y"
print(f"你选择了: {choice}")</code></pre>

<h2>输出到文件</h2>
<pre><code># 直接输出到文件
with open("output.txt", "w", encoding="utf-8") as f:
    print("第一行", file=f)
    print("第二行", file=f)

# 多行输出
lines = ["姓名", "年龄", "城市"]
with open("data.txt", "w") as f:
    f.write("\\n".join(lines))</code></pre>

<h3>配套练习</h3>
<ol>
<li>写一个程序：输入姓名和年龄，输出格式化自我介绍</li>
<li>用 f-string 打印一个乘法口诀表</li>
<li>实现一个简单的 BMI 计算器（输入身高体重，输出 BMI 和评价）</li>
</ol>`
    },
    {
      num: 4,
      key: "s1c4",
      title: "运算符",
      content: `<h1>运算符</h1>
<p class="chapter-meta">第四章 · 入门基础</p>

<h2>算术运算符</h2>
<pre><code>a, b = 10, 3
print(a + b)    # 13  加
print(a - b)    # 7   减
print(a * b)    # 30  乘
print(a / b)    # 3.333...  除（总是返回 float）
print(a // b)   # 3   整除（地板除）
print(a % b)    # 1   取余
print(a ** b)   # 1000 幂运算

# 复合赋值
x = 5
x += 3    # x = 8
x -= 2    # x = 6
x *= 4    # x = 24
x **= 2   # x = 576</code></pre>

<h2>比较运算符</h2>
<pre><code>print(5 == 5)   # True  等于
print(5 != 3)   # True  不等于
print(5 > 3)    # True  大于
print(5 &lt; 3)    # False 小于
print(5 >= 5)   # True  大于等于
print(5 <= 3)   # False 小于等于

# 链式比较（Python 特色）
x = 5
print(1 &lt; x &lt; 10)   # True  等价于 1 &lt; x and x &lt; 10
print(3 &lt; x &lt; 8)    # True</code></pre>

<h2>逻辑运算符</h2>
<pre><code>print(True and False)   # False
print(True or False)    # True
print(not True)         # False

# 短路求值
result = False and expensive_function()  # 不会调用
result = True or expensive_function()    # 不会调用

# 实际用途
username = user_input or "guest"  # 空值用默认代替
value = data.get("key") or 0      # 缺省值</code></pre>

<h2>成员与身份运算符</h2>
<pre><code># 成员运算符
print(3 in [1, 2, 3])      # True
print("a" not in "bcd")    # True

# 身份运算符
a = [1, 2, 3]
b = a
c = [1, 2, 3]
print(a is b)      # True（同一对象）
print(a is c)      # False（不同对象）
print(a == c)      # True（值相等）

# None 的判断
x = None
print(x is None)   # True（应该用 is 而不是 ==）</code></pre>

<h3>配套练习</h3>
<ol>
<li>实现一个单位转换器：英里→公里，英尺→米</li>
<li>用位运算判断一个数是否为偶数</li>
<li>写一个判断闰年的表达式</li>
</ol>`
    },
    {
      num: 5,
      key: "s1c5",
      title: "条件判断",
      content: `<h1>条件判断</h1>
<p class="chapter-meta">第五章 · 入门基础</p>

<h2>if / elif / else</h2>
<pre><code>score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"      # 执行这里
elif score >= 70:
    grade = "C"
else:
    grade = "D"

print(f"成绩等级: {grade}")</code></pre>

<h2>三元表达式</h2>
<pre><code># 传统 if-else
if age >= 18:
    status = "成年"
else:
    status = "未成年"

# 三元表达式（一行搞定）
status = "成年" if age >= 18 else "未成年"

# 嵌套三元（不推荐过度使用）
level = "高" if score > 90 else ("中" if score > 60 else "低")</code></pre>

<h2>match-case（Python 3.10+）</h2>
<pre><code>command = "delete"

match command:
    case "start":
        print("启动服务")
    case "stop":
        print("停止服务")
    case "restart":
        print("重启服务")
    case "delete" | "remove":  # 多模式匹配
        print("删除项目")
    case str() as cmd if len(cmd) > 10:  # 守卫条件
        print(f"命令太长: {cmd}")
    case _:
        print(f"未知命令: {command}")</code></pre>

<h2>条件表达式技巧</h2>
<pre><code># any / all 判断
scores = [85, 92, 78, 95]
all_passed = all(s >= 60 for s in scores)  # False
any_failed = any(s < 60 for s in scores)   # True

# walrus 运算符（Python 3.8+）
if (n := len(data)) > 10:
    print(f"数据量很大: {n} 条")</code></pre>

<h3>配套练习</h3>
<ol>
<li>写一个成绩等级转换器（90=A, 80=B, 70=C, 60=D, &lt;60=F）</li>
<li>用 match-case 实现一个简单的计算器</li>
<li>判断一个年份是否是闰年</li>
</ol>`
    },
    {
      num: 6,
      key: "s1c6",
      title: "循环",
      content: `<h1>循环</h1>
<p class="chapter-meta">第六章 · 入门基础</p>

<h2>for 循环</h2>
<pre><code># range 生成序列
for i in range(5):       # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 8):    # 2 到 7
    print(i)

for i in range(0, 10, 2): # 步长为2
    print(i)  # 0, 2, 4, 6, 8

# 遍历列表
fruits = ["苹果", "香蕉", "橙子"]
for f in fruits:
    print(f)

# 带索引遍历
for i, f in enumerate(fruits):
    print(f"{i}: {f}")

# 遍历字典
scores = {"小明": 95, "小红": 88, "小刚": 72}
for name, score in scores.items():
    print(f"{name}: {score}")

# 同时遍历多个序列
names = ["Alice", "Bob", "Carol"]
ages = [25, 30, 22]
for name, age in zip(names, ages):
    print(f"{name} is {age}")</code></pre>

<h2>while 循环</h2>
<pre><code># 基本用法
count = 0
while count &lt; 5:
    print(count)
    count += 1

# 猜数字游戏
import random
target = random.randint(1, 100)
guess = 0
attempts = 0

while guess != target:
    guess = int(input("猜一个1-100的数字："))
    attempts += 1
    if guess &lt; target:
        print("太小了！")
    elif guess > target:
        print("太大了！")

print(f"猜对了！用了 {attempts} 次")</code></pre>

<h2>循环控制</h2>
<pre><code># break - 跳出整个循环
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue - 跳过本次迭代
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 1, 3, 5, 7, 9

# else 子句（循环正常结束时执行）
for i in range(5):
    if i == 10:
        break
else:
    print("循环完成，未找到目标")  # 会执行</code></pre>

<h2>嵌套循环</h2>
<pre><code># 九九乘法表
for i in range(1, 10):
    for j in range(1, i+1):
        print(f"{j}x{i}={i*j}", end="\\t")
    print()

# 打印图形
for i in range(5):
    print("* " * (i + 1))
# *
# * *
# * * *
# * * * *
# * * * * *</code></pre>

<h3>配套练习</h3>
<ol>
<li>打印九九乘法表</li>
<li>用 while 实现猜数字游戏</li>
<li>找出 1-100 之间的所有质数</li>
<li>打印杨辉三角前 10 行</li>
</ol>`
    },
    {
      num: 7,
      key: "s1c7",
      title: "列表",
      content: `<h1>列表（list）</h1>
<p class="chapter-meta">第七章 · 入门基础</p>

<h2>创建与访问</h2>
<pre><code># 创建
nums = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14, None]
empty = []
nested = [[1, 2], [3, 4], [5, 6]]

# 索引访问（从0开始）
print(nums[0])    # 1
print(nums[-1])   # 5（最后一个）
print(nums[-2])   # 4（倒数第二个）

# 切片 [start:stop:step]
print(nums[1:3])    # [2, 3]（不含stop）
print(nums[:3])     # [1, 2, 3]（从头开始）
print(nums[3:])     # [4, 5]（到末尾）
print(nums[::2])    # [1, 3, 5]（每隔一个）
print(nums[::-1])   # [5, 4, 3, 2, 1]（反转！）

# 修改
nums[0] = 99
nums[1:3] = [10, 20, 30]</code></pre>

<h2>常用方法</h2>
<pre><code>fruits = ["苹果", "香蕉"]

# 增
fruits.append("橙子")        # 末尾添加
fruits.insert(0, "葡萄")     # 指定位置插入
fruits.extend(["芒果", "榴莲"])  # 批量添加

# 删
fruits.remove("香蕉")        # 按值删除
last = fruits.pop()          # 弹出最后一个
second = fruits.pop(1)       # 弹出指定位置
del fruits[0]                # 删除指定位置

# 查
idx = fruits.index("橙子")   # 找索引
count = fruits.count("苹果") # 找出现次数
print("苹果" in fruits)      # True

# 排序
nums = [3, 1, 4, 1, 5, 9, 2, 6]
nums.sort()            # [1, 1, 2, 3, 4, 5, 6, 9] 原地排序
nums.sort(reverse=True)  # 降序
sorted_nums = sorted(nums)  # 返回新列表

# 字符串排序（不区分大小写）
words = ["banana", "Apple", "cherry"]
words.sort(key=str.lower)</code></pre>

<h2>深浅拷贝</h2>
<pre><code>a = [1, [2, 3]]

# 浅拷贝 - 外层独立，内层共享
b = a.copy()
b[0] = 99
b[1].append(4)
print(a)  # [1, [2, 3, 4]]  内层被改了！
print(b)  # [99, [2, 3, 4]]

# 深拷贝 - 完全独立
import copy
c = copy.deepcopy(a)
c[1].append(5)
print(a)  # [1, [2, 3, 4]] 不受影响
print(c)  # [1, [2, 3, 4, 5]]</code></pre>

<h3>配套练习</h3>
<ol>
<li>实现一个待办事项清单（增删改查）</li>
<li>用切片反转一个列表</li>
<li>找出列表中最大的三个数</li>
<li>合并两个有序列表为一个有序列表</li>
</ol>`
    },
    {
      num: 8,
      key: "s1c8",
      title: "字典",
      content: `<h1>字典（dict）</h1>
<p class="chapter-meta">第八章 · 入门基础</p>

<h2>创建与访问</h2>
<pre><code># 创建
person = {
    "name": "小明",
    "age": 25,
    "city": "北京"
}

# 访问
print(person["name"])          # "小明"
print(person.get("phone"))     # None（键不存在不报错）
print(person.get("phone", "无"))  # "无"（提供默认值）

# 修改和添加
person["age"] = 26             # 修改已有键
person["email"] = "xm@test.com"  # 添加新键
del person["city"]             # 删除键值对
popped = person.pop("age")     # 删除并返回值</code></pre>

<h2>遍历与推导</h2>
<pre><code>scores = {"数学": 95, "英语": 88, "物理": 92}

# 三种遍历方式
for key in scores:
    print(key)

for key in scores.keys():
    print(key, scores[key])

for value in scores.values():
    print(value)

for subject, score in scores.items():
    print(f"{subject}: {score}")

# 合并字典
extra = {"化学": 90, "生物": 85}
scores.update(extra)
merged = scores | extra  # Python 3.9+

# 字典推导式
squares = {x: x**2 for x in range(1, 6)}
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# 排序
sorted_scores = dict(sorted(scores.items(), key=lambda x: x[1], reverse=True))</code></pre>

<h2>嵌套字典</h2>
<pre><code>classroom = {
    "一班": {
        "小明": {"score": 95, "age": 18},
        "小红": {"score": 88, "age": 17},
    },
    "二班": {
        "小刚": {"score": 92, "age": 18},
    }
}

# 访问嵌套数据
print(classroom["一班"]["小明"]["score"])  # 95

# 安全访问
value = classroom.get("一班", {}).get("小李", {}).get("score", 0)</code></pre>

<h3>配套练习</h3>
<ol>
<li>统计一段文本中每个单词出现的次数</li>
<li>将两个字典合并，相同键的值相加</li>
<li>实现一个简单的通讯录（增删改查）</li>
</ol>`
    },
    {
      num: 9,
      key: "s1c9",
      title: "元组与集合",
      content: `<h1>元组（tuple）与集合（set）</h1>
<p class="chapter-meta">第九章 · 入门基础</p>

<h2>元组 - 不可变序列</h2>
<pre><code># 创建
coords = (10, 20)
single = (42,)        # 单元素元组必须有逗号
empty = ()
mixed = (1, "hello", True)

# 解包
x, y = coords
print(x, y)  # 10 20

a, b, c = (1, 2, 3)
first, *rest = [1, 2, 3, 4, 5]  # first=1, rest=[2,3,4,5]

# 不可变特性
# coords[0] = 5  # ❌ TypeError!

# 作为字典的键（因为不可变）
lookup = {(1, 2): "坐标A", (3, 4): "坐标B"}

# 返回多个值
def get_name_and_age():
    return "小明", 25

name, age = get_name_and_age()</code></pre>

<h2>集合 - 无序不重复</h2>
<pre><code># 创建
fruits = {"苹果", "香蕉", "橙子"}
nums = {1, 2, 3, 3, 2, 1}  # {1, 2, 3}（自动去重）
empty_set = set()  # 不能用 {}，那是空字典

# 基本操作
nums.add(4)
nums.remove(1)     # 不存在则报错
nums.discard(99)   # 安全删除（不存在不报错）
nums.pop()         # 随机弹出一个

# 集合运算
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)   # 并集: {1, 2, 3, 4, 5, 6}
print(a & b)   # 交集: {3, 4}
print(a - b)   # 差集: {1, 2}
print(a ^ b)   # 对称差: {1, 2, 5, 6}

# 用集合去重
words = ["apple", "banana", "apple", "cherry", "banana"]
unique = list(set(words))</code></pre>

<h3>配套练习</h3>
<ol>
<li>用元组解包交换两个变量</li>
<li>给定两个列表，求它们的交集、并集、差集</li>
<li>用集合实现列表去重并保持原始顺序</li>
</ol>`
    },
    {
      num: 10,
      key: "s1c10",
      title: "函数基础",
      content: `<h1>函数基础</h1>
<p class="chapter-meta">第十章 · 入门基础</p>

<h2>定义与调用</h2>
<pre><code># 基本函数
def greet(name):
    """向用户打招呼"""
    return f"你好, {name}!"

msg = greet("小明")
print(msg)  # 你好, 小明!

# 默认参数
def power(base, exp=2):
    return base ** exp

print(power(3))     # 9
print(power(3, 3))  # 27

# 关键字参数
def create_user(name, age, city="北京"):
    return {"name": name, "age": age, "city": city}

user = create_user("小红", 22, city="上海")</code></pre>

<h2>可变参数</h2>
<pre><code># *args - 接收任意数量的位置参数
def total(*args):
    return sum(args)

print(total(1, 2, 3, 4))  # 10

# **kwargs - 接收任意数量的关键字参数
def info(**kwargs):
    for k, v in kwargs.items():
        print(f"{k}: {v}")

info(name="小明", age=25, city="北京")

# 混合使用
def func(a, *args, b=10, **kwargs):
    print(f"a={a}, args={args}, b={b}, kwargs={kwargs}")

func(1, 2, 3, 4, b=20, x=100)
# a=1, args=(2, 3, 4), b=20, kwargs={'x': 100}</code></pre>

<h2>返回值与作用域</h2>
<pre><code># 多返回值（实际是元组）
def min_max(lst):
    return min(lst), max(lst)

lo, hi = min_max([3, 1, 4, 1, 5])

# 作用域
x = 10  # 全局

def change_x():
    x = 20  # 局部，不影响全局
    print(f"局部x: {x}")

change_x()
print(f"全局x: {x}")  # 10

# lambda 函数
square = lambda x: x ** 2
add = lambda a, b: a + b</code></pre>

<h3>配套练习</h3>
<ol>
<li>写一个函数判断一个数是否为质数</li>
<li>用函数实现一个简单的计算器（加减乘除）</li>
<li>写一个函数统计字符串中的元音字母个数</li>
</ol>`
    }
  ]
});
