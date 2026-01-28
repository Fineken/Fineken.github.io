const translations = {
    en: {
        // Навигация
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.education': 'Education',
        'nav.publications': 'Publications',
        'nav.skills': 'Skills & Technologies',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        
        // Мобильная навигация
        'mobile.navigation': 'Navigation',
        'mobile.language': 'Language:',
        
        // Мета-данные страницы
        'page.title': 'Danil Zolotarev - DevOps Engineer | ML | Security',
        'page.description': 'Portfolio of Danil Zolotarev - DevOps engineer, machine learning and cybersecurity specialist',
        
        // Заголовки секций
        'section.about': 'About',
        'section.education': 'Education',
        'section.publications': 'Publications',
        'section.contacts': 'Contact',
        'section.skills': 'Skills & Technologies',
        'section.projects': 'Projects',
        'section.key_achievements': 'Key achievements:',

        // Hero секция
        'hero.name': 'Danil Zolotarev',
        'hero.title': 'DevOps Engineer | Machine Learning | Information Security',
        'hero.greeting': 'Hi, I\'m',
        'hero.subtitle': 'Automating infrastructure, optimizing deployments, and building scalable cloud solutions',
        'hero.cta': 'Get in touch',
        'hero.download_cv': 'Download CV',
        'hero.contact_me': 'Contact me',
        
        // About секция
        'about.title': 'About Me',
        'about.p1': 'DevOps engineer with 4+ years building high-load, highly available services. Expert in containerization, Kubernetes orchestration and CI/CD automation; practice DevSecOps — HashiCorp Vault, Helm, SAST/DAST, IaC. Built ML anomaly detectors and XDR scenarios to protect cloud infrastructure.',
        'about.p2': 'MIPT graduate student (SberTech dept); author of 11 publications, including Scopus papers on threat intelligence and LLM. Student and participant of engineering schools by Yandex, Tinkoff and Positive Technologies.',
        // Education — MIPT
        'education.lead': 'Continuous growth in high-load systems, cybersecurity and financial technologies',
        'edu.mipt.title': 'Moscow Institute of Physics and Technology (MIPT)',
        'edu.mipt.degree': 'Master • High-load systems',
        'edu.mipt.school': 'School of Applied Mathematics and Informatics, SberTech department',
        'edu.mipt.thesis_label': '🎓 Master thesis',
        'edu.mipt.thesis_name': '"Models and algorithms for processing weakly-structured data in cyber intelligence centers"',
        'edu.mipt.grade': 'Grade: Excellent (9)',
        'edu.mipt.status': 'Status: Defended with honors',
        'edu.mipt.specialization': 'Specialization: High-load systems',
        'edu.mipt.thesis_desc': 'Research on processing weakly-structured threat intelligence data using modern machine learning algorithms and large language models. Development of architectural solutions for cyber intelligence centers.',
        'edu.mipt.ach1': 'Designed a modular architecture for cyber intelligence data processing',
        'edu.mipt.ach2': 'Applied LLM and RAG technologies for threat analysis',
        'edu.mipt.ach3': 'Developed algorithms for weakly-structured information processing',
        'edu.mipt.ach4': 'Published results at an international Scopus-indexed conference',
        'edu.mipt.summary': 'Studied at the SberTech department with focus on fault-tolerant, high-load systems. Active research activity with Scopus publications on threat intelligence and using LLMs in cybersecurity.',

        // Education — International Banking Institute (IBI)
        'edu.ibi.title': 'International Banking Institute',
        'edu.ibi.degree': 'Financial Management',
        'edu.ibi.desc': 'Additional education in financial management to expand expertise in FinTech and applying DevOps practices in financial organizations.',
        'edu.ibi.tag_fin_mgmt': 'Financial management',

        // Education — USATU (UGATU)
        'edu.ugatu.title': 'Ufa State Aviation Technical University (USATU)',
        'edu.ugatu.degree': 'Bachelor • Information Security',
        'edu.ugatu.school': 'Institute of Computer Science and Robotics, 10.03.01 "Information Security"',
        'edu.ugatu.thesis_label': '🎓 Bachelor thesis',
        'edu.ugatu.thesis_name': '"Development of a comprehensive protection solution for VMware‑based virtualization systems"',
        'edu.ugatu.grade': 'Grade: Excellent (5)',
        'edu.ugatu.volume': 'Volume: 60 pages, 28 figures, 1 table, 20 references',
        'edu.ugatu.recommendation': 'Recommendation: Award master’s qualification',
        'edu.ugatu.desc': 'Developed a comprehensive solution to ensure information security of VMware Workstation virtualized systems. The solution includes a software firewall, intranet intrusion detector, scanning tools and antivirus software.',
        'edu.ugatu.ach1': 'Research of methods and technologies for protecting virtualization systems',
        'edu.ugatu.ach2': 'Analysis of VMware Workstation vulnerabilities and exploitation methods',
        'edu.ugatu.ach3': 'Development of an integrated security solution',
        'edu.ugatu.ach4': 'Performance evaluation with a 20× acceleration of processing',

        // Tags (chips)
        'tags.infosec': 'Information Security',
        'tags.cryptography': 'Cryptography',
        'tags.network_security': 'Network Security',
        'tags.virtualization': 'Virtualization',

        // Publications — filters and table
        'pub.filters.all': 'All publications',
        'pub.filters.security.long': 'Information Security',
        'pub.filters.security.short': 'Security',
        'pub.filters.devops': 'DevOps',
        'pub.filters.ml.long': 'Machine Learning',
        'pub.filters.ml.short': 'ML',
        'pub.filters.humanities.long': 'Humanities',
        'pub.filters.humanities.short': 'Humanities',
        'pub.table.title': 'Title',
        'pub.table.year': 'Year',
        'pub.table.category': 'Category',
        'pub.table.venue': 'Journal/Conference',
        'pub.table.actions': 'Actions',

        // Publications — chart
        'pub.chart.title': 'Publications by year',

        // Contact labels
        'contact.email_label': 'Email',
        'contact.phone_label': 'Phone',
        'contact.telegram_label': 'Telegram',
        'contact.location_label': 'Location',

        // Footer
        'footer.name': 'Danil Zolotarev',
        'footer.copyright': 'All rights reserved.',
        'footer.made_with': 'Built with Docker, TailwindCSS and modern web technologies',
        
        // Experience секция
        'experience.title': 'Experience',
        'experience.current.title': 'Senior DevOps Engineer',
        'experience.current.company': 'Tech Company',
        'experience.current.period': '2022 - Present',
        'experience.current.desc': 'Leading infrastructure automation initiatives, implementing Kubernetes clusters, and optimizing CI/CD processes for development teams.',
        
        'experience.previous.title': 'DevOps Engineer',
        'experience.previous.company': 'Startup Inc',
        'experience.previous.period': '2020 - 2022',
        'experience.previous.desc': 'Built and maintained deployment pipelines, managed cloud infrastructure on AWS, and implemented monitoring solutions.',
        
        'experience.junior.title': 'Junior System Administrator',
        'experience.junior.company': 'IT Solutions',
        'experience.junior.period': '2019 - 2020',
        'experience.junior.desc': 'Managed Linux servers, automated routine tasks, and provided technical support for internal systems.',
        
        // Skills секция
        'skills.title': 'Technical Skills',
        'skills.devops.title': 'DevOps & Automation',
        'skills.devops.desc': 'CI/CD pipelines, Infrastructure as Code, automation scripting',
        
        'skills.cloud.title': 'Cloud & Containers',
        'skills.cloud.desc': 'AWS, Docker, Kubernetes, microservices architecture',
        
        'skills.monitoring.title': 'Monitoring & Observability',
        'skills.monitoring.desc': 'Grafana, Prometheus, ELK stack, alerting systems',
        
        'skills.security.title': 'Security & Compliance',
        'skills.security.desc': 'Security scanning, vulnerability management, compliance automation',
        
        // Contact секция
        'contact.title': 'Get In Touch',
        'contact.subtitle': 'Ready to discuss your infrastructure needs?',
        'contact.cta': 'Contact me',
        
        // Footer
        'footer.text': 'Built with passion for automation and scalability',
        
        // Кнопки
        'button.learn-more': 'Learn More',
        'button.view-project': 'View Project',
        'button.download-cv': '',
        
        // Общие
        'common.years-experience': 'Years Experience',
        'common.projects-completed': 'Projects Completed',
        'common.technologies-used': 'Technologies Used',
        'common.certifications': 'Certifications',
        
        // Статистика превью
        'stats.years_exp': 'Years of experience',
        'stats.publications': 'Publications',
        'stats.workstations': 'Workstations',
        'stats.team_size': 'Team size',
        
        // Проекты лид
        'projects.lead': 'Featured projects in DevOps, cybersecurity and machine learning',
        
        // Контакты/форма
        'contact.get_in_touch': 'Get in touch',
        'contact.subtitle': 'Ready for new challenges and exciting projects',
        'form.name': 'Name',
        'form.email': 'Email',
        'form.message': 'Message',
        'form.send': 'Send message'
    },
    
    ru: {
        // Навигация
        'nav.home': 'Главная',
        'nav.about': 'Обо мне',
        'nav.education': 'Образование',
        'nav.publications': 'Публикации',
        'nav.skills': 'Навыки и технологии',
        'nav.projects': 'Проекты',
        'nav.contact': 'Контакты',
        
        // Мобильная навигация
        'mobile.navigation': 'Навигация',
        'mobile.language': 'Язык:',
        
        // Мета-данные страницы
        'page.title': 'Данил Золотарев - DevOps Engineer | ML | Security',
        'page.description': 'Портфолио Данила Золотарева - DevOps инженер, специалист по машинному обучению и информационной безопасности',
        
        // Заголовки секций
        'section.about': 'О себе',
        'section.education': 'Образование',
        'section.publications': 'Научные публикации',
        'section.contacts': 'Контакты',
        'section.skills': 'Навыки и технологии',
        'section.projects': 'Проекты',
        'section.key_achievements': 'Ключевые достижения:',

        // Hero секция
        'hero.name': 'Данил Золотарев',
        'hero.title': 'DevOps Engineer | Machine Learning | Information Security',
        'hero.greeting': 'Привет, я',
        'hero.subtitle': 'Автоматизирую инфраструктуру, оптимизирую развертывания и создаю масштабируемые облачные решения',
        'hero.cta': 'Связаться',
        'hero.download_cv': 'Скачать CV',
        'hero.contact_me': 'Связаться со мной',
        
        // About секция
        'about.title': 'Обо мне',
        'about.p1': 'DevOps-инженер с 4-летним опытом построения высоконагруженных и отказоустойчивых сервисов. Эксперт в контейнеризации, Kubernetes-оркестрации и автоматизации CI/CD; практикую DevSecOps — HashiCorp Vault, Helm, SAST/DAST, IaC. Реализовал ML-детекторы аномалий и XDR-сценарии для защиты облачной инфраструктуры.',
        'about.p2': 'Магистрант МФТИ (каф. СберТех); автор 11 публикаций, в т. ч. Scopus-статей по threat intelligence и LLM. Студент и участник инженерных школ Яндекс, Тинькофф и Positive Technologies.',
        // Education — MIPT
        'education.lead': 'Непрерывное развитие в области высоконагруженных систем, информационной безопасности и финансовых технологий',
        'edu.mipt.title': 'Московский физико-технический институт (МФТИ)',
        'edu.mipt.degree': 'Магистр • Высоконагруженные системы',
        'edu.mipt.school': 'Физтех-школа Прикладной Математики и Информатики, кафедра СберТех',
        'edu.mipt.thesis_label': '🎓 Магистерская диссертация',
        'edu.mipt.thesis_name': '"Модели и алгоритмы обработки слабоструктурированных данных в центрах киберразведки"',
        'edu.mipt.grade': 'Оценка: Отлично (9)',
        'edu.mipt.status': 'Статус: Защищён с отличием',
        'edu.mipt.specialization': 'Направление: Высоконагруженные системы',
        'edu.mipt.thesis_desc': 'Исследование методов обработки слабоструктурированных данных threat intelligence с применением современных алгоритмов машинного обучения и больших языковых моделей. Разработка архитектурных решений для центров киберразведки.',
        'edu.mipt.ach1': 'Разработка модульной архитектуры для обработки данных киберразведки',
        'edu.mipt.ach2': 'Применение LLM и RAG технологий для анализа угроз',
        'edu.mipt.ach3': 'Создание алгоритмов обработки слабоструктурированной информации',
        'edu.mipt.ach4': 'Публикация результатов в международной конференции Scopus',
        'edu.mipt.summary': 'Обучение на кафедре СберТех с фокусом на построение отказоустойчивых и высоконагруженных систем. Активная научная деятельность с публикациями в Scopus по threat intelligence и применению LLM в кибербезопасности.',

        // Education — International Banking Institute (IBI)
        'edu.ibi.title': 'Международный банковский институт',
        'edu.ibi.degree': 'Финансовый менеджмент',
        'edu.ibi.desc': 'Дополнительное образование в области финансового менеджмента для расширения экспертизы в финтех и применения DevOps практик в финансовых организациях.',
        'edu.ibi.tag_fin_mgmt': 'Финансовый менеджмент',

        // Education — USATU (UGATU)
        'edu.ugatu.title': 'Уфимский государственный авиационный технический университет (УГАТУ)',
        'edu.ugatu.degree': 'Бакалавр • Информационная безопасность',
        'edu.ugatu.school': 'Институт информатики и робототехники, 10.03.01 «Информационная безопасность»',
        'edu.ugatu.thesis_label': '🎓 Выпускная квалификационная работа',
        'edu.ugatu.thesis_name': '"Разработка комплексного решения защиты систем виртуализации на базе VMware"',
        'edu.ugatu.grade': 'Оценка: Отлично (5)',
        'edu.ugatu.volume': 'Объем: 60 страниц, 28 рисунков, 1 таблица, 20 источников',
        'edu.ugatu.recommendation': 'Рекомендация: Присвоить квалификацию магистра',
        'edu.ugatu.desc': 'Разработано комплексное решение для обеспечения информационной безопасности виртуализированных систем VMware Workstation. Решение включает программный межсетевой экран, интранет-интрузион-детектор, инструменты сканирования и антивирусное ПО.',
        'edu.ugatu.ach1': 'Исследование методов и технологий защиты систем виртуализации',
        'edu.ugatu.ach2': 'Анализ уязвимостей VMware Workstation и методов их эксплуатации',
        'edu.ugatu.ach3': 'Разработка интегрированного решения безопасности',
        'edu.ugatu.ach4': 'Оценка эффективности с 20-кратным ускорением обработки',

        // Tags (chips)
        'tags.infosec': 'Информационная безопасность',
        'tags.cryptography': 'Криптография',
        'tags.network_security': 'Сетевая безопасность',
        'tags.virtualization': 'Виртуализация',

        // Publications — filters and table
        'pub.filters.all': 'Все публикации',
        'pub.filters.security.long': 'Информационная безопасность',
        'pub.filters.security.short': 'Безопасность',
        'pub.filters.devops': 'DevOps',
        'pub.filters.ml.long': 'Машинное обучение',
        'pub.filters.ml.short': 'ML',
        'pub.filters.humanities.long': 'Гуманитарные науки',
        'pub.filters.humanities.short': 'Гуманитарные',
        'pub.table.title': 'Название',
        'pub.table.year': 'Год',
        'pub.table.category': 'Категория',
        'pub.table.venue': 'Журнал/Конференция',
        'pub.table.actions': 'Действия',

        // Publications — chart
        'pub.chart.title': 'Статистика публикаций по годам',

        // Contact labels
        'contact.email_label': 'Email',
        'contact.phone_label': 'Телефон',
        'contact.telegram_label': 'Telegram',
        'contact.location_label': 'Местоположение',

        // Footer
        'footer.name': 'Данил Золотарев',
        'footer.copyright': 'Все права защищены.',
        'footer.made_with': 'Создано с использованием Docker, TailwindCSS и современных веб-технологий',
        
        // Experience секция
        'experience.title': 'Опыт работы',
        'experience.current.title': 'Старший DevOps Инженер',
        'experience.current.company': 'Технологическая компания',
        'experience.current.period': '2022 - Настоящее время',
        'experience.current.desc': 'Руковожу инициативами по автоматизации инфраструктуры, внедряю кластеры Kubernetes и оптимизирую CI/CD процессы для команд разработки.',
        
        'experience.previous.title': 'DevOps Инженер',
        'experience.previous.company': 'Стартап',
        'experience.previous.period': '2020 - 2022',
        'experience.previous.desc': 'Создавал и поддерживал пайплайны развертывания, управлял облачной инфраструктурой на AWS, внедрял решения для мониторинга.',
        
        'experience.junior.title': 'Младший системный администратор',
        'experience.junior.company': 'IT Решения',
        'experience.junior.period': '2019 - 2020',
        'experience.junior.desc': 'Управлял Linux серверами, автоматизировал рутинные задачи и обеспечивал техническую поддержку внутренних систем.',
        
        // Skills секция
        'skills.title': 'Технические навыки',
        'skills.devops.title': 'DevOps и Автоматизация',
        'skills.devops.desc': 'CI/CD пайплайны, Infrastructure as Code, скрипты автоматизации',
        
        'skills.cloud.title': 'Облако и Контейнеры',
        'skills.cloud.desc': 'AWS, Docker, Kubernetes, архитектура микросервисов',
        
        'skills.monitoring.title': 'Мониторинг и Наблюдаемость',
        'skills.monitoring.desc': 'Grafana, Prometheus, ELK стек, системы оповещений',
        
        'skills.security.title': 'Безопасность и Соответствие',
        'skills.security.desc': 'Сканирование безопасности, управление уязвимостями, автоматизация соответствия',
        
        // Contact секция
        'contact.title': 'Связаться со мной',
        'contact.subtitle': 'Готовы обсудить ваши потребности в инфраструктуре?',
        'contact.cta': 'Написать мне',
        
        // Footer
        'footer.text': 'Создано с страстью к автоматизации и масштабируемости',
        
        // Кнопки
        'button.learn-more': 'Узнать больше',
        'button.view-project': 'Посмотреть проект',
        'button.download-cv': 'Скачать резюме',
        
        // Общие
        'common.years-experience': 'Лет опыта',
        'common.projects-completed': 'Завершенных проектов',
        'common.technologies-used': 'Используемых технологий',
        'common.certifications': 'Сертификаций',
        
        // Статистика превью
        'stats.years_exp': 'Года опыта',
        'stats.publications': 'Публикаций',
        'stats.workstations': 'Рабочих станций',
        'stats.team_size': 'Человек в команде',
        
        // Проекты лид
        'projects.lead': 'Избранные проекты в области DevOps, информационной безопасности и машинного обучения',
        
        // Контакты/форма
        'contact.get_in_touch': 'Свяжитесь со мной',
        'contact.subtitle': 'Готов к новым вызовам и интересным проектам',
        'form.name': 'Имя',
        'form.email': 'Email',
        'form.message': 'Сообщение',
        'form.send': 'Отправить сообщение'
    }
};

