// Stage 7: Web 框架
stages.push({
  name: "阶段七：Web 框架（选学）",
  chapters: [
    {
      num: 45,
      key: "s7c1",
      title: "FastAPI 概述与路由",
      content: `<h1>FastAPI 概述与路由</h1>
<p class="chapter-meta">第四十五章 · Web 框架</p>

<h2>安装与运行</h2>
<pre><code># 安装
pip install fastapi uvicorn

# 创建 main.py
from fastapi import FastAPI

app = FastAPI(title="我的 API", version="1.0.0")

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# 运行
uvicorn main:app --reload

# 访问
# http://localhost:8000          # API 文档 (Swagger)
# http://localhost:8000/docs     # Swagger UI 交互界面
# http://localhost:8000/redoc    # ReDoc 文档</code></pre>

<h2>路由定义</h2>
<pre><code># GET 路由
@app.get("/")
def home():
    return {"message": "首页"}

@app.get("/items/{item_id}")
def get_item(item_id: int):
    return {"item_id": item_id}

# 路径参数自动类型转换
@app.get("/users/{user_id}/posts/{post_id}")
def get_post(user_id: int, post_id: int):
    return {"user_id": user_id, "post_id": post_id}

# POST 路由
@app.post("/items/")
def create_item(item: dict):
    return {"created": item}

# PUT 路由
@app.put("/items/{item_id}")
def update_item(item_id: int, item: dict):
    return {"updated": item_id, "data": item}

# DELETE 路由
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    return {"deleted": item_id}

# 查询参数
@app.get("/search")
def search(q: str, page: int = 1, limit: int = 20):
    return {"query": q, "page": page, "limit": limit}</code></pre>

<h2>状态码与响应</h2>
<pre><code>from fastapi import Response, status

@app.post("/items/", status_code=status.HTTP_201_CREATED)
def create_item(item: dict):
    return {"created": True}

@app.get("/items/{item_id}")
def get_item(item_id: int, response: Response):
    if item_id == 0:
        response.status_code = 404
        return {"detail": "Not Found"}
    return {"item_id": item_id}</code></pre>

<h3>配套练习</h3>
<ol>
<li>创建一个包含 CRUD 路由的 Todo API 骨架</li>
<li>访问 <code>/docs</code> 查看自动生成的 API 文档</li>
<li>尝试在 Swagger UI 中发送请求</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>from fastapi import FastAPI
app = FastAPI()

@app.get("/todos")
def list_todos():
    return []

@app.post("/todos")
def create_todo(todo: dict):
    return todo

@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, todo: dict):
    return {"updated": todo_id, **todo}

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    return {"deleted": todo_id}</code></pre></details></div>`
    },
    {
      num: 46,
      key: "s7c2",
      title: "Pydantic 数据验证",
      content: `<h1>Pydantic 数据验证</h1>
<p class="chapter-meta">第四十六章 · Web 框架</p>

<h2>基本模型定义</h2>
<pre><code>from pydantic import BaseModel, Field

class UserCreate(BaseModel):
    name: str                     # 必填字符串
    age: int                      # 必填整数
    email: str | None = None      # 可选字段

class UserResponse(BaseModel):
    id: int
    name: str
    age: int
    email: str | None = None

# 自动验证，无效数据返回 422 错误
@app.post("/users/", response_model=UserResponse)
def create_user(user: UserCreate):
    return UserResponse(id=1, **user.model_dump())</code></pre>

<h2>字段约束</h2>
<pre><code>from pydantic import Field, field_validator

class Product(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    price: float = Field(gt=0, le=999999)
    stock: int = Field(ge=0, default=0)
    tags: list[str] = Field(default_factory=list)

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v):
        if not v.strip():
            raise ValueError("名称不能为空")
        return v.strip()

    @field_validator("tags")
    @classmethod
    def tags_unique(cls, v):
        if len(v) != len(set(v)):
            raise ValueError("标签不能重复")
        return v

# 验证失败示例
Product(name="", price=-10)  # ❌ ValidationError
Product(name="笔记本", price=4999.00, stock=100)  # ✅</code></pre>

<h2>嵌套模型</h2>
<pre><code>class Address(BaseModel):
    street: str
    city: str
    zipcode: str

class UserWithAddress(BaseModel):
    name: str
    address: Address

user = UserWithAddress(
    name="小明",
    address={"street": "长安街1号", "city": "北京", "zipcode": "100000"}
)</code></pre>

<h2>模型方法</h2>
<pre><code>class Item(BaseModel):
    name: str
    price: float

    @property
    def tax(self):
        return self.price * 0.13

    def summary(self):
        return f"{self.name}: ¥{self.price:.2f} (含税 ¥{self.price * 1.13:.2f})"

    data = item.model_dump()
    json_str = item.model_dump_json()
    item2 = Item.model_validate({"name": "笔", "price": 5.0})</code></pre>

<h3>配套练习</h3>
<ol>
<li>为 Todo API 添加 UserCreate 和 UserResponse 模型</li>
<li>添加字段验证：用户名不能为空、年龄必须在 0-150 之间</li>
<li>实现一个嵌套的 Address 模型</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>from pydantic import BaseModel, Field

class UserCreate(BaseModel):
    name: str = Field(..., min_length=1)
    age: int = Field(..., ge=0, le=150)
    email: str | None = None

class UserResponse(BaseModel):
    id: int
    name: str
    age: int
    email: str | None = None

class Address(BaseModel):
    street: str
    city: str
    zipcode: str

class UserFull(BaseModel):
    name: str
    address: Address</code></pre></details></div>`
    },
    {
      num: 47,
      key: "s7c3",
      title: "异步与中间件",
      content: `<h1>异步支持与中间件</h1>
<p class="chapter-meta">第四十七章 · Web 框架</p>

<h2>异步路由</h2>
<pre><code>import asyncio

@app.get("/sync")
def sync_route():
    return {"message": "同步执行"}

@app.get("/async")
async def async_route():
    await asyncio.sleep(1)  # 非阻塞等待
    return {"message": "异步执行"}

@app.get("/concurrent")
async def concurrent():
    async def fetch_data(name, delay):
        await asyncio.sleep(delay)
        return {"name": name, "delay": delay}

    results = await asyncio.gather(
        fetch_data("A", 1),
        fetch_data("B", 2),
        fetch_data("C", 1.5),
    )
    return results</code></pre>

<h2>中间件</h2>
<pre><code>from fastapi import Request
import time

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    print(f"{request.method} {request.url.path} - {response.status_code} - {duration:.3f}s")
    return response

@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    token = request.headers.get("Authorization")
    if not token:
        return JSONResponse(status_code=401, content={"detail": "缺少认证令牌"})
    response = await call_next(request)
    return response</code></pre>

<h2>依赖注入</h2>
<pre><code>from fastapi import Depends

async def get_db():
    db = Database()
    try:
        yield db
    finally:
        db.close()

@app.get("/users/")
async def list_users(db=Depends(get_db)):
    return await db.query("SELECT * FROM users")

async def get_current_user(token: str = Header(...)):
    user = verify_token(token)
    if not user:
        raise HTTPException(status_code=401)
    return user

@app.get("/profile")
async def get_profile(user=Depends(get_current_user)):
    return user</code></pre>

<h3>配套练习</h3>
<ol>
<li>添加请求日志中间件，记录每个请求的耗时</li>
<li>实现一个认证中间件，检查请求头中的 Token</li>
<li>用依赖注入实现数据库连接管理</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>from fastapi import Request
import time

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    print(f"{request.method} {request.url.path} - {response.status_code} - {time.time()-start:.3f}s")
    return response

async def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()

@app.get("/items/")
async def get_items(db=Depends(get_db)):
    return db.query(Item).all()</code></pre></details></div>`
    },
    {
      num: 48,
      key: "s7c4",
      title: "数据库与 ORM",
      content: `<h1>数据库与 SQLAlchemy ORM</h1>
<p class="chapter-meta">第四十八章 · Web 框架</p>

<h2>SQLAlchemy 2.0 声明式</h2>
<pre><code># 安装
pip install sqlalchemy aiosqlite

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    age = Column(Integer)
    created_at = Column(DateTime, server_default="now()")

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

engine = create_async_engine("sqlite+aiosqlite:///app.db", echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)</code></pre>

<h2>CRUD 操作</h2>
<pre><code>from sqlalchemy import select

async def create_user(name: str, email: str, age: int):
    async with AsyncSessionLocal() as session:
        user = User(name=name, email=email, age=age)
        session.add(user)
        await session.commit()
        await session.refresh(user)
        return user

async def get_user(user_id: int):
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

async def update_user(user_id: int, **kwargs):
    async with AsyncSessionLocal() as session:
        user = await get_user(user_id)
        if user:
            for key, value in kwargs.items():
                setattr(user, key, value)
            await session.commit()
        return user

async def delete_user(user_id: int):
    async with AsyncSessionLocal() as session:
        user = await get_user(user_id)
        if user:
            await session.delete(user)
            await session.commit()
            return True
        return False</code></pre>

<h2>关联关系</h2>
<pre><code>from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    posts = relationship("Post", back_populates="author")

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    user_id = Column(Integer, ForeignKey("users.id"))
    author = relationship("User", back_populates="posts")

# 查询用户及其所有帖子
stmt = select(User).options(joinedload(User.posts)).where(User.id == 1)
user = await session.execute(stmt)
user = user.scalar_one_or_none()
for post in user.posts:
    print(post.title)</code></pre>

<h3>配套练习</h3>
<ol>
<li>搭建一个带数据库的 Todo API</li>
<li>实现用户的增删改查接口</li>
<li>添加用户和帖子的关联关系</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    done = Column(Integer, default=0)

# CRUD
async def create_todo(title):
    async with AsyncSessionLocal() as s:
        t = Todo(title=title)
        s.add(t)
        await s.commit()
        return t

async def list_todos():
    async with AsyncSessionLocal() as s:
        result = await s.execute(select(Todo))
        return result.scalars().all()</code></pre></details></div>`
    }
  ]
});

