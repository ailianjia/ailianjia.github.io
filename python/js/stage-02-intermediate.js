// Stage 2: 中级进阶
stages.push({
  name: "阶段二：中级进阶（2-3 周）",
  chapters: [
    {
      num: 11,
      key: "s2c1",
      title: "文件操作",
      content: `<h1>文件操作</h1>
<p class="chapter-meta">第十一章 · 中级进阶</p>

<h2>基本文件读写</h2>
<pre><code># 读取文件
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()        # 一次性读取全部
    lines = f.readlines()     # 按行读取为列表

# 逐行读取（大文件推荐）
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())

# 写入文件（覆盖模式）
with open("out.txt", "w", encoding="utf-8") as f:
    f.write("第一行\\n")
    f.write("第二行\\n")

# 追加写入
with open("out.txt", "a", encoding="utf-8") as f:
    f.write("第三行\\n")

# 二进制文件
with open("image.png", "rb") as f:
    data = f.read()</code></pre>

<h2>pathlib 路径操作</h2>
<pre><code>from pathlib import Path

# 创建路径
p = Path("data/reports/2025")

# 路径信息
print(p.exists())      # 是否存在
print(p.is_file())     # 是否文件
print(p.is_dir())      # 是否目录
print(p.suffix)        # ".txt"
print(p.stem)          # 不带后缀的名称
print(p.parent)        # 父目录
print(p.name)          # 文件名

# 创建目录（含中间目录）
p.mkdir(parents=True, exist_ok=True)

# 列出文件
for f in Path(".").glob("*.py"):
    print(f)

# 递归查找
for f in Path(".").rglob("*.txt"):
    print(f)

# 读取/写入
content = Path("data.txt").read_text(encoding="utf-8")
Path("output.txt").write_text("hello", encoding="utf-8")</code></pre>

<h2>JSON 文件</h2>
<pre><code>import json

data = {"name": "小明", "scores": [95, 88, 92]}

# 写入 JSON
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 读取 JSON
with open("data.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)

# 格式化输出
print(json.dumps(loaded, ensure_ascii=False, indent=2))</code></pre>

<h3>配套练习</h3>
<ol>
<li>读取一个文本文件，统计行数、单词数、字符数</li>
<li>将 CSV 数据转换为 JSON 格式</li>
<li>用 pathlib 遍历一个目录，列出所有 .py 文件</li>
</ol>`
    },
    {
      num: 12,
      key: "s2c2",
      title: "异常处理",
      content: `<h1>异常处理</h1>
<p class="chapter-meta">第十二章 · 中级进阶</p>

<h2>try / except 基本结构</h2>
<pre><code># 基本用法
try:
    num = int(input("输入数字："))
    result = 10 / num
except ValueError:
    print("请输入有效的数字！")
except ZeroDivisionError:
    print("除数不能为零！")
except Exception as e:
    print(f"未知错误: {e}")
else:
    print(f"结果: {result}")  # 没有异常时执行
finally:
    print("操作结束")         # 无论是否异常都执行</code></pre>

<h2>常见内置异常</h2>
<table>
<tr><th>异常</th><th>触发条件</th></tr>
<tr><td><code>ValueError</code></td><td>值不正确（如 int("abc")）</td></tr>
<tr><td><code>TypeError</code></td><td>类型不对（如 "2" + 2）</td></tr>
<tr><td><code>KeyError</code></td><td>字典键不存在</td></tr>
<tr><td><code>IndexError</code></td><td>列表索引越界</td></tr>
<tr><td><code>FileNotFoundError</code></td><td>文件不存在</td></tr>
<tr><td><code>ZeroDivisionError</code></td><td>除以零</td></tr>
</table>

<h2>主动抛出异常</h2>
<pre><code>def set_age(age):
    if not isinstance(age, int):
        raise TypeError("年龄必须是整数")
    if age < 0 or age > 150:
        raise ValueError(f"无效年龄: {age}")
    return age

# 自定义异常
class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

def validate_email(email):
    if "@" not in email:
        raise ValidationError("email", "不包含@符号")
    return True</code></pre>

<h3>配套练习</h3>
<ol>
<li>写一个安全的除法计算器，处理各种异常</li>
<li>实现一个邮箱验证函数，抛出自定义异常</li>
<li>用 try/finally 确保文件一定被关闭</li>
</ol>`
    },
    {
      num: 13,
      key: "s2c3",
      title: "模块与包",
      content: `<h1>模块与包</h1>
<p class="chapter-meta">第十三章 · 中级进阶</p>

<h2>导入模块</h2>
<pre><code># 完整导入
import math
print(math.sqrt(16))      # 4.0
print(math.pi)            # 3.14159...

# 导入特定函数
from datetime import datetime
from os import path

# 起别名
import numpy as np
import matplotlib.pyplot as plt

# 导入所有（不推荐）
from math import *  # ❌ 污染命名空间</code></pre>

<h2>标准库速览</h2>
<table>
<tr><th>模块</th><th>用途</th></tr>
<tr><td><code>os</code> / <code>pathlib</code></td><td>文件系统操作</td></tr>
<tr><td><code>sys</code></td><td>系统参数和路径</td></tr>
<tr><td><code>json</code></td><td>JSON 序列化</td></tr>
<tr><td><code>csv</code></td><td>CSV 文件读写</td></tr>
<tr><td><code>re</code></td><td>正则表达式</td></tr>
<tr><td><code>datetime</code></td><td>日期时间处理</td></tr>
<tr><td><code>random</code></td><td>随机数生成</td></tr>
<tr><td><code>hashlib</code></td><td>哈希算法</td></tr>
<tr><td><code>logging</code></td><td>日志记录</td></tr>
<tr><td><code>urllib</code></td><td>URL 处理</td></tr>
</table>

<h2>创建自己的模块</h2>
<pre><code># calculator.py（模块文件）
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

# 其他文件中使用
from calculator import add, subtract
print(add(3, 5))  # 8</code></pre>

<h2>模块的 __name__</h2>
<pre><code># main.py
if __name__ == "__main__":
    print("直接运行此文件")
else:
    print("被其他文件导入")

# 当直接运行时 __name__ == "__main__"
# 被导入时 __name__ == "模块名"</code></pre>

<h3>配套练习</h3>
<ol>
<li>创建一个 mathlib 模块，包含常用数学函数</li>
<li>用 datetime 计算两个日期之间的天数</li>
<li>用 random 实现一个简单的抽奖程序</li>
</ol>`
    },
    {
      num: 14,
      key: "s2c4",
      title: "字符串与正则表达式",
      content: `<h1>字符串高级操作与正则表达式</h1>
<p class="chapter-meta">第十四章 · 中级进阶</p>

<h2>字符串常用方法</h2>
<pre><code>text = "  Hello, World!  "

# 清洗
text.strip()         # "Hello, World!"
text.lstrip()        # "Hello, World!  "
text.rstrip()        # "  Hello, World!"

# 大小写
text.lower()         # "hello, world!"
text.upper()         # "HELLO, WORLD!"
text.title()         # "Hello, World!"
text.capitalize()    # "Hello, world!"

# 查找
text.count("l")             # 3
text.find("World")          # 7（找不到返回 -1）
text.index("!")             # 13（找不到报错）
text.startswith("Hello")    # True
text.endswith("!")          # True

# 替换
text.replace("World", "Python")

# 分割与连接
"a,b,c".split(",")              # ['a', 'b', 'c']
",".join(["a", "b", "c"])       # "a,b,c"
"Hello\\nWorld".strip().split()  # ['Hello', 'World']</code></pre>

<h2>正则表达式</h2>
<pre><code>import re

text = "联系电话: 138-1234-5678, 邮箱: test@example.com"

# 查找所有匹配
phones = re.findall(r"\\d{3}-\\d{4}-\\d{4}", text)
emails = re.findall(r"[\\w.]+@[\\w.]+", text)

# 替换
cleaned = re.sub(r"\\d", "*", "12345")  # "*****"

# 分割
words = re.split(r"\\s+", "hello   world  test")

# 编译正则（重复使用更高效）
pattern = re.compile(r"(?P&lt;name&gt;\\w+): (?P&lt;value&gt;\\d+)")
m = pattern.search("name: 42, age: 25")
if m:
    print(m.group("name"))  # "42"
    print(m.group("value")) # "25"

# 常用正则模式
re.match(r"^\\d{17}[\\dX]$", id_card)  # 身份证
re.match(r"^1[3-9]\\d{9}$", phone)     # 手机号
re.match(r"^[\\w.-]+@[\\w.-]+\\.\\w+$", email)  # 邮箱</code></pre>

<h3>配套练习</h3>
<ol>
<li>用正则表达式提取一段文本中的所有邮箱地址</li>
<li>实现一个字符串压缩函数（如 "aaabbc" → "a3b2c1"）</li>
<li>写一个密码强度检测函数</li>
</ol>`
    },
    {
      num: 15,
      key: "s2c5",
      title: "列表推导式",
      content: `<h1>列表推导式与生成器</h1>
<p class="chapter-meta">第十五章 · 中级进阶</p>

<h2>列表推导式</h2>
<pre><code># 基本用法
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 带条件过滤
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# 嵌套推导
pairs = [(x, y) for x in [1,2,3] for y in [4,5,6]]
# [(1,4),(1,5),(1,6),(2,4),(2,5),(2,6),(3,4),(3,5),(3,6)]

# 矩阵转置
matrix = [[1,2,3],[4,5,6],[7,8,9]]
transposed = [[row[i] for row in matrix] for i in range(3)]
# [[1,4,7],[2,5,8],[3,6,9]]</code></pre>

<h2>字典推导式</h2>
<pre><code># 基本用法
word = "hello"
char_count = {c: word.count(c) for c in word}
# {'h': 1, 'e': 1, 'l': 2, 'o': 1}

# 交换键值
original = {"a": 1, "b": 2, "c": 3}
swapped = {v: k for k, v in original.items()}
# {1: 'a', 2: 'b', 3: 'c'}

# 带条件
nums = {"a": 1, "b": 2, "c": 3, "d": 4}
evens = {k: v for k, v in nums.items() if v % 2 == 0}
# {'b': 2, 'd': 4}</code></pre>

<h2>集合推导式</h2>
<pre><code>square_set = {x**2 for x in range(-5, 5)}
# {0, 1, 4, 9, 16, 25}

# 去重
words = ["apple", "banana", "apple", "cherry"]
unique_lengths = {len(w) for w in words}
# {5, 6, 7}</code></pre>

<h2>生成器表达式</h2>
<pre><code># 用 () 代替 []，惰性求值，节省内存
total = sum(x**2 for x in range(1_000_000))
# 不会一次性创建百万元素的列表

# 可以迭代
gen = (x**2 for x in range(10))
for n in gen:
    print(n, end=" ")

# 注意：生成器只能遍历一次
gen2 = (x for x in range(5))
print(list(gen2))  # [0, 1, 2, 3, 4]
print(list(gen2))  # [] 已经耗尽</code></pre>

<h3>配套练习</h3>
<ol>
<li>用列表推导式找出 1-100 中能被 3 和 5 整除的数</li>
<li>用字典推导式统计一个句子中每个首字母出现的词数</li>
<li>用生成器表达式计算 1 到 100 万平方和（不占满内存）</li>
</ol>`
    },
    {
      num: 16,
      key: "s2c6",
      title: "面向对象编程",
      content: `<h1>面向对象编程（OOP）</h1>
<p class="chapter-meta">第十六章 · 中级进阶</p>

<h2>类与对象</h2>
<pre><code>class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        return f"{self.name} says {self.sound}!"

    def __str__(self):
        return f"Animal({self.name}, {self.sound})"

# 创建对象
cat = Animal("猫咪", "Meow")
print(cat.speak())  # 猫咪 says Meow!
print(cat)          # Animal(猫咪, Meow)

# 实例属性
cat.age = 3       # 动态添加属性
print(cat.age)    # 3</code></pre>

<h2>继承与多态</h2>
<pre><code># 继承
class Dog(Animal):
    def __init__(self, name):
        super().__init__(name, "Woof")

    def fetch(self, item):
        return f"{self.name} 去拿 {item}"

dog = Dog("旺财")
print(dog.speak())  # 旺财 says Woof!
print(dog.fetch("球"))  # 旺财 去拿 球

# 多态
animals = [Dog("旺财"), Cat("咪咪")]
for a in animals:
    print(a.speak())  # 各自用自己的 speak

# 类型检查
print(isinstance(dog, Dog))    # True
print(isinstance(dog, Animal)) # True（继承链）
print(issubclass(Dog, Animal)) # True</code></pre>

<h2>私有属性</h2>
<pre><code>class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance  # 私有属性

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return True
        return False

    @property
    def balance(self):
        return self.__balance

account = BankAccount("小明", 1000)
account.deposit(500)
print(account.balance)  # 1500
# print(account.__balance)  # ❌ 无法直接访问</code></pre>

<h3>配套练习</h3>
<ol>
<li>创建一个 Rectangle 类，计算面积和周长</li>
<li>实现一个 Stack（栈）类，支持 push/pop/top</li>
<li>创建一个 Person 类，派生出 Student 和 Teacher</li>
</ol>`
    },
    {
      num: 17,
      key: "s2c7",
      title: "魔术方法与属性",
      content: `<h1>魔术方法与 @property 属性</h1>
<p class="chapter-meta">第十七章 · 中级进阶</p>

<h2>常用魔术方法</h2>
<pre><code>class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __str__(self):
        return f"({self.x}, {self.y})"

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __abs__(self):
        return (self.x**2 + self.y**2) ** 0.5

    def __len__(self):
        return 2

    def __getitem__(self, index):
        return [self.x, self.y][index]

# 使用
v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1 + v2)      # Vector(4, 6)
print(v1 * 3)       # Vector(9, 12)
print(abs(v1))       # 5.0
print(v1[0])         # 3</code></pre>

<h2>@property 属性</h2>
<pre><code>class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("半径不能为负")
        self._radius = value

    @property
    def area(self):
        import math
        return math.pi * self._radius ** 2

c = Circle(5)
print(c.radius)    # 5（自动调用 getter）
c.radius = 10      # 自动调用 setter
print(c.area)      # 314.159...</code></pre>

<h2>静态方法与类方法</h2>
<pre><code>class MathUtils:
    PI = 3.14159

    @staticmethod
    def is_even(n):
        return n % 2 == 0

    @classmethod
    def circle_area(cls, radius):
        return cls.PI * radius ** 2

print(MathUtils.is_even(4))    # True
print(MathUtils.circle_area(3))  # 28.274...</code></pre>

<h3>配套练习</h3>
<ol>
<li>实现一个 Matrix 类，支持 + 和 * 运算符</li>
<li>用 @property 实现一个 Temperature 类（摄氏/华氏互转）</li>
<li>写一个 @singleton 装饰器实现单例模式</li>
</ol>`
    },
    {
      num: 18,
      key: "s2c8",
      title: "描述符与高级OOP",
      content: `<h1>描述符与高级 OOP</h1>
<p class="chapter-meta">第十八章 · 中级进阶</p>

<h2>数据描述符</h2>
<pre><code>class ValidatedField:
    """可验证的属性描述符"""
    def __init__(self, field_type, min_value=None, max_value=None):
        self.field_type = field_type
        self.min_value = min_value
        self.max_value = max_value

    def __set_name__(self, owner, name):
        self.name = f"_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.name, None)

    def __set__(self, obj, value):
        if not isinstance(value, self.field_type):
            raise TypeError(f"需要 {self.field_type.__name__}")
        if self.min_value is not None and value < self.min_value:
            raise ValueError(f"最小值 {self.min_value}")
        if self.max_value is not None and value > self.max_value:
            raise ValueError(f"最大值 {self.max_value}")
        setattr(obj, self.name, value)

class Product:
    name = ValidatedField(str)
    price = ValidatedField(float, min_value=0)
    stock = ValidatedField(int, min_value=0)

p = Product()
p.name = "笔记本"
p.price = 4999.00
p.stock = 100</code></pre>

<h2>类变量与实例变量</h2>
<pre><code>class Counter:
    count = 0  # 类变量（所有实例共享）

    def __init__(self):
        Counter.count += 1  # 修改类变量
        self.value = 0     # 实例变量

c1 = Counter()
c2 = Counter()
print(Counter.count)  # 2
print(c1.count)       # 2（通过实例也能看到）

c1.value = 10
print(c2.value)       # 0（实例变量互不影响）</code></pre>

<h3>配套练习</h3>
<ol>
<li>实现一个可计数的容器类</li>
<li>让一个类变成可迭代的</li>
<li>实现一个 @memoize 缓存装饰器</li>
</ol>`
    }
  ]
});