// Система интернационализации
class I18n {
    constructor() {
        this.currentLanguage = 'en'; // По умолчанию английский
        this.translations = translations;
        this.init();
    }
    
    init() {
        // Получаем сохраненный язык или используем английский
        const savedLang = localStorage.getItem('preferred-language') || 'en';
        this.setLanguage(savedLang);
    }
    
    translate(key) {
        const lang = this.currentLanguage || 'en';

        // 1) Сначала пробуем плоский ключ ("nav.home")
        const flatCurrent = this.translations[lang] && this.translations[lang][key];
        if (typeof flatCurrent === 'string') return flatCurrent;

        const flatEn = this.translations.en && this.translations.en[key];
        if (typeof flatEn === 'string') return flatEn;

        // 2) Затем пробуем вложенные ключи (nav -> home)
        const keys = key.split('.');
        const readNested = (obj) => {
            let cur = obj;
            for (const k of keys) {
                if (cur && typeof cur === 'object' && k in cur) {
                    cur = cur[k];
                } else {
                    return undefined;
                }
            }
            return cur;
        };

        const nestedCurrent = readNested(this.translations[lang]);
        if (typeof nestedCurrent === 'string') return nestedCurrent;

        const nestedEn = readNested(this.translations.en);
        if (typeof nestedEn === 'string') return nestedEn;

        // 3) Ничего не нашли — вернем ключ (для диагностики)
        console.warn(`Перевод не найден для ключа: ${key}`);
        return key;
    }
    
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('preferred-language', lang);
            this.translatePage();
            this.updateLanguageSelector();
            this.updatePageLanguage();
        }
    }
    
    translatePage() {
        // Переводим все элементы с data-i18n атрибутом
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            // Проверяем есть ли data-i18n-attr для перевода атрибутов
            const attrKey = element.getAttribute('data-i18n-attr');
            if (attrKey) {
                element.setAttribute(attrKey, translation);
            } else {
                // Для элементов с дочерними элементами (например, span внутри a)
                if (element.children.length === 0) {
                    element.textContent = translation;
                } else {
                    // Если есть дочерние элементы, ищем текстовые узлы
                    const textNodes = Array.from(element.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
                    if (textNodes.length > 0) {
                        textNodes[0].textContent = translation;
                    } else {
                        element.textContent = translation;
                    }
                }
            }
        });
    }
    
    updateLanguageSelector() {
        // Обновляем состояние переключателей языка
        const langButtons = document.querySelectorAll('[data-lang]');
        langButtons.forEach(button => {
            const lang = button.getAttribute('data-lang');
            if (lang === this.currentLanguage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    updatePageLanguage() {
        // Обновляем lang атрибут HTML элемента
        document.documentElement.lang = this.currentLanguage;
        
        // Обновляем мета-теги если нужно
        const htmlLangMeta = document.querySelector('meta[name="language"]');
        if (htmlLangMeta) {
            htmlLangMeta.setAttribute('content', this.currentLanguage);
        }
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    getAvailableLanguages() {
        return Object.keys(this.translations);
    }
}

// Создаем глобальный экземпляр
window.i18n = new I18n();

// Экспортируем для использования в модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { I18n, translations };
}
