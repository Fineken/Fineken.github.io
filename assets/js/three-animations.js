0// Three.js анимации для сайта
console.log('🎯 Three.js animations loading...');

// Список технологий с реальными логотипами
const techStack = [
    // Контейнеризация и оркестрация
    { name: 'Docker', symbol: '🐳', color: 0x2496ED, logo: 'assets/images/tech-logos/docker.svg' },
    { name: 'Kubernetes', symbol: '☸️', color: 0x326CE5, logo: 'assets/images/tech-logos/kubernetes.svg' },
    
    // CI/CD и DevOps инструменты
    { name: 'Jenkins', symbol: 'J', color: 0xD33833, logo: 'assets/images/tech-logos/jenkins.svg' },
    { name: 'GitLab', symbol: 'G', color: 0xFC6D26, logo: 'assets/images/tech-logos/gitlab.svg' },
    { name: 'Git', symbol: '🔗', color: 0xF05032, logo: 'assets/images/tech-logos/git.svg' },
    { name: 'GitHub', symbol: '🐙', color: 0x181717, logo: 'assets/images/tech-logos/github.svg' },
    { name: 'Bitbucket', symbol: 'B', color: 0x0052CC, logo: 'assets/images/tech-logos/bitbucket.svg' },
    { name: 'Airflow', symbol: 'A', color: 0x017CEE, logo: 'assets/images/tech-logos/airflow.svg' },
    { name: 'SonarQube', symbol: 'S', color: 0x4E9BCD, logo: 'assets/images/tech-logos/sonarqube.svg' },
    { name: 'Jira', symbol: 'J', color: 0x0052CC, logo: 'assets/images/tech-logos/jira.svg' },
    { name: 'Confluence', symbol: 'C', color: 0x172B4D, logo: 'assets/images/tech-logos/confluence.svg' },
    
    // Мониторинг и аналитика
    { name: 'Grafana', symbol: '📊', color: 0xF46800, logo: 'assets/images/tech-logos/grafana.svg' },
    { name: 'Prometheus', symbol: 'P', color: 0xE6522C, logo: 'assets/images/tech-logos/prometheus.svg' },
    { name: 'Elasticsearch', symbol: 'E', color: 0x005571, logo: 'assets/images/tech-logos/elasticsearch.svg' },
    
    // Конфигурационное управление
    { name: 'Ansible', symbol: 'A', color: 0xEE0000, logo: 'assets/images/tech-logos/ansible.svg' },
    { name: 'Bash', symbol: '💻', color: 0x4EAA25, logo: 'assets/images/tech-logos/bash.svg' },
    { name: 'Python', symbol: '🐍', color: 0x3776AB, logo: 'assets/images/tech-logos/python.svg' },
    
    // Базы данных и очереди сообщений
    { name: 'PostgreSQL', symbol: '🐘', color: 0x336791, logo: 'assets/images/tech-logos/postgresql.svg' },
    { name: 'MySQL', symbol: 'M', color: 0x4479A1, logo: 'assets/images/tech-logos/mysql.svg' },
    { name: 'MongoDB', symbol: '🍃', color: 0x47A248, logo: 'assets/images/tech-logos/mongodb.svg' },
    { name: 'Redis', symbol: 'R', color: 0xDC382D, logo: 'assets/images/tech-logos/redis.svg' },
    { name: 'Kafka', symbol: 'K', color: 0x231F20, logo: 'assets/images/tech-logos/kafka.svg' },
    
    // Сетевые и веб-технологии
    { name: 'Nginx', symbol: 'N', color: 0x269539, logo: 'assets/images/tech-logos/nginx.svg' },
    { name: 'HAProxy', symbol: 'H', color: 0x106da9, logo: 'assets/images/tech-logos/haproxy.svg' },
    
    // ОС и виртуализация
    { name: 'Linux', symbol: '🐧', color: 0xFCC624, logo: 'assets/images/tech-logos/linux.svg' },
    { name: 'Ubuntu', symbol: 'U', color: 0xE95420, logo: 'assets/images/tech-logos/ubuntu.svg' },
    { name: 'Debian', symbol: 'D', color: 0xA81D33, logo: 'assets/images/tech-logos/debian.svg' },
    
    // Облако и хранилище
    { name: 'AWS', symbol: '☁️', color: 0xFF9900, logo: 'assets/images/tech-logos/aws.svg' },
    { name: 'MinIO', symbol: 'M', color: 0xC72E29, logo: 'assets/images/tech-logos/minio.svg' },
    
    // Безопасность и управление паролями
    { name: 'Vault', symbol: '🔒', color: 0x000000, logo: 'assets/images/tech-logos/vault.svg' },
    { name: 'Bitwarden', symbol: 'B', color: 0x175DDC, logo: 'assets/images/tech-logos/bitwarden.svg' },
    
    // Контейнеры и оркестрация
    { name: 'Rancher', symbol: 'R', color: 0x0075A8, logo: 'assets/images/tech-logos/rancher.svg' },
    
    // Исправленный мониторинг
    { name: 'Zabbix', symbol: 'Z', color: 0xD40000, logo: 'assets/images/tech-logos/zabbix.svg' },
    
    // Дополнительные технологии (fallback без логотипов)
    { name: 'Terraform', symbol: 'T', color: 0x7B42BC },
    { name: 'Nexus', symbol: 'N', color: 0x00A9CE },
    { name: 'Artifactory', symbol: 'A', color: 0x41BF47 },
    { name: 'Keycloak', symbol: 'K', color: 0x4d4d4d },
    { name: 'Logstash', symbol: 'L', color: 0xFEC514 },
    { name: 'Kibana', symbol: 'K', color: 0xE8478B },
    { name: 'Opensearch', symbol: 'O', color: 0x005eb8 },
    { name: 'Superset', symbol: 'S', color: 0x20A7C9 },
    { name: 'KVM', symbol: 'V', color: 0xE1251B },
    { name: 'Helm', symbol: 'H', color: 0x0F1689 },
    { name: 'ArgoCD', symbol: '🚀', color: 0xEF7B4D },
    { name: 'Microtik', symbol: 'M', color: 0x293137 },
    { name: 'RocketChat', symbol: 'R', color: 0xF5455C }
];