// Stage 8: 爬虫与自动化
stages.push({
  name: "阶段八：爬虫与自动化（选学）",
  chapters: [
    {
      num: 49,
      key: "s8c1",
      title: "requests 入门",
      content: `<h1>requests 入门</h1>
<p class="chapter-meta">第四十九章 · 爬虫与自动化</p>

<h2>安装与基本使用</h2>
<pre><code># 安装
pip install requests

import requests

response = requests.get("https://httpbin.org/get")
print(response.status_code)    # 200
print(response.text)           # 响应体（字符串）
print(response.json())         # JSON 解析后的字典
print(response.headers)        # 响应头</code></pre>

<h2>GET 请求传参</h2>
<pre><code># 方式一：直接拼接 URL
response = requests.get("https://httpbin.org/get?name=小明&age=25")

# 方式二：使用 params 参数（推荐，自动编码）
params = {"name": "小明", "age": 25}
response = requests.get("https://httpbin.org/get", params=params)
print(response.url)
# https://httpbin.org/get?name=%E5%B0%8F%E6%98%8E&age=25

# 列表参数
params = {"tags": ["python", "web"]}
response = requests.get("https://httpbin.org/get", params=params)
# https://httpbin.org/get?tags=python&tags=web</code></pre>

<h2>POST 请求</h2>
<pre><code># POST 发送表单数据
data = {"username": "admin", "password": "123456"}
response = requests.post("https://httpbin.org/post", data=data)

# POST 发送 JSON 数据
payload = {"name": "小明", "age": 25}
response = requests.post("https://httpbin.org/post", json=payload)

# POST 发送文件
files = {"file": open("report.pdf", "rb")}
response = requests.post("https://httpbin.org/post", files=files)</code></pre>

<h2>响应对象属性</h2>
<pre><code>response = requests.get("https://httpbin.org/get")

response.status_code      # 状态码: 200
response.reason           # 状态原因: "OK"
response.text             # 响应体（字符串）
response.content          # 响应体（字节）
response.json()           # JSON 解析
response.headers          # 响应头
response.cookies          # Cookie
response.elapsed          # 请求耗时
response.url              # 最终 URL
response.history          # 重定向历史
response.is_redirect      # 是否重定向

response.raise_for_status()  # 非 2xx 抛出 HTTPError</code></pre>

<h3>配套练习</h3>
<ol>
<li>用 requests 获取 httpbin.org 的 GET/POST 响应</li>
<li>解析一个公开 API 的 JSON 响应</li>
<li>实现一个自动检查网站是否在线的脚本</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>import requests

# 练习1
r = requests.get("https://httpbin.org/get")
print(r.status_code, r.json())

# 练习2
r = requests.get("https://jsonplaceholder.typicode.com/posts/1")
print(r.json()["title"])

# 练习3
def check_site(url):
    try:
        r = requests.get(url, timeout=5)
        return r.status_code == 200
    except:
        return False

print(check_site("https://example.com"))</code></pre></details></div>`
    },
    {
      num: 50,
      key: "s8c2",
      title: "requests 高级用法",
      content: `<h1>requests 高级用法</h1>
<p class="chapter-meta">第五十章 · 爬虫与自动化</p>

<h2>请求头（Headers）</h2>
<pre><code>headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
}
response = requests.get("https://example.com", headers=headers)

# 常见 User-Agent 轮换
user_agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Firefox/120.0",
]</code></pre>

<h2>Cookie 与 Session</h2>
<pre><code># 手动设置 Cookie
cookies = {"session_id": "abc123", "user": "admin"}
response = requests.get("https://example.com", cookies=cookies)

# Session - 自动管理 Cookie
session = requests.Session()
session.post("https://example.com/login", data={"username": "admin", "password": "123"})
response = session.get("https://example.com/dashboard")  # 自动携带 Cookie

session.headers.update({"User-Agent": "MyBot/1.0"})</code></pre>

<h2>认证</h2>
<pre><code>from requests.auth import HTTPBasicAuth

# Basic Auth
response = requests.get(url, auth=("user", "passwd"))

# Token 认证
headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..."}
response = requests.get("https://api.example.com/data", headers=headers)</code></pre>

<h2>超时与重试</h2>
<pre><code># 超时设置
response = requests.get(url, timeout=5)
response = requests.get(url, timeout=(3, 10))  # 连接3秒，读取10秒

# 带重试的请求
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

session = requests.Session()
retry = Retry(total=3, backoff_factor=1, status_forcelist=[429, 500, 502, 503])
adapter = HTTPAdapter(max_retries=retry)
session.mount("http://", adapter)
session.mount("https://", adapter)</code></pre>

<h2>代理</h2>
<pre><code>proxies = {
    "http": "http://127.0.0.1:7890",
    "https": "http://127.0.0.1:7890",
}
response = requests.get("https://example.com", proxies=proxies)</code></pre>

<h3>配套练习</h3>
<ol>
<li>用 Session 模拟登录一个网站并获取个人信息</li>
<li>实现带重试机制的下载函数</li>
<li>用代理访问一个网站</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# 练习2: 重试下载
session = requests.Session()
retry = Retry(total=3, backoff_factor=1, status_forcelist=[500, 502, 503])
session.mount("https://", HTTPAdapter(max_retries=retry))

def download(url):
    r = session.get(url, timeout=10)
    r.raise_for_status()
    return r.content

# 练习3: 代理
proxies = {"http": "http://proxy:8080", "https": "http://proxy:8080"}
r = requests.get("https://httpbin.org/ip", proxies=proxies)</code></pre></details></div>`
    },
    {
      num: 51,
      key: "s8c3",
      title: "BeautifulSoup 解析",
      content: `<h1>BeautifulSoup 网页解析</h1>
<p class="chapter-meta">第五十一章 · 爬虫与自动化</p>

<h2>安装与基本使用</h2>
<pre><code># 安装
pip install beautifulsoup4 lxml

from bs4 import BeautifulSoup
import requests

html = """
&lt;html&gt;
  &lt;body&gt;
    &lt;div class="container"&gt;
      &lt;h1 class="title"&gt;文章标题&lt;/h1&gt;
      &lt;p class="content"&gt;文章内容...&lt;/p&gt;
      &lt;div class="meta"&gt;
        &lt;span class="author"&gt;作者&lt;/span&gt;
        &lt;span class="date"&gt;2025-01-15&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/body&gt;
&lt;/html&gt;
"""

soup = BeautifulSoup(html, "lxml")</code></pre>

<h2>查找元素</h2>
<pre><code># 按标签名查找
h1 = soup.find("h1")
print(h1.string)

# 按 class 查找
title = soup.find("h1", class_="title")

# 查找所有匹配
spans = soup.find_all("span")

# 限制数量
first_span = soup.find("span")
spans = soup.find_all("span", limit=2)</code></pre>

<h2>CSS 选择器</h2>
<pre><code># select_one - 选择第一个
title = soup.select_one("h1.title")
author = soup.select_one(".meta .author")

# select - 选择所有
tags = soup.select(".tags li")
for tag in tags:
    print(tag.get_text())

# 提取数据
for article in soup.select(".article-item"):
    data = {
        "title": article.select_one(".title").get_text(strip=True),
        "link": article.select_one("a")["href"],
        "date": article.select_one(".date").get_text(strip=True),
    }
    print(data)</code></pre>

<h2>导航与遍历</h2>
<pre><code>parent = soup.div.parent
children = soup.div.children
next_sibling = soup.h1.next_sibling
previous_sibling = soup.h1.previous_sibling

tag = soup.find("a")
print(tag["href"])
print(tag.get("href"))
print(tag.attrs)
print(tag.get_text(strip=True))</code></pre>

<h2>完整爬虫示例</h2>
<pre><code>import requests
from bs4 import BeautifulSoup
import time

def scrape_page(url):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    try:
        resp = requests.get(url, headers=headers, timeout=10)
        resp.raise_for_status()
        resp.encoding = resp.apparent_encoding
    except requests.RequestException as e:
        print(f"请求失败: {e}")
        return []

    soup = BeautifulSoup(resp.text, "lxml")
    articles = []
    for item in soup.select(".article-item"):
        try:
            articles.append({
                "title": item.select_one(".title").get_text(strip=True),
                "link": item.select_one("a")["href"],
                "date": item.select_one(".date").get_text(strip=True),
            })
        except AttributeError:
            continue
    return articles

# 翻页爬取
all_articles = []
for page in range(1, 4):
    url = f"https://example.com/news?page={page}"
    articles = scrape_page(url)
    all_articles.extend(articles)
    time.sleep(1)
    print(f"第 {page} 页: {len(articles)} 条")

print(f"共抓取 {len(all_articles)} 条")</code></pre>

<h3>配套练习</h3>
<ol>
<li>爬取一个新闻网站的首页，提取所有文章标题和链接</li>
<li>实现翻页爬取，保存为 JSON 文件</li>
<li>用 BeautifulSoup 解析一个豆瓣读书页面</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>import requests
from bs4 import BeautifulSoup
import json

def scrape_news(url):
    headers = {"User-Agent": "Mozilla/5.0"}
    resp = requests.get(url, headers=headers)
    soup = BeautifulSoup(resp.text, "lxml")
    articles = []
    for item in soup.select(".article-item"):
        articles.append({
            "title": item.select_one(".title").get_text(strip=True),
            "link": item.select_one("a")["href"],
        })
    return articles

results = scrape_news("https://example.com/news")
with open("articles.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)</code></pre></details></div>`
    },
    {
      num: 52,
      key: "s8c4",
      title: "Scrapy 框架",
      content: `<h1>Scrapy 爬虫框架</h1>
<p class="chapter-meta">第五十二章 · 爬虫与自动化</p>

<h2>安装与项目创建</h2>
<pre><code># 安装
pip install scrapy

# 创建项目
scrapy startproject mycrawler
cd mycrawler
# mycrawler/
# ├── scrapy.cfg
# └── mycrawler/
#     ├── items.py
#     ├── middlewares.py
#     ├── pipelines.py
#     ├── settings.py
#     └── spiders/</code></pre>

<h2>定义 Item</h2>
<pre><code># items.py
import scrapy

class ArticleItem(scrapy.Item):
    title = scrapy.Field()
    link = scrapy.Field()
    date = scrapy.Field()
    summary = scrapy.Field()</code></pre>

<h2>编写 Spider</h2>
<pre><code># spiders/news.py
import scrapy
from mycrawler.items import ArticleItem

class NewsSpider(scrapy.Spider):
    name = "news"
    start_urls = ["https://example.com/news"]

    def parse(self, response):
        for article in response.css(".article-item"):
            item = ArticleItem()
            item["title"] = article.css(".title::text").get()
            item["link"] = article.css("a::attr(href)").get()
            item["date"] = article.css(".date::text").get()
            yield item

        next_page = response.css(".next a::attr(href)").get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)</code></pre>

<h2>运行与导出</h2>
<pre><code>scrapy crawl news
scrapy crawl news -o articles.json
scrapy crawl news -o articles.csv</code></pre>

<h2>Settings 配置</h2>
<pre><code># settings.py
BOT_NAME = "mycrawler"
ROBOTSTXT_OBEY = True
CONCURRENT_REQUESTS = 16
DOWNLOAD_DELAY = 1
RANDOMIZE_DOWNLOAD_DELAY = True

FEEDS = {
    "output/articles.json": {
        "format": "json",
        "encoding": "utf-8",
        "indent": 2,
    },
}</code></pre>

<h3>配套练习</h3>
<ol>
<li>用 Scrapy 搭建一个完整的爬虫项目</li>
<li>实现用户代理轮换中间件</li>
<li>将爬取的数据保存到 JSON 文件</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code># 在 spiders/ 下创建
import scrapy

class BlogSpider(scrapy.Spider):
    name = "blog"
    start_urls = ["https://blog.example.com"]

    def parse(self, response):
        for post in response.css("article.post"):
            yield {
                "title": post.css("h2::text").get(),
                "link": response.urljoin(post.css("a::attr(href)").get()),
            }
        next_page = response.css("a.next::attr(href)").get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)</code></pre></details></div>`
    },
    {
      num: 53,
      key: "s8c5",
      title: "Selenium 浏览器自动化",
      content: `<h1>Selenium 浏览器自动化</h1>
<p class="chapter-meta">第五十三章 · 爬虫与自动化</p>

<h2>安装与配置</h2>
<pre><code># 安装
pip install selenium webdriver-manager

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("--disable-gpu")
driver = webdriver.Chrome(options=options)</code></pre>

<h2>页面操作</h2>
<pre><code>driver.get("https://example.com")
print(driver.title)
print(driver.current_url)

# 等待元素加载
wait = WebDriverWait(driver, 10)
element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".article")))

# 查找元素
title = driver.find_element(By.CSS_SELECTOR, "h1.title")
links = driver.find_elements(By.CLASS_NAME, "link")

# 输入和点击
search_box = driver.find_element(By.NAME, "q")
search_box.send_keys("Python 教程")
search_box.send_keys(Keys.RETURN)

print(title.text)
print(title.get_attribute("href"))</code></pre>

<h2>等待策略</h2>
<pre><code>wait = WebDriverWait(driver, 10)

# 元素可点击
wait.until(EC.element_to_be_clickable((By.ID, "submit-btn")))

# URL 包含某文本
wait.until(EC.url_contains("/search"))

# 文本出现
wait.until(EC.text_to_be_present_in_element((By.CSS_SELECTOR, ".result"), "成功"))

driver.implicitly_wait(5)  # 隐式等待</code></pre>

<h2>截图与下载</h2>
<pre><code>driver.save_screenshot("screenshot.png")
html = driver.page_source
cookies = driver.get_cookies()
result = driver.execute_script("return document.title;")

alert = driver.switch_to.alert
print(alert.text)
alert.accept()  # 确认</code></pre>

<h3>配套练习</h3>
<ol>
<li>用 Selenium 自动登录一个网站</li>
<li>实现一个自动截图工具</li>
<li>用 Selenium 处理需要登录才能访问的页面</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)

driver.get("https://example.com/login")
wait.until(EC.presence_of_element_located((By.NAME, "username"))).send_keys("admin")
driver.find_element(By.NAME, "password").send_keys("123456")
driver.find_element(By.CSS_SELECTOR, "button[type=submit]").click()

wait.until(EC.url_contains("/dashboard"))
driver.save_screenshot("logged_in.png")
driver.quit()</code></pre></details></div>`
    }
  ]
});