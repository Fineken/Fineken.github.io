console.log('🚀 main.js начинает загрузку...');

// Глобальные переменные
let publicationsData = [];
let projectsData = [];
let publicationsChart = null;

console.log('📋 Глобальные переменные инициализированы');

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOMContentLoaded событие сработало');
    
    try {

        
        console.log('🌍 Инициализация системы переводов...');
        initializeLanguageSystem();
        
        console.log('🎨 Инициализация темы...');
        initializeTheme();
        
        console.log('🧭 Инициализация навигации...');
        initializeNavigation();
        
        console.log('👁️ Инициализация scroll spy...');
        initializeScrollSpy();
        
        console.log('📊 Загрузка данных...');
        loadData();
        
        console.log('📧 Инициализация формы контактов...');
        initializeContactForm();
        
        console.log('✨ Инициализация анимаций...');
        initializeAnimations();
        
        console.log('🔧 Инициализация фильтров публикаций...');
        // Даем время на загрузку данных, затем инициализируем фильтры
        setTimeout(initializePublicationFilters, 1000);
        
        console.log('✅ Все компоненты инициализированы успешно');
    } catch (error) {
        console.error('❌ Ошибка при инициализации:', error);
    }
});

console.log('📝 DOMContentLoaded слушатель установлен');



// === УПРАВЛЕНИЕ ТЕМОЙ ===
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Установка начальной темы
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    }
    
    // Обработчик переключения темы
    themeToggle?.addEventListener('click', function() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Обновляем график на десктопе при изменении темы
        if (publicationsChart) {
            updateChartTheme();
        }
        // Мобильная статистика обновляется автоматически через CSS
    });
}

// === НАВИГАЦИЯ ===
function initializeNavigation() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Открытие мобильного меню
    mobileMenuButton?.addEventListener('click', function() {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    });
    
    // Закрытие мобильного меню
    function closeMobileMenu() {
        mobileMenu?.classList.add('hidden');
        document.body.style.overflow = ''; // Возвращаем скролл страницы
    }
    
    mobileMenuClose?.addEventListener('click', closeMobileMenu);
    
    // Закрытие меню при клике вне его области
    mobileMenu?.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
    
    // Плавная прокрутка по якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню
                closeMobileMenu();
            }
        });
    });
    
    // Закрытие меню при нажатии ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

// === SCROLL SPY ===
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Инициализация
}

