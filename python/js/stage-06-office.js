// Stage 6: 办公自动化
stages.push({
  name: "阶段六：办公自动化（选学）",
  chapters: [
    {
      num: 39,
      key: "s6c1",
      title: "Excel 创建与写入",
      content: `<h1>Excel 创建与写入（openpyxl）</h1>
<p class="chapter-meta">第三十九章 · 办公自动化</p>

<h2>创建工作簿</h2>
<pre><code># 安装
pip install openpyxl

from openpyxl import Workbook

wb = Workbook()
ws = wb.active
ws.title = "销售报表"

# 写入表头
headers = ["月份", "产品A", "产品B", "产品C", "总计"]
ws.append(headers)

# 写入数据
data = [
    ["1月", 12000, 8500, 15000, ""],
    ["2月", 11000, 9200, 14000, ""],
    ["3月", 13500, 7800, 16000, ""],
]
for row in data:
    ws.append(row)

# 写入公式
for row in range(2, 5):
    ws[f"E{row}"] = f"=SUM(B{row}:D{row})"

# 保存
wb.save("sales_report.xlsx")</code></pre>

<h2>单元格样式</h2>
<pre><code>from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

# 定义样式
header_font = Font(bold=True, size=12, color="FFFFFF")
header_fill = PatternFill(start_color="4472C4", fill_type="solid")
header_align = Alignment(horizontal="center", vertical="center")

data_font = Font(size=11)
money_format = '#,##0'
thin_border = Border(
    left=Side(style="thin"),
    right=Side(style="thin"),
    top=Side(style="thin"),
    bottom=Side(style="thin"),
)

# 应用表头样式
for cell in ws[1]:
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = header_align
    cell.border = thin_border

# 应用数据样式
for row in ws.iter_rows(min_row=2, max_col=5):
    for cell in row:
        cell.font = data_font
        cell.border = thin_border
        cell.alignment = Alignment(horizontal="center")
        if cell.column_letter in ["B", "C", "D", "E"]:
            cell.number_format = money_format

# 调整列宽
ws.column_dimensions["A"].width = 10
ws.column_dimensions["B"].width = 14
ws.column_dimensions["C"].width = 14
ws.column_dimensions["D"].width = 14
ws.column_dimensions["E"].width = 14

wb.save("styled_report.xlsx")</code></pre>

<h2>多工作表</h2>
<pre><code>wb = Workbook()

# 创建多个 sheet
ws1 = wb.active
ws1.title = "Q1"
ws1.append(["1月", 10000])
ws1.append(["2月", 12000])
ws1.append(["3月", 11000])

ws2 = wb.create_sheet("Q2")
ws2.append(["4月", 13000])
ws2.append(["5月", 14000])
ws2.append(["6月", 12500])

ws3 = wb.create_sheet("汇总", 0)  # 放在最前面
ws3.append(["季度", "销售额"])
ws3.append(["Q1", "=Q1!B1+Q1!B2+Q1!B3"])
ws3.append(["Q2", "=Q2!B1+Q2!B2+Q2!B3"])

wb.save("quarterly_report.xlsx")</code></pre>

<h3>配套练习</h3>
<ol>
<li>创建一个员工薪资表，包含姓名、部门、基本工资、奖金、总计</li>
<li>给表格添加边框、颜色、居中对齐样式</li>
<li>创建多个工作表并用公式跨表引用</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Border, Side

wb = Workbook()
ws = wb.active
ws.title = "员工薪资"

headers = ["姓名", "部门", "基本工资", "奖金", "总计"]
ws.append(headers)

employees = [
    ["小明", "技术部", 15000, 3000, ""],
    ["小红", "市场部", 12000, 2500, ""],
    ["小刚", "人事部", 11000, 2000, ""],
]
for emp in employees:
    ws.append(emp)

# 总计公式
for row in range(2, 5):
    ws[f"E{row}"] = f"=C{row}+D{row}"

# 样式
header_fill = PatternFill(start_color="4472C4", fill_type="solid")
header_font = Font(bold=True, color="FFFFFF")
border = Border(left=Side(style="thin"), right=Side(style="thin"),
                top=Side(style="thin"), bottom=Side(style="thin"))
for cell in ws[1]:
    cell.fill = header_fill
    cell.font = header_font
    cell.border = border
    cell.alignment = Alignment(horizontal="center")

wb.save("salary.xlsx")</code></pre></details></div>`
    },
    {
      num: 40,
      key: "s6c2",
      title: "Excel 读取与分析",
      content: `<h1>Excel 读取与分析</h1>
<p class="chapter-meta">第四十章 · 办公自动化</p>

<h2>读取 Excel</h2>
<pre><code>from openpyxl import load_workbook

wb = load_workbook("sales_report.xlsx")
print(wb.sheetnames)  # 查看所有工作表名

ws = wb["销售报表"]

# 遍历所有单元格
for row in ws.iter_rows(min_row=1, values_only=True):
    print(row)

# 按单元格访问
for row in ws.iter_rows(min_row=2):
    month = row[0].value
    sales = row[1].value
    if sales > 10000:
        print(f"{month}: ¥{sales:,}")

# 读取指定范围
for row in ws["B2:D10"]:
    for cell in row:
        print(cell.value, end=" ")
    print()

# 读取公式结果
print(ws["E2"].value)  # 如果已计算过，显示公式结果</code></pre>

<h2>数据分析</h2>
<pre><code>from openpyxl import load_workbook
from collections import defaultdict

wb = load_workbook("sales_data.xlsx")
ws = wb.active

# 统计各部门总销售额
dept_sales = defaultdict(float)
for row in ws.iter_rows(min_row=2, values_only=True):
    dept, sale = row[0], row[2]
    dept_sales[dept] += sale

for dept, total in sorted(dept_sales.items(), key=lambda x: x[1], reverse=True):
    print(f"{dept}: ¥{total:,.0f}")

# 找出最高销售额
max_sale = 0
max_month = ""
for row in ws.iter_rows(min_row=2, values_only=True):
    if row[1] > max_sale:
        max_sale = row[1]
        max_month = row[0]
print(f"最高销售额: {max_month} ¥{max_sale:,}")</code></pre>

<h2>条件格式与图表</h2>
<pre><code>from openpyxl.chart import BarChart, PieChart, Reference
from openpyxl.formatting.rule import CellIsRule

# 条件格式 - 高亮低销量
low_rule = CellIsRule(operator='lessThan', formula=['5000'],
                      fill=PatternFill(start_color="FFC7CE", fill_type="solid"))
ws.conditional_formatting.add('B2:B13', low_rule)

# 添加柱状图
chart = BarChart()
chart.title = "月度销售对比"
chart.y_axis.title = "销售额"
chart.x_axis.title = "月份"

data = Reference(ws, min_col=2, min_row=1, max_row=13)
cats = Reference(ws, min_col=1, min_row=2, max_row=13)
chart.add_data(data, titles_from_data=True)
chart.set_categories(cats)
chart.style = 10
chart.height = 20
chart.width = 40
ws.add_chart(chart, "F2")

# 添加饼图
pie = PieChart()
pie.title = "产品占比"
labels = Reference(ws, min_col=4, min_row=1, max_row=4)
data_pie = Reference(ws, min_col=4, min_row=2, max_row=4)
pie.add_data(data_pie)
pie.set_categories(labels)
ws.add_chart(pie, "H2")

wb.save("report_with_charts.xlsx")</code></pre>

<h3>配套练习</h3>
<ol>
<li>读取一个销售数据 Excel，统计每个产品的总销售额</li>
<li>用条件格式高亮低于平均值的单元格</li>
<li>添加一个柱状图展示月度趋势</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>from openpyxl import load_workbook
from collections import defaultdict

# 练习1
wb = load_workbook("sales.xlsx")
ws = wb.active
product_sales = defaultdict(float)
for row in ws.iter_rows(min_row=2, values_only=True):
    product_sales[row[1]] += row[2]
for p, s in sorted(product_sales.items()):
    print(f"{p}: ¥{s:,.0f}")

# 练习2
from openpyxl.formatting.rule import CellIsRule
avg = sum(product_sales.values()) / len(product_sales)
ws.conditional_formatting.add('C2:C13',
    CellIsRule(operator='lessThan', formula=[str(avg)],
               fill=PatternFill(start_color="FFC7CE", fill_type="solid")))

# 练习3
from openpyxl.chart import BarChart, Reference
chart = BarChart()
data = Reference(ws, min_col=3, min_row=1, max_row=13)
chart.add_data(data, titles_from_data=True)
ws.add_chart(chart, "E2")
wb.save("with_chart.xlsx")</code></pre></details></div>`
    },
    {
      num: 41,
      key: "s6c3",
      title: "Word 文档操作",
      content: `<h1>Word 文档操作（python-docx）</h1>
<p class="chapter-meta">第四十一章 · 办公自动化</p>

<h2>创建文档</h2>
<pre><code># 安装
pip install python-docx

from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

doc = Document()

# 添加标题
doc.add_heading('2025年度工作报告', level=0)
doc.add_paragraph('报告人：小明', style='Intense Quote')

# 添加正文段落
doc.add_heading('一、工作概述', level=1)
doc.add_paragraph(
    '本年度在领导的正确指引下，团队全体成员共同努力，'
    '圆满完成了各项指标。全年实现销售额XXX万元，同比增长XX%。'
)

# 带格式的文本
p = doc.add_paragraph()
run1 = p.add_run('重点成果：')
run1.bold = True
run1.font.color.rgb = RGBColor(0, 0x80, 0)
p.add_run('项目A按时交付，客户满意度达到98%。')

p2 = doc.add_paragraph()
run2 = p2.add_run('存在问题：')
run2.bold = True
run2.font.color.rgb = RGBColor(255, 0, 0)
p2.add_run('部分项目进度滞后，需加强项目管理。')</code></pre>

<h2>列表与表格</h2>
<pre><code># 无序列表
doc.add_heading('二、主要工作', level=1)
bullets = ['完成市场调研报告', '上线新版APP', '拓展3个新渠道']
for b in bullets:
    doc.add_paragraph(b, style='List Bullet')

# 有序列表
ordered = ['第一季度：完成规划', '第二季度：开始实施', '第三季度：中期评估', '第四季度：总结验收']
for i, item in enumerate(ordered, 1):
    doc.add_paragraph(item, style='List Number')

# 添加表格
doc.add_heading('三、业绩数据', level=1)
table = doc.add_table(rows=1, cols=4)
table.style = 'Light Shading Accent 1'

# 表头
hdr_cells = table.rows[0].cells
for name, val in zip(['月份', '销售额', '利润', '增长率'],
                      ['1月', '120万', '30万', '5%']):
    hdr_cells[0].text = '月份'
    hdr_cells[1].text = '销售额'
    hdr_cells[2].text = '利润'
    hdr_cells[3].text = '增长率'
    break

# 数据行
data = [
    ('1月', '120万', '30万', '5%'),
    ('2月', '115万', '28万', '3%'),
    ('3月', '130万', '35万', '8%'),
]
for month, sales, profit, rate in data:
    row_cells = table.add_row().cells
    row_cells[0].text = month
    row_cells[1].text = sales
    row_cells[2].text = profit
    row_cells[3].text = rate

# 添加图片
doc.add_picture('chart.png', width=Inches(5.0))

doc.save('work_report.docx')</code></pre>

<h2>读取 Word</h2>
<pre><code>from docx import Document

doc = Document('existing.docx')
for para in doc.paragraphs:
    print(para.style.name, ':', para.text)

# 读取表格
for table in doc.tables:
    for row in table.rows:
        for cell in row.cells:
            print(cell.text, end='\t')
        print()

# 读取带格式的文本
for para in doc.paragraphs:
    for run in para.runs:
        print(f"'{run.text}' bold={run.bold}, size={run.font.size}")</code></pre>

<h3>配套练习</h3>
<ol>
<li>生成一份包含标题、段落、列表、表格的报告文档</li>
<li>读取一个 Word 文档，提取所有表格内容</li>
<li>批量将多个模板文档填入数据生成个性化报告</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>from docx import Document
from docx.shared import Pt

# 练习1
doc = Document()
doc.add_heading('项目总结', level=0)
doc.add_paragraph('本项目历时三个月，取得以下成果：')
doc.add_paragraph('完成核心功能开发', style='List Bullet')
doc.add_paragraph('通过全部测试用例', style='List Bullet')

table = doc.add_table(rows=1, cols=3)
hdr = table.rows[0].cells
hdr[0].text = '指标'
hdr[1].text = '目标'
hdr[2].text = '实际'
for row_data in [('完成率', '95%', '98%'), ('满意度', '4.5', '4.7')]:
    cells = table.add_row().cells
    cells[0].text = row_data[0]
    cells[1].text = row_data[1]
    cells[2].text = row_data[2]

doc.save('summary.docx')

# 练习2
doc = Document('template.docx')
for table in doc.tables:
    for row in table.rows:
        print([cell.text for cell in row.cells])</code></pre></details></div>`
    },
    {
      num: 42,
      key: "s6c4",
      title: "邮件自动化",
      content: `<h1>邮件自动化（SMTP）</h1>
<p class="chapter-meta">第四十二章 · 办公自动化</p>

<h2>发送普通邮件</h2>
<pre><code># 安装
pip install python-dotenv  # 推荐用环境变量存密码

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header

# 发件人信息
smtp_server = "smtp.qq.com"  # QQ邮箱: smtp.qq.com, 163: smtp.163.com
smtp_port = 465
sender = "your_email@qq.com"
password = "your_auth_code"  # 授权码，非密码

# 创建邮件
msg = MIMEMultipart()
msg['From'] = Header("小明", 'utf-8')
msg['To'] = Header("收件人", 'utf-8')
msg['Subject'] = Header("周报 - 2025年第28周", 'utf-8')

# 邮件正文（HTML）
html_content = """
&lt;html&gt;
  &lt;body&gt;
    &lt;h2 style="color:#4472C4"&gt;本周工作总结&lt;/h2&gt;
    &lt;ul&gt;
      &lt;li&gt;完成需求评审&lt;/li&gt;
      &lt;li&gt;修复3个Bug&lt;/li&gt;
      &lt;li&gt;编写测试用例&lt;/li&gt;
    &lt;/ul&gt;
    &lt;p&gt;&lt;font color="gray"&gt;此邮件由系统自动发送&lt;/font&gt;&lt;/p&gt;
  &lt;/body&gt
&lt;/html&gt;
"""
msg.attach(MIMEText(html_content, 'html', 'utf-8'))

# 发送
with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
    server.login(sender, password)
    server.send_message(msg)
print("邮件发送成功！")</code></pre>

<h2>带附件</h2>
<pre><code>from email.mime.base import MIMEBase
from email import encoders

msg = MIMEMultipart()
msg['Subject'] = '月度报表'
msg.attach(MIMEText('详见附件', 'plain', 'utf-8'))

# 添加附件
attachment = open('report.xlsx', 'rb')
part = MIMEBase('application', 'octet-stream')
part.set_payload(attachment.read())
encoders.encode_base64(part)
part.add_header('Content-Disposition', 'attachment', filename='report.xlsx')
msg.attach(part)
attachment.close()

# 群发
recipients = ["a@example.com", "b@example.com", "c@example.com"]
msg['To'] = ', '.join(recipients)

with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
    server.login(sender, password)
    server.sendmail(sender, recipients, msg.as_string())
print(f"已发送给 {len(recipients)} 人")</code></pre>

<h2>定时发送</h2>
<pre><code>import schedule
import time
from datetime import datetime

def send_weekly_report():
    # 构建邮件逻辑...
    print(f"发送周报: {datetime.now()}")

# 每周五下午5点发送
schedule.every().friday.at("17:00").do(send_weekly_report)

# 每月1号早上9点发送月报
schedule.every().month.at("09:00").do(send_monthly_report)

while True:
    schedule.run_pending()
    time.sleep(60)</code></pre>

<h3>配套练习</h3>
<ol>
<li>配置 SMTP 发送一封带 HTML 正文的邮件</li>
<li>添加附件（Excel 报表）并群发给团队成员</li>
<li>实现每天定时发送天气提醒邮件</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

msg = MIMEMultipart()
msg['From'] = 'sender@qq.com'
msg['To'] = 'recipient@example.com'
msg['Subject'] = '测试邮件'

html = "&lt;h3&gt;你好！&lt;/h3&gt;&lt;p&gt;这是一封测试邮件&lt;/p&gt;"
msg.attach(MIMEText(html, 'html', 'utf-8'))

with smtplib.SMTP_SSL('smtp.qq.com', 465) as server:
    server.login('sender@qq.com', 'auth_code')
    server.send_message(msg)
print("发送成功！")</code></pre></details></div>`
    },
    {
      num: 43,
      key: "s6c5",
      title: "PDF 操作",
      content: `<h1>PDF 文件操作</h1>
<p class="chapter-meta">第四十三章 · 办公自动化</p>

<h2>读取 PDF</h2>
<pre><code># 安装
pip install pypdf

from pypdf import PdfReader

reader = PdfReader("document.pdf")
print(f"共 {len(reader.pages)} 页")

# 逐页读取文本
for i, page in enumerate(reader.pages):
    text = page.extract_text()
    print(f"--- 第{i+1}页 ---")
    print(text[:500])  # 每页只显示前500字

# 提取特定区域
page = reader.pages[0]
text = page.extract_text()
lines = text.split('\\n')
for line in lines:
    if '金额' in line or '合计' in line:
        print(line)</code></pre>

<h2>创建 PDF</h2>
<pre><code># 安装
pip install fpdf

from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Helvetica', 'B', 12)
        self.cell(0, 10, '月度报告', align='C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.cell(0, 10, f'第 {self.page_no()}/{{nb}} 页', align='C')

pdf = PDF()
pdf.alias_nb_pages()
pdf.set_auto_page_break(auto=True, margin=20)

pdf.add_page()
pdf.set_font('Arial', 'B', 16)
pdf.cell(0, 10, '2025年7月销售报告', ln=True, align='C')
pdf.ln(10)

pdf.set_font('Arial', '', 12)
pdf.cell(0, 8, '一、总体概况', ln=True)
pdf.multi_cell(0, 8, '本月销售额达120万元，较上月增长15%。主要增长来自华东和华南地区。')
pdf.ln(5)

pdf.cell(0, 8, '二、各区域明细', ln=True)
pdf.set_font('Arial', 'B', 11)
pdf.cell(30, 8, '区域')
pdf.cell(30, 8, '销售额')
pdf.cell(0, 8, '增长率')
pdf.ln()
pdf.set_font('Arial', '', 11)
for region, sales, growth in [('华东', '45万', '+20%'), ('华南', '35万', '+12%'), ('华北', '25万', '+8%'), ('西南', '15万', '+25%')]:
    pdf.cell(30, 8, region)
    pdf.cell(30, 8, sales)
    pdf.cell(0, 8, growth)
    pdf.ln()

pdf.output('report.pdf')</code></pre>

<h2>合并与拆分 PDF</h2>
<pre><code>from pypdf import PdfWriter, PdfReader

# 合并
writer = PdfWriter()
for pdf_file in ['doc1.pdf', 'doc2.pdf', 'doc3.pdf']:
    reader = PdfReader(pdf_file)
    for page in reader.pages:
        writer.add_page(page)

with open('merged.pdf', 'wb') as output:
    writer.write(output)

# 拆分
reader = PdfReader('document.pdf')
for i, page in enumerate(reader.pages):
    writer = PdfWriter()
    writer.add_page(page)
    with open(f'page_{i+1}.pdf', 'wb') as output:
        writer.write(output)

# 提取指定页
writer = PdfWriter()
reader = PdfReader('document.pdf')
for page_num in [0, 2, 5]:  # 提取第1、3、6页
    writer.add_page(reader.pages[page_num])
with open('selected.pdf', 'wb') as output:
    writer.write(output)</code></pre>

<h3>配套练习</h3>
<ol>
<li>读取一个 PDF 文件，提取所有包含关键词的段落</li>
<li>用 fpdf 生成一份带表格格式的月度报告</li>
<li>合并多个 PDF 文件为一个</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>from pypdf import PdfReader

# 练习1
reader = PdfReader('document.pdf')
keyword = '销售额'
for i, page in enumerate(reader.pages):
    text = page.extract_text()
    for line in text.split('\\n'):
        if keyword in line:
            print(f"第{i+1}页: {line.strip()}")

# 练习2 - 用 fpdf 生成报告
from fpdf import FPDF
pdf = FPDF()
pdf.add_page()
pdf.set_font('Arial', 'B', 14)
pdf.cell(0, 10, '月度报告', ln=True, align='C')
pdf.set_font('Arial', '', 12)
pdf.multi_cell(0, 8, '本月销售额120万，增长15%...')
pdf.output('monthly.pdf')

# 练习3
from pypdf import PdfWriter
writer = PdfWriter()
for f in ['a.pdf', 'b.pdf', 'c.pdf']:
    for page in PdfReader(f).pages:
        writer.add_page(page)
with open('combined.pdf', 'wb') as out:
    writer.write(out)</code></pre></details></div>`
    },
    {
      num: 44,
      key: "s6c6",
      title: "文件批量处理",
      content: `<h1>文件批量处理</h1>
<p class="chapter-meta">第四十四章 · 办公自动化</p>

<h2>批量重命名</h2>
<pre><code>from pathlib import Path

# 批量重命名照片
photos = Path("photos/")
for f in photos.glob("DSC_*.jpg"):
    new_name = f.name.replace("DSC_", "IMG_")
    f.rename(f.with_name(new_name))

# 按序号重命名
for i, f in enumerate(photos.glob("*.jpg"), 1):
    f.rename(f.with_name(f"{i:03d}.jpg"))

# 批量修改后缀
for f in Path(".").glob("*.TXT"):
    f.rename(f.with_suffix(".txt"))</code></pre>

<h2>批量文件分类</h2>
<pre><code>from pathlib import Path
import shutil

src_dir = Path("Downloads/")
dest_dir = Path("Organized/")

categories = {
    '.jpg': 'images', '.jpeg': 'images', '.png': 'images', '.gif': 'images',
    '.pdf': 'documents', '.doc': 'documents', '.docx': 'documents', '.txt': 'documents',
    '.xls': 'spreadsheets', '.xlsx': 'spreadsheets',
    '.mp3': 'audio', '.mp4': 'video', '.avi': 'video',
}

for f in src_dir.iterdir():
    if f.is_file():
        ext = f.suffix.lower()
        folder_name = categories.get(ext, 'other')
        dest_folder = dest_dir / folder_name
        dest_folder.mkdir(exist_ok=True)
        shutil.move(str(f), str(dest_folder / f.name))
        print(f"移动: {f.name} -> {folder_name}/")</code></pre>

<h2>批量文本处理</h2>
<pre><code>from pathlib import Path

# 批量替换文件内容
for txt_file in Path("reports/").glob("*.txt"):
    content = txt_file.read_text(encoding="utf-8")
    content = content.replace("旧公司名", "新公司名")
    content = content.replace("2024", "2025")
    txt_file.write_text(content, encoding="utf-8")

# 批量统计字数
total = 0
for doc in Path("documents/").glob("*.txt"):
    words = len(doc.read_text(encoding="utf-8").split())
    print(f"{doc.name}: {words} 字")
    total += words
print(f"总计: {total} 字")

# 批量生成文件
for i in range(1, 11):
    content = f"""
    通知

    各位同事：

    请于 {i}月15日 前提交本月工作报告。

    行政部
    """
    Path(f"通知_{i}月.txt").write_text(content.strip(), encoding="utf-8")
    print(f"已生成: 通知_{i}月.txt")</code></pre>

<h2>批量压缩与解压</h2>
<pre><code>import zipfile
import tarfile

# 批量压缩
with zipfile.ZipFile('backup.zip', 'w', zipfile.ZIP_DEFLATED) as zf:
    for f in Path("important_files/").glob("*"):
        if f.is_file():
            zf.write(f)
            print(f"已添加: {f.name}")

# 解压
with zipfile.ZipFile('backup.zip', 'r') as zf:
    zf.extractall('extracted/')

# 批量查找大文件
for f in Path(".").rglob("*"):
    if f.is_file() and f.stat().st_size > 100_000_000:  # 100MB
        print(f"{f} - {f.stat().st_size / 1024 / 1024:.1f} MB")</code></pre>

<h3>配套练习</h3>
<ol>
<li>批量重命名一个文件夹中的所有图片（按序号）</li>
<li>将下载文件夹按类型自动分类到不同子文件夹</li>
<li>批量在 100 个文件中替换某个关键词</li>
</ol>

<div class="answer-box"><details><summary>点击查看练习答案</summary><pre><code>from pathlib import Path

# 练习1
for i, f in enumerate(Path("photos/").glob("*.jpg"), 1):
    f.rename(f.with_name(f"{i:03d}.jpg"))

# 练习2
import shutil
for f in Path("downloads/").iterdir():
    if f.is_file():
        ext = f.suffix.lower()
        if ext in ['.jpg', '.png', '.gif']:
            folder = 'images'
        elif ext in ['.pdf', '.docx']:
            folder = 'documents'
        else:
            folder = 'other'
        Path(folder).mkdir(exist_ok=True)
        shutil.move(str(f), f'{folder}/{f.name}')

# 练习3
for txt in Path("files/").glob("*.txt"):
    content = txt.read_text(encoding="utf-8")
    txt.write_text(content.replace("旧值", "新值"), encoding="utf-8")</code></pre></details></div>`
    }
  ]
});