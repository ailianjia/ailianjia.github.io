// Stage 4: 工程化实践
stages.push({
  name: "阶段四：工程化实践（2-3 周）",
  chapters: [
    {
      num: 27,
      key: "s4c1",
      title: "项目结构与依赖管理",
      content: `<h1>项目结构与依赖管理</h1>
<p class="chapter-meta">第二十七章 · 工程化实践</p>

<h2>标准项目结构</h2>
<pre><code>my-project/
├── src/
│   └── mypackage/
│       ├── __init__.py
│       ├── core.py
│       └── utils.py
├── tests/
│   ├── conftest.py
│   └── test_core.py
├── pyproject.toml
├── requirements.txt
├── .gitignore
└── README.md</code></pre>

<h2>pyproject.toml</h2>
<pre><code>[project]
name = "my-project"
version = "1.0.0"
requires-python = ">=3.10"
dependencies = [
    "requests>=2.28.0",
    "pydantic>=2.0",
]

[project.optional-dependencies]
dev = ["pytest>=7.0", "black", "mypy"]
docs = ["mkdocs>=1.4"]

[build-system]
requires = ["setuptools>=68.0"]
build-backend = "setuptools.backends._legacy:_Backend"</code></pre>

<h2>依赖管理工具对比</h2>
<table>
<tr><th>工具</th><th>特点</th><th>推荐场景</th></tr>
<tr><td><code>pip</code></td><td>标准包管理器</td><td>简单项目</td></tr>
<tr><td><code>poetry</code></td><td>依赖+构建一体化</td><td>中等规模项目</td></tr>
<tr><td><code>uv</code></td><td>Rust 写的极速 pip</td><td>追求速度</td></tr>
<tr><td><code>conda</code></td><td>数据科学环境管理</td><td>数据科学</td></tr>
</table>

<h2>requirements.txt</h2>
<pre><code># requirements.txt
requests==2.31.0
pydantic>=2.0,&lt;3.0
flask==3.0.0
-e .  # 可编辑安装当前项目

# 生成
pip freeze &gt; requirements.txt

# 安装
pip install -r requirements.txt</code></pre>

<h3>配套练习</h3>
<ol>
<li>创建一个标准 Python 项目结构</li>
<li>编写 pyproject.toml 配置文件</li>
<li>用 poetry 管理一个新项目的依赖</li>
</ol>`
    },
    {
      num: 28,
      key: "s4c2",
      title: "单元测试",
      content: `<h1>单元测试（pytest）</h1>
<p class="chapter-meta">第二十八章 · 工程化实践</p>

<h2>基础测试</h2>
<pre><code># mymath.py
def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ValueError("除数不能为零")
    return a / b

# test_mymath.py
import pytest
from mymath import add, divide

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0

def test_divide():
    assert divide(10, 2) == 5.0
    assert divide(-10, 2) == -5.0

def test_divide_by_zero():
    with pytest.raises(ValueError, match="除数不能为零"):
        divide(10, 0)</code></pre>

<h2>参数化测试</h2>
<pre><code>@pytest.mark.parametrize("input,expected", [
    ([1,2,3], 6),
    ([], 0),
    ([10], 10),
    ([-1, 1], 0),
])
def test_sum(input, expected):
    assert sum(input) == expected

@pytest.mark.parametrize("a,b,expected", [
    (2, 3, 5),
    (-1, 1, 0),
    (0, 0, 0),
    (-5, -3, -8),
])
def test_add_params(a, b, expected):
    assert add(a, b) == expected</code></pre>

<h2>Fixtures（测试夹具）</h2>
<pre><code># tests/conftest.py
import pytest

@pytest.fixture
def sample_data():
    return {"a": 1, "b": 2, "c": 3}

@pytest.fixture(scope="module")
def db_connection():
    conn = connect_db()
    yield conn
    conn.close()  # 清理

# tests/test_example.py
def test_with_fixture(sample_data):
    assert len(sample_data) == 3
    assert "a" in sample_data

def test_module_level(db_connection):
    db_connection.execute("CREATE TABLE ...")</code></pre>

<h2>运行测试</h2>
<pre><code>pytest                    # 运行所有测试
pytest -v                 # 详细输出
pytest -x                 # 遇到失败就停止
pytest -k "test_add"      # 按名称过滤
pytest test_math.py       # 指定文件
pytest --cov=myproject    # 覆盖率（需安装 pytest-cov）
pytest --tb=short         # 简短 traceback</code></pre>

<h3>配套练习</h3>
<ol>
<li>为你的计算器项目写完整的测试用例</li>
<li>用 @pytest.mark.parametrize 覆盖边界情况</li>
<li>写一个 fixture 提供测试用的数据库连接</li>
</ol>`
    },
    {
      num: 29,
      key: "s4c3",
      title: "代码质量工具",
      content: `<h1>代码质量工具</h1>
<p class="chapter-meta">第二十九章 · 工程化实践</p>

<h2>格式化 - Black</h2>
<pre><code>pip install black
black src/ tests/        # 自动格式化代码
black --check src/       # 检查但不修改
black --diff src/        # 显示差异</code></pre>

<h2>类型检查 - MyPy</h2>
<pre><code>pip install mypy
mypy src/                # 检查类型注解
mypy --strict src/       # 严格模式

# mypy.ini 配置
[mypy]
python_version = 3.12
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True</code></pre>

<h2>综合工具 - Ruff（推荐）</h2>
<pre><code>pip install ruff
ruff check src/          # 检查（替代 flake8 + isort）
ruff check src/ --fix    # 自动修复
ruff format src/         # 格式化（替代 black）

# pyproject.toml 配置
[tool.ruff]
target-version = "py312"
line-length = 100

[tool.ruff.lint]
select = ["E", "W", "F", "I", "N", "UP", "B"]</code></pre>

<h2>预提交钩子</h2>
<pre><code>pip install pre-commit
pre-commit install        # 安装钩子

# .pre-commit-config.yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.1.0
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format

  - repo: https://github.com/psf/black
    rev: 23.0.0
    hooks:
      - id: black

# 手动运行所有钩子
pre-commit run --all-files</code></pre>

<h3>配套练习</h3>
<ol>
<li>用 Black 格式化你的项目代码</li>
<li>给代码加上类型注解并用 MyPy 检查</li>
<li>配置 pre-commit 钩子</li>
</ol>`
    },
    {
      num: 30,
      key: "s4c4",
      title: "日志与调试",
      content: `<h1>日志与调试</h1>
<p class="chapter-meta">第三十章 · 工程化实践</p>

<h2>logging 模块</h2>
<pre><code>import logging

# 基础配置
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s | %(levelname)-7s | %(name)s | %(message)s",
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler(),  # 同时输出到控制台
    ]
)
logger = logging.getLogger(__name__)

# 日志级别
logger.debug("调试信息 - 开发时用")
logger.info("正常运行信息")
logger.warning("警告 - 可能有问题")
logger.error("错误 - 功能受影响")
logger.critical("严重错误 - 程序可能崩溃")

# 结构化日志
logger.info("用户登录", extra={"user_id": 123, "ip": "192.168.1.1"})</code></pre>

<h2>调试技巧</h2>
<pre><code># breakpoint() （Python 3.7+, 推荐）
def my_function(x):
    result = complex_calculation(x)
    breakpoint()  # 自动进入调试器
    return result

# 常用调试命令
# n - 下一步
# c - 继续运行
# s - 进入函数
# p 变量名 - 打印变量
# l - 查看代码
# q - 退出调试

# pprint 美化输出
from pprint import pprint
data = {"users": [{"name": "小明", "age": 25}]}
pprint(data, width=40)</code></pre>

<h3>配套练习</h3>
<ol>
<li>为你的项目配置 logging 模块</li>
<li>用 breakpoint() 调试一个有 bug 的函数</li>
<li>实现一个日志轮转（每天生成一个新日志文件）</li>
</ol>`
    },
    {
      num: 31,
      key: "s4c5",
      title: "打包与发布",
      content: `<h1>打包与发布</h1>
<p class="chapter-meta">第三十一章 · 工程化实践</p>

<h2>构建分发包</h2>
<pre><code># 安装构建工具
pip install build

# 构建
python -m build

# 生成的文件
dist/
├── my_project-1.0.0-py3-none-any.whl  #  wheel 包
└── my_project-1.0.0.tar.gz            # 源码包

# 本地安装
pip install dist/my_project-1.0.0-py3-none-any.whl

# 上传到 PyPI
pip install twine
twine upload dist/*</code></pre>

<h2>发布前检查清单</h2>
<ul>
<li>README.md 清晰完整，有安装和使用示例</li>
<li>版本号正确递增（语义化版本：主版本.次版本.修订版本）</li>
<li>所有测试通过（<code>pytest</code>）</li>
<li>类型注解完整（<code>mypy</code> 无错误）</li>
<li>依赖列表准确，不遗漏必要依赖</li>
<li>包含许可证文件（MIT / Apache 2.0 / GPL 等）</li>
<li>代码已格式化（<code>black</code> / <code>ruff</code>）</li>
</ul>

<h2>语义化版本</h2>
<table>
<tr><th>类型</th><th>变化</th><th>示例</th></tr>
<tr><td>主版本 (MAJOR)</td><td>不兼容的 API 变更</td><td>1.0.0 → 2.0.0</td></tr>
<tr><td>次版本 (MINOR)</td><td>向后兼容的功能新增</td><td>1.0.0 → 1.1.0</td></tr>
<tr><td>修订版本 (PATCH)</td><td>向后兼容的 bug 修复</td><td>1.0.0 → 1.0.1</td></tr>
</table>

<h3>配套练习</h3>
<ol>
<li>为你的工具库编写 pyproject.toml</li>
<li>用 <code>python -m build</code> 构建一个 wheel 包</li>
<li>写一个完整的 README.md</li>
</ol>`
    }
  ]
});
