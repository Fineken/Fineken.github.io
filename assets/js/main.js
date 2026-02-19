// Глобальные переменные
let publicationsData = [];
let projectsData = [];
let publicationsChart = null;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeLanguageSystem();
        initializeTheme();
        initializeNavigation();
        initializeScrollSpy();
        loadData();
        initializeContactForm();
        initializeAnimations();
    } catch (error) {
        console.error('Ошибка при инициализации:', error);
    }
});



// === УПРАВЛЕНИЕ ТЕМОЙ ===
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    }

    themeToggle?.addEventListener('click', function() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        if (publicationsChart) {
            updateChartTheme();
        }
    });
}

// === НАВИГАЦИЯ ===
function initializeNavigation() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        mobileMenuButton?.setAttribute('aria-expanded', 'true');
    }

    function closeMobileMenu() {
        mobileMenu?.classList.add('hidden');
        document.body.style.overflow = '';
        mobileMenuButton?.setAttribute('aria-expanded', 'false');
    }

    mobileMenuButton?.addEventListener('click', openMobileMenu);
    mobileMenuClose?.addEventListener('click', closeMobileMenu);

    mobileMenu?.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                closeMobileMenu();
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeModal();
        }
    });
}

// === SCROLL SPY ===
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let scrollTimer;

    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('nav').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('text-primary-600', 'dark:text-primary-400');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-primary-600', 'dark:text-primary-400');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(updateActiveNav, 50);
    }, { passive: true });

    updateActiveNav();
}

// === ЗАГРУЗКА ДАННЫХ ===
async function loadData() {
    try {
        showLoadingState();

        const response = await fetch('data/publications.json');
        const data = await response.json();

        publicationsData = data.publications;
        projectsData = data.projects;

        await renderPublicationsTable();
        initializePublicationFilters();

        if (window.innerWidth > 768) {
            setTimeout(renderPublicationsChart, 100);
        }

        setTimeout(renderProjects, 200);

    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        showErrorMessage('Не удалось загрузить данные публикаций');
    }
}

function showLoadingState() {
    const containers = ['publications-table', 'publications-mobile', 'projects-container'];
    containers.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-spinner fa-spin text-3xl text-primary-500 mb-4"></i>
                    <div class="text-gray-600 dark:text-gray-300">Загрузка...</div>
                </div>
            `;
        }
    });
}

// === ПУБЛИКАЦИИ ===
function renderPublicationsTable(filter = 'all') {
    const tableBody = document.getElementById('publications-table');
    const mobileContainer = document.getElementById('publications-mobile');

    if (!publicationsData || publicationsData.length === 0) {
        const errorMessage = `
            <div class="text-center py-8">
                <i class="fas fa-exclamation-triangle text-3xl text-orange-500 mb-4"></i>
                <div class="text-gray-600 dark:text-gray-300">Не удалось загрузить публикации</div>
                <button onclick="loadData()" class="mt-2 bg-primary-500 text-white px-4 py-2 rounded text-sm hover:bg-primary-600 transition-colors">
                    Попробовать снова
                </button>
            </div>
        `;
        if (tableBody) tableBody.innerHTML = `<tr><td colspan="5">${errorMessage}</td></tr>`;
        if (mobileContainer) mobileContainer.innerHTML = errorMessage;
        return;
    }

    const filteredPublications = filter === 'all'
        ? publicationsData
        : publicationsData.filter(pub => pub.category === filter);

    // Desktop Table
    if (tableBody) {
        tableBody.innerHTML = filteredPublications.map(pub => `
            <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors">
                <td class="px-6 py-4">
                    <div class="font-semibold text-gray-900 dark:text-white">${escapeHtml(pub.title)}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">${escapeHtml(pub.authors)}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">${escapeHtml(pub.abstract.substring(0, 100))}...</div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">${pub.year}</td>
                <td class="px-6 py-4">
                    <span class="category-badge category-${escapeHtml(pub.category)}">${getCategoryName(pub.category)}</span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">${escapeHtml(pub.journal)}</td>
                <td class="px-6 py-4">
                    <div class="flex space-x-2">
                        <button onclick="viewPublication(${pub.id})"
                                aria-label="Просмотреть публикацию"
                                class="text-primary-500 hover:text-primary-600 transition-colors">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="copyDOI('${escapeHtml(pub.doi)}')"
                                aria-label="Скопировать DOI"
                                class="text-green-500 hover:text-green-600 transition-colors">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Mobile Cards
    if (mobileContainer) {
        mobileContainer.innerHTML = filteredPublications.map(pub => `
            <div class="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 mb-4 border-l-4 border-primary-500 hover:shadow-lg transition-shadow">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                        <h4 class="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-2">${escapeHtml(pub.title)}</h4>
                        <div class="flex flex-wrap items-center gap-2 mb-2">
                            <span class="category-badge category-${escapeHtml(pub.category)} text-xs">${getCategoryName(pub.category)}</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">•</span>
                            <span class="text-xs text-gray-600 dark:text-gray-300 font-medium">${pub.year}</span>
                        </div>
                    </div>
                </div>

                <div class="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    <span class="font-medium">Авторы:</span> ${escapeHtml(pub.authors)}
                </div>

                <div class="text-xs text-gray-500 dark:text-gray-400 mb-3" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${escapeHtml(pub.abstract.substring(0, 120))}...
                </div>

                <div class="text-xs text-gray-500 dark:text-gray-400 mb-3" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    <span class="font-medium">Журнал:</span> ${escapeHtml(pub.journal)}
                </div>

                <div class="flex justify-between items-center">
                    <button onclick="viewPublication(${pub.id})"
                            class="touch-button bg-primary-500 text-white px-3 py-2 rounded-md text-xs font-medium hover:bg-primary-600 transition-colors flex items-center">
                        <i class="fas fa-eye mr-1"></i>Подробнее
                    </button>
                    <button onclick="copyDOI('${escapeHtml(pub.doi)}')"
                            aria-label="Скопировать DOI"
                            class="touch-button text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors p-2 rounded-md">
                        <i class="fas fa-copy text-sm"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function getCategoryName(category) {
    const categories = {
        'security': 'Информационная безопасность',
        'devops': 'DevOps',
        'ml': 'Machine Learning',
        'humanities': 'Гуманитарные науки',
        'algorithms': 'Алгоритмы'
    };
    return categories[category] || escapeHtml(category);
}

function renderPublicationsChart() {
    const ctx = document.getElementById('publicationsChart')?.getContext('2d');
    if (!ctx || window.innerWidth <= 768) return;

    try {
        const allCategories = [...new Set(publicationsData.map(pub => pub.category))];

        const yearData = {};
        publicationsData.forEach(pub => {
            if (!yearData[pub.year]) {
                yearData[pub.year] = {};
                allCategories.forEach(cat => { yearData[pub.year][cat] = 0; });
            }
            yearData[pub.year][pub.category]++;
        });

        const years = Object.keys(yearData).sort();

        const categoryColors = {
            'security': { bg: 'rgba(147, 51, 234, 0.8)', border: 'rgb(147, 51, 234)' },
            'devops':   { bg: 'rgba(59, 130, 246, 0.8)',  border: 'rgb(59, 130, 246)' },
            'ml':       { bg: 'rgba(34, 197, 94, 0.8)',   border: 'rgb(34, 197, 94)' },
            'humanities':{ bg: 'rgba(251, 146, 60, 0.8)', border: 'rgb(251, 146, 60)' }
        };

        const datasets = allCategories.map(category => {
            const colors = categoryColors[category] || { bg: 'rgba(128,128,128,0.8)', border: 'rgb(128,128,128)' };
            return {
                label: getCategoryName(category),
                data: years.map(year => yearData[year][category] || 0),
                backgroundColor: colors.bg,
                borderColor: colors.border,
                borderWidth: 1
            };
        });

        const isDark = document.documentElement.classList.contains('dark');
        const textColor = isDark ? '#e5e7eb' : '#374151';
        const gridColor = isDark ? '#374151' : '#e5e7eb';

        if (publicationsChart) {
            publicationsChart.destroy();
        }

        publicationsChart = new Chart(ctx, {
            type: 'bar',
            data: { labels: years, datasets },
            options: {
                responsive: true,
                animation: { duration: 800 },
                plugins: { legend: { labels: { color: textColor } } },
                scales: {
                    x: { ticks: { color: textColor }, grid: { color: gridColor } },
                    y: { beginAtZero: true, ticks: { color: textColor, stepSize: 1 }, grid: { color: gridColor } }
                }
            }
        });
    } catch (error) {
        console.error('Ошибка создания графика:', error);
        const canvas = document.getElementById('publicationsChart');
        if (canvas?.parentElement) {
            canvas.parentElement.innerHTML = `
                <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                    <i class="fas fa-chart-bar text-3xl mb-2"></i>
                    <div>График временно недоступен</div>
                </div>
            `;
        }
    }
}

function updateChartTheme() {
    if (!publicationsChart) return;

    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#e5e7eb' : '#374151';
    const gridColor = isDark ? '#374151' : '#e5e7eb';

    publicationsChart.options.plugins.legend.labels.color = textColor;
    publicationsChart.options.scales.x.ticks.color = textColor;
    publicationsChart.options.scales.x.grid.color = gridColor;
    publicationsChart.options.scales.y.ticks.color = textColor;
    publicationsChart.options.scales.y.grid.color = gridColor;
    publicationsChart.update();
}

// === ФИЛЬТРЫ ПУБЛИКАЦИЙ ===
function initializePublicationFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach((button, index) => {
        button.replaceWith(button.cloneNode(true));
        const newButton = document.querySelectorAll('.filter-btn')[index];

        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active', 'bg-primary-500', 'text-white');
                btn.classList.add('border', 'border-primary-500', 'text-primary-500');
            });

            this.classList.add('active', 'bg-primary-500', 'text-white');
            this.classList.remove('border', 'border-primary-500', 'text-primary-500');

            renderPublicationsTable(this.getAttribute('data-filter'));
        });

        newButton.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });

        newButton.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });
}

// === ПРОЕКТЫ ===
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = projectsData.map(project => {
        const hasDemo = project.demo && project.demo.trim() !== '';
        const hasGithub = project.github && project.github.trim() !== '';

        return `
        <div class="bg-white dark:bg-dark-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
            <div class="h-48 bg-gradient-to-r ${getProjectGradient(project.category)} relative overflow-hidden">
                <div class="absolute inset-0 bg-black/20"></div>
                <div class="absolute bottom-4 left-4 right-4">
                    <span class="category-badge category-${escapeHtml(project.category)}">${getCategoryName(project.category)}</span>
                </div>
            </div>

            <div class="p-6">
                <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">${escapeHtml(project.title)}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">${escapeHtml(project.description)}</p>

                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.technologies.slice(0, 3).map(tech =>
                        `<span class="px-3 py-1 bg-gray-100 dark:bg-dark-bg text-sm rounded-full">${escapeHtml(tech)}</span>`
                    ).join('')}
                    ${project.technologies.length > 3 ? `<span class="px-3 py-1 bg-gray-100 dark:bg-dark-bg text-sm rounded-full">+${project.technologies.length - 3}</span>` : ''}
                </div>

                <div class="flex justify-between items-center">
                    <div class="flex space-x-3">
                        ${hasGithub ? `
                        <a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer"
                           aria-label="GitHub репозиторий ${escapeHtml(project.title)}"
                           class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                            <i class="fab fa-github text-xl"></i>
                        </a>` : ''}
                        ${hasDemo ? `
                        <a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener noreferrer"
                           aria-label="Демо ${escapeHtml(project.title)}"
                           class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                            <i class="fas fa-external-link-alt text-xl"></i>
                        </a>` : ''}
                    </div>
                    <button onclick="viewProject(${project.id})"
                            class="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                        Подробнее
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

function getProjectGradient(category) {
    const gradients = {
        'security':   'from-purple-500 to-purple-700',
        'devops':     'from-blue-500 to-blue-700',
        'ml':         'from-green-500 to-green-700',
        'humanities': 'from-orange-400 to-orange-600'
    };
    return gradients[category] || 'from-gray-500 to-gray-700';
}

// === МОДАЛЬНЫЕ ОКНА ===
let currentModal = null;

function showModal(content) {
    // Закрываем предыдущую модалку если открыта
    closeModal();

    const modal = document.createElement('div');
    modal.id = 'active-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
        <div class="bg-white dark:bg-dark-surface rounded-xl shadow-2xl max-h-screen overflow-y-auto m-4 p-6 relative max-w-4xl w-full">
            <button onclick="closeModal()"
                    aria-label="Закрыть"
                    class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <i class="fas fa-times text-xl"></i>
            </button>
            ${content}
        </div>
    `;

    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    // Tab-trap: focus stays inside modal
    modal.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab') return;
        const focusable = modal.querySelectorAll('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });

    document.body.appendChild(modal);
    currentModal = modal;

    // Focus close button
    requestAnimationFrame(() => {
        modal.querySelector('button[aria-label="Закрыть"]')?.focus();
    });
}

function closeModal() {
    if (currentModal) {
        currentModal.remove();
        currentModal = null;
    }
}

function viewPublication(id) {
    const publication = publicationsData.find(p => p.id === id);
    if (!publication) return;

    showModal(`
        <div class="max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold mb-4">${escapeHtml(publication.title)}</h3>
            <div class="mb-4">
                <span class="category-badge category-${escapeHtml(publication.category)}">${getCategoryName(publication.category)}</span>
                <span class="ml-2 text-gray-600 dark:text-gray-300">${publication.year}</span>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Авторы:</strong> ${escapeHtml(publication.authors)}</p>
            <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Журнал:</strong> ${escapeHtml(publication.journal)}</p>
            <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>DOI:</strong> ${escapeHtml(publication.doi)}</p>
            <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Аннотация:</strong> ${escapeHtml(publication.abstract)}</p>
            <div class="mb-4">
                <strong class="text-gray-700 dark:text-gray-300">Ключевые слова:</strong>
                <div class="flex flex-wrap gap-2 mt-2">
                    ${publication.keywords.map(keyword =>
                        `<span class="px-3 py-1 bg-gray-100 dark:bg-dark-bg text-sm rounded-full">${escapeHtml(keyword)}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `);
}

function viewProject(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;

    const hasDemo = project.demo && project.demo.trim() !== '';
    const hasGithub = project.github && project.github.trim() !== '';

    showModal(`
        <div class="max-w-3xl mx-auto">
            <h3 class="text-2xl font-bold mb-4">${escapeHtml(project.title)}</h3>
            <div class="mb-4">
                <span class="category-badge category-${escapeHtml(project.category)}">${getCategoryName(project.category)}</span>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-6">${escapeHtml(project.description)}</p>

            <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 class="font-bold mb-2">Технологии:</h4>
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech =>
                            `<span class="px-3 py-1 bg-gray-100 dark:bg-dark-bg text-sm rounded-full">${escapeHtml(tech)}</span>`
                        ).join('')}
                    </div>
                </div>
                <div>
                    <h4 class="font-bold mb-2">Ключевые особенности:</h4>
                    <ul class="text-sm text-gray-700 dark:text-gray-300">
                        ${project.features.map(feature => `<li class="mb-1">• ${escapeHtml(feature)}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="flex gap-4">
                ${hasGithub ? `
                <a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer"
                   class="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <i class="fab fa-github mr-2"></i>GitHub
                </a>` : ''}
                ${hasDemo ? `
                <a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener noreferrer"
                   class="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                    <i class="fas fa-external-link-alt mr-2"></i>Демо
                </a>` : ''}
            </div>
        </div>
    `);
}

// === УТИЛИТЫ ===
function escapeHtml(str) {
    if (typeof str !== 'string') return String(str ?? '');
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function copyDOI(doi) {
    navigator.clipboard.writeText(doi).then(() => {
        showNotification('DOI скопирован в буфер обмена!', 'success');
    }).catch(() => {
        showNotification('Ошибка копирования DOI', 'error');
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-blue-500' };
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all transform translate-x-full ${colors[type] || colors.info} text-white`;
    notification.innerHTML = `
        <div class="flex items-center">
            <span>${escapeHtml(message)}</span>
            <button onclick="this.closest('.fixed').remove()" aria-label="Закрыть уведомление" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showErrorMessage(message) {
    const container = document.getElementById('publications-table');
    if (container) {
        container.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-8 text-center">
                    <div class="text-purple-500 mb-2">
                        <i class="fas fa-exclamation-triangle text-2xl"></i>
                    </div>
                    <div class="text-gray-600 dark:text-gray-300">${escapeHtml(message)}</div>
                </td>
            </tr>
        `;
    }
}

// === ФОРМА ОБРАТНОЙ СВЯЗИ ===
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const emailjsConfig = {
        serviceId: 'service_4obvv96',
        templateId: 'template_da7l4hr',
        publicKey: 'IsYJexeyV8lA7K7B6'
    };

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = form.querySelector('#main-submit-btn');
        if (!submitBtn) return;

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Отправка...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const templateParams = {
                from_name:    formData.get('name'),
                from_email:   formData.get('email'),
                message:      formData.get('message'),
                name:         formData.get('name'),
                email:        formData.get('email'),
                user_name:    formData.get('name'),
                user_email:   formData.get('email'),
                user_message: formData.get('message')
            };

            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service_id:      emailjsConfig.serviceId,
                    template_id:     emailjsConfig.templateId,
                    user_id:         emailjsConfig.publicKey,
                    template_params: templateParams
                })
            });

            if (response.ok) {
                showNotification('Сообщение успешно отправлено!', 'success');
                form.reset();
            } else {
                const errorText = await response.text();
                throw new Error(`Ошибка ${response.status}: ${errorText}`);
            }

        } catch (error) {
            console.error('Ошибка отправки формы:', error);

            // Fallback: открываем Telegram
            const formData = new FormData(form);
            const telegramMessage = encodeURIComponent(
                `Сообщение с сайта:\n\nИмя: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`
            );
            window.open(`https://t.me/My_Workstation?text=${telegramMessage}`, '_blank');
            showNotification('Ошибка отправки. Открывается Telegram', 'error');
            form.reset();

        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// === АНИМАЦИИ ===
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

// === СТИЛИ ===
const additionalStyles = `
<style>
.category-badge {
    @apply px-3 py-1 text-xs font-semibold rounded-full;
}
.category-security {
    @apply bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200;
}
.category-devops {
    @apply bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200;
}
.category-ml {
    @apply bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200;
}
.category-humanities {
    @apply bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200;
}
.animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}
.skill-item {
    @apply p-2 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-lg transition-colors cursor-pointer;
}
.skill-item:hover {
    transform: translateY(-2px);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Система переводов
function initializeLanguageSystem() {
    if (typeof window.i18n === 'undefined') {
        console.error('Система переводов не найдена! Проверьте подключение translations.js');
        return;
    }

    document.querySelectorAll('.lang-btn[data-lang]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.i18n.setLanguage(this.getAttribute('data-lang'));
            updateLanguageButtons();
        });
    });

    document.querySelectorAll('.mobile-lang-btn[data-lang]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.i18n.setLanguage(this.getAttribute('data-lang'));
            updateLanguageButtons();
            document.getElementById('mobile-menu')?.classList.add('hidden');
        });
    });

    updateLanguageButtons();

    setTimeout(() => {
        window.i18n.translatePage();
        updateLanguageButtons();
    }, 100);
}

function updateLanguageButtons() {
    const currentLang = window.i18n.getCurrentLanguage();

    document.querySelectorAll('.lang-btn[data-lang], .mobile-lang-btn[data-lang]').forEach(button => {
        const isActive = button.getAttribute('data-lang') === currentLang;
        button.classList.toggle('active', isActive);
        button.style.backgroundColor = isActive ? 'rgb(59, 130, 246)' : '';
        button.style.color           = isActive ? 'white' : '';
        button.style.borderColor     = isActive ? 'rgb(59, 130, 246)' : '';
    });
}
