// ===== Progress Management =====
const STORAGE_KEY = 'python_tutorial_progress';

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch(e) { return {}; }
}

function saveProgress(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
}

function toggleChapter(key) {
  progress[key] = !progress[key];
  saveProgress(progress);
  renderSidebar();
  updateProgress();
  if (curStage !== null && curChapter !== null) {
    renderContent();
  }
}

function resetAll() {
  if (confirm('确定要重置所有学习进度吗？')) {
    progress = {};
    saveProgress(progress);
    curStage = null;
    curChapter = null;
    renderSidebar();
    updateProgress();
    showWelcome();
  }
}

// ===== Sidebar Rendering =====
function renderSidebar() {
  const list = document.getElementById('stageList');
  list.innerHTML = '';

  stages.forEach((stage, si) => {
    const group = document.createElement('div');
    group.className = 'stage-group';

    const doneCount = stage.chapters.filter(ch => progress[ch.key]).length;

    // Stage toggle
    const toggle = document.createElement('div');
    toggle.className = 'stage-toggle';
    const isOpen = si === curStage;
    toggle.innerHTML = `<span class="arrow ${isOpen ? 'open' : ''}">&#9654;</span>${stage.name}<span class="stage-badge">${doneCount}/${stage.chapters.length}</span>`;
    toggle.onclick = () => {
      if (isOpen) {
        curStage = null;
        curChapter = null;
      } else {
        curStage = si;
        curChapter = null;
      }
      renderSidebar();
      if (!isOpen) {
        renderContent();
      } else {
        showWelcome();
      }
    };
    group.appendChild(toggle);

    // Chapters
    const items = document.createElement('div');
    items.className = 'stage-items' + (si !== curStage ? ' collapsed' : '');
    items.style.maxHeight = si === curStage ? (stage.chapters.length * 36) + 'px' : '0';

    stage.chapters.forEach((ch, ci) => {
      const row = document.createElement('div');
      row.className = 'chapter-row' + (si === curStage && ci === curChapter ? ' active' : '');
      row.title = ch.title;
      row.innerHTML = `<span class="ch-num">${ch.num}</span><span class="ch-title">${ch.title}</span><span class="ch-check ${progress[ch.key] ? 'done' : ''}">${progress[ch.key] ? '&#10003;' : ''}</span>`;
      row.onclick = (e) => {
        if (e.target.closest('.ch-check')) {
          toggleChapter(ch.key);
        } else {
          curStage = si;
          curChapter = ci;
          renderSidebar();
          renderContent();
        }
      };
      items.appendChild(row);
    });

    group.appendChild(items);
    list.appendChild(group);
  });
}

// ===== Progress Bar =====
function updateProgress() {
  let total = 0, done = 0;
  stages.forEach(s => s.chapters.forEach(ch => { total++; if (progress[ch.key]) done++; }));
  const pct = total ? (done / total * 100) : 0;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressPct').textContent = Math.round(pct) + '%';
  document.getElementById('progressText').textContent = `${done} / ${total}`;
}

// ===== Welcome Screen =====
function showWelcome() {
  let totalChapters = 0;
  stages.forEach(s => totalChapters += s.chapters.length);
  let doneChapters = Object.values(progress).filter(Boolean).length;
  let remaining = totalChapters - doneChapters;

  document.getElementById('mainArea').innerHTML = `
    <div class="welcome-screen">
      <div class="icon">&#128218;</div>
      <h2>Python 学习路线图</h2>
      <p>从零基础到实战框架，系统化掌握 Python 编程。<br>点击左侧章节开始学习，每章都有详细代码示例和练习。</p>
      <div class="stats">
        <div class="stat-card">
          <div class="num">${totalChapters}</div>
          <div class="label">总章节</div>
        </div>
        <div class="stat-card">
          <div class="num" style="color:#3fb950;">${doneChapters}</div>
          <div class="label">已完成</div>
        </div>
        <div class="stat-card">
          <div class="num" style="color:#f0883e;">${remaining}</div>
          <div class="label">剩余</div>
        </div>
      </div>
    </div>`;
}

// ===== Navigation =====
function navigate(dir) {
  const stage = stages[curStage];
  if (dir === 'prev') {
    if (curChapter > 0) {
      curChapter--;
    } else if (curStage > 0) {
      curStage--;
      curChapter = stages[curStage].chapters.length - 1;
    }
  } else if (dir === 'next') {
    if (curChapter < stage.chapters.length - 1) {
      curChapter++;
    } else if (curStage < stages.length - 1) {
      curStage++;
      curChapter = 0;
    }
  }
  renderSidebar();
  renderContent();
}

// ===== Render Content =====
function renderContent() {
  if (curStage === null || curChapter === null) {
    showWelcome();
    return;
  }
  const stage = stages[curStage];
  const ch = stage.chapters[curChapter];
  const totalChapters = stages.reduce((s, st) => s + st.chapters.length, 0);
  const isDone = !!progress[ch.key];

  // Prev/Next buttons
  let prevLabel = 'hidden', nextLabel = 'hidden';
  if (curStage > 0 || curChapter > 0) prevLabel = 'nav-btn';
  if (curChapter < stage.chapters.length - 1) nextLabel = 'nav-btn primary';
  else if (curStage < stages.length - 1) nextLabel = 'nav-btn primary';

  // Next chapter title for button
  let nextTitle = '';
  if (curChapter < stage.chapters.length - 1) {
    nextTitle = stage.chapters[curChapter + 1].title;
  } else if (curStage < stages.length - 1) {
    nextTitle = stages[curStage + 1].chapters[0].title;
  }
  let prevTitle = '';
  if (curChapter > 0) {
    prevTitle = stage.chapters[curChapter - 1].title;
  } else if (curStage > 0) {
    prevTitle = stages[curStage - 1].chapters[stages[curStage - 1].chapters.length - 1].title;
  }

  document.getElementById('mainArea').innerHTML = `
    <div class="content-area">
      ${ch.content}
      <button class="complete-btn ${isDone ? 'done' : 'pending'}" onclick="toggleChapter('${ch.key}'); renderSidebar(); renderContent();">
        ${isDone ? '&#10003; 已完成 - 点击取消' : '&#9744; 标记为已完成'}
      </button>
      <div class="nav-buttons">
        <button class="${prevLabel}" onclick="navigate('prev')" title="${prevTitle}">← 上一章</button>
        <button class="hidden"></button>
        <button class="${nextLabel}" onclick="navigate('next')" title="${nextTitle}">下一章 →</button>
      </div>
    </div>`;
}

// ===== Init =====
let progress = loadProgress();
let curStage = null;
let curChapter = null;

renderSidebar();
updateProgress();
showWelcome();