class ThreeJSAnimations {
    constructor(performanceLevel = 'medium') {
        this.heroScene = null;
        this.heroRenderer = null;
        this.heroCamera = null;
        this.particles = null;
        this.animationId = null;
        
        // Tech logos
        this.techLogos = [];
        this.techLogosGroup = null;
        this.logoTextures = new Map();
        
        // Skills sections
        this.skillsScenes = {};
        this.skillsRenderers = {};
        this.skillsCameras = {};
        this.skillsObjects = {};
        
        // Performance settings
        this.settings = performanceSettings[performanceLevel];
        this.performanceLevel = performanceLevel;
        
        this.init();
    }

    init() {
        if (typeof THREE === 'undefined') {
            console.error('❌ Three.js not loaded');
            return;
        }
        
        console.log('✅ Three.js loaded, initializing animations...');
        this.initHeroBackground();
        this.initSkillsAnimations();
        this.setupEventListeners();
    }

    initHeroBackground() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) {
            console.warn('⚠️ Hero canvas not found');
            return;
        }

        // Создаем сцену
        this.heroScene = new THREE.Scene();
        
        // Создаем камеру
        this.heroCamera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.heroCamera.position.z = 30;

        // Создаем рендерер
        this.heroRenderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        this.heroRenderer.setSize(window.innerWidth, window.innerHeight);
        this.heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, this.settings.pixelRatio));

        // Создаем систему частиц (уменьшенное количество)
        this.createParticleSystem();
        
        // Геометрические объекты отключены - используем только логотипы
        // this.createGeometricShapes();
        
        // Создаем летающие логотипы технологий
        this.createTechLogos();

        // Запускаем анимацию
        this.animateHero();
        
        console.log('✅ Hero 3D background initialized');
    }

    initSkillsAnimations() {
        const skillsCanvases = [
            { id: 'devops-canvas', type: 'devops', color: 0x3B82F6 },
            { id: 'security-canvas', type: 'security', color: 0x8B5CF6 },
            { id: 'development-canvas', type: 'development', color: 0x10B981 }
        ];

        skillsCanvases.forEach(canvasConfig => {
            this.initSkillCanvas(canvasConfig);
        });
    }

    initSkillCanvas({ id, type, color }) {
        const canvas = document.getElementById(id);
        if (!canvas) {
            console.warn(`⚠️ Canvas ${id} not found`);
            return;
        }

        // Получаем размеры родительского элемента
        const parent = canvas.parentElement;
        const rect = parent.getBoundingClientRect();

        // Создаем сцену
        const scene = new THREE.Scene();
        
        // Создаем камеру
        const camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);
        camera.position.z = 15;

        // Создаем рендерер
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(rect.width, rect.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.settings.pixelRatio));

        // Создаем объекты в зависимости от типа
        const objects = this.createSkillObjects(type, color);
        objects.forEach(obj => scene.add(obj));

        // Сохраняем ссылки
        this.skillsScenes[type] = scene;
        this.skillsCameras[type] = camera;
        this.skillsRenderers[type] = renderer;
        this.skillsObjects[type] = objects;

        // Добавляем обработчик наведения
        this.addSkillHoverEffect(canvas, type);

        console.log(`✅ ${type} 3D animation initialized`);
    }

    createSkillObjects(type, color) {
        const objects = [];

        switch (type) {
            case 'devops':
                // Создаем шестеренки и контейнеры
                for (let i = 0; i < this.settings.skillObjects.devops; i++) {
                    const geometry = new THREE.CylinderGeometry(0.5, 0.8, 0.3, 6);
                    const material = new THREE.MeshBasicMaterial({
                        color: color,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.6
                    });
                    const cylinder = new THREE.Mesh(geometry, material);
                    
                    cylinder.position.set(
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 10
                    );
                    
                    objects.push(cylinder);
                }
                break;

            case 'security':
                // Создаем щиты и защитные барьеры
                for (let i = 0; i < this.settings.skillObjects.security; i++) {
                    const geometry = new THREE.SphereGeometry(1, 8, 8);
                    const material = new THREE.MeshBasicMaterial({
                        color: color,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.7
                    });
                    const sphere = new THREE.Mesh(geometry, material);
                    
                    sphere.position.set(
                        (Math.random() - 0.5) * 18,
                        (Math.random() - 0.5) * 12,
                        (Math.random() - 0.5) * 8
                    );
                    
                    objects.push(sphere);
                }
                break;

            case 'development':
                // Создаем код-блоки и алгоритмы
                for (let i = 0; i < this.settings.skillObjects.development; i++) {
                    const geometry = new THREE.BoxGeometry(1, 1, 1);
                    const material = new THREE.MeshBasicMaterial({
                        color: color,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.5
                    });
                    const cube = new THREE.Mesh(geometry, material);
                    
                    cube.position.set(
                        (Math.random() - 0.5) * 16,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 6
                    );
                    
                    objects.push(cube);
                }
                break;
        }

        return objects;
    }

    addSkillHoverEffect(canvas, type) {
        const parent = canvas.parentElement;
        
        parent.addEventListener('mouseenter', () => {
            const objects = this.skillsObjects[type];
            if (objects) {
                objects.forEach(obj => {
                    obj.material.opacity = 1.0;
                    obj.scale.setScalar(1.2);
                });
            }
        });

        parent.addEventListener('mouseleave', () => {
            const objects = this.skillsObjects[type];
            if (objects) {
                objects.forEach(obj => {
                    obj.material.opacity = 0.6;
                    obj.scale.setScalar(1.0);
                });
            }
        });
    }

    createParticleSystem() {
        const particleCount = this.settings.particleCount;
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            // Позиции
            positions[i] = (Math.random() - 0.5) * 100;     // x
            positions[i + 1] = (Math.random() - 0.5) * 100; // y
            positions[i + 2] = (Math.random() - 0.5) * 100; // z
            
            // Скорости
            velocities[i] = (Math.random() - 0.5) * 0.02;
            velocities[i + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i + 2] = (Math.random() - 0.5) * 0.02;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

        const material = new THREE.PointsMaterial({
            color: 0x64B5F6,
            size: 2,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.heroScene.add(this.particles);
    }

    createGeometricShapes() {
        // Создаем несколько геометрических фигур
        const shapes = [];
        
        // Тор
        const torusGeometry = new THREE.TorusGeometry(8, 2, 8, 20);
        const torusMaterial = new THREE.MeshBasicMaterial({
            color: 0x667EEA,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.set(-20, 10, -20);
        shapes.push(torus);

        // Октаэдр
        const octahedronGeometry = new THREE.OctahedronGeometry(6);
        const octahedronMaterial = new THREE.MeshBasicMaterial({
            color: 0x764BA2,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
        octahedron.position.set(25, -15, -30);
        shapes.push(octahedron);

        // Икосаэдр
        const icosahedronGeometry = new THREE.IcosahedronGeometry(5);
        const icosahedronMaterial = new THREE.MeshBasicMaterial({
            color: 0x3B82F6,
            wireframe: true,
            transparent: true,
            opacity: 0.35
        });
        const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
        icosahedron.position.set(-15, -20, -25);
        shapes.push(icosahedron);

        // Добавляем все фигуры в сцену
        shapes.forEach(shape => {
            this.heroScene.add(shape);
        });

        this.geometricShapes = shapes;
    }

    async createTechLogos() {
        console.log('🎯 Загружаем реальные логотипы...');
        
        // Создаем группу для логотипов
        this.techLogosGroup = new THREE.Group();
        
        // Предзагружаем SVG логотипы
        await this.preloadLogoTextures();
        
        // Создаем логотипы только для тех технологий, где есть реальные файлы
        const logoTechs = techStack.filter(tech => tech.logo && this.logoTextures.has(tech.name));
        console.log(`📦 Найдено ${logoTechs.length} реальных логотипов:`, logoTechs.map(t => t.name));
        
        // Баланс логотипов и частиц
        const totalLogos = Math.max(25, this.settings.techLogos); // Минимум 25 логотипов
        
        for (let i = 0; i < totalLogos; i++) {
            if (logoTechs.length === 0) {
                console.warn('⚠️ Нет доступных логотипов для создания');
                break; 
            }
            
            const tech = logoTechs[i % logoTechs.length];
            const logoSprite = this.createRealLogoSprite(tech);
            
            if (!logoSprite) {
                console.warn(`⚠️ Не удалось создать спрайт для ${tech.name}`);
                continue;
            }
            
            // Случайное позиционирование в большей области
            logoSprite.position.set(
                (Math.random() - 0.5) * 140,
                (Math.random() - 0.5) * 90,
                (Math.random() - 0.5) * 70
            );
            
            // Увеличиваем размеры
            const scale = 3 + Math.random() * 4; // От 3 до 7
            logoSprite.scale.set(scale, scale, 1);
            
            // Добавляем данные для анимации
            logoSprite.userData = {
                tech: tech,
                originalScale: scale,
                rotationSpeed: (Math.random() - 0.5) * 0.008,
                floatSpeed: (Math.random() - 0.5) * 0.006,
                floatAmplitude: Math.random() * 1.5,
                time: Math.random() * Math.PI * 2,
                velocity: {
                    x: (Math.random() - 0.5) * 0.015,
                    y: (Math.random() - 0.5) * 0.012,
                    z: (Math.random() - 0.5) * 0.008
                }
            };
            
            this.techLogos.push(logoSprite);
            this.techLogosGroup.add(logoSprite);
        }
        
        this.heroScene.add(this.techLogosGroup);
        console.log(`✅ Создано ${this.techLogos.length} летающих логотипов технологий`);
    }

    async preloadLogoTextures() {
        const promises = [];
        
        for (const tech of techStack) {
            if (tech.logo) {
                const promise = this.loadSVGAsTransparentTexture(tech.logo, tech.name);
                promises.push(promise);
            }
        }
        
        await Promise.all(promises);
        console.log(`✅ Загружено ${this.logoTextures.size} прозрачных логотипов`);
    }

    async loadSVGAsTransparentTexture(svgPath, techName) {
        return new Promise((resolve) => {
            console.log(`📥 Загружаем ${techName} из ${svgPath}`);
            
            // Используем простой TextureLoader для SVG
            const loader = new THREE.TextureLoader();
            loader.load(
                svgPath,
                (texture) => {
                    console.log(`✅ Успешно загружен ${techName}`);
                    this.logoTextures.set(techName, texture);
                    resolve(texture);
                },
                (progress) => {
                    console.log(`📊 Загрузка ${techName}: ${Math.round(progress.loaded / progress.total * 100)}%`);
                },
                (error) => {
                    console.warn(`❌ Ошибка загрузки ${techName}:`, error);
                    // Пробуем альтернативный метод через Image
                    this.loadSVGViaImage(svgPath, techName).then(resolve);
                }
            );
        });
    }

    async loadSVGViaImage(svgPath, techName) {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                // Создаем canvas и рисуем SVG
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 256;
                canvas.height = 256;
                
                // Рисуем изображение по центру
                const size = Math.min(img.width, img.height);
                const scale = 200 / size; // Масштабируем до 200px
                const width = img.width * scale;
                const height = img.height * scale;
                const x = (256 - width) / 2;
                const y = (256 - height) / 2;
                
                ctx.drawImage(img, x, y, width, height);
                
                // Создаем текстуру
                const texture = new THREE.CanvasTexture(canvas);
                texture.needsUpdate = true;
                
                console.log(`✅ Альтернативная загрузка ${techName} успешна`);
                this.logoTextures.set(techName, texture);
                resolve(texture);
            };
            
            img.onerror = () => {
                console.warn(`❌ Полный провал загрузки ${techName}`);
                resolve(null);
            };
            
            img.src = svgPath;
        });
    }

    createRealLogoSprite(tech) {
        const logoTexture = this.logoTextures.get(tech.name);
        
        if (!logoTexture) {
            console.warn(`⚠️ Нет текстуры для ${tech.name}`);
            return null;
        }
        
        // Создаем материал с улучшенными настройками
        const material = new THREE.SpriteMaterial({
            map: logoTexture,
            transparent: true,
            opacity: 0.85,
            alphaTest: 0.3, // Убираем полупрозрачные края
            blending: THREE.NormalBlending
        });
        
        const sprite = new THREE.Sprite(material);
        return sprite;
    }

    createTransparentLogoSprite(tech) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const size = 64;
        
        canvas.width = size;
        canvas.height = size;
        
        // НЕ РИСУЕМ ФОН - оставляем прозрачным
        
        // Настройки для красивого текста
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        // Определяем размер шрифта
        let fontSize = size * 0.5;
        let fontFamily = 'Arial, sans-serif';
        
        // Для эмодзи используем специальные настройки
        if (tech.symbol.length > 1 || /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(tech.symbol)) {
            fontSize = size * 0.7;
            fontFamily = 'Apple Color Emoji, Segoe UI Emoji, sans-serif';
        }
        
        context.font = `${fontSize}px ${fontFamily}`;
        
        // Создаем контур (обводку)
        context.lineWidth = 3;
        context.strokeStyle = `#${tech.color.toString(16).padStart(6, '0')}`;
        context.strokeText(tech.symbol, size / 2, size / 2);
        
        // Заливаем символ белым
        context.fillStyle = 'white';
        context.fillText(tech.symbol, size / 2, size / 2);
        
        // Добавляем дополнительную обводку для яркости
        context.lineWidth = 1;
        context.strokeStyle = `#${Math.floor(tech.color * 0.8).toString(16).padStart(6, '0')}`;
        context.strokeText(tech.symbol, size / 2, size / 2);
        
        // Создаем текстуру
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        // Материал с полной прозрачностью фона
        const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.9,
            alphaTest: 0.2, // Убираем полупрозрачные пиксели
            blending: THREE.NormalBlending
        });
        
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(5, 5, 1);
        
        return sprite;
    }

    animateHero() {
        this.animationId = requestAnimationFrame(() => this.animateHero());

        // Анимация частиц (уменьшенное количество)
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            const velocities = this.particles.geometry.attributes.velocity.array;

            for (let i = 0; i < positions.length; i += 3) {
                // Обновляем позиции
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];

                // Граничные условия
                if (Math.abs(positions[i]) > 50) velocities[i] *= -1;
                if (Math.abs(positions[i + 1]) > 50) velocities[i + 1] *= -1;
                if (Math.abs(positions[i + 2]) > 50) velocities[i + 2] *= -1;
            }

            this.particles.geometry.attributes.position.needsUpdate = true;
            this.particles.rotation.y += 0.001;
        }

        // Анимация геометрических фигур отключена
        // if (this.geometricShapes) { ... }

        // Анимация логотипов технологий
        if (this.techLogos.length > 0) {
            this.animateTechLogos();
        }

        // Плавное движение камеры
        const time = Date.now() * 0.0005;
        this.heroCamera.position.x = Math.sin(time) * 2;
        this.heroCamera.position.y = Math.cos(time * 0.7) * 1;

        // Рендеринг
        this.heroRenderer.render(this.heroScene, this.heroCamera);
        
        // Анимация навыков
        this.animateSkills();
    }

    animateTechLogos() {
        const time = Date.now() * 0.001;
        
        this.techLogos.forEach((logo, index) => {
            const userData = logo.userData;
            
            // Обновляем время
            userData.time += userData.floatSpeed;
            
            // Постоянное движение с velocity
            logo.position.x += userData.velocity.x;
            logo.position.y += userData.velocity.y;
            logo.position.z += userData.velocity.z;
            
            // Дополнительное плавающее движение
            logo.position.y += Math.sin(userData.time) * userData.floatAmplitude * 0.003;
            logo.position.x += Math.cos(userData.time * 0.7) * 0.002;
            
            // Плавное вращение
            logo.rotation.z += userData.rotationSpeed;
            
            // Легкая пульсация
            const pulseFactor = 1 + Math.sin(time * 1.5 + index) * 0.08;
            logo.scale.set(
                userData.originalScale * pulseFactor,
                userData.originalScale * pulseFactor,
                1
            );
            
            // Граничные условия - отражение от границ
            const bounds = { x: 70, y: 45, z: 30 };
            
            if (logo.position.x > bounds.x || logo.position.x < -bounds.x) {
                userData.velocity.x *= -0.9; // Небольшое затухание
                logo.position.x = Math.max(-bounds.x, Math.min(bounds.x, logo.position.x));
            }
            if (logo.position.y > bounds.y || logo.position.y < -bounds.y) {
                userData.velocity.y *= -0.9;
                logo.position.y = Math.max(-bounds.y, Math.min(bounds.y, logo.position.y));
            }
            if (logo.position.z > bounds.z || logo.position.z < -bounds.z) {
                userData.velocity.z *= -0.9;
                logo.position.z = Math.max(-bounds.z, Math.min(bounds.z, logo.position.z));
            }
            
            // Добавляем хаотичность движения
            if (Math.random() < 0.003) {
                userData.velocity.x += (Math.random() - 0.5) * 0.001;
                userData.velocity.y += (Math.random() - 0.5) * 0.001;
                userData.velocity.z += (Math.random() - 0.5) * 0.0005;
                
                // Ограничиваем скорость
                const maxSpeed = 0.025;
                userData.velocity.x = Math.max(-maxSpeed, Math.min(maxSpeed, userData.velocity.x));
                userData.velocity.y = Math.max(-maxSpeed, Math.min(maxSpeed, userData.velocity.y));
                userData.velocity.z = Math.max(-maxSpeed, Math.min(maxSpeed, userData.velocity.z));
            }
        });
        
        // Медленное вращение всей группы
        if (this.techLogosGroup) {
            this.techLogosGroup.rotation.y += 0.0008;
        }
    }

    animateSkills() {
        const time = Date.now() * 0.001;
        
        // Анимируем объекты в каждой секции навыков
        Object.keys(this.skillsObjects).forEach(type => {
            const objects = this.skillsObjects[type];
            const scene = this.skillsScenes[type];
            const camera = this.skillsCameras[type];
            const renderer = this.skillsRenderers[type];
            
            if (objects && scene && camera && renderer) {
                objects.forEach((obj, index) => {
                    switch (type) {
                        case 'devops':
                            obj.rotation.y += 0.01 + index * 0.002;
                            obj.rotation.z += 0.005;
                            break;
                        case 'security':
                            obj.rotation.x += 0.008 + index * 0.001;
                            obj.rotation.y += 0.006;
                            obj.position.y += Math.sin(time + index) * 0.005;
                            break;
                        case 'development':
                            obj.rotation.x += 0.007;
                            obj.rotation.y += 0.009 + index * 0.001;
                            obj.position.x += Math.cos(time + index) * 0.003;
                            break;
                    }
                });
                
                renderer.render(scene, camera);
            }
        });
    }

    setupEventListeners() {
        // Обработка изменения размера окна
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Обработка движения мыши
        document.addEventListener('mousemove', (event) => this.onMouseMove(event));

        // Пауза анимации при потере фокуса
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimation();
            } else {
                this.resumeAnimation();
            }
        });
    }

    onWindowResize() {
        if (!this.heroCamera || !this.heroRenderer) return;

        this.heroCamera.aspect = window.innerWidth / window.innerHeight;
        this.heroCamera.updateProjectionMatrix();
        this.heroRenderer.setSize(window.innerWidth, window.innerHeight);
        
        // Обновляем размеры canvas для навыков
        Object.keys(this.skillsRenderers).forEach(type => {
            const renderer = this.skillsRenderers[type];
            const camera = this.skillsCameras[type];
            const canvas = renderer.domElement;
            const parent = canvas.parentElement;
            
            if (parent) {
                const rect = parent.getBoundingClientRect();
                camera.aspect = rect.width / rect.height;
                camera.updateProjectionMatrix();
                renderer.setSize(rect.width, rect.height);
            }
        });
    }

    onMouseMove(event) {
        if (!this.heroCamera) return;

        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Плавное следование камеры за мышью
        this.heroCamera.position.x += (mouseX * 5 - this.heroCamera.position.x) * 0.05;
        this.heroCamera.position.y += (mouseY * 5 - this.heroCamera.position.y) * 0.05;
        
        // Логотипы НЕ реагируют на мышь - летают независимо
    }

    pauseAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resumeAnimation() {
        if (!this.animationId) {
            this.animateHero();
        }
    }

    destroy() {
        this.pauseAnimation();
        
        if (this.heroRenderer) {
            this.heroRenderer.dispose();
        }
        
        if (this.heroScene) {
            this.heroScene.clear();
        }
    }
}