// === ЗАГРУЗКА ДАННЫХ ===
async function loadData() {
    try {
        // Показываем индикатор загрузки
        showLoadingState();
        
        const response = await fetch('data/publications.json');
        const data = await response.json();
        
        publicationsData = data.publications;
        projectsData = data.projects;
        
        // Рендерим данные с задержкой для плавности
        await renderPublicationsTable();
        
        // Инициализируем фильтры после рендеринга таблицы
        setTimeout(initializePublicationFilters, 50);
        

        
        // Загружаем статистику только на десктопе (экраны больше 768px)
        if (window.innerWidth > 768) {
            console.log('🖥️ Инициализация десктопной статистики...');
            setTimeout(renderPublicationsChart, 100);
        } else {
            console.log('📱 Мобильное устройство - статистика скрыта');
        }
        
        setTimeout(renderProjects, 200);
        
        hideLoadingState();
        
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        showErrorMessage('Не удалось загрузить данные публикаций');
        hideLoadingState();
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

function hideLoadingState() {
    // Функция вызывается автоматически после рендеринга данных
}

// ПРИМЕЧАНИЕ: Мобильная статистика полностью отключена для упрощения интерфейса

// === ПУБЛИКАЦИИ ===
function renderPublicationsTable(filter = 'all') {
    console.log('📚 === РЕНДЕРИНГ ПУБЛИКАЦИЙ ===');
    console.log('🔍 Фильтр:', filter);
    console.log('📊 Общее количество публикаций:', publicationsData ? publicationsData.length : 'данные не загружены');
    
    const tableBody = document.getElementById('publications-table');
    const mobileContainer = document.getElementById('publications-mobile');
    
    console.log('📦 Desktop контейнер (publications-table):', !!tableBody);
    console.log('📱 Mobile контейнер (publications-mobile):', !!mobileContainer);
    
    if (!publicationsData || publicationsData.length === 0) {
        console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: Данные публикаций отсутствуют!');
        
        // Показываем сообщение об ошибке в обоих контейнерах
        const errorMessage = `
            <div class="text-center py-8">
                <i class="fas fa-exclamation-triangle text-3xl text-orange-500 mb-4"></i>
                <div class="text-gray-600 dark:text-gray-300">Не удалось загрузить публикации</div>
                <button onclick="loadData()" class="mt-2 bg-primary-500 text-white px-4 py-2 rounded text-sm hover:bg-primary-600 transition-colors">
                    Попробовать снова
                </button>
            </div>
        `;
        
        if (tableBody) {
            tableBody.innerHTML = `<tr><td colspan="5">${errorMessage}</td></tr>`;
        }
        if (mobileContainer) {
            mobileContainer.innerHTML = errorMessage;
        }
        return;
    }
    
    const filteredPublications = filter === 'all' 
        ? publicationsData 
        : publicationsData.filter(pub => pub.category === filter);
    
    console.log('✅ Отфильтрованные публикации:', filteredPublications.length);
    
    // Desktop Table
    if (tableBody) {
        tableBody.innerHTML = filteredPublications.map(pub => `
            <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors">
                <td class="px-6 py-4">
                    <div class="font-semibold text-gray-900 dark:text-white">${pub.title}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">${pub.authors}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">${pub.abstract.substring(0, 100)}...</div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">${pub.year}</td>
                <td class="px-6 py-4">
                    <span class="category-badge category-${pub.category}">${getCategoryName(pub.category)}</span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">${pub.journal}</td>
                <td class="px-6 py-4">
                    <div class="flex space-x-2">
                        <button onclick="viewPublication(${pub.id})" 
                                class="text-primary-500 hover:text-primary-600 transition-colors">
                            <i class="fas fa-eye"></i>
                        </button>
                        <a href="#" onclick="copyDOI('${pub.doi}')" 
                           class="text-green-500 hover:text-green-600 transition-colors">
                            <i class="fas fa-copy"></i>
                        </a>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    // Mobile Cards - Компактная версия
    if (mobileContainer) {
        mobileContainer.innerHTML = filteredPublications.map(pub => `
            <div class="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 mb-4 border-l-4 border-primary-500 hover:shadow-lg transition-shadow">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                        <h4 class="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-2">${pub.title}</h4>
                        <div class="flex flex-wrap items-center gap-2 mb-2">
                            <span class="category-badge category-${pub.category} text-xs">${getCategoryName(pub.category)}</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">•</span>
                            <span class="text-xs text-gray-600 dark:text-gray-300 font-medium">${pub.year}</span>
                        </div>
                    </div>
                </div>
                
                <div class="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    <span class="font-medium">Авторы:</span> ${pub.authors}
                </div>
                
                <div class="text-xs text-gray-500 dark:text-gray-400 mb-3" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${pub.abstract.substring(0, 120)}...
                </div>
                
                <div class="text-xs text-gray-500 dark:text-gray-400 mb-3" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    <span class="font-medium">Журнал:</span> ${pub.journal}
                </div>
                
                <div class="flex justify-between items-center">
                    <button onclick="viewPublication(${pub.id})" 
                            class="touch-button bg-primary-500 text-white px-3 py-2 rounded-md text-xs font-medium hover:bg-primary-600 transition-colors flex items-center">
                        <i class="fas fa-eye mr-1"></i>Подробнее
                    </button>
                    <button onclick="copyDOI('${pub.doi}')" 
                            class="touch-button text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors p-2 rounded-md">
                        <i class="fas fa-copy text-sm"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        console.log('📱 ✅ Мобильные карточки созданы:', filteredPublications.length);
    } else {
        console.warn('⚠️ Мобильный контейнер не найден');
    }
    
    console.log('📚 ✅ РЕНДЕРИНГ ПУБЛИКАЦИЙ ЗАВЕРШЁН ===');
}

function getCategoryName(category) {
    const categories = {
        'security': 'Информационная безопасность',
        'devops': 'DevOps',
        'ml': 'Machine Learning',
        'humanities': 'Гуманитарные науки', 
        'algorithms': 'Алгоритмы'
    };
    return categories[category] || category;
}

function renderPublicationsChart() {
    const ctx = document.getElementById('publicationsChart')?.getContext('2d');
    if (!ctx) return;
    
    // Не создаем график на мобильных для экономии ресурсов
    if (window.innerWidth <= 768) {
        return;
    }
    
    try {
        // Находим все уникальные категории
        const allCategories = [...new Set(publicationsData.map(pub => pub.category))];
        
        // Группировка по годам и категориям
        const yearData = {};
        publicationsData.forEach(pub => {
            if (!yearData[pub.year]) {
                yearData[pub.year] = {};
                // Инициализируем все категории нулями
                allCategories.forEach(cat => {
                    yearData[pub.year][cat] = 0;
                });
            }
            yearData[pub.year][pub.category]++;
        });
        
        const years = Object.keys(yearData).sort();
        
        // Цветовая палитра для категорий
        const categoryColors = {
            'security': { bg: 'rgba(147, 51, 234, 0.8)', border: 'rgb(147, 51, 234)' }, // Фиолетовый
            'devops': { bg: 'rgba(59, 130, 246, 0.8)', border: 'rgb(59, 130, 246)' },
            'ml': { bg: 'rgba(34, 197, 94, 0.8)', border: 'rgb(34, 197, 94)' },
            'humanities': { bg: 'rgba(251, 146, 60, 0.8)', border: 'rgb(251, 146, 60)' } // Перенесли оранжевый сюда
        };
        
        // Создаем dataset для каждой категории
        const datasets = allCategories.map(category => {
            const categoryData = years.map(year => yearData[year][category] || 0);
            const colors = categoryColors[category] || { 
                bg: 'rgba(128, 128, 128, 0.8)', 
                border: 'rgb(128, 128, 128)' 
            };
            
            return {
                label: getCategoryName(category),
                data: categoryData,
                backgroundColor: colors.bg,
                borderColor: colors.border,
                borderWidth: 1
            };
        });
        
        // Определение цветов для темы
        const isDark = document.documentElement.classList.contains('dark');
        const textColor = isDark ? '#e5e7eb' : '#374151';
        const gridColor = isDark ? '#374151' : '#e5e7eb';
        
        // Уничтожаем предыдущий график если существует
        if (publicationsChart) {
            publicationsChart.destroy();
        }
        
        publicationsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: datasets
            },
            options: {
                responsive: true,
                animation: {
                    duration: 800 // Уменьшена анимация для лучшей производительности
                },
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: gridColor
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColor,
                            stepSize: 1
                        },
                        grid: {
                            color: gridColor
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Ошибка создания графика:', error);
        // При ошибке показываем простое сообщение
        const canvas = document.getElementById('publicationsChart');
        if (canvas && canvas.parentElement) {
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
    console.log('🔧 Инициализация фильтров публикаций...');
    
    // Добавляем обработчики на каждую кнопку отдельно
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log('🔍 Найдено кнопок фильтров:', filterButtons.length);
    
    filterButtons.forEach((button, index) => {
        console.log(`🔘 Настройка кнопки ${index + 1}:`, button.getAttribute('data-filter'));
        
        // Убираем все старые обработчики
        button.replaceWith(button.cloneNode(true));
        const newButton = document.querySelectorAll('.filter-btn')[index];
        
        // Добавляем новый обработчик
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🎯 КЛИК! Кнопка:', this.getAttribute('data-filter'));
            
            // Убираем активность со всех кнопок
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active', 'bg-primary-500', 'text-white');
                btn.classList.add('border', 'border-primary-500', 'text-primary-500');
            });
            
            // Активируем текущую кнопку
            this.classList.add('active', 'bg-primary-500', 'text-white');
            this.classList.remove('border', 'border-primary-500', 'text-primary-500');
            
            // Применяем фильтр
            const filter = this.getAttribute('data-filter');
            console.log('📊 Применяем фильтр:', filter);
            renderPublicationsTable(filter);
        });
        
        // Дополнительно добавляем обработчик на touchstart для мобильных
        newButton.addEventListener('touchstart', function(e) {
            console.log('👆 TOUCH START на кнопке:', this.getAttribute('data-filter'));
            this.style.transform = 'scale(0.95)';
        });
        
        newButton.addEventListener('touchend', function(e) {
            console.log('👆 TOUCH END на кнопке:', this.getAttribute('data-filter'));
            this.style.transform = 'scale(1)';
        });
    });
}

// Дополнительный глобальный обработчик как запасной вариант
document.addEventListener('click', function(e) {
    const filterBtn = e.target.closest('.filter-btn');
    if (filterBtn) {
        console.log('🆘 ЗАПАСНОЙ обработчик сработал для:', filterBtn.getAttribute('data-filter'));
    }
});

// Функция для тестирования фильтров из консоли
window.testFilters = function() {
    console.log('🧪 Тестирование фильтров...');
    const buttons = document.querySelectorAll('.filter-btn');
    console.log('Найдено кнопок:', buttons.length);
    
    buttons.forEach((btn, i) => {
        console.log(`Кнопка ${i + 1}:`, {
            element: btn,
            dataFilter: btn.getAttribute('data-filter'),
            classes: btn.className,
            hasClickListener: btn.onclick !== null
        });
    });
    
    console.log('Попробуйте кликнуть на кнопку и следите за консолью...');
};

// Функция для принудительной инициализации фильтров
window.forceInitFilters = function() {
    console.log('🔄 ПРИНУДИТЕЛЬНАЯ инициализация фильтров...');
    initializePublicationFilters();
};

// === ПРОЕКТЫ ===
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    container.innerHTML = projectsData.map(project => `
        <div class="bg-white dark:bg-dark-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
            <div class="h-48 bg-gradient-to-r ${getProjectGradient(project.category)} relative overflow-hidden">
                <div class="absolute inset-0 bg-black/20"></div>
                <div class="absolute bottom-4 left-4 right-4">
                    <span class="category-badge category-${project.category}">${getCategoryName(project.category)}</span>
                </div>
            </div>
            
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">${project.title}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">${project.description}</p>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.technologies.slice(0, 3).map(tech => 
                        `<span class="px-3 py-1 bg-gray-100 dark:bg-dark-bg text-sm rounded-full">${tech}</span>`
                    ).join('')}
                    ${project.technologies.length > 3 ? `<span class="px-3 py-1 bg-gray-100 dark:bg-dark-bg text-sm rounded-full">+${project.technologies.length - 3}</span>` : ''}
                </div>
                
                <div class="flex justify-between items-center">
                    <div class="flex space-x-3">
                        <a href="${project.github}" target="_blank" 
                           class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                            <i class="fab fa-github text-xl"></i>
                        </a>
                        <a href="${project.demo}" target="_blank" 
                           class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                            <i class="fas fa-external-link-alt text-xl"></i>
                        </a>
                    </div>
                    <button onclick="viewProject(${project.id})" 
                            class="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                        Подробнее
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getProjectGradient(category) {
    const gradients = {
        'security': 'from-purple-500 to-purple-700', // Фиолетовый градиент
        'devops': 'from-blue-500 to-blue-700',
        'ml': 'from-green-500 to-green-700',
        'humanities': 'from-orange-400 to-orange-600' // Оранжевый для гуманитарных наук
    };
    return gradients[category] || 'from-gray-500 to-gray-700';
}

// === МОДАЛЬНЫЕ ОКНА ===
function viewPublication(id) {
    const publication = publicationsData.find(p => p.id === id);
    if (!publication) return;
    
    showModal(`
        <div class="max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold mb-4">${publication.title}</h3>
            <div class="mb-4">
                <span class="category-badge category-${publication.category}">${getCategoryName(publication.category)}</span>
                <span class="ml-2 text-gray-600 dark:text-gray-300">${publication.year}</span>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Авторы:</strong> ${publication.authors}</p>
            <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Журнал:</strong> ${publication.journal}</p>
            <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>DOI:</strong> ${publication.doi}</p>
            <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Аннотация:</strong> ${publication.abstract}</p>
            <div class="mb-4">
                <strong class="text-gray-700 dark:text-gray-300">Ключевые слова:</strong>
                <div class="flex flex-wrap gap-2 mt-2">
                    ${publication.keywords.map(keyword => 
                        `<span class="px-3 py-1 bg-gray-100 dark:bg-dark-bg text-sm rounded-full">${keyword}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `);
}

function viewProject(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;
    
    showModal(`
        <div class="max-w-3xl mx-auto">
            <h3 class="text-2xl font-bold mb-4">${project.title}</h3>
            <div class="mb-4">
                <span class="category-badge category-${project.category}">${getCategoryName(project.category)}</span>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-6">${project.description}</p>
            
            <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 class="font-bold mb-2">Технологии:</h4>
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech => 
                            `<span class="px-3 py-1 bg-gray-100 dark:bg-dark-bg text-sm rounded-full">${tech}</span>`
                        ).join('')}
                    </div>
                </div>
                <div>
                    <h4 class="font-bold mb-2">Ключевые особенности:</h4>
                    <ul class="text-sm text-gray-700 dark:text-gray-300">
                        ${project.features.map(feature => `<li class="mb-1">• ${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="flex gap-4">
                <a href="${project.github}" target="_blank" 
                   class="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <i class="fab fa-github mr-2"></i>GitHub
                </a>
                <a href="${project.demo}" target="_blank" 
                   class="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                    <i class="fas fa-external-link-alt mr-2"></i>Демо
                </a>
            </div>
        </div>
    `);
}

function showModal(content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm';
    modal.innerHTML = `
        <div class="bg-white dark:bg-dark-surface rounded-xl shadow-2xl max-h-screen overflow-y-auto m-4 p-6 relative max-w-4xl w-full">
            <button onclick="this.closest('.fixed').remove()" 
                    class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <i class="fas fa-times text-xl"></i>
            </button>
            ${content}
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Закрытие по клику вне модального окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// === УТИЛИТЫ ===
function copyDOI(doi) {
    navigator.clipboard.writeText(doi).then(() => {
        showNotification('DOI скопирован в буфер обмена!', 'success');
    }).catch(() => {
        showNotification('Ошибка копирования DOI', 'error');
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all transform translate-x-full`;
    
    const colors = {
        'success': 'bg-green-500 text-white',
        'error': 'bg-red-500 text-white',
        'info': 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${colors[type]}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <span>${message}</span>
            <button onclick="this.closest('.fixed').remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Автоудаление
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
                    <div class="text-gray-600 dark:text-gray-300">${message}</div>
                </td>
            </tr>
        `;
    }
}

// === ФОРМА ОБРАТНОЙ СВЯЗИ ===
function initializeContactForm() {
    console.log('📧 initializeContactForm() вызвана');
    
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('❌ Форма contact-form не найдена!');
        return;
    }
    
    console.log('✅ Форма найдена:', form);
    
    // Инициализация EmailJS с публичным ключом
    const emailjsConfig = {
        serviceId: 'service_4obvv96',
        templateId: 'template_da7l4hr', // Исправленный Template ID из EmailJS
        publicKey: 'IsYJexeyV8lA7K7B6'
    };
    
    // Создаем функцию тестирования в любом случае
    console.log('🔧 Создаем testEmailJS функцию...');
    window.testEmailJS = function() {
        console.log('🧪 Запуск теста EmailJS...');
        console.log('🔍 EmailJS доступен?', typeof window.emailjs);
        console.log('⚙️ Конфигурация:', emailjsConfig);
        
        if (!window.emailjs) {
            console.error('❌ EmailJS не загружен!');
            return Promise.reject('EmailJS не доступен');
        }
        
        const testParams = {
            from_name: 'Тест',
            from_email: 'test@example.com',
            message: 'Тестовое сообщение',
            name: 'Тест',
            email: 'test@example.com',
            user_name: 'Тест',
            user_email: 'test@example.com',
            user_message: 'Тестовое сообщение',
            subject: 'Тест с сайта',
            timestamp: new Date().toLocaleString('ru-RU')
        };
        
        console.log('📋 Параметры теста:', testParams);
        
        return window.emailjs.send(
            emailjsConfig.serviceId,
            emailjsConfig.templateId,
            testParams,
            {
                publicKey: emailjsConfig.publicKey
            }
        ).then(result => {
            console.log('✅ Тест успешен:', result);
            return result;
        }).catch(error => {
            console.error('❌ Тест SDK провален:', error);
            console.log('🔄 Пробуем прямой API...');
            
            // Fallback на прямой API
            return fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: emailjsConfig.serviceId,
                    template_id: emailjsConfig.templateId,
                    user_id: emailjsConfig.publicKey,
                    template_params: testParams
                })
            }).then(response => {
                console.log('📡 API тест ответ:', response.status);
                if (response.ok) {
                    return response.text().then(text => {
                        console.log('✅ API тест успешен:', text);
                        return { status: response.status, text: text };
                    });
                } else {
                    return response.text().then(text => {
                        console.error('❌ API тест ошибка:', text);
                        throw new Error(`${response.status}: ${text}`);
                    });
                }
            });
        });
    };

    // Проверяем доступность EmailJS (инициализация не нужна в v4)
    if (window.emailjs) {
        console.log('✅ EmailJS доступен, версия:', window.emailjs.version || 'неизвестна');
        console.log('🔧 Public Key:', emailjsConfig.publicKey);
        console.log('🧪 Для тестирования выполните в консоли: testEmailJS()');
    } else {
        console.warn('⚠️ EmailJS не загружен - проверьте подключение CDN');
        console.log('🔄 Попробуем загрузить EmailJS альтернативным способом...');
        
        // Пытаемся загрузить EmailJS программно
        const script = document.createElement('script');
        script.src = 'https://cdn.emailjs.com/dist/email.min.js';
        script.onload = function() {
            console.log('✅ EmailJS загружен альтернативным способом');
            if (window.emailjs) {
                console.log('✅ EmailJS готов к использованию (v4)');
            }
        };
        script.onerror = function() {
            console.error('❌ Не удалось загрузить EmailJS альтернативным способом');
        };
        document.head.appendChild(script);
    }
    
    console.log('🧪 testEmailJS() функция создана и доступна для тестирования');
    
    console.log('📝 Добавляем обработчик для формы...');
    
    form.addEventListener('submit', async function(e) {
        console.log('🚨 ФОРМА ОТПРАВЛЕНА! Событие сработало');
        e.preventDefault();
        
        // Показываем индикатор загрузки
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        console.log('🔘 Кнопка найдена:', submitBtn);
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Отправка...';
        submitBtn.disabled = true;
        console.log('⏳ Индикатор загрузки установлен');
        
        try {
            // Получаем данные формы
            const formData = new FormData(form);
            
            // Используем ТОТ ЖЕ формат данных, что и в успешном тесте
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                message: formData.get('message'),
                name: formData.get('name'),
                email: formData.get('email'),
                user_name: formData.get('name'),
                user_email: formData.get('email'),
                user_message: formData.get('message')
            };
            
            console.log('📝 Отправляем форму с данными:', templateParams);
            
            // Используем ТОТ ЖЕ прямой API вызов, что и в успешном тесте
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: emailjsConfig.serviceId,
                    template_id: emailjsConfig.templateId,
                    user_id: emailjsConfig.publicKey,
                    template_params: templateParams
                })
            });
            
            console.log('📡 Ответ на отправку формы:', response.status, response.statusText);
            
            if (response.ok) {
                const responseText = await response.text();
                console.log('✅ Форма отправлена успешно:', responseText);
                showNotification('Сообщение успешно отправлено!', 'success');
                form.reset();
            } else {
                const errorText = await response.text();
                console.error('❌ Ошибка отправки формы:', errorText);
                throw new Error(`Ошибка ${response.status}: ${errorText}`);
            }
            
        } catch (error) {
            console.error('❌ Критическая ошибка отправки формы:', error);
            
            // Fallback: открываем Telegram
            const formData = new FormData(form);
            const telegramMessage = encodeURIComponent(
                `Сообщение с сайта:\n\n` +
                `Имя: ${formData.get('name')}\n` +
                `Email: ${formData.get('email')}\n\n` +
                `${formData.get('message')}`
            );
            const telegramLink = `https://t.me/My_Workstation?text=${telegramMessage}`;
            
            window.open(telegramLink, '_blank');
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
    // Intersection Observer для анимаций при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за секциями
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// === СТИЛИ (добавляем в head) ===
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
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.skill-item {
    @apply p-2 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-lg transition-colors cursor-pointer;
}

.skill-item:hover {
    transform: translateY(-2px);
}
</style>
`;

// Добавляем стили в head
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Система переводов
function initializeLanguageSystem() {
    console.log('🌍 Инициализация системы переводов...');
    
    // Проверяем, что i18n доступна
    if (typeof window.i18n === 'undefined') {
        console.error('❌ Система переводов не найдена! Проверьте подключение translations.js');
        return;
    }
    
    // Добавляем обработчики для переключателей языка в десктопной навигации
    const langButtons = document.querySelectorAll('.lang-btn[data-lang]');
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            console.log(`🔄 Переключение языка на: ${lang}`);
            
            // Переключаем язык
            window.i18n.setLanguage(lang);
            
            // Обновляем состояние кнопок
            updateLanguageButtons();
        });
    });
    
    // Добавляем обработчики для мобильных переключателей языка
    const mobileLangButtons = document.querySelectorAll('.mobile-lang-btn[data-lang]');
    mobileLangButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            console.log(`📱 Мобильное переключение языка на: ${lang}`);
            
            // Переключаем язык
            window.i18n.setLanguage(lang);
            
            // Обновляем состояние кнопок
            updateLanguageButtons();
            
            // Закрываем мобильное меню
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // Первоначальное обновление состояния кнопок
    updateLanguageButtons();
    
    // Принудительная инициализация переводов через небольшую задержку
    setTimeout(() => {
        window.i18n.translatePage();
        updateLanguageButtons();
        console.log('🔄 Принудительное обновление переводов завершено');
    }, 100);
    
    console.log('✅ Система переводов инициализирована');
}

function updateLanguageButtons() {
    const currentLang = window.i18n.getCurrentLanguage();
    
    // Обновляем десктопные кнопки
    const langButtons = document.querySelectorAll('.lang-btn[data-lang]');
    langButtons.forEach(button => {
        const lang = button.getAttribute('data-lang');
        if (lang === currentLang) {
            button.classList.add('active');
            // Добавляем стили для активной кнопки
            button.style.backgroundColor = 'rgb(59, 130, 246)';
            button.style.color = 'white';
        } else {
            button.classList.remove('active');
            // Убираем стили
            button.style.backgroundColor = '';
            button.style.color = '';
        }
    });
    
    // Обновляем мобильные кнопки
    const mobileLangButtons = document.querySelectorAll('.mobile-lang-btn[data-lang]');
    mobileLangButtons.forEach(button => {
        const lang = button.getAttribute('data-lang');
        if (lang === currentLang) {
            button.classList.add('active');
            button.style.backgroundColor = 'rgb(59, 130, 246)';
            button.style.color = 'white';
            button.style.borderColor = 'rgb(59, 130, 246)';
        } else {
            button.classList.remove('active');
            button.style.backgroundColor = '';
            button.style.color = '';
            button.style.borderColor = '';
        }
    });
}

console.log('🎉 main.js полностью загружен!');
console.log('🔍 testEmailJS доступна?', typeof window.testEmailJS); 