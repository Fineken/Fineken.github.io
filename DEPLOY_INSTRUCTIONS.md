# 🚀 Быстрое развертывание на GitHub Pages

## Пошаговая инструкция

### 1. Создание репозитория
1. Перейдите на [GitHub.com](https://github.com)
2. Нажмите "New repository"
3. Назовите репозиторий (например: `portfolio` или `{username}.github.io`)
4. Сделайте репозиторий публичным
5. Не добавляйте README, .gitignore или license (они уже есть)

### 2. Загрузка файлов
```bash
# Клонируйте созданный репозиторий
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

# Скопируйте все файлы из папки Github_pages в корень репозитория
# (все файлы из этой папки должны оказаться в корне репозитория)

# Добавьте файлы в git
git add .
git commit -m "Initial commit: Portfolio website"
git push origin main
```

### 3. Настройка GitHub Pages
1. В репозитории перейдите в **Settings**
2. В левом меню найдите **Pages**
3. В разделе "Source" выберите **Deploy from a branch**
4. Branch: **main** (или **master**)
5. Folder: **/ (root)**
6. Нажмите **Save**

### 4. Проверка
- Ваш сайт будет доступен через 2-10 минут
- URL: `https://yourusername.github.io/repository-name`
- Или `https://yourusername.github.io` (если репозиторий назван `{username}.github.io`)

## ⚡ Важные файлы

- ✅ `.nojekyll` - отключает Jekyll обработку
- ✅ `index.html` - главная страница
- ✅ `404.html` - страница ошибки 404
- ✅ `robots.txt` - для поисковых роботов
- ✅ `sitemap.xml` - карта сайта
- ✅ `.gitignore` - исключения для git

## 🎨 Персонализация

### Обновление контактов
В файле `index.html` замените:
- Email: `danilzolotarev1980@gmail.com`
- Telegram: `@My_Workstation`
- Телефон: `+7 (927) 352-42-35`

### Настройка EmailJS (форма обратной связи)
1. Зарегистрируйтесь на [EmailJS](https://www.emailjs.com/)
2. Создайте email service
3. Создайте email template
4. В `index.html` (строки 90-97) обновите:
   - `service_id`: ваш Service ID
   - `template_id`: ваш Template ID  
   - `publicKey`: ваш Public Key

### Замена фото и CV
- Фото: `assets/images/Photo.jpg`
- CV: `assets/cv/Резюме.pdf`
- Дипломы: папка `data/`

## 🔧 Возможные проблемы

### Сайт не отображается
- Проверьте, что файлы в корне репозитория
- Убедитесь, что `.nojekyll` существует
- Подождите 10-15 минут после первой загрузки

### Форма не отправляется
- Настройте EmailJS согласно инструкции выше
- Проверьте публичный ключ в консоли браузера

### Изображения не загружаются
- Убедитесь, что путь `assets/images/` сохранен
- Проверьте, что файлы загружены в репозиторий

## 📞 Поддержка

При возникновении проблем:
- Email: danilzolotarev1980@gmail.com
- Telegram: @My_Workstation

---
🎉 **Удачи с развертыванием!**
