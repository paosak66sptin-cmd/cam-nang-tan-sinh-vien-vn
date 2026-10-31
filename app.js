/* MÃ NGUỒN XỬ LÝ CHỨC NĂNG (JS THUẦN & LOCALSTORAGE) */

const STORAGE_CHECKLIST = 'vibe_freshman_checklist_v2';
const STORAGE_BUDGET = 'vibe_freshman_budget_v2';
const STORAGE_TASKS = 'vibe_freshman_tasks_v2';

/* ==========================================================================
   1. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    
    let bgClass = 'bg-slate-900 border-slate-700 text-white';
    let icon = 'fa-circle-info text-sky-400';
    
    if (type === 'success') {
        bgClass = 'bg-emerald-950 border-emerald-800 text-emerald-100';
        icon = 'fa-circle-check text-emerald-400';
    } else if (type === 'warning') {
        bgClass = 'bg-amber-950 border-amber-800 text-amber-100';
        icon = 'fa-triangle-exclamation text-amber-400';
    } else if (type === 'error') {
        bgClass = 'bg-rose-950 border-rose-800 text-rose-100';
        icon = 'fa-circle-xmark text-rose-400';
    }

    toast.className = `pointer-events-auto border p-3.5 rounded-xl shadow-xl flex items-center justify-between gap-3 text-xs transition-all duration-300 transform translate-y-2 opacity-0 ${bgClass}`;
    toast.innerHTML = `
        <div class="flex items-center gap-2.5">
            <i class="fa-solid ${icon} text-base"></i>
            <span>${message}</span>
        </div>
        <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/* ==========================================================================
   2. SCHOOL SELECTOR LOGIC
   ========================================================================== */
function handleUniversityChange(schoolKey) {
    const bannerTitle = document.getElementById('current-scope-title');
    const bannerDesc = document.getElementById('current-scope-desc');
    
    const data = SCHOOLS_DATA[schoolKey] || SCHOOLS_DATA['all'];
    if (bannerTitle) bannerTitle.textContent = data.title;
    if (bannerDesc) bannerDesc.textContent = data.desc;
    
    showToast(`Đã chuyển phạm vi tra cứu: ${data.title}`, 'info');
}

/* ==========================================================================
   3. TOOL #1: CHECKLIST LOGIC
   ========================================================================== */
let checklistData = [];
let activeChecklistFilter = 'all';

function loadChecklist() {
    const saved = localStorage.getItem(STORAGE_CHECKLIST);
    if (saved) {
        try { checklistData = JSON.parse(saved); } catch(e) { checklistData = [...DEFAULT_CHECKLIST]; }
    } else {
        checklistData = [...DEFAULT_CHECKLIST];
    }
    renderChecklist();
}

function saveChecklist() {
    localStorage.setItem(STORAGE_CHECKLIST, JSON.stringify(checklistData));
    renderChecklist();
}

function renderChecklist() {
    const container = document.getElementById('checklist-items-container');
    const progressBar = document.getElementById('checklist-progress-bar');
    const countText = document.getElementById('checklist-count');

    if (!container) return;

    const filtered = activeChecklistFilter === 'all' 
        ? checklistData 
        : checklistData.filter(item => item.category === activeChecklistFilter);

    const completedCount = checklistData.filter(i => i.completed).length;
    const totalCount = checklistData.length;
    const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    if (countText) countText.textContent = `${completedCount}/${totalCount}`;
    if (progressBar) progressBar.style.width = `${percent}%`;

    if (filtered.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 text-center py-6">Không có mục nào trong danh mục này.</p>`;
        return;
    }

    container.innerHTML = filtered.map(item => `
        <div class="flex items-center justify-between p-3.5 rounded-xl border ${item.completed ? 'bg-emerald-50/60 border-emerald-200 text-slate-500' : 'bg-white border-slate-200 text-slate-800'} transition-all hover:border-slate-300">
            <label class="flex items-center gap-3 cursor-pointer flex-grow select-none">
                <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="toggleChecklistItem('${item.id}')" class="w-4 h-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue cursor-pointer">
                <span class="text-xs sm:text-sm ${item.completed ? 'line-through text-slate-400' : 'font-medium'}">${escapeHtml(item.text)}</span>
            </label>
            <button onclick="deleteChecklistItem('${item.id}')" class="text-slate-400 hover:text-red-500 p-1 rounded text-xs transition-colors" title="Xóa">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');
}

function toggleChecklistItem(id) {
    checklistData = checklistData.map(item => item.id === id ? {...item, completed: !item.completed} : item);
    saveChecklist();
}

function deleteChecklistItem(id) {
    checklistData = checklistData.filter(item => item.id !== id);
    saveChecklist();
    showToast('Đã xóa mục khỏi danh sách', 'info');
}

function addCustomChecklistItem(e) {
    e.preventDefault();
    const input = document.getElementById('custom-task-input');
    const text = input.value.trim();
    if (!text) return;

    const newItem = {
        id: 'custom-' + Date.now(),
        text: text,
        category: activeChecklistFilter === 'all' ? 'truoc' : activeChecklistFilter,
        completed: false
    };

    checklistData.push(newItem);
    input.value = '';
    saveChecklist();
    showToast('Đã thêm việc cần làm mới!', 'success');
}

function filterChecklist(cat) {
    activeChecklistFilter = cat;
    document.querySelectorAll('.checklist-tab').forEach(btn => {
        btn.classList.remove('bg-navy-900', 'text-white');
        btn.classList.add('bg-white', 'text-slate-700');
    });
    if (event && event.target) {
        event.target.classList.remove('bg-white', 'text-slate-700');
        event.target.classList.add('bg-navy-900', 'text-white');
    }
    renderChecklist();
}

function resetChecklist() {
    if (confirm('Bạn có chắc chắn muốn đặt lại toàn bộ danh sách nhập học về ban đầu?')) {
        checklistData = [...DEFAULT_CHECKLIST];
        saveChecklist();
        showToast('Đã đặt lại danh sách mặc định!', 'info');
    }
}

/* ==========================================================================
   4. TOOL #2: BUDGET CALCULATOR LOGIC
   ========================================================================== */
function calculateBudget() {
    const getVal = (id) => Math.max(0, parseFloat(document.getElementById(id).value) || 0);

    const income = getVal('budget-income');
    const housing = getVal('budget-housing');
    const food = getVal('budget-food');
    const transport = getVal('budget-transport');
    const study = getVal('budget-study');
    const other = getVal('budget-other');

    const totalExpense = housing + food + transport + study + other;
    const balance = income - totalExpense;

    const fmt = (num) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);

    const summaryIncome = document.getElementById('summary-income');
    const summaryExpense = document.getElementById('summary-total-expense');
    const summaryBalance = document.getElementById('summary-balance');

    if (summaryIncome) summaryIncome.textContent = fmt(income);
    if (summaryExpense) summaryExpense.textContent = fmt(totalExpense);

    if (summaryBalance) {
        summaryBalance.textContent = fmt(balance);
        const statusBox = document.getElementById('budget-status-box');
        const statusTitle = document.getElementById('budget-status-title');
        const statusDesc = document.getElementById('budget-status-desc');

        if (income === 0 && totalExpense === 0) {
            statusTitle.className = 'flex items-center gap-2 font-bold text-sm text-slate-300';
            statusTitle.innerHTML = `<i class="fa-solid fa-circle-info"></i> Hãy nhập số tiền ngân sách của bạn`;
            statusDesc.textContent = 'Nhập các khoản chi phí dự kiến để hệ thống phân tích hạn mức an toàn.';
            return;
        }

        if (balance < 0) {
            summaryBalance.className = 'text-rose-400 font-bold';
            statusBox.className = 'p-4 rounded-xl border border-rose-800 bg-rose-950/60 text-xs space-y-2';
            statusTitle.className = 'flex items-center gap-2 font-bold text-sm text-rose-400';
            statusTitle.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> CẢNH BÁO: Vượt Ngân Sách (${fmt(Math.abs(balance))})`;
            statusDesc.textContent = 'Chi phí dự kiến vượt quá ngân sách hàng tháng! Hãy cân nhắc giảm chi phí thuê nhà trọ hoặc cắt giảm bớt các chi phí giải trí chưa cấp thiết.';
        } else if (balance < income * 0.1) {
            summaryBalance.className = 'text-amber-400 font-bold';
            statusBox.className = 'p-4 rounded-xl border border-amber-800 bg-amber-950/60 text-xs space-y-2';
            statusTitle.className = 'flex items-center gap-2 font-bold text-sm text-amber-400';
            statusTitle.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> CẢNH BÁO: Tiệm Cận Hạn Mức`;
            statusDesc.textContent = 'Số tiền dư còn lại khá mỏng (dưới 10%). Bạn nên dành ra một khoản dự phòng nhỏ cho các tình huống phát sinh.';
        } else {
            summaryBalance.className = 'text-emerald-400 font-bold';
            statusBox.className = 'p-4 rounded-xl border border-emerald-800 bg-emerald-950/60 text-xs space-y-2';
            statusTitle.className = 'flex items-center gap-2 font-bold text-sm text-emerald-400';
            statusTitle.innerHTML = `<i class="fa-solid fa-circle-check"></i> AN TOÀN TÀI CHÍNH`;
            statusDesc.textContent = `Tuyệt vời! Ngân sách của bạn kiểm soát rất tốt. Bạn còn dư ${fmt(balance)} để tiết kiệm hoặc phục vụ các quỹ học tập phát sinh.`;
        }
    }

    // Breakdown progress bars
    const breakdownEl = document.getElementById('budget-breakdown');
    if (breakdownEl) {
        const items = [
            { name: 'Nhà ở/KTX', val: housing, color: 'bg-sky-500' },
            { name: 'Ăn uống', val: food, color: 'bg-emerald-500' },
            { name: 'Đi lại', val: transport, color: 'bg-amber-500' },
            { name: 'Học tập', val: study, color: 'bg-purple-500' },
            { name: 'Khác', val: other, color: 'bg-rose-500' },
        ];

        breakdownEl.innerHTML = items.map(item => {
            const pct = totalExpense > 0 ? Math.round((item.val / totalExpense) * 100) : 0;
            return `
                <div>
                    <div class="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>${item.name} (${pct}%)</span>
                        <span>${fmt(item.val)}</span>
                    </div>
                    <div class="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div class="${item.color} h-full" style="width: ${pct}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

/* ==========================================================================
   5. TOOL #3: STUDENT PLANNER LOGIC
   ========================================================================== */
let tasksData = [];

function loadTasks() {
    const saved = localStorage.getItem(STORAGE_TASKS);
    if (saved) {
        try { tasksData = JSON.parse(saved); } catch(e) { tasksData = []; }
    } else {
        tasksData = [
            { id: 't1', title: 'Ôn tập Tiếng Anh xếp lớp đầu khóa', date: '2026-09-15', priority: 'high', completed: false },
            { id: 't2', title: 'Nộp ảnh làm Thẻ Sinh Viên liên kết Ngân hàng', date: '2026-09-20', priority: 'medium', completed: true }
        ];
    }
    renderTasks();
}

function saveTasks() {
    localStorage.setItem(STORAGE_TASKS, JSON.stringify(tasksData));
    renderTasks();
}

function handleAddTask(e) {
    e.preventDefault();
    const titleInput = document.getElementById('task-title');
    const dateInput = document.getElementById('task-date');
    const priorityInput = document.getElementById('task-priority');

    const newTask = {
        id: 'task-' + Date.now(),
        title: titleInput.value.trim(),
        date: dateInput.value,
        priority: priorityInput.value,
        completed: false
    };

    tasksData.push(newTask);
    saveTasks();
    titleInput.value = '';
    showToast('Đã lưu công việc thành công!', 'success');
}

function renderTasks() {
    const container = document.getElementById('tasks-container');
    const filterEl = document.getElementById('task-filter');
    if (!container) return;

    const filterVal = filterEl ? filterEl.value : 'all';

    let filtered = tasksData;
    if (filterVal === 'pending') filtered = tasksData.filter(t => !t.completed);
    if (filterVal === 'completed') filtered = tasksData.filter(t => t.completed);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="text-center py-10 text-slate-400 text-xs">
                <i class="fa-regular fa-clipboard text-3xl mb-2 block text-slate-300"></i>
                Chưa có công việc nào trong danh sách.
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(t => {
        let badgeClass = 'bg-slate-200 text-slate-700';
        let badgeText = 'Thấp';
        if (t.priority === 'high') { badgeClass = 'bg-rose-100 text-rose-700'; badgeText = 'Cao'; }
        if (t.priority === 'medium') { badgeClass = 'bg-amber-100 text-amber-700'; badgeText = 'Trung bình'; }

        return `
            <div class="flex items-center justify-between p-3.5 rounded-xl border ${t.completed ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-white border-slate-200 text-slate-800'} transition-all">
                <div class="flex items-center gap-3">
                    <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTaskStatus('${t.id}')" class="w-4 h-4 text-brand-blue rounded border-slate-300 cursor-pointer">
                    <div>
                        <p class="text-xs font-semibold ${t.completed ? 'line-through' : ''}">${escapeHtml(t.title)}</p>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-[10px] text-slate-500"><i class="fa-regular fa-calendar mr-1"></i>Hạn: ${t.date}</span>
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeClass}">${badgeText}</span>
                        </div>
                    </div>
                </div>
                <button onclick="deleteTask('${t.id}')" class="text-slate-400 hover:text-red-500 text-xs p-1" title="Xóa">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
    }).join('');
}

function toggleTaskStatus(id) {
    tasksData = tasksData.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    saveTasks();
}

function deleteTask(id) {
    tasksData = tasksData.filter(t => t.id !== id);
    saveTasks();
    showToast('Đã xóa công việc', 'info');
}

/* ==========================================================================
   6. HANDBOOK ARTICLES LOGIC
   ========================================================================== */
let activeHandbookCategory = 'all';

function renderHandbook() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;

    const filtered = activeHandbookCategory === 'all'
        ? ARTICLES_DATA
        : ARTICLES_DATA.filter(a => a.category === activeHandbookCategory);

    grid.innerHTML = filtered.map(art => `
        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
                <div class="card-img-wrapper h-48 relative overflow-hidden bg-slate-100">
                    <img src="${art.image}" alt="${escapeHtml(art.title)}" class="w-full h-full object-cover">
                    <span class="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-navy-900/80 backdrop-blur px-2.5 py-1 rounded-full border border-white/20">${art.categoryLabel}</span>
                </div>
                <div class="p-5">
                    <h3 class="font-heading text-lg font-bold text-navy-900 mb-2 leading-snug group-hover:text-brand-blue transition-colors">${escapeHtml(art.title)}</h3>
                    <p class="text-xs text-slate-600 leading-relaxed line-clamp-3">${escapeHtml(art.summary)}</p>
                </div>
            </div>
            <div class="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-100">
                <button onclick="openArticleModal('${art.id}')" class="text-xs font-semibold text-brand-blue hover:text-sky-700 flex items-center gap-1.5">
                    Đọc chi tiết <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function filterHandbook(cat) {
    activeHandbookCategory = cat;
    document.querySelectorAll('.handbook-btn').forEach(btn => {
        btn.classList.remove('bg-navy-900', 'text-white');
        btn.classList.add('bg-white', 'text-slate-700');
    });
    if (event && event.target) {
        event.target.classList.remove('bg-white', 'text-slate-700');
        event.target.classList.add('bg-navy-900', 'text-white');
    }
    renderHandbook();
}

function openArticleModal(id) {
    const art = ARTICLES_DATA.find(a => a.id === id);
    if (!art) return;

    document.getElementById('modal-article-category').textContent = art.categoryLabel;
    document.getElementById('modal-article-title').textContent = art.title;
    document.getElementById('modal-article-body').innerHTML = `
        <div class="mb-4 rounded-xl overflow-hidden max-h-64">
            <img src="${art.image}" alt="${escapeHtml(art.title)}" class="w-full h-full object-cover">
        </div>
        ${art.content}
    `;

    const modal = document.getElementById('article-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeArticleModal() {
    const modal = document.getElementById('article-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

/* ==========================================================================
   7. FAQ ACCORDIONS LOGIC
   ========================================================================== */
function renderFaq(data = FAQ_DATA) {
    const container = document.getElementById('faq-container');
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 text-center py-6">Không tìm thấy câu hỏi phù hợp.</p>`;
        return;
    }

    container.innerHTML = data.map((item, idx) => `
        <div class="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button onclick="toggleFaq(${idx})" class="w-full text-left p-4 flex items-center justify-between font-semibold text-xs sm:text-sm text-navy-900 hover:bg-slate-50 transition-colors">
                <span class="flex items-center gap-2.5"><i class="fa-regular fa-circle-question text-brand-blue text-base"></i> ${escapeHtml(item.q)}</span>
                <i class="fa-solid fa-chevron-down text-xs text-slate-400 transition-transform" id="faq-icon-${idx}"></i>
            </button>
            <div id="faq-ans-${idx}" class="hidden p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50">
                ${escapeHtml(item.a)}
            </div>
        </div>
    `).join('');
}

function toggleFaq(idx) {
    const ans = document.getElementById(`faq-ans-${idx}`);
    const icon = document.getElementById(`faq-icon-${idx}`);
    if (ans) ans.classList.toggle('hidden');
    if (icon) icon.classList.toggle('rotate-180');
}

function filterFaq() {
    const query = document.getElementById('faq-search-input').value.toLowerCase();
    const filtered = FAQ_DATA.filter(f => f.q.toLowerCase().includes(query) || f.a.toLowerCase().includes(query));
    renderFaq(filtered);
}

/* ==========================================================================
   8. GLOBAL SEARCH MODAL LOGIC
   ========================================================================== */
function openSearchModal() {
    const modal = document.getElementById('search-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    const input = document.getElementById('global-search-input');
    if (input) input.focus();
}

function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function handleGlobalSearch(q) {
    const resultsContainer = document.getElementById('global-search-results');
    const query = q.toLowerCase().trim();

    if (!query) {
        resultsContainer.innerHTML = `<p class="text-slate-500 text-center py-8">Hãy nhập từ khóa để tìm kiếm bài viết và câu hỏi FAQ...</p>`;
        return;
    }

    const matchedArticles = ARTICLES_DATA.filter(a => a.title.toLowerCase().includes(query) || a.summary.toLowerCase().includes(query));
    const matchedFaqs = FAQ_DATA.filter(f => f.q.toLowerCase().includes(query) || f.a.toLowerCase().includes(query));

    let html = '';

    if (matchedArticles.length > 0) {
        html += `<h4 class="font-bold text-slate-400 mb-2">Bài viết Cẩm Nang (${matchedArticles.length})</h4>`;
        html += matchedArticles.map(a => `
            <div onclick="closeSearchModal(); openArticleModal('${a.id}');" class="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors flex items-center gap-3">
                <img src="${a.image}" class="w-12 h-12 object-cover rounded-lg shrink-0">
                <div>
                    <p class="font-semibold text-white">${escapeHtml(a.title)}</p>
                    <p class="text-[11px] text-slate-400 line-clamp-1">${escapeHtml(a.summary)}</p>
                </div>
            </div>
        `).join('');
    }

    if (matchedFaqs.length > 0) {
        html += `<h4 class="font-bold text-slate-400 mt-4 mb-2">Hỏi Đáp FAQ (${matchedFaqs.length})</h4>`;
        html += matchedFaqs.map(f => `
            <div class="p-3 bg-slate-800 rounded-lg">
                <p class="font-semibold text-amber-300">Q: ${escapeHtml(f.q)}</p>
                <p class="text-[11px] text-slate-300 mt-1">${escapeHtml(f.a)}</p>
            </div>
        `).join('');
    }

    if (matchedArticles.length === 0 && matchedFaqs.length === 0) {
        html = `<p class="text-slate-400 text-center py-8">Không tìm thấy kết quả phù hợp với từ khóa "${escapeHtml(q)}".</p>`;
    }

    resultsContainer.innerHTML = html;
}

// Keyboard Hotkeys
window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
    }
    if (e.key === 'Escape') {
        closeSearchModal();
        closeArticleModal();
    }
});

/* ==========================================================================
   9. CONTACT FORM LOGIC & UI HELPER
   ========================================================================== */
function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    showToast(`Cảm ơn ${name}! Thắc mắc của bạn đã được tiếp nhận trên giao diện trình duyệt.`, 'success');
    e.target.reset();
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

/* ==========================================================================
   INIT ON DOM READY
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
    loadChecklist();
    calculateBudget();
    loadTasks();
    renderHandbook();
    renderFaq();
});
