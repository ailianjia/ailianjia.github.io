// Stage 3: 高级特性
stages.push({
  name: "阶段三：高级特性（3-4 周）",
  chapters: [
    {
      num: 19,
      key: "s3c1",
      title: "迭代器与生成器",
      content: `<h1>迭代器与生成器</h1>
<p class="chapter-meta">第十九章 · 高级特性</p>

<h2>生成器 - 惰性求值</h2>
<pre><code># 使用 yield 创建生成器
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
for i, val in enumerate(fib):
    if i >= 10:
        break
    print(val, end=" ")
# 0 1 1 2 3 5 8 13 21 34

# 生成器表达式（类似列表推导，但惰性求值）
gen = (x**2 for x in range(1000000))
# 不会立即计算，每次 next() 才计算一个

# 发送值到生成器
def accumulator():
    total = 0
    while True:
        value = yield total
        if value is not None:
            total += value

acc = accumulator()
next(acc)              # 启动生成器
print(acc.send(10))    # 10
print(acc.send(5))     # 15
print(acc.send(3))     # 18</code></pre>

<h2>迭代器协议</h2>
<pre><code>class CountDown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for n in CountDown(5):
    print(n, end=" ")
# 5 4 3 2 1</code></pre>

<h2>生成器管道模式</h2>
<pre><code># 管道模式
def file_reader(filename):
    with open(filename, "r") as f:
        for line in f:
            yield line.strip()

def filter_empty(lines):
    for line in lines:
        if line:
            yield line

def to_upper(lines):
    for line in lines:
        yield line.upper()

# 链式调用
lines = to_upper(filter_empty(file_reader("data.txt")))
for line in lines:
    print(line)</code></pre>

<h2>itertools 模块</h2>
<pre><code>from itertools import chain, islice, permutations, combinations, product, accumulate

# chain - 连接迭代器
for item in chain([1, 2], [3, 4], [5, 6]):
    print(item, end=" ")  # 1 2 3 4 5 6

# islice - 切片
for item in islice(range(100), 10, 15):
    print(item, end=" ")  # 10 11 12 13 14

# permutations - 排列
for p in permutations("abc", 2):
    print(p, end=" ")

# combinations - 组合
for c in combinations("abc", 2):
    print(c, end=" ")  # ('a','b') ('a','c') ('b','c')

# product - 笛卡尔积
for p in product("AB", "12"):
    print(p, end=" ")  # ('A','1') ('A','2') ('B','1') ('B','2')

# accumulate - 累积
print(list(accumulate([1, 2, 3, 4, 5])))
# [1, 3, 6, 10, 15]

print(list(accumulate([1, 2, 3, 4, 5], func=lambda a, b: a * b)))
# [1, 2, 6, 24, 120]</code></pre>

<h3>配套练习</h3>
<ol>
<li>实现一个惰性读取大文件的生成器</li>
<li>用 itertools 生成一个列表中所有长度为3的组合</li>
<li>实现一个无限质数生成器</li>
</ol>`
    },
    {
      num: 20,
      key: "s3c2",
      title: "装饰器",
      content: `<h1>装饰器</h1>
<p class="chapter-meta">第二十章 · 高级特性</p>

<h2>基础装饰器</h2>
<pre><code>import functools
import time

def timer(func):
    """计时装饰器"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 耗时: {end-start:.4f}秒")
        return result
    return wrapper

@timer
def slow_work():
    time.sleep(1)
    return "完成"

slow_work()  # slow_work 耗时: 1.0001秒</code></pre>

<h2>带参数的装饰器</h2>
<pre><code>def repeat(times):
    """重复执行装饰器"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("小明")  # 打印三次

# 重试装饰器
def retry(max_attempts=3, delay=1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise
                    print(f"第{attempt}次失败: {e}, {delay}秒后重试...")
        return wrapper
    return decorator</code></pre>

<h2>类装饰器</h2>
<pre><code>def singleton(cls):
    """单例装饰器"""
    instances = {}
    @functools.wraps(cls, wrapped='instance')
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class Database:
    def __init__(self):
        print("数据库连接创建")

db1 = Database()
db2 = Database()
print(db1 is db2)  # True（同一个实例）</code></pre>

<h2>functools 工具</h2>
<pre><code>from functools import lru_cache, partial, wraps

# lru_cache - 自动缓存
@lru_cache(maxsize=None)
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)

print(fib(50))  # 瞬间完成

# partial - 偏函数
multiply_by_10 = partial(lambda x, y: x * y, 10)
print(multiply_by_10(5))  # 50</code></pre>

<h3>配套练习</h3>
<ol>
<li>写一个缓存装饰器 @memoize，缓存函数结果</li>
<li>实现一个权限检查装饰器 @require_login</li>
<li>写一个记录函数调用次数的装饰器</li>
</ol>`
    },
    {
      num: 21,
      key: "s3c3",
      title: "上下文管理器",
      content: `<h1>上下文管理器</h1>
<p class="chapter-meta">第二十一章 · 高级特性</p>

<h2>with 语句</h2>
<pre><code># 内置上下文管理器
with open("data.txt", "r") as f:
    content = f.read()
# 退出 with 后自动关闭文件

# 同时管理多个资源
with open("in.txt") as fin, open("out.txt", "w") as fout:
    fout.write(fin.read())

# 线程锁
import threading
lock = threading.Lock()
with lock:
    shared_data += 1  # 自动释放锁</code></pre>

<h2>自定义上下文管理器</h2>
<pre><code># 类方式
class DatabaseConnection:
    def __init__(self, url):
        self.url = url
        self.conn = None

    def __enter__(self):
        self.conn = connect_db(self.url)
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()
        return False  # False = 不吞掉异常

# 使用
with DatabaseConnection("mysql://localhost/mydb") as db:
    db.execute("SELECT * FROM users")

# 生成器方式（更简洁）
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"耗时: {end-start:.4f}秒")

with timer():
    time.sleep(1)  # 这段代码会被计时</code></pre>

<h2>contextlib 工具</h2>
<pre><code>from contextlib import suppress, ExitStack

# suppress - 忽略异常
with suppress(FileNotFoundError):
    import os
    os.remove("temp.txt")  # 文件不存在也不报错

# ExitStack - 动态管理多个上下文
with ExitStack() as stack:
    files = [stack.enter_context(open(f"data/{i}.txt")) for i in range(5)]
    # 所有文件在退出时自动关闭</code></pre>

<h3>配套练习</h3>
<ol>
<li>实现一个事务管理器上下文管理器（commit/rollback）</li>
<li>用 @contextmanager 写一个临时目录管理器</li>
<li>用 ExitStack 批量管理多个文件</li>
</ol>`
    },
    {
      num: 22,
      key: "s3c4",
      title: "函数式编程",
      content: `<h1>Lambda 与函数式编程</h1>
<p class="chapter-meta">第二十二章 · 高级特性</p>

<h2>lambda 与高阶函数</h2>
<pre><code>from functools import reduce

nums = [1, 2, 3, 4, 5]

# map - 映射
doubled = list(map(lambda x: x * 2, nums))
# [2, 4, 6, 8, 10]

# filter - 过滤
evens = list(filter(lambda x: x % 2 == 0, nums))
# [2, 4]

# reduce - 累积
product = reduce(lambda a, b: a * b, nums)
# 120

# 替代方案（通常更 Pythonic）
doubled = [x * 2 for x in nums]
evens = [x for x in nums if x % 2 == 0]</code></pre>

<h2>sorted 高级排序</h2>
<pre><code># 多级排序
students = [
    {"name": "Alice", "score": 85, "age": 20},
    {"name": "Bob", "score": 92, "age": 19},
    {"name": "Carol", "score": 85, "age": 21},
]

# 按分数降序，分数相同按年龄升序
sorted_students = sorted(
    students,
    key=lambda s: (-s["score"], s["age"])
)

# 按对象属性排序
from operator import attrgetter
people = [{"name": "Alice"}, {"name": "bob"}]
sorted_people = sorted(people, key=attrgetter("name"))

# 按字典值排序
freq = {"a": 3, "b": 1, "c": 2}
sorted_freq = dict(sorted(freq.items(), key=lambda x: x[1], reverse=True))</code></pre>

<h2>zip / enumerate / reversed</h2>
<pre><code># zip - 并行迭代
names = ["Alice", "Bob", "Carol"]
ages = [25, 30, 22]
for name, age in zip(names, ages):
    print(f"{name} is {age}")

# enumerate - 带索引
for i, item in enumerate(["a", "b", "c"]):
    print(f"{i}: {item}")

# reversed
for n in reversed([1, 2, 3]):
    print(n)  # 3 2 1

# sorted 返回新列表
sorted_nums = sorted([3, 1, 2], reverse=True)  # [3, 2, 1]</code></pre>

<h3>配套练习</h3>
<ol>
<li>用 map/filter/reduce 处理一个学生成绩列表</li>
<li>用 @lru_cache 优化递归函数</li>
<li>用 partial 创建一个固定参数的函数</li>
</ol>`
    },
    {
      num: 23,
      key: "s3c5",
      title: "collections 高级容器",
      content: `<h1>collections 高级容器</h1>
<p class="chapter-meta">第二十三章 · 高级特性</p>

<h2>defaultdict</h2>
<pre><code>from collections import defaultdict

# 自动设置默认值
word_count = defaultdict(int)
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
for w in words:
    word_count[w] += 1
# defaultdict(<class 'int'>, {'apple': 3, 'banana': 2, 'cherry': 1})

# 嵌套 defaultdict
tree = defaultdict(lambda: defaultdict(list))
tree["水果"]["红色"].append("苹果")
tree["水果"]["红色"].append("樱桃")

# 默认其他类型
dd_str = defaultdict(str)     # 默认 ""
dd_list = defaultdict(list)   # 默认 []</code></pre>

<h2>Counter - 计数器</h2>
<pre><code>from collections import Counter

c = Counter("hello world")
print(c)  # Counter({'l': 3, 'o': 2, 'h': 1, 'e': 1, ' ': 1, 'w': 1, 'r': 1, 'd': 1})

print(c.most_common(3))  # [('l', 3), ('o', 2), ('h', 1)]
print(c["x"])            # 0（不存在返回0，不是 KeyError）

# 计数器运算
a = Counter(a=3, b=1)
b = Counter(a=1, b=2)
print(a + b)  # Counter({'a': 4, 'b': 3})
print(a - b)  # Counter({'a': 2})
print(a & b)  # 交集: Counter({'a': 1, 'b': 1})</code></pre>

<h2>deque - 双端队列</h2>
<pre><code>from collections import deque

dq = deque([1, 2, 3, 4, 5])

# 两端操作（O(1)）
dq.append(6)        # 右端添加
dq.appendleft(0)    # 左端添加
dq.pop()            # 右端弹出: 6
dq.popleft()        # 左端弹出: 0

# 旋转
dq.rotate(1)        # 向右旋转一位
dq.rotate(-2)       # 向左旋转两位

# maxlen（固定长度队列）
window = deque(maxlen=5)
for i in range(10):
    window.append(i)
print(window)  # deque([5, 6, 7, 8, 9], maxlen=5)</code></pre>

<h2>namedtuple 与 dataclass</h2>
<pre><code>from collections import namedtuple
from dataclasses import dataclass, field

# namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(1, 2)
print(p.x)        # 1
print(p.y)        # 2
print(p._asdict())  # {'x': 1, 'y': 2}

# dataclass（更灵活）
@dataclass
class User:
    name: str
    age: int
    email: str = ""
    tags: list = field(default_factory=list)

    def greet(self):
        return f"Hi, I'm {self.name}"

u = User("小明", 25)
print(u)  # User(name='小明', age=25, email='', tags=[])</code></pre>

<h3>配套练习</h3>
<ol>
<li>用 Counter 统计一篇文章的词频 Top 10</li>
<li>用 deque 实现一个固定大小的日志缓冲区</li>
<li>用 namedtuple 表示二维坐标系上的点</li>
</ol>`
    },
    {
      num: 24,
      key: "s3c6",
      title: "类型注解",
      content: `<h1>类型注解（Type Hints）</h1>
<p class="chapter-meta">第二十四章 · 高级特性</p>

<h2>基础注解</h2>
<pre><code>from typing import List, Dict, Optional, Union, Tuple

# 函数注解
def greet(name: str) -> str:
    return f"Hello, {name}!"

def find_user(user_id: int) -> Optional[Dict[str, Union[str, int]]]:
    # 找到返回字典，找不到返回 None
    ...

# 变量注解
names: List[str] = ["Alice", "Bob"]
scores: Dict[str, int] = {"Alice": 95}
maybe_num: Optional[int] = None
coord: Tuple[float, float] = (1.0, 2.0)

# Python 3.9+ 可以直接用内置类型
names: list[str] = ["Alice", "Bob"]
scores: dict[str, int] = {"Alice": 95}
maybe_num: int | None = None</code></pre>

<h2>高级类型</h2>
<pre><code>from typing import Callable, Any, TypeVar, Literal

# 回调函数
def apply(func: Callable[[int, int], int], a: int, b: int) -> int:
    return func(a, b)

# 任意类型
def identity(x: Any) -> Any:
    return x

# Literal - 限定具体值
def set_mode(mode: Literal["read", "write", "append"]) -> None:
    ...

# 泛型
T = TypeVar("T")

class Stack(Generic[T]):
    def __init__(self) -> None:
        self.items: list[T] = []

    def push(self, item: T) -> None:
        self.items.append(item)

    def pop(self) -> T:
        return self.items.pop()</code></pre>

<h2>数据类（dataclass）</h2>
<pre><code>from dataclasses import dataclass, field, asdict

@dataclass(order=True)
class Product:
    name: str
    price: float
    quantity: int = 0
    tags: list = field(default_factory=list)

    def total_price(self) -> float:
        return self.price * self.quantity

p = Product("笔记本", 4999.00, 2, ["电子", "电脑"])
print(p)
print(asdict(p))  # 转为字典
# 支持自动比较（order=True）
print(p &lt; Product("手机", 6999.00))</code></pre>

<h3>配套练习</h3>
<ol>
<li>给之前的计算器函数加上类型注解</li>
<li>实现一个泛型链表类</li>
<li>用 dataclass 定义一个商品模型</li>
</ol>`
    },
    {
      num: 25,
      key: "s3c7",
      title: "多线程与多进程",
      content: `<h1>多线程与多进程</h1>
<p class="chapter-meta">第二十五章 · 高级特性</p>

<h2>多线程 - I/O 密集型</h2>
<pre><code>from concurrent.futures import ThreadPoolExecutor, as_completed
import time

def download(url):
    time.sleep(1)  # 模拟下载
    return f"Downloaded {url}"

urls = ["url1", "url2", "url3", "url4", "url5"]

# 线程池
with ThreadPoolExecutor(max_workers=3) as executor:
    futures = {executor.submit(download, u): u for u in urls}
    for future in as_completed(futures):
        print(future.result())
# 总耗时约 2 秒（而不是 5 秒）

# 线程安全
import threading

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100000):
        with lock:
            counter += 1

threads = [threading.Thread(target=increment) for _ in range(5)]
for t in threads: t.start()
for t in threads: t.join()
print(counter)  # 500000</code></pre>

<h2>多进程 - CPU 密集型</h2>
<pre><code>from concurrent.futures import ProcessPoolExecutor

def cpu_heavy(n):
    return sum(i*i for i in range(n))

with ProcessPoolExecutor() as executor:
    results = list(executor.map(cpu_heavy, [10**7, 10**7, 10**7]))

# multiprocessing 模块
from multiprocessing import Process, Queue

def worker(queue, data):
    result = sum(data)
    queue.put(result)

if __name__ == "__main__":
    queue = Queue()
    p = Process(target=worker, args=(queue, [1,2,3,4,5]))
    p.start()
    p.join()
    print(queue.get())  # 15</code></pre>

<h2>选择指南</h2>
<table>
<tr><th>场景</th><th>方案</th></tr>
<tr><td>I/O 密集型（网络请求、文件读写）</td><td>多线程 / asyncio</td></tr>
<tr><td>CPU 密集型（计算、数据处理）</td><td>多进程</td></tr>
<tr><td>高并发网络服务</td><td>asyncio</td></tr>
</table>

<h3>配套练习</h3>
<ol>
<li>用线程池并发下载多个网页</li>
<li>用多进程并行计算 1 到 100 万的平方和</li>
<li>实现一个线程安全的计数器</li>
</ol>`
    },
    {
      num: 26,
      key: "s3c8",
      title: "asyncio 异步编程",
      content: `<h1>asyncio 异步编程</h1>
<p class="chapter-meta">第二十六章 · 高级特性</p>

<h2>基础概念</h2>
<pre><code>import asyncio

# 协程
async def fetch(url, delay):
    await asyncio.sleep(delay)  # 非阻塞等待
    return f"Data from {url}"

# 运行协程
async def main():
    result = await fetch("api/users", 1)
    print(result)

asyncio.run(main())</code></pre>

<h2>并发执行</h2>
<pre><code>async def main():
    # gather - 并发执行
    results = await asyncio.gather(
        fetch("api/users", 1),
        fetch("api/posts", 2),
        fetch("api/comments", 1.5),
    )
    for r in results:
        print(r)
    # 总耗时约 2 秒（串行需要 4.5 秒）

    # as_completed - 按完成顺序处理
    tasks = [fetch(f"api/{i}", i) for i in range(1, 4)]
    for coro in asyncio.as_completed(tasks):
        result = await coro
        print(result)</code></pre>

<h2>任务管理与超时</h2>
<pre><code>async def worker(name, duration):
    print(f"{name} 开始工作")
    await asyncio.sleep(duration)
    print(f"{name} 完成")
    return f"{name} 的结果"

async def main():
    # 创建任务
    tasks = [asyncio.create_task(worker(f"W{i}", i)) for i in range(1, 4)]

    # 带超时
    try:
        await asyncio.wait_for(worker("slow", 10), timeout=2)
    except asyncio.TimeoutError:
        print("超时了！")

    # 取消任务
    task = asyncio.create_task(worker("cancel_me", 5))
    await asyncio.sleep(1)
    task.cancel()</code></pre>

<h2>异步迭代器</h2>
<pre><code>async def async_gen():
    for i in range(5):
        await asyncio.sleep(0.1)
        yield i

async for item in async_gen():
    print(item)

# 异步上下文管理器
class AsyncResource:
    async def __aenter__(self):
        print("获取资源")
        return self

    async def __aexit__(self, *args):
        print("释放资源")

async with AsyncResource() as resource:
    print("使用资源")</code></pre>

<h3>配套练习</h3>
<ol>
<li>用 asyncio.gather 并发获取多个 API 数据</li>
<li>实现一个异步的限速器（token bucket）</li>
<li>用异步迭代器处理一个异步数据源</li>
</ol>`
    }
  ]
});