// Проверка производительности устройства
function getDevicePerformance() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) return 'low';
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
    
    // Проверяем тип устройства
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEndDevice = renderer.includes('Adreno') && (renderer.includes('3') || renderer.includes('4'));
    
    if (isMobile || isLowEndDevice) return 'low';
    if (navigator.hardwareConcurrency <= 2) return 'medium';
    
    return 'high';
}

// Настройки производительности
const performanceSettings = {
    low: {
        particleCount: 100, // Уменьшено в 2 раза
        skillObjects: { devops: 3, security: 2, development: 4 },
        techLogos: 15,
        pixelRatio: 1,
        antialias: false
    },
    medium: {
        particleCount: 250, // Уменьшено в 2 раза
        skillObjects: { devops: 5, security: 4, development: 6 },
        techLogos: 25,
        pixelRatio: 1.5,
        antialias: true
    },
    high: {
        particleCount: 400, // Уменьшено в 2 раза
        skillObjects: { devops: 8, security: 6, development: 10 },
        techLogos: 40,
        pixelRatio: 2,
        antialias: true
    }
};

// Инициализация после загрузки DOM
let threeAnimations = null;

function initThreeJS() {
    if (typeof THREE !== 'undefined') {
        const performance = getDevicePerformance();
        console.log(`🎯 Device performance: ${performance}`);
        
        threeAnimations = new ThreeJSAnimations(performance);
        console.log('🎯 Three.js animations initialized');
    } else {
        console.warn('⚠️ Three.js not available, retrying...');
        setTimeout(initThreeJS, 500);
    }
}

// Запуск инициализации
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initThreeJS, 100);
    });
} else {
    setTimeout(initThreeJS, 100);
}

// Экспорт для глобального доступа
window.threeAnimations = threeAnimations;
