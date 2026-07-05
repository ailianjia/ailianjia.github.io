// Stage 5: 人工智能方向
stages.push({
  name: "阶段五：人工智能与数据科学（选学）",
  chapters: [
    {
      num: 32,
      key: "s5c1",
      title: "NumPy 数组计算",
      content: `<h1>NumPy 数组计算</h1>
<p class="chapter-meta">第三十二章 · 人工智能</p>

<h2>安装与创建数组</h2>
<pre><code># 安装
pip install numpy

import numpy as np

# 创建数组
a = np.array([1, 2, 3, 4, 5])
b = np.array([[1, 2, 3], [4, 5, 6]])
c = np.zeros((3, 4))          # 全零数组
d = np.ones((2, 3))           # 全一数组
e = np.full((2, 2), 7)        # 指定值填充
f = np.eye(3)                 # 单位矩阵
g = np.arange(10)             # [0,1,2,...,9]
h = np.linspace(0, 1, 5)      # [0.0, 0.25, 0.5, 0.75, 1.0]

# 随机数组
rand_int = np.random.randint(0, 100, size=(3, 4))  # 随机整数
rand_float = np.random.randn(3, 4)  # 标准正态分布
rand_uniform = np.random.rand(3, 4) # 均匀分布 [0,1)</code></pre>

<h2>数组属性与形状</h2>
<pre><code>a = np.array([[1, 2, 3], [4, 5, 6]])

a.shape       # (2, 3)  行数列数
a.ndim        # 2       维度数
a.size        # 6       元素总数
a.dtype       # int64   数据类型
a.itemsize    # 8       每个元素字节数

# reshape 重塑
b = a.reshape(3, 2)     # 变成 3行2列
c = a.reshape(-1, 1)    # 变成列向量 (6, 1)

# flatten / ravel 展平
flat = a.flatten()      # [1,2,3,4,5,6]

# astype 转换类型
float_arr = a.astype(float)   # [1.0, 2.0, ...]
bool_arr = a.astype(bool)     # [True, True, ...]</code></pre>

<h2>数组运算</h2>
<pre><code>a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# 逐元素运算
a + b       # [5, 7, 9]
a * b       # [4, 10, 18] 逐元素相乘，不是点积！
a ** 2      # [1, 4, 9]
np.dot(a, b)    # 32  点积
a @ b       # 32  @ 也是点积

# 广播机制
a = np.array([[1], [2], [3]])  # (3, 1)
b = np.array([4, 5, 6])        # (3,)
a + b  # 广播成:
# [[5, 6, 7]
#  [6, 7, 8]
#  [7, 8, 9]]

# 聚合运算
arr = np.array([1, 2, 3, 4, 5])
np.sum(arr)         # 15
np.mean(arr)        # 3.0
np.std(arr)         # 标准差 ≈1.58
np.var(arr)         # 方差 ≈2.5
np.min(arr)         # 1
np.max(arr)         # 5
np.argmax(arr)      # 4 最大值索引
np.cumsum(arr)      # [1, 3, 6, 10, 15] 累加</code></pre>

<h2>索引与切片</h2>
<pre><code>a = np.array([[10, 20, 30], [40, 50, 60], [70, 80, 90]])

# 基本索引
a[0, 1]       # 20
a[1]          # [40, 50, 60]

# 切片
a[0:2, 1:]    # [[20, 30], [50, 60]]
a[:, 0]       # [10, 40, 70] 第一列
a[0, :]       # [10, 20, 30] 第一行

# 布尔索引
mask = a > 40
a[mask]       # [50, 60, 70, 80, 90]

a[a[:, 0] % 2 == 0]  # 第一列为偶数的行

# 花式索引
rows = np.array([0, 2])
cols = np.array([1, 2])
a[rows, cols]   # [20, 90]</code></pre>

<h3>配套练习</h3>
<ol>
<li>创建一个 5x5 的矩阵，对角线为 1，其余为 0</li>
<li>用广播机制将 [1,2,3] 和 [4,5,6,7] 做加法</li>
<li>从随机矩阵中提取所有大于 50 的元素</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code># 练习1
m = np.eye(5)
# 练习2
a = np.array([1,2,3]).reshape(3,1)
b = np.array([4,5,6,7])
print(a + b)  # 广播成 3x4
# 练习3
arr = np.random.randint(0, 100, (5,5))
print(arr[arr > 50])</code></pre></details></div>`
    },
    {
      num: 33,
      key: "s5c2",
      title: "Pandas 数据分析",
      content: `<h1>Pandas 数据分析</h1>
<p class="chapter-meta">第三十三章 · 人工智能</p>

<h2>Series 与 DataFrame</h2>
<pre><code># 安装
pip install pandas

import pandas as pd
import numpy as np

# Series - 一维数组
s = pd.Series([1, 3, 5, np.nan, 10], index=['a', 'b', 'c', 'd', 'e'])

# DataFrame - 二维表格
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Carol', 'Dave'],
    'age': [25, 30, 22, 28],
    'score': [95, 82, 88, 76],
    'city': ['北京', '上海', '广州', '深圳']
})

# 从文件读取
csv_df = pd.read_csv('data.csv')
excel_df = pd.read_excel('data.xlsx')
json_df = pd.read_json('data.json')

# 导出数据
df.to_csv('output.csv', index=False)
df.to_excel('output.xlsx', index=False)</code></pre>

<h2>数据查看与选择</h2>
<pre><code># 基本信息
df.head(3)        # 前3行
df.tail(2)        # 后2行
df.info()         # 列名、非空数、类型
df.describe()     # 统计摘要（均值、标准差等）
df.shape          # (4, 4)
df.columns        # Index(['name','age','score','city'])
df.index          # RangeIndex

# 选择列
df['name']        # Series
df[['name', 'age']]  # DataFrame

# 按位置选择
df.iloc[0]        # 第0行
df.iloc[0:2, 1:3] # 前2行，第1-2列

# 按标签选择
df.loc[0, 'name'] # 'Alice'

# 条件筛选
df[df['age'] > 24]
df[(df['age'] > 24) & (df['score'] >= 90)]
df[df['city'].isin(['北京', '上海'])]</code></pre>

<h2>数据清洗</h2>
<pre><code># 处理缺失值
df.dropna()           # 删除含空值的行
df.fillna(0)          # 用0填充空值
df.fillna(df.mean())  # 用均值填充
df['age'].interpolate()  # 插值填充

# 去重
df.drop_duplicates()

# 修改列名
df.rename(columns={'name': '姓名', 'age': '年龄'})

# 类型转换
df['age'] = df['age'].astype(int)
df['score'] = pd.to_numeric(df['score'], errors='coerce')

# 替换值
df['city'].replace({'北京': 'BJ', '上海': 'SH'})

# 创建新列
df['grade'] = df['score'].apply(lambda x: 'A' if x >= 90 else 'B')
df['double_age'] = df['age'] * 2</code></pre>

<h2>分组与聚合</h2>
<pre><code># 分组
grouped = df.groupby('city')
for name, group in grouped:
    print(name, group['score'].mean())

# 聚合
df.groupby('city')['score'].agg(['mean', 'max', 'min', 'count'])

# pivot_table 透视表
pd.pivot_table(df, values='score', index='city', aggfunc='mean')

# crosstab 交叉表
pd.crosstab(df['city'], df['gender'])</code></pre>

<h3>配套练习</h3>
<ol>
<li>创建一个 DataFrame 包含学生成绩，计算每个学生的平均分</li>
<li>用 groupby 按城市分组统计平均分数</li>
<li>处理一个包含缺失值的 CSV 文件</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>import pandas as pd
import numpy as np

# 练习1
df = pd.DataFrame({
    'name': ['A','B','C'],
    'math': [90, 80, 70],
    'english': [85, 95, 60]
})
df['avg'] = df[['math', 'english']].mean(axis=1)

# 练习2
by_city = df.groupby('city')['score'].mean()

# 练习3
df = pd.read_csv('data.csv')
df.fillna(df.mean(numeric_only=True), inplace=True)
df.dropna(inplace=True)
df.to_csv('cleaned.csv', index=False)</code></pre></details></div>`
    },
    {
      num: 34,
      key: "s5c3",
      title: "Matplotlib 数据可视化",
      content: `<h1>Matplotlib 数据可视化</h1>
<p class="chapter-meta">第三十四章 · 人工智能</p>

<h2>折线图与散点图</h2>
<pre><code># 安装
pip install matplotlib

import matplotlib.pyplot as plt
import numpy as np

# 折线图
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))  # 设置画布大小
plt.plot(x, y, 'b-', linewidth=2, label='sin(x)')
plt.plot(x, np.cos(x), 'r--', linewidth=2, label='cos(x)')
plt.xlabel('x 轴')
plt.ylabel('y 轴')
plt.title('三角函数图像')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('plot.png', dpi=150)  # 保存图片
plt.show()

# 散点图
np.random.seed(42)
n = 100
plt.scatter(np.random.randn(n), np.random.randn(n),
            c=np.random.rand(n), s=np.random.rand(n)*200, alpha=0.6)
plt.colorbar()
plt.show()</code></pre>

<h2>柱状图与直方图</h2>
<pre><code># 柱状图
categories = ['A', 'B', 'C', 'D', 'E']
values = [25, 40, 30, 55, 35]

plt.bar(categories, values, color=['#6366f1', '#ef553b', '#00cc96', '#ab63fa', '#ffa15a'])
plt.xlabel('类别')
plt.ylabel('数值')
plt.title('各类别统计')
for i, v in enumerate(values):
    plt.text(i, v, str(v), ha='center', va='bottom')
plt.show()

# 水平柱状图
plt.barh(categories, values)
plt.show()

# 直方图
data = np.random.randn(10000)
plt.hist(data, bins=50, edgecolor='black', alpha=0.7)
plt.xlabel('值')
plt.ylabel('频数')
plt.title('正态分布直方图')
plt.show()</code></pre>

<h2>子图与饼图</h2>
<pre><code># 子图
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

axes[0, 0].plot([1,2,3], [1,4,9])
axes[0, 0].set_title('折线图')
axes[0, 1].bar(['A','B'], [3, 5])
axes[0, 1].set_title('柱状图')
axes[1, 0].scatter([1,2,3], [3,2,1])
axes[1, 0].set_title('散点图')
axes[1, 1].pie([30, 50, 20], labels=['A', 'B', 'C'])
axes[1, 1].set_title('饼图')

plt.tight_layout()
plt.show()

# 饼图
sizes = [15, 30, 45, 10]
labels = ['Python', 'Java', 'JavaScript', 'Go']
colors = ['#6366f1', '#ef553b', '#00cc96', '#ab63fa']
explode = [0.05, 0, 0, 0]

plt.pie(sizes, explode=explode, labels=labels, colors=colors,
        autopct='%1.1f%%', shadow=True, startangle=90)
plt.axis('equal')
plt.show()</code></pre>

<h3>配套练习</h3>
<ol>
<li>绘制 y=x² 和 y=x³ 的折线图</li>
<li>用柱状图展示 5 门课程的平均分</li>
<li>创建一个包含折线图和散点图的子图布局</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>import matplotlib.pyplot as plt
import numpy as np

# 练习1
x = np.linspace(-5, 5, 100)
plt.plot(x, x**2, label='y=x²')
plt.plot(x, x**3, label='y=x³')
plt.legend()
plt.grid(True)
plt.show()

# 练习2
courses = ['数学', '英语', '物理', '化学', '生物']
avgs = [85, 90, 78, 88, 82]
plt.bar(courses, avgs, color='#6366f1')
for i, v in enumerate(avgs):
    plt.text(i, v, str(v), ha='center', va='bottom')
plt.show()

# 练习3
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].plot(x, np.sin(x))
axes[0].set_title('折线图')
axes[1].scatter(np.random.randn(50), np.random.randn(50))
axes[1].set_title('散点图')
plt.show()</code></pre></details></div>`
    },
    {
      num: 35,
      key: "s5c4",
      title: "Scikit-learn 机器学习",
      content: `<h1>Scikit-learn 机器学习</h1>
<p class="chapter-meta">第三十五章 · 人工智能</p>

<h2>线性回归</h2>
<pre><code># 安装
pip install scikit-learn

from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# 准备数据
X = np.array([[1], [2], [3], [4], [5], [6]])
y = np.array([2, 4, 5, 4, 7, 8])

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 训练模型
model = LinearRegression()
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)

# 评估
print(f"系数: {model.coef_[0]:.2f}")
print(f"截距: {model.intercept_:.2f}")
print(f"R²: {r2_score(y_test, y_pred):.2f}")
print(f"均方误差: {mean_squared_error(y_test, y_pred):.2f}")

# 新数据预测
print(model.predict([[7]]))</code></pre>

<h2>逻辑回归与分类</h2>
<pre><code>from sklearn.datasets import load_iris
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# 加载数据
iris = load_iris()
X, y = iris.data, iris.target

# 划分数据集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# KNN 分类
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)
y_pred = knn.predict(X_test)
print(f"准确率: {accuracy_score(y_test, y_pred):.2%}")

# 随机森林
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
y_pred = rf.predict(X_test)
print(classification_report(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))

# 特征重要性
print(rf.feature_importances_)</code></pre>

<h2>数据预处理</h2>
<pre><code>from sklearn.preprocessing import StandardScaler, LabelEncoder, MinMaxScaler
from sklearn.impute import SimpleImputer

# 标准化（均值为0，方差为1）
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 归一化（缩放到0-1）
minmax = MinMaxScaler()
X_normalized = minmax.fit_transform(X)

# 标签编码
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# 填补缺失值
imputer = SimpleImputer(strategy='mean')
X_filled = imputer.fit_transform(X_with_nan)</code></pre>

<h2>模型选择与调优</h2>
<pre><code>from sklearn.model_selection import cross_val_score, GridSearchCV

# 交叉验证
scores = cross_val_score(knn, X, y, cv=5)
print(f"交叉验证: {scores.mean():.2%} ± {scores.std():.2%}")

# 网格搜索调参
param_grid = {
    'n_neighbors': [3, 5, 7, 9],
    'weights': ['uniform', 'distance']
}
grid = GridSearchCV(KNeighborsClassifier(), param_grid, cv=5, scoring='accuracy')
grid.fit(X_train, y_train)
print(f"最佳参数: {grid.best_params_}")
print(f"最佳准确率: {grid.best_score_:.2%}")</code></pre>

<h3>配套练习</h3>
<ol>
<li>用 LinearRegression 拟合 y = 2x + 1 + 噪声</li>
<li>用 KNN 对鸢尾花数据集进行分类，准确率是多少</li>
<li>用 GridSearchCV 找到 KNN 的最佳邻居数</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import GridSearchCV
import numpy as np

# 练习1
X = np.arange(100).reshape(-1, 1)
y = 2 * X.flatten() + 1 + np.random.randn(100) * 2
model = LinearRegression()
model.fit(X, y)
print(f"系数: {model.coef_[0]:.2f}, 截距: {model.intercept_:.2f}")

# 练习2
from sklearn.datasets import load_iris
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.3)
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train, y_train)
print(f"准确率: {knn.score(X_test, y_test):.2%}")

# 练习3
grid = GridSearchCV(KNeighborsClassifier(), {'n_neighbors': range(1, 20)}, cv=5)
grid.fit(X_train, y_train)
print(f"最佳K={grid.best_params_['n_neighbors']}")</code></pre></details></div>`
    },
    {
      num: 36,
      key: "s5c5",
      title: "TensorFlow 深度学习入门",
      content: `<h1>TensorFlow 深度学习入门</h1>
<p class="chapter-meta">第三十六章 · 人工智能</p>

<h2>安装与张量基础</h2>
<pre><code># 安装
pip install tensorflow

import tensorflow as tf
import numpy as np

# 创建张量
t1 = tf.constant([1, 2, 3])
t2 = tf.constant([[1, 2], [3, 4]])
t3 = tf.zeros((3, 4))
t4 = tf.ones((2, 2, 2))
t5 = tf.random.normal((3, 3))

# 张量属性
print(t2.shape)    # (2, 2)
print(t2.dtype)    # <dtype: 'int32'>
print(t2.numpy())  # 转为 NumPy 数组

# 张量运算
a = tf.constant([[1, 2], [3, 4]])
b = tf.constant([[5, 6], [7, 8]])
tf.matmul(a, b)    # 矩阵乘法
a + b              # 逐元素加法
tf.reduce_mean(a)  # 均值
tf.reduce_sum(a)   # 求和
tf.transpose(a)    # 转置</code></pre>

<h2>构建神经网络</h2>
<pre><code>import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

#  Sequential 模型
model = keras.Sequential([
    layers.Dense(64, activation='relu', input_shape=(784,)),
    layers.Dropout(0.3),
    layers.Dense(32, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(10, activation='softmax'),
])

# 编译
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# 查看模型结构
model.summary()

# 训练
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()
x_train = x_train.reshape(-1, 784).astype('float32') / 255
x_test = x_test.reshape(-1, 784).astype('float32') / 255

history = model.fit(x_train, y_train, epochs=10, batch_size=64,
                    validation_split=0.1)

# 评估
test_loss, test_acc = model.evaluate(x_test, y_test)
print(f"测试准确率: {test_acc:.2%}")

# 预测
predictions = model.predict(x_test[:5])</code></pre>

<h2>卷积神经网络 CNN</h2>
<pre><code># CNN 用于图像分类
cnn_model = keras.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax'),
])

cnn_model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

# 加载图像数据
(x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()
x_train = x_train.astype('float32') / 255
x_test = x_test.astype('float32') / 255

cnn_model.fit(x_train, y_train, epochs=10, batch_size=64,
              validation_split=0.1)</code></pre>

<h2>模型保存与加载</h2>
<pre><code># 保存模型
model.save('my_model.h5')

# 加载模型
loaded_model = keras.models.load_model('my_model.h5')

# 仅保存权重
model.save_weights('weights.h5')
model.load_weights('weights.h5')

# 保存为 TensorFlow SavedModel
model.save('saved_model/')</code></pre>

<h3>配套练习</h3>
<ol>
<li>用 Sequential 模型手写识别 MNIST 数据集，准确率能达到多少</li>
<li>修改网络层数和神经元数量，观察准确率变化</li>
<li>用 Dropout 防止过拟合</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>import tensorflow as tf
from tensorflow.keras import layers

# 练习1-3 完整代码
model = tf.keras.Sequential([
    layers.Flatten(input_shape=(28, 28)),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train = x_train.reshape(-1, 784).astype('float32') / 255
x_test = x_test.reshape(-1, 784).astype('float32') / 255

model.fit(x_train, y_train, epochs=5, batch_size=32, validation_split=0.1)
model.evaluate(x_test, y_test)</code></pre></details></div>`
    },
    {
      num: 37,
      key: "s5c6",
      title: "PyTorch 深度学习",
      content: `<h1>PyTorch 深度学习</h1>
<p class="chapter-meta">第三十七章 · 人工智能</p>

<h2>张量与自动求导</h2>
<pre><code># 安装
pip install torch torchvision

import torch

# 创建张量
x = torch.tensor([1.0, 2.0, 3.0], requires_grad=True)
a = torch.randn(3, 3)
b = torch.ones(3, 3)

# 自动求导
y = (x ** 2).sum()
y.backward()
print(x.grad)  # tensor([2., 4., 6.])

# 设备切换（GPU加速）
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
x_gpu = x.to(device)

# 张量运算
torch.matmul(a, b)
torch.mm(a, b)
a @ b
torch.sigmoid(x)
torch.relu(x)
torch.softmax(x, dim=0)</code></pre>

<h2>Dataset 与 DataLoader</h2>
<pre><code>from torch.utils.data import Dataset, DataLoader

# 自定义数据集
class CustomDataset(Dataset):
    def __init__(self, data, labels):
        self.data = data
        self.labels = labels

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        return self.data[idx], self.labels[idx]

# 创建数据集
dataset = CustomDataset(torch.randn(1000, 10), torch.randint(0, 2, (1000,)))
dataloader = DataLoader(dataset, batch_size=32, shuffle=True)

# 遍历数据
for batch_x, batch_y in dataloader:
    print(batch_x.shape)  # (32, 10)
    # 训练...
    break</code></pre>

<h2>定义与训练模型</h2>
<pre><code>import torch.nn as nn
import torch.optim as optim

class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 256)
        self.fc2 = nn.Linear(256, 128)
        self.fc3 = nn.Linear(128, 10)
        self.dropout = nn.Dropout(0.5)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = x.view(-1, 784)
        x = self.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        return x

# 实例化
model = Net()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 训练循环
epochs = 10
for epoch in range(epochs):
    model.train()
    for inputs, targets in train_loader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, targets)
        loss.backward()
        optimizer.step()

    # 验证
    model.eval()
    with torch.no_grad():
        for inputs, targets in val_loader:
            outputs = model(inputs)
            val_loss = criterion(outputs, targets)
    print(f"Epoch {epoch+1}, Loss: {loss.item():.4f}")</code></pre>

<h2>迁移学习</h2>
<pre><code>import torchvision.models as models
import torchvision.transforms as transforms
from torchvision import datasets

# 加载预训练模型
resnet = models.resnet18(pretrained=True)

# 修改最后一层
num_features = resnet.fc.in_features
resnet.fc = nn.Linear(num_features, 10)  # 改为10分类

# 冻结前面层的参数
for param in resnet.parameters():
    param.requires_grad = False
for param in resnet.fc.parameters():
    param.requires_grad = True

# 训练
optimizer = optim.Adam(resnet.fc.parameters(), lr=0.001)</code></pre>

<h3>配套练习</h3>
<ol>
<li>用 PyTorch 实现一个简单的手写数字识别</li>
<li>加载预训练的 ResNet 模型进行图像分类</li>
<li>用 DataLoader 加载自定义数据集</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>import torch
import torch.nn as nn
import torchvision
import torchvision.transforms as transforms

# 练习1
transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])
trainset = torchvision.datasets.MNIST('.', download=True, train=True, transform=transform)
trainloader = torch.utils.data.DataLoader(trainset, batch_size=32, shuffle=True)

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.fc1 = nn.Linear(28*28, 128)
        self.fc2 = nn.Linear(128, 10)
        self.relu = nn.ReLU()
    def forward(self, x):
        x = self.relu(self.fc1(self.flatten(x)))
        return self.fc2(x)

model = SimpleNet()
optimizer = torch.optim.Adam(model.parameters())
criterion = nn.CrossEntropyLoss()

for epoch in range(5):
    for images, labels in trainloader:
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()</code></pre></details></div>`
    },
    {
      num: 38,
      key: "s5c7",
      title: "NLP 自然语言处理",
      content: `<h1>NLP 自然语言处理</h1>
<p class="chapter-meta">第三十八章 · 人工智能</p>

<h2>文本预处理</h2>
<pre><code>import re
import jieba  # 中文分词
from collections import Counter

# 英文文本处理
def preprocess_en(text):
    text = text.lower()                                    # 转小写
    text = re.sub(r'[^a-z\s]', '', text)                   # 去标点
    words = text.split()                                   # 分词
    stop_words = {'the', 'a', 'an', 'is', 'are', 'in'}    # 停用词
    words = [w for w in words if w not in stop_words]      # 去停用词
    return words

# 中文分词
def preprocess_cn(text):
    words = jieba.lcut(text)
    stop_words = {'的', '了', '在', '是', '我'}
    return [w for w in words if w not in stop_words and len(w) > 1]

# 词频统计
text = "hello world hello python world hello"
words = preprocess_en(text)
counter = Counter(words)
print(counter.most_common(3))  # [('hello', 3), ('world', 2), ('python', 1)]</code></pre>

<h2>词向量与 TF-IDF</h2>
<pre><code>from sklearn.feature_extraction.text import TfidfVectorizer

# TF-IDF 向量化
corpus = [
    "我爱学习Python",
    "Python很有趣",
    "我喜欢自然语言处理",
    "自然语言处理很难",
]

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(corpus)
print(tfidf_matrix.toarray())
print(vectorizer.get_feature_names_out())

# 文本相似度
from sklearn.metrics.pairwise import cosine_similarity
sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix)
print(sim)  # 每对文本的余弦相似度</code></pre>

<h2>情感分析</h2>
<pre><code>from transformers import pipeline

# 使用预训练模型（推荐方式）
sentiment_analyzer = pipeline("sentiment-analysis")

result = sentiment_analyzer(["这个产品真好！", "太糟糕了，不推荐"])
for r in result:
    print(f"{r['label']}: {r['score']:.2%}")
# 正面: 99.23%
# 负面: 97.45%

# 文本生成
generator = pipeline("text-generation", model="gpt2")
outputs = generator("Python是一门", max_length=30, num_return_sequences=1)
print(outputs[0]['generated_text'])</code></pre>

<h2>文本分类</h2>
<pre><code>from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.pipeline import Pipeline

# 简易文本分类器
texts = [
    "这部电影太好看了", "剧情精彩", "演员演技在线",  # 正面
    "电影太烂了", "浪费时间", "剧情无聊",             # 负面
    "画面不错", "音乐很好", "特效震撼",               # 正面
    "节奏拖沓", "结局失望", "不推荐",                 # 负面
]
labels = [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0]

# 构建管道
pipeline = Pipeline([
    ('vec', CountVectorizer()),
    ('clf', MultinomialNB()),
])

pipeline.fit(texts, labels)

# 预测
print(pipeline.predict(["这个电影真好看"]))  # [1]
print(pipeline.predict(["太无聊了"]))         # [0]</code></pre>

<h3>配套练习</h3>
<ol>
<li>对一段中文文本进行分词并统计词频</li>
<li>用 TF-IDF 计算两篇文档的相似度</li>
<li>实现一个简单的文本情感分类器</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>import jieba
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.naive_bayes import MultinomialNB

# 练习1
text = "我爱Python，Python是一门很好的编程语言"
words = jieba.lcut(text)
from collections import Counter
print(Counter(words))

# 练习2
docs = ["这是一篇关于Python的文章", "Python是一种编程语言"]
vec = TfidfVectorizer()
tfidf = vec.fit_transform(docs)
print(cosine_similarity(tfidf[0:1], tfidf[1:2]))

# 练习3
texts = ["喜欢", "好评", "推荐", "讨厌", "差评", "不推荐"]
labels = [1, 1, 1, 0, 0, 0]
clf = MultinomialNB()
clf.fit(texts, labels)
print(clf.predict(["很好"]))  # [1]</code></pre></details></div>`
    }
  ]
});