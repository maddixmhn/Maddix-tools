const dorkCategories = {
  'SQL Injection': [
    { query: 'inurl:index.php?id=', desc: 'Generic SQLi vulnerable parameter in URL', descFa: 'پارامتر آسیب‌پذیر SQLi در URL' },
    { query: 'inurl:?id=', desc: 'Simple ID parameter SQLi target', descFa: 'هدف SQLi با پارامتر ساده id' },
    { query: 'intext:"sql syntax near"', desc: 'Pages revealing SQL syntax errors', descFa: 'صفحات دارای خطای نحوی SQL' },
    { query: 'intext:"mysql_fetch"', desc: 'MySQL fetch error disclosures', descFa: 'نمایش خطاهای دریافت MySQL' },
    { query: 'inurl:product.php?id=', desc: 'Product page SQLi parameter', descFa: 'پارامتر SQLi در صفحه محصول' },
    { query: 'inurl:item.php?id=', desc: 'Item page SQLi target', descFa: 'هدف SQLi در صفحه آیتم' },
    { query: 'inurl:article.php?id=', desc: 'Article page with SQLi parameter', descFa: 'صفحه مقاله با پارامتر SQLi' },
    { query: 'inurl:page.php?cat=', desc: 'Category-based SQLi parameter', descFa: 'پارامتر SQLi بر اساس دسته‌بندی' },
    { query: 'inurl:news.php?id=', desc: 'News page SQLi vector', descFa: 'بردار SQLi در صفحه خبر' },
    { query: 'inurl:gallery.php?id=', desc: 'Gallery page SQLi parameter', descFa: 'پارامتر SQLi در صفحه گالری' },
    { query: 'inurl:details.php?id=', desc: 'Details page with SQLi vector', descFa: 'جزئیات صفحه با بردار SQLi' },
    { query: 'inurl:view.php?id=', desc: 'View page SQLi parameter', descFa: 'پارامتر SQLi در صفحه مشاهده' },
    { query: 'inurl:show.php?id=', desc: 'Show page SQLi parameter', descFa: 'پارامتر SQLi در صفحه نمایش' },
    { query: 'inurl:news?id=', desc: 'News parameter with SQLi', descFa: 'پارامتر خبر با SQLi' },
    { query: 'inurl:topic.php?id=', desc: 'Topic page SQLi vector', descFa: 'بردار SQLi در صفحه موضوع' },
    { query: 'inurl:cat.php?id=', desc: 'Category page SQLi', descFa: 'SQLi در صفحه دسته‌بندی' },
    { query: 'inurl:shop.php?id=', desc: 'Shop page SQLi vector', descFa: 'بردار SQLi در صفحه فروشگاه' },
    { query: 'inurl:pr.php?id=', desc: 'Press release page SQLi', descFa: 'SQLi در صفحه بیانیه مطبوعاتی' },
    { query: 'inurl:post.php?id=', desc: 'Post page SQLi parameter', descFa: 'پارامتر SQLi در صفحه پست' },
    { query: 'inurl:event.php?id=', desc: 'Event page SQLi', descFa: 'SQLi در صفحه رویداد' },
    { query: 'inurl:albums.php?id=', desc: 'Album page SQLi', descFa: 'SQLi در صفحه آلبوم' },
    { query: 'inurl:photo.php?id=', desc: 'Photo page SQLi parameter', descFa: 'پارامتر SQLi در صفحه عکس' },
    { query: 'inurl:portfolio.php?id=', desc: 'Portfolio page SQLi', descFa: 'SQLi در صفحه نمونه کار' },
    { query: 'inurl:galeri.php?id=', desc: 'Gallery page SQLi (Turkish)', descFa: 'SQLi در صفحه گالری (ترکی)' },
    { query: 'inurl:urun.php?id=', desc: 'Product page SQLi (Turkish)', descFa: 'SQLi در صفحه محصول (ترکی)' },
  ],
  'File Upload': [
    { query: 'inurl:upload.php', desc: 'Generic file upload page', descFa: 'صفحه آپلود فایل عمومی' },
    { query: 'inurl:fileupload', desc: 'File upload functionality', descFa: 'عملکرد آپلود فایل' },
    { query: 'inurl:file-upload', desc: 'File upload with hyphen', descFa: 'آپلود فایل با خط فاصله' },
    { query: 'intitle:"index of" uploads', desc: 'Directory listing of uploads folder', descFa: 'لیست پوشه آپلودها' },
    { query: 'inurl:uploadify', desc: 'Uploadify plugin instances', descFa: 'نمونه‌های پلاگین Uploadify' },
    { query: 'inurl:dropzone', desc: 'Dropzone.js upload implementations', descFa: 'پیاده‌سازی‌های Dropzone.js' },
    { query: 'inurl:ckfinder', desc: 'CKFinder file manager upload', descFa: 'مدیریت فایل CKFinder' },
    { query: 'inurl:filemanager', desc: 'Generic file manager upload pages', descFa: 'صفحات مدیریت فایل عمومی' },
    { query: 'inurl:plupload', desc: 'Plupload file uploader instances', descFa: 'نمونه‌های Plupload' },
    { query: 'inurl:ajaxfileupload', desc: 'AJAX file upload scripts', descFa: 'اسکریپت‌های آپلود AJAX' },
    { query: 'inurl:uploadify.php', desc: 'Uploadify PHP backend', descFa: 'بک‌اند PHP Uploadify' },
    { query: 'inurl:simple-upload', desc: 'Simple upload scripts', descFa: 'اسکریپت‌های آپلود ساده' },
    { query: 'inurl:file_upload', desc: 'File upload with underscore', descFa: 'آپلود فایل با زیرخط' },
    { query: 'inurl:upload_file', desc: 'Upload file scripts', descFa: 'اسکریپت‌های آپلود فایل' },
    { query: 'inurl:multi-upload', desc: 'Multi-file upload pages', descFa: 'صفحات آپلود چند فایل' },
    { query: 'inurl:imageupload', desc: 'Image upload scripts', descFa: 'اسکریپت‌های آپلود تصویر' },
    { query: 'inurl:avatar.php', desc: 'Avatar upload scripts', descFa: 'اسکریپت‌های آپلود آواتار' },
    { query: 'inurl:profile_upload', desc: 'Profile image upload', descFa: 'آپلود تصویر پروفایل' },
    { query: 'intitle:"upload file"', desc: 'Upload file page titles', descFa: 'عنوان صفحات آپلود فایل' },
  ],
  'Directory Listing': [
    { query: 'intitle:"index of /"', desc: 'Generic directory listing enabled', descFa: 'لیست دایرکتوری فعال' },
    { query: 'intitle:"index of" "parent directory"', desc: 'Directory listing with parent directory', descFa: 'لیست دایرکتوری با دایرکتوری والد' },
    { query: 'intitle:"index of" "backup"', desc: 'Directory listing exposing backup folders', descFa: 'لیست دایرکتوری پشتیبان' },
    { query: 'intitle:"index of" "admin"', desc: 'Directory listing of admin folders', descFa: 'لیست دایرکتوری ادمین' },
    { query: 'intitle:"index of" "config"', desc: 'Directory listing exposing config folders', descFa: 'لیست دایرکتوری کانفیگ' },
    { query: 'intitle:"index of" "private"', desc: 'Directory listing of private folders', descFa: 'لیست دایرکتوری خصوصی' },
    { query: 'intitle:"index of" "logs"', desc: 'Directory listing exposing log folders', descFa: 'لیست دایرکتوری لاگ‌ها' },
    { query: 'intitle:"index of" "secret"', desc: 'Directory listing exposing secret files', descFa: 'لیست دایرکتوری فایل‌های مخفی' },
    { query: 'intitle:"index of" "images"', desc: 'Directory listing of image folders', descFa: 'لیست دایرکتوری تصاویر' },
    { query: 'intitle:"index of" "download"', desc: 'Directory listing of download folders', descFa: 'لیست دایرکتوری دانلود' },
    { query: 'intitle:"index of" "database"', desc: 'Directory listing exposing database folders', descFa: 'لیست دایرکتوری دیتابیس' },
    { query: 'intitle:"index of" "dump"', desc: 'Directory listing of dump folders', descFa: 'لیست دایرکتوری dump' },
    { query: 'intitle:"index of" "wp-content"', desc: 'Directory listing of WP content', descFa: 'لیست دایرکتوری محتوای وردپرس' },
    { query: 'intitle:"index of" "includes"', desc: 'Directory listing of includes folder', descFa: 'لیست دایرکتوری includes' },
    { query: 'intitle:"index of" "css"', desc: 'Directory listing of CSS folders', descFa: 'لیست دایرکتوری CSS' },
    { query: 'intitle:"index of" "js"', desc: 'Directory listing of JS folders', descFa: 'لیست دایرکتوری JS' },
    { query: 'intitle:"index of" "cgi-bin"', desc: 'Directory listing of CGI bin', descFa: 'لیست دایرکتوری cgi-bin' },
    { query: 'intitle:"index of" "temp"', desc: 'Directory listing of temp folders', descFa: 'لیست دایرکتوری موقت' },
    { query: 'intitle:"index of" "tmp"', desc: 'Directory listing of tmp folders', descFa: 'لیست دایرکتوری tmp' },
    { query: 'intitle:"index of" "src"', desc: 'Directory listing of source folders', descFa: 'لیست دایرکتوری سورس' },
  ],
  'Sensitive Files': [
    { query: 'filetype:sql "INSERT INTO" "password"', desc: 'SQL dumps containing password inserts', descFa: 'خروجی SQL حاوی درج رمز عبور' },
    { query: 'filetype:env DB_PASSWORD', desc: 'Environment files exposing DB credentials', descFa: 'فایل‌های env دارای رمز دیتابیس' },
    { query: 'filetype:pem "BEGIN RSA PRIVATE KEY"', desc: 'RSA private key files exposed', descFa: 'فایل‌های کلید خصوصی RSA' },
    { query: 'filetype:key "PRIVATE KEY"', desc: 'Generic private key files', descFa: 'فایل‌های کلید خصوصی عمومی' },
    { query: 'filetype:pfx "PKCS12"', desc: 'PKCS12 certificate files', descFa: 'فایل‌های گواهی PKCS12' },
    { query: 'filetype:pdf confidential', desc: 'Confidential PDF documents', descFa: 'اسناد PDF محرمانه' },
    { query: 'filetype:doc classified', desc: 'Classified Word documents', descFa: 'اسناد Word طبقه‌بندی شده' },
    { query: 'filetype:xls "SSN"', desc: 'Excel files with Social Security Numbers', descFa: 'فایل‌های Excel با شماره تامین اجتماعی' },
    { query: 'filetype:csv "credit card"', desc: 'CSV files exposing credit card data', descFa: 'فایل‌های CSV با اطلاعات کارت اعتباری' },
    { query: 'filetype:txt "password" "username"', desc: 'Text files containing credentials', descFa: 'فایل‌های متنی حاوی رمز عبور' },
    { query: 'filetype:xlsx "password"', desc: 'Excel files with password field', descFa: 'فایل‌های Excel با فیلد رمز عبور' },
    { query: 'filetype:pdf "password"', desc: 'PDFs that may contain passwords', descFa: 'PDFهای حاوی رمز عبور' },
    { query: 'filetype:docx "username"', desc: 'Word docs with username fields', descFa: 'اسناد Word با نام کاربری' },
    { query: 'filetype:csv "ssn" "name"', desc: 'CSV with SSN and personal data', descFa: 'CSV با اطلاعات شخصی' },
    { query: 'filetype:txt "api_key"', desc: 'Text files with API keys', descFa: 'فایل‌های متنی با کلید API' },
    { query: 'filetype:txt "secret"', desc: 'Text files containing secrets', descFa: 'فایل‌های متنی حاوی اسرار' },
    { query: 'filetype:cfg "password"', desc: 'CFG files with passwords', descFa: 'فایل‌های CFG با رمز عبور' },
    { query: 'filetype:log "password" "root"', desc: 'Logs with root password entries', descFa: 'لاگ‌های با رمز روت' },
    { query: 'filetype:cnf "password"', desc: 'CNF files exposing passwords', descFa: 'فایل‌های CNF با رمز عبور' },
  ],
  'Login Pages': [
    { query: 'intitle:"admin login"', desc: 'Admin login portal pages', descFa: 'صفحات پورتال ورود ادمین' },
    { query: 'intitle:"login" "username" "password"', desc: 'Generic login pages with fields', descFa: 'صفحات ورود عمومی با فیلدها' },
    { query: 'inurl:login.php', desc: 'PHP-based login pages', descFa: 'صفحات ورود مبتنی بر PHP' },
    { query: 'inurl:admin/login', desc: 'Admin login subdirectory', descFa: 'ورود ادمین در زیرشاخه' },
    { query: 'intitle:"sign in" -stackoverflow', desc: 'Sign-in pages excluding StackOverflow', descFa: 'صفحات ورود به سیستم' },
    { query: 'intitle:"member login"', desc: 'Member-only login portals', descFa: 'پورتال‌های ورود اعضا' },
    { query: 'inurl:user/login', desc: 'User login page paths', descFa: 'مسیرهای صفحه ورود کاربر' },
    { query: 'inurl:admin/login.aspx', desc: 'ASP.NET admin login pages', descFa: 'صفحات ورود ادمین ASP.NET' },
    { query: 'inurl:cp/login', desc: 'Control panel login pages', descFa: 'صفحات ورود کنترل پنل' },
    { query: 'inurl:signin', desc: 'Sign-in page URLs', descFa: 'URLهای صفحه ورود' },
    { query: 'inurl:auth/login', desc: 'Auth login routes', descFa: 'مسیرهای ورود احراز هویت' },
    { query: 'intitle:"login page"', desc: 'Generic login page titles', descFa: 'عنوان صفحات ورود عمومی' },
    { query: 'inurl:portal/login', desc: 'Portal login pages', descFa: 'صفحات ورود پورتال' },
    { query: 'inurl:login.jsp', desc: 'JSP login pages', descFa: 'صفحات ورود JSP' },
    { query: 'inurl:login.do', desc: 'Struts/Java login actions', descFa: 'اکشن‌های ورود جاوا' },
    { query: 'intitle:"administration" "login"', desc: 'Administration login pages', descFa: 'صفحات ورود مدیریت' },
    { query: 'inurl:admin/login.php', desc: 'PHP admin login', descFa: 'ورود ادمین PHP' },
    { query: 'inurl:admin_area', desc: 'Admin area pages', descFa: 'صفحات ناحیه ادمین' },
    { query: 'inurl:administrator/login', desc: 'Administrator login', descFa: 'ورود مدیر' },
  ],
  'Config Files': [
    { query: 'filetype:xml "config"', desc: 'XML configuration files', descFa: 'فایل‌های کانفیگ XML' },
    { query: 'filetype:ini "password"', desc: 'INI files with password settings', descFa: 'فایل‌های INI با تنظیمات رمز عبور' },
    { query: 'filetype:ini DB_PASSWORD', desc: 'INI files with DB password variable', descFa: 'فایل‌های INI با متغیر رمز دیتابیس' },
    { query: 'filetype:cnf "password"', desc: 'CNF configuration files', descFa: 'فایل‌های کانفیگ CNF' },
    { query: 'filetype:conf "password"', desc: 'Conf files with password entries', descFa: 'فایل‌های کانفیگ با رمز عبور' },
    { query: 'filetype:yaml "password"', desc: 'YAML config files with passwords', descFa: 'فایل‌های کانفیگ YAML با رمز عبور' },
    { query: 'filetype:yml "database"', desc: 'YML database configuration files', descFa: 'فایل‌های کانفیگ دیتابیس YML' },
    { query: 'filetype:config "connection"', desc: 'Config files with connection strings', descFa: 'فایل‌های کانفیگ با رشته اتصال' },
    { query: 'filetype:env "APP_KEY"', desc: 'Environment files exposing app keys', descFa: 'فایل‌های env با کلید برنامه' },
    { query: 'filetype:env "API_KEY"', desc: 'Env files with API keys', descFa: 'فایل‌های env با کلید API' },
    { query: 'filetype:env "SECRET"', desc: 'Env files with secrets', descFa: 'فایل‌های env با اسرار' },
    { query: 'filetype:json "connectionString"', desc: 'JSON configs with connection strings', descFa: 'کانفیگ‌های JSON با رشته اتصال' },
    { query: 'filetype:json "config" "password"', desc: 'JSON configs exposing passwords', descFa: 'کانفیگ‌های JSON با رمز عبور' },
    { query: 'filetype:xml "password"', desc: 'XML files with password values', descFa: 'فایل‌های XML با رمز عبور' },
    { query: 'filetype:properties "password"', desc: 'Java properties files with passwords', descFa: 'فایل‌های properties جاوا با رمز' },
    { query: 'filetype:config "database"', desc: 'Config files with database settings', descFa: 'فایل‌های کانفیگ با تنظیمات دیتابیس' },
    { query: 'filetype:cfg "database"', desc: 'CFG database configuration files', descFa: 'فایل‌های کانفیگ دیتابیس CFG' },
  ],
  'Database Files': [
    { query: 'filetype:sql "INSERT INTO" -forum', desc: 'SQL dump files with data inserts', descFa: 'فایل‌های SQL با درج داده' },
    { query: 'filetype:sql "CREATE TABLE"', desc: 'SQL schema definition files', descFa: 'فایل‌های تعریف ساختار SQL' },
    { query: 'filetype:sql "DROP TABLE"', desc: 'SQL files with destructive queries', descFa: 'فایل‌های SQL با کوئری‌های تخریبی' },
    { query: 'filetype:sql "UPDATE users"', desc: 'SQL files updating user tables', descFa: 'فایل‌های SQL به‌روزرسانی کاربران' },
    { query: 'filetype:sql dump', desc: 'Database dump files', descFa: 'فایل‌های dump دیتابیس' },
    { query: 'inurl:backup filetype:sql', desc: 'SQL backup files in backup directory', descFa: 'فایل‌های پشتیبان SQL' },
    { query: 'filetype:sql "wp_users"', desc: 'WordPress user table SQL dumps', descFa: 'خروجی SQL جدول کاربران وردپرس' },
    { query: 'filetype:mdb "password"', desc: 'Access database files', descFa: 'فایل‌های دیتابیس Access' },
    { query: 'filetype:db "password"', desc: 'Generic database files', descFa: 'فایل‌های دیتابیس عمومی' },
    { query: 'inurl:backup filetype:zip "sql"', desc: 'Zipped SQL backup archives', descFa: 'آرشیوهای فشرده SQL پشتیبان' },
    { query: 'filetype:sql.gz', desc: 'Gzipped SQL dump files', descFa: 'فایل‌های SQL فشرده gzip' },
    { query: 'filetype:sqlite', desc: 'SQLite database files', descFa: 'فایل‌های دیتابیس SQLite' },
    { query: 'filetype:sqlite3', desc: 'SQLite3 database files', descFa: 'فایل‌های دیتابیس SQLite3' },
    { query: 'filetype:db "sqlite"', desc: 'SQLite DB files', descFa: 'فایل‌های دیتابیس SQLite' },
    { query: 'filetype:db3', desc: 'DB3 database files', descFa: 'فایل‌های دیتابیس DB3' },
    { query: 'filetype:rdb', desc: 'Redis database dump files', descFa: 'فایل‌های dump دیتابیس Redis' },
    { query: 'inurl:"dump.sql"', desc: 'SQL dump files in URL', descFa: 'فایل‌های SQL dump در URL' },
    { query: 'inurl:"backup.sql"', desc: 'Backup SQL files in URL', descFa: 'فایل‌های SQL پشتیبان در URL' },
  ],
  'Cameras/IoT': [
    { query: 'intitle:"webcam 7"', desc: 'Webcam 7 monitoring interfaces', descFa: 'رابط‌های نظارتی Webcam 7' },
    { query: 'inurl:view/view.shtml', desc: 'Live camera view pages', descFa: 'صفحات نمایش زنده دوربین' },
    { query: 'intitle:"live view" "axis"', desc: 'Axis network camera live view', descFa: 'نمایش زنده دوربین شبکه Axis' },
    { query: 'intitle:"WVC" "wireless"', desc: 'Linksys wireless cameras', descFa: 'دوربین‌های بی‌سیم Linksys' },
    { query: 'intitle:"network camera"', desc: 'Generic network camera interfaces', descFa: 'رابط‌های دوربین شبکه عمومی' },
    { query: 'intitle:"IP CAMERA"', desc: 'IP camera web interfaces', descFa: 'رابط‌های وب دوربین IP' },
    { query: 'inurl:top.html "live view"', desc: 'Live view camera top frames', descFa: 'فریم‌های بالای نمایش زنده دوربین' },
    { query: 'intitle:"snc-rz" inurl:view/', desc: 'Sony SNC network cameras', descFa: 'دوربین‌های شبکه سونی SNC' },
    { query: 'inurl:"CgiStart?page="', desc: 'Camera CGI interface pages', descFa: 'صفحات رابط CGI دوربین' },
    { query: 'intitle:"DVR" "live" "view"', desc: 'DVR live view interfaces', descFa: 'رابط‌های نمایش زنده DVR' },
    { query: 'intitle:"webcamXP"', desc: 'WebcamXP remote monitoring', descFa: 'نظارت از راه دور WebcamXP' },
    { query: 'intitle:"A-Link" "Camera"', desc: 'A-Link IP cameras', descFa: 'دوربین‌های IP A-Link' },
    { query: 'intitle:"EvoCam"', desc: 'EvoCam web cameras', descFa: 'دوربین‌های وب EvoCam' },
    { query: 'inurl:"lvappl.htm"', desc: 'Live camera application pages', descFa: 'صفحات برنامه دوربین زنده' },
    { query: 'intitle:"i-CATcher"', desc: 'I-CATcher surveillance cameras', descFa: 'دوربین‌های نظارتی i-CATcher' },
    { query: 'intitle:"CamViewer"', desc: 'CamViewer remote cameras', descFa: 'دوربین‌های از راه دور CamViewer' },
    { query: 'inurl:"camera.html"', desc: 'Camera HTML pages', descFa: 'صفحات HTML دوربین' },
    { query: 'intitle:"TP-LINK" "Camera"', desc: 'TP-Link IP cameras', descFa: 'دوربین‌های IP تی‌پی‌لینک' },
  ],
  WordPress: [
    { query: 'intitle:"index of" wp-content', desc: 'Directory listing of wp-content', descFa: 'لیست دایرکتوری wp-content' },
    { query: 'inurl:wp-admin', desc: 'WordPress admin panel access', descFa: 'دسترسی به پنل ادمین وردپرس' },
    { query: 'filetype:sql "wp_users"', desc: 'WordPress user table dumps', descFa: 'خروجی جدول کاربران وردپرس' },
    { query: 'inurl:wp-config.bak', desc: 'WordPress config backup file', descFa: 'فایل پشتیبان کانفیگ وردپرس' },
    { query: 'intitle:"index of" wp-config', desc: 'Directory listing exposing wp-config', descFa: 'لیست دایرکتوری wp-config' },
    { query: 'intitle:"index of" wp-uploads', desc: 'WordPress uploads directory listing', descFa: 'لیست دایرکتوری آپلود وردپرس' },
    { query: 'inurl:wp-content/uploads', desc: 'WordPress uploads folder', descFa: 'پوشه آپلود وردپرس' },
    { query: 'filetype:txt "wp-config"', desc: 'Text files with wp-config references', descFa: 'فایل‌های متنی با ارجاع wp-config' },
    { query: 'inurl:wp-json/wp/v2/users', desc: 'WordPress REST API user endpoints', descFa: 'نقاط پایانی REST API وردپرس' },
    { query: 'filetype:xml "wp-config"', desc: 'XML files referencing wp-config', descFa: 'فایل‌های XML حاوی wp-config' },
    { query: 'inurl:/wp-content/debug.log', desc: 'WordPress debug log file', descFa: 'فایل لاگ خطایابی وردپرس' },
    { query: 'intitle:"index of" /wp-includes', desc: 'WordPress includes directory listing', descFa: 'لیست دایرکتوری wp-includes' },
    { query: 'inurl:wp-content/themes', desc: 'WordPress themes directory', descFa: 'دایرکتوری قالب‌های وردپرس' },
    { query: 'inurl:wp-content/plugins', desc: 'WordPress plugins directory', descFa: 'دایرکتوری پلاگین‌های وردپرس' },
    { query: 'inurl:xmlrpc.php', desc: 'WordPress XML-RPC endpoint', descFa: 'نقطه پایانی XML-RPC وردپرس' },
    { query: 'intitle:"index of" "wp-content" "plugins"', desc: 'WP plugins directory listing', descFa: 'لیست دایرکتوری پلاگین‌های وردپرس' },
    { query: 'inurl:wp-json/wp/v2/comments', desc: 'WordPress comments API', descFa: 'API نظرات وردپرس' },
  ],
  Joomla: [
    { query: 'inurl:com_content', desc: 'Joomla content component', descFa: 'کامپوننت محتوای جوملا' },
    { query: 'inurl:option=com_', desc: 'Joomla component parameter', descFa: 'پارامتر کامپوننت جوملا' },
    { query: 'inurl:index.php?option=com', desc: 'Joomla component routing', descFa: 'مسیریابی کامپوننت جوملا' },
    { query: 'inurl:com_users', desc: 'Joomla users component', descFa: 'کامپوننت کاربران جوملا' },
    { query: 'inurl:com_admin', desc: 'Joomla admin component', descFa: 'کامپوننت ادمین جوملا' },
    { query: 'inurl:com_config', desc: 'Joomla config component', descFa: 'کامپوننت کانفیگ جوملا' },
    { query: 'filetype:xml "joomla"', desc: 'XML files exposing Joomla info', descFa: 'فایل‌های XML حاوی اطلاعات جوملا' },
    { query: 'intitle:"index of" /components', desc: 'Joomla components directory listing', descFa: 'لیست دایرکتوری کامپوننت‌های جوملا' },
    { query: 'inurl:component/jfail', desc: 'Joomla jfail component', descFa: 'کامپوننت jfail جوملا' },
    { query: 'inurl:com_phocagallery', desc: 'Joomla Phoca Gallery component', descFa: 'کامپوننت Phoca Gallery جوملا' },
    { query: 'inurl:com_virtuemart', desc: 'Joomla VirtueMart e-commerce', descFa: 'فروشگاه VirtueMart جوملا' },
    { query: 'inurl:com_contact', desc: 'Joomla contact component', descFa: 'کامپوننت تماس جوملا' },
    { query: 'inurl:com_search', desc: 'Joomla search component', descFa: 'کامپوننت جستجوی جوملا' },
    { query: 'inurl:/administrator/ joomla', desc: 'Joomla admin panel', descFa: 'پنل ادمین جوملا' },
  ],
  'Admin Panels': [
    { query: 'inurl:admin', desc: 'Generic admin panel access', descFa: 'دسترسی به پنل ادمین عمومی' },
    { query: 'intitle:"control panel"', desc: 'Control panel login pages', descFa: 'صفحات ورود کنترل پنل' },
    { query: 'intitle:"administration"', desc: 'Administration panel pages', descFa: 'صفحات پنل مدیریت' },
    { query: 'inurl:administrator', desc: 'Administrator directory access', descFa: 'دسترسی به دایرکتوری مدیر' },
    { query: 'inurl:cpanel', desc: 'cPanel access pages', descFa: 'صفحات دسترسی cPanel' },
    { query: 'inurl:phpmyadmin', desc: 'phpMyAdmin access', descFa: 'دسترسی به phpMyAdmin' },
    { query: 'intitle:"phpMyAdmin"', desc: 'phpMyAdmin login pages', descFa: 'صفحات ورود phpMyAdmin' },
    { query: 'inurl:admin/dashboard', desc: 'Admin dashboard pages', descFa: 'صفحات داشبورد ادمین' },
    { query: 'inurl:admin/panel', desc: 'Admin panel subdirectory', descFa: 'زیرشاخه پنل ادمین' },
    { query: 'inurl:webadmin', desc: 'Web admin interfaces', descFa: 'رابط‌های مدیریت وب' },
    { query: 'inurl:admin_area', desc: 'Admin area access', descFa: 'دسترسی ناحیه ادمین' },
    { query: 'inurl:panel', desc: 'Control panel pages', descFa: 'صفحات کنترل پنل' },
    { query: 'inurl:admincp', desc: 'Admin CP pages', descFa: 'صفحات کنترل پنل ادمین' },
    { query: 'inurl:admin.php', desc: 'PHP admin pages', descFa: 'صفحات ادمین PHP' },
    { query: 'inurl:sysadmin', desc: 'System admin panels', descFa: 'پنل‌های مدیریت سیستم' },
    { query: 'inurl:management', desc: 'Management panel pages', descFa: 'صفحات پنل مدیریت' },
    { query: 'inurl:dashboard', desc: 'Dashboard pages', descFa: 'صفحات داشبورد' },
  ],
  'Error Messages': [
    { query: 'intitle:"PHP Error"', desc: 'PHP error pages exposed', descFa: 'صفحات خطای PHP' },
    { query: 'intitle:"Warning" "include_once"', desc: 'PHP include path disclosures', descFa: 'افشای مسیر include' },
    { query: 'intitle:"fatal error"', desc: 'Fatal error disclosures', descFa: 'افشای خطاهای بحرانی' },
    { query: 'intitle:"index of" "error_log"', desc: 'Directory listing of error logs', descFa: 'لیست دایرکتوری لاگ‌های خطا' },
    { query: '"Warning: mysql_connect()" "access denied"', desc: 'MySQL connection error messages', descFa: 'پیام‌های خطای اتصال MySQL' },
    { query: 'intext:"cannot modify header information"', desc: 'PHP header modification errors', descFa: 'خطاهای تغییر هدر PHP' },
    { query: '"Stack trace" "PHP"', desc: 'PHP stack trace disclosures', descFa: 'افشای ردیابی پشته PHP' },
    { query: 'intitle:"Server Error" "404"', desc: 'Server 404 error pages', descFa: 'صفحات خطای 404 سرور' },
    { query: '"ORA-" "Oracle" "error"', desc: 'Oracle database error messages', descFa: 'پیام‌های خطای دیتابیس Oracle' },
    { query: '"Microsoft OLE DB" "error"', desc: 'OLE DB error messages', descFa: 'خطاهای OLE DB مایکروسافت' },
    { query: '"Fatal error: Call to undefined function"', desc: 'PHP undefined function errors', descFa: 'خطاهای تابع تعریف نشده PHP' },
    { query: '"Warning: preg_replace()"', desc: 'PHP preg_replace warnings', descFa: 'هشدارهای preg_replace PHP' },
    { query: '"Invalid argument supplied for foreach"', desc: 'PHP foreach errors', descFa: 'خطاهای foreach PHP' },
    { query: '"Warning: file_get_contents"', desc: 'PHP file_get_contents errors', descFa: 'خطاهای file_get_contents PHP' },
    { query: '"Warning: session_start()"', desc: 'PHP session errors', descFa: 'خطاهای session PHP' },
    { query: 'intitle:"Runtime Error" "Server"', desc: 'ASP.NET runtime errors', descFa: 'خطاهای زمان اجرا ASP.NET' },
    { query: '"Warning: Undefined array key"', desc: 'PHP undefined array key warnings', descFa: 'هشدارهای کلید آرایه نامشخص PHP' },
  ],
  'Log Files': [
    { query: 'filetype:log "password"', desc: 'Log files containing passwords', descFa: 'فایل‌های لاگ حاوی رمز عبور' },
    { query: 'filetype:log "error"', desc: 'Error log files', descFa: 'فایل‌های لاگ خطا' },
    { query: 'filetype:log "admin"', desc: 'Log files with admin references', descFa: 'فایل‌های لاگ با ارجاع ادمین' },
    { query: 'filetype:log "username"', desc: 'Log files exposing usernames', descFa: 'فایل‌های لاگ با نام کاربری' },
    { query: 'filetype:log "login"', desc: 'Login activity log files', descFa: 'فایل‌های لاگ فعالیت ورود' },
    { query: 'filetype:log "access"', desc: 'Access log files', descFa: 'فایل‌های لاگ دسترسی' },
    { query: 'inurl:access.log', desc: 'Apache access log files', descFa: 'فایل‌های لاگ دسترسی آپاچی' },
    { query: 'inurl:error.log', desc: 'Apache error log files', descFa: 'فایل‌های لاگ خطای آپاچی' },
    { query: 'filetype:log "root"', desc: 'Log files with root user references', descFa: 'فایل‌های لاگ با کاربر روت' },
    { query: 'filetype:log "127.0.0.1"', desc: 'Log files with localhost IP entries', descFa: 'فایل‌های لاگ با آی‌پی لوکال' },
    { query: 'filetype:log "authenticated"', desc: 'Auth activity log files', descFa: 'فایل‌های لاگ فعالیت احراز هویت' },
    { query: 'filetype:log "session"', desc: 'Session log files', descFa: 'فایل‌های لاگ نشست' },
    { query: 'filetype:log "failed"', desc: 'Failed attempt log files', descFa: 'فایل‌های لاگ تلاش ناموفق' },
    { query: 'filetype:log "sudo"', desc: 'Sudo command log files', descFa: 'فایل‌های لاگ دستور sudo' },
    { query: 'filetype:log "sshd"', desc: 'SSH daemon log files', descFa: 'فایل‌های لاگ SSH' },
    { query: 'filetype:log "mysql"', desc: 'MySQL log files', descFa: 'فایل‌های لاگ MySQL' },
  ],
  'Backup Files': [
    { query: 'filetype:bak', desc: 'Generic backup files', descFa: 'فایل‌های پشتیبان عمومی' },
    { query: 'filetype:old', desc: 'Old versioned files', descFa: 'فایل‌های نسخه قدیمی' },
    { query: 'filetype:backup', desc: 'Backup extension files', descFa: 'فایل‌های با پسوند backup' },
    { query: 'filetype:swp', desc: 'Vim swap files', descFa: 'فایل‌های swap ویرایشگر Vim' },
    { query: 'filetype:save', desc: 'Saved game/data files', descFa: 'فایل‌های ذخیره داده' },
    { query: 'filetype:dump', desc: 'System dump files', descFa: 'فایل‌های dump سیستم' },
    { query: 'inurl:backup', desc: 'Pages in backup directories', descFa: 'صفحات در دایرکتوری‌های پشتیبان' },
    { query: '"backup" filetype:zip', desc: 'ZIP backup archives', descFa: 'آرشیوهای ZIP پشتیبان' },
    { query: '"backup" filetype:tar', desc: 'TAR backup archives', descFa: 'آرشیوهای TAR پشتیبان' },
    { query: 'filetype:sql "backup"', desc: 'SQL backup files', descFa: 'فایل‌های SQL پشتیبان' },
    { query: 'filetype:gz "backup"', desc: 'GZip backup archives', descFa: 'آرشیوهای GZip پشتیبان' },
    { query: 'filetype:rar "backup"', desc: 'RAR backup archives', descFa: 'آرشیوهای RAR پشتیبان' },
    { query: 'filetype:tgz "backup"', desc: 'TGZ backup archives', descFa: 'آرشیوهای TGZ پشتیبان' },
    { query: 'filetype:7z "backup"', desc: '7z backup archives', descFa: 'آرشیوهای 7z پشتیبان' },
    { query: 'filetype:tar.gz "backup"', desc: 'Tar GZip backup archives', descFa: 'آرشیوهای tar.gz پشتیبان' },
    { query: 'inurl:"backup" filetype:sql', desc: 'SQL files in backup directories', descFa: 'فایل‌های SQL در دایرکتوری پشتیبان' },
    { query: 'inurl:backup site:github.com', desc: 'Backup files on GitHub', descFa: 'فایل‌های پشتیبان در GitHub' },
  ],
  'Email/Info': [
    { query: 'intext:"@gmail.com" "password"', desc: 'Gmail credentials in plain text', descFa: 'اعتبار Gmail در متن ساده' },
    { query: 'intext:"@yahoo.com" "password"', desc: 'Yahoo credentials in plain text', descFa: 'اعتبار Yahoo در متن ساده' },
    { query: 'filetype:xls "email" "password"', desc: 'Excel files with emails and passwords', descFa: 'فایل‌های Excel با ایمیل و رمز' },
    { query: 'filetype:xlsx "email"', desc: 'Excel files containing email addresses', descFa: 'فایل‌های Excel با آدرس ایمیل' },
    { query: 'intext:"customer" filetype:csv', desc: 'CSV files with customer data', descFa: 'فایل‌های CSV با داده مشتری' },
    { query: 'intitle:"index of" "contacts.csv"', desc: 'Contact CSV files exposed', descFa: 'فایل‌های CSV مخاطبین' },
    { query: 'filetype:vcf "phone"', desc: 'vCard contact files with phone numbers', descFa: 'فایل‌های vCard با شماره تلفن' },
    { query: 'filetype:pdf "email address" "password"', desc: 'PDFs with email and password data', descFa: 'PDF با ایمیل و رمز عبور' },
    { query: '"leaked" "password" filetype:txt', desc: 'Leaked password text files', descFa: 'فایل‌های متنی رمز لو رفته' },
    { query: 'filetype:xls "SSN" "address"', desc: 'Excel files with SSN and address', descFa: 'فایل‌های Excel با شماره تامین اجتماعی' },
    { query: 'intitle:"index of" "mail"', desc: 'Mail directory listings', descFa: 'لیست دایرکتوری ایمیل' },
    { query: 'filetype:csv "email" credit', desc: 'CSV with email and credit data', descFa: 'CSV با ایمیل و اطلاعات اعتباری' },
    { query: '"@hotmail.com" "password"', desc: 'Hotmail credentials exposed', descFa: 'اعتبار Hotmail در متن' },
    { query: '"@outlook.com" "password"', desc: 'Outlook credentials exposed', descFa: 'اعتبار Outlook در متن' },
    { query: '"@aol.com" "password"', desc: 'AOL credentials exposed', descFa: 'اعتبار AOL در متن' },
    { query: 'filetype:csv "email" "phone"', desc: 'CSV files with contact info', descFa: 'فایل‌های CSV با اطلاعات تماس' },
  ],
  'Network Devices': [
    { query: 'intitle:"router setup"', desc: 'Router setup/configuration pages', descFa: 'صفحات تنظیمات روتر' },
    { query: 'intitle:"wireless router"', desc: 'Wireless router access pages', descFa: 'صفحات دسترسی روتر بی‌سیم' },
    { query: 'inurl:setup.cgi', desc: 'CGI setup interfaces', descFa: 'رابط‌های تنظیمات CGI' },
    { query: 'inurl:status.cgi', desc: 'CGI status pages', descFa: 'صفحات وضعیت CGI' },
    { query: 'intitle:"login" "router"', desc: 'Router login pages', descFa: 'صفحات ورود روتر' },
    { query: 'intitle:"Linksys" "management"', desc: 'Linksys router management', descFa: 'مدیریت روتر Linksys' },
    { query: 'inurl:main.cgi', desc: 'Main CGI interfaces', descFa: 'رابط‌های اصلی CGI' },
    { query: 'intitle:"device status" "router"', desc: 'Router device status pages', descFa: 'صفحات وضعیت دستگاه روتر' },
    { query: 'intitle:"web admin" "teltonika"', desc: 'Teltonika router admin pages', descFa: 'صفحات ادمین روتر Teltonika' },
    { query: 'inurl:"home.htm" "router"', desc: 'Router home configuration pages', descFa: 'صفحات تنظیمات خانگی روتر' },
    { query: 'intitle:"MikroTik" "admin"', desc: 'MikroTik router admin access', descFa: 'دسترسی ادمین روتر MikroTik' },
    { query: 'inurl:"cgi-bin" "status"', desc: 'CGI-bin status interfaces', descFa: 'رابط‌های وضعیت cgi-bin' },
    { query: 'intitle:"D-Link" "router"', desc: 'D-Link router management', descFa: 'مدیریت روتر D-Link' },
    { query: 'intitle:"NETGEAR" "router"', desc: 'Netgear router management', descFa: 'مدیریت روتر Netgear' },
    { query: 'inurl:"top.htm" "sys"', desc: 'Router system status pages', descFa: 'صفحات وضعیت سیستم روتر' },
    { query: 'intitle:"Cisco" "router" "admin"', desc: 'Cisco router admin access', descFa: 'دسترسی ادمین روتر Cisco' },
  ],
  'FTP Servers': [
    { query: 'intitle:"index of" ftp', desc: 'FTP directory listings', descFa: 'لیست دایرکتوری FTP' },
    { query: 'intitle:"FTP Server"', desc: 'FTP server status pages', descFa: 'صفحات وضعیت سرور FTP' },
    { query: 'intitle:"vsFTPd"', desc: 'vsFTPd server pages', descFa: 'صفحات سرور vsFTPd' },
    { query: 'intitle:"FileZilla" "Server"', desc: 'FileZilla FTP server interfaces', descFa: 'رابط‌های سرور FTP FileZilla' },
    { query: 'inurl:ftp://', desc: 'Open FTP links', descFa: 'لینک‌های FTP باز' },
    { query: '"ftp" "login" "password" filetype:txt', desc: 'FTP credentials in text files', descFa: 'اعتبار FTP در فایل‌های متنی' },
    { query: 'intitle:"ProFTPD"', desc: 'ProFTPD server pages', descFa: 'صفحات سرور ProFTPD' },
    { query: 'intitle:"Pure-FTPd"', desc: 'Pure-FTPd server', descFa: 'سرور Pure-FTPd' },
    { query: 'intitle:"Wu-FTPD"', desc: 'Wu-FTPD server interfaces', descFa: 'رابط‌های سرور Wu-FTPD' },
    { query: 'intitle:"Serv-U FTP"', desc: 'Serv-U FTP server admin', descFa: 'مدیریت سرور FTP Serv-U' },
    { query: '"ftp" "password" filetype:ini', desc: 'FTP passwords in INI files', descFa: 'رمزهای FTP در فایل‌های INI' },
    { query: '"ftp://" "password" "@"', desc: 'FTP URLs with embedded passwords', descFa: 'URLهای FTP با رمز عبور' },
  ],
  'Git Repositories': [
    { query: 'intitle:"index of" .git', desc: 'Exposed .git directory', descFa: 'دایرکتوری .git در معرض' },
    { query: 'inurl:.git/config', desc: 'Git config file exposed', descFa: 'فایل کانفیگ Git در معرض' },
    { query: 'inurl:.git/HEAD', desc: 'Git HEAD ref exposed', descFa: 'مرجع HEAD Git در معرض' },
    { query: 'inurl:.git/index', desc: 'Git index file exposed', descFa: 'فایل ایندکس Git در معرض' },
    { query: 'inurl:.gitignore', desc: 'Git ignore rules exposed', descFa: 'قوانین gitignore در معرض' },
    { query: 'filetype:gitattributes', desc: 'Git attributes file exposed', descFa: 'فایل gitattributes در معرض' },
    { query: 'site:github.com "password" extension:.git', desc: 'GitHub repos with passwords', descFa: 'مخازن GitHub با رمز عبور' },
    { query: 'site:github.com "api_key"', desc: 'GitHub repos exposing API keys', descFa: 'مخازن GitHub با کلید API' },
    { query: 'site:github.com "SECRET_KEY"', desc: 'GitHub repos with secret keys', descFa: 'مخازن GitHub با کلید مخفی' },
    { query: 'site:github.com "DB_PASSWORD"', desc: 'GitHub repos with DB passwords', descFa: 'مخازن GitHub با رمز دیتابیس' },
    { query: 'site:github.com "token" extension:.env', desc: 'Env files on GitHub with tokens', descFa: 'فایل‌های env در GitHub با توکن' },
    { query: 'site:gitlab.com "password"', desc: 'GitLab repos with passwords', descFa: 'مخازن GitLab با رمز عبور' },
    { query: 'site:bitbucket.org "password"', desc: 'Bitbucket repos with passwords', descFa: 'مخازن Bitbucket با رمز عبور' },
    { query: 'inurl:_gitlab', desc: 'GitLab administration panels', descFa: 'پنل‌های مدیریت GitLab' },
    { query: 'inurl:.svn/entries', desc: 'SVN repository entries exposed', descFa: 'ورودی‌های مخزن SVN' },
  ],
  'Cloud Storage': [
    { query: 'site:s3.amazonaws.com "ListBucketResult"', desc: 'AWS S3 bucket listing enabled', descFa: 'لیست باکت S3 فعال' },
    { query: 'site:s3.amazonaws.com "AccessKeyId"', desc: 'AWS access keys in S3 files', descFa: 'کلیدهای دسترسی AWS در S3' },
    { query: 'site:s3.amazonaws.com "password"', desc: 'S3 buckets with password files', descFa: 'باکت‌های S3 با فایل‌های رمز' },
    { query: 'site:blob.core.windows.net "password"', desc: 'Azure blob storage with passwords', descFa: 'فضای ذخیره Azure با رمز' },
    { query: 'site:storage.googleapis.com "password"', desc: 'Google Cloud storage with passwords', descFa: 'فضای ذخیره گوگل با رمز' },
    { query: 'site:amazonaws.com "secret"', desc: 'AWS storage with secrets', descFa: 'فضای ذخیره AWS با اسرار' },
    { query: 'inurl:"s3" "backup" filetype:txt', desc: 'S3 backup text files', descFa: 'فایل‌های متنی پشتیبان S3' },
    { query: 'site:digitaloceanspaces.com', desc: 'DigitalOcean Spaces exposure', descFa: 'فضای DigitalOcean در معرض' },
    { query: 'site:s3.amazonaws.com "backup"', desc: 'S3 backup buckets', descFa: 'باکت‌های پشتیبان S3' },
    { query: 'site:s3.amazonaws.com "db_backup"', desc: 'S3 database backup files', descFa: 'فایل‌های پشتیبان دیتابیس S3' },
    { query: 'site:r2.cloudflarestorage.com', desc: 'Cloudflare R2 storage exposure', descFa: 'فضای ذخیره Cloudflare R2' },
    { query: 'site:s3.amazonaws.com "config"', desc: 'S3 buckets with config files', descFa: 'باکت‌های S3 با فایل‌های کانفیگ' },
  ],
  phpMyAdmin: [
    { query: 'intitle:"phpMyAdmin" "Welcome to"', desc: 'phpMyAdmin welcome pages', descFa: 'صفحات خوش‌آمدگویی phpMyAdmin' },
    { query: 'inurl:phpmyadmin/index.php', desc: 'phpMyAdmin index pages', descFa: 'صفحات ایندکس phpMyAdmin' },
    { query: 'inurl:phpmyadmin/main.php', desc: 'phpMyAdmin main interface', descFa: 'رابط اصلی phpMyAdmin' },
    { query: 'inurl:sql.php?db=', desc: 'phpMyAdmin SQL execution page', descFa: 'صفحه اجرای SQL phpMyAdmin' },
    { query: 'inurl:pma', desc: 'Common phpMyAdmin alias', descFa: 'نام مستعار رایج phpMyAdmin' },
    { query: 'inurl:phpMyAdmin', desc: 'phpMyAdmin access (case sensitive)', descFa: 'دسترسی phpMyAdmin' },
    { query: 'inurl:phpmyadmin server:', desc: 'phpMyAdmin with MySQL server info', descFa: 'phpMyAdmin با اطلاعات سرور MySQL' },
    { query: 'intitle:"phpMyAdmin" "phpMyAdmin"', desc: 'phpMyAdmin interfaces', descFa: 'رابط‌های phpMyAdmin' },
    { query: 'inurl:phpmyadmin/import.php', desc: 'phpMyAdmin import functionality', descFa: 'عملکرد وارد کردن phpMyAdmin' },
    { query: 'inurl:phpmyadmin/db_structure.php', desc: 'phpMyAdmin database structure', descFa: 'ساختار دیتابیس phpMyAdmin' },
  ],
  'CI/CD & DevOps': [
    { query: 'intitle:"Jenkins" "Dashboard"', desc: 'Jenkins CI dashboard pages', descFa: 'داشبورد Jenkins' },
    { query: 'inurl:jenkins/login', desc: 'Jenkins login page', descFa: 'صفحه ورود Jenkins' },
    { query: 'intitle:"Jenkins" "Manage"', desc: 'Jenkins management console', descFa: 'کنسول مدیریت Jenkins' },
    { query: 'inurl:8080 "Jenkins"', desc: 'Jenkins on default port', descFa: 'Jenkins روی پورت پیش‌فرض' },
    { query: 'intitle:"Travis CI"', desc: 'Travis CI build pages', descFa: 'صفحات ساخت Travis CI' },
    { query: 'intitle:"GitLab CI"', desc: 'GitLab CI/CD pages', descFa: 'صفحات CI/CD GitLab' },
    { query: 'intitle:"CircleCI"', desc: 'CircleCI dashboard', descFa: 'داشبورد CircleCI' },
    { query: 'intitle:"TeamCity"', desc: 'TeamCity CI server pages', descFa: 'صفحات سرور CI TeamCity' },
    { query: 'inurl:teamcity', desc: 'TeamCity access pages', descFa: 'صفحات دسترسی TeamCity' },
    { query: 'inurl:jenkins "console"', desc: 'Jenkins console output pages', descFa: 'صفحات خروجی کنسول Jenkins' },
    { query: 'intitle:"Build" "Jenkins"', desc: 'Jenkins build pages', descFa: 'صفحات ساخت Jenkins' },
    { query: 'site:jenkins.io "password"', desc: 'Jenkins-related password exposures', descFa: 'افشای رمز عبور مرتبط با Jenkins' },
  ],
  Docker: [
    { query: 'intitle:"Docker" "Registry"', desc: 'Docker registry interfaces', descFa: 'رابط‌های رجیستری Docker' },
    { query: 'inurl:5000/v2/_catalog', desc: 'Docker registry catalog API', descFa: 'API کاتالوگ رجیستری Docker' },
    { query: 'inurl:5000/v2/', desc: 'Docker registry API v2', descFa: 'API v2 رجیستری Docker' },
    { query: 'intitle:"Docker" "Container"', desc: 'Docker container interfaces', descFa: 'رابط‌های کانتینر Docker' },
    { query: 'filetype:dockerfile "FROM"', desc: 'Dockerfile exposures', descFa: 'فایل‌های Dockerfile در معرض' },
    { query: 'filetype:docker-compose.yml', desc: 'Docker Compose configs exposed', descFa: 'کانفیگ‌های Docker Compose' },
    { query: 'filetype:docker-compose.yaml', desc: 'Docker Compose YAML files', descFa: 'فایل‌های YAML Docker Compose' },
    { query: 'intitle:"Portainer"', desc: 'Portainer Docker management', descFa: 'مدیریت Docker Portainer' },
    { query: 'inurl:9000 "portainer"', desc: 'Portainer on default port', descFa: 'Portainer روی پورت پیش‌فرض' },
    { query: 'intitle:"Docker" "Swarm"', desc: 'Docker Swarm interfaces', descFa: 'رابط‌های Docker Swarm' },
    { query: 'filetype:Dockerfile "ENV" "password"', desc: 'Dockerfiles with password ENV', descFa: 'Dockerfile با رمز عبور' },
  ],
  Elasticsearch: [
    { query: 'intitle:"Elasticsearch" "Error"', desc: 'Elasticsearch error pages', descFa: 'صفحات خطای Elasticsearch' },
    { query: 'inurl:9200/_cat/indices', desc: 'ES indices API', descFa: 'API ایندکس‌های ES' },
    { query: 'inurl:9200/_search?q=', desc: 'Elasticsearch search queries', descFa: 'کوئری‌های جستجوی Elasticsearch' },
    { query: 'inurl:9200/_cluster/health', desc: 'ES cluster health endpoint', descFa: 'نقطه پایانی سلامت کلاستر ES' },
    { query: 'inurl:9200/_cat', desc: 'ES cat API endpoints', descFa: 'نقاط پایانی API cat ES' },
    { query: 'intitle:"elasticsearch" inurl:9200', desc: 'Elasticsearch instances on 9200', descFa: 'نمونه‌های ES روی پورت 9200' },
    { query: 'inurl:"_search" "took"', desc: 'Elasticsearch query results', descFa: 'نتایج جستجوی Elasticsearch' },
    { query: 'inurl:9200/_plugin/kopf', desc: 'Kopf ES management plugin', descFa: 'پلاگین مدیریت Kopf ES' },
    { query: 'inurl:9200/_plugin/head', desc: 'ES Head plugin UI', descFa: 'رابط پلاگین Head ES' },
  ],
  MongoDB: [
    { query: 'intitle:"MongoDB" "command"', desc: 'MongoDB command pages', descFa: 'صفحات دستورات MongoDB' },
    { query: 'inurl:27017 "MongoDB"', desc: 'MongoDB on default port 27017', descFa: 'MongoDB روی پورت 27017' },
    { query: 'inurl:28017 "MongoDB"', desc: 'MongoDB web interface on 28017', descFa: 'رابط وب MongoDB روی 28017' },
    { query: 'intitle:"MongoDB" "Index"', desc: 'MongoDB index pages', descFa: 'صفحات ایندکس MongoDB' },
    { query: 'intitle:"MongoDB" "databases"', desc: 'MongoDB database lists', descFa: 'لیست دیتابیس‌های MongoDB' },
    { query: '"MongoDB" "admin" "password"', desc: 'MongoDB admin credentials', descFa: 'اعتبار ادمین MongoDB' },
    { query: '"mongodb://" "password" "@"', desc: 'MongoDB URLs with credentials', descFa: 'URLهای MongoDB با رمز عبور' },
    { query: 'filetype:json "mongodb" "password"', desc: 'JSON with MongoDB passwords', descFa: 'JSON با رمزهای MongoDB' },
    { query: 'filetype:config "mongodb"', desc: 'MongoDB configuration files', descFa: 'فایل‌های کانفیگ MongoDB' },
  ],
  'Open Redirect': [
    { query: 'inurl:redirect.php?url=', desc: 'Open redirect via redirect.php', descFa: 'هدایت باز از redirect.php' },
    { query: 'inurl:redirect?url=', desc: 'Open redirect parameter', descFa: 'پارامتر هدایت باز' },
    { query: 'inurl:to?url=', desc: 'Redirect via to parameter', descFa: 'هدایت از پارامتر to' },
    { query: 'inurl:out?url=', desc: 'Redirect via out parameter', descFa: 'هدایت از پارامتر out' },
    { query: 'inurl:goto?url=', desc: 'Redirect via goto parameter', descFa: 'هدایت از پارامتر goto' },
    { query: 'inurl:link?url=', desc: 'Redirect via link parameter', descFa: 'هدایت از پارامتر link' },
    { query: 'inurl:redirect?http', desc: 'Open redirect with HTTP URLs', descFa: 'هدایت باز با URLهای HTTP' },
    { query: 'inurl:forward?url=', desc: 'Redirect via forward parameter', descFa: 'هدایت از پارامتر forward' },
    { query: 'inurl:return?url=', desc: 'Redirect via return parameter', descFa: 'هدایت از پارامتر return' },
    { query: 'inurl:next?url=', desc: 'Redirect via next parameter', descFa: 'هدایت از پارامتر next' },
    { query: 'inurl:redir?url=', desc: 'Redirect via redir parameter', descFa: 'هدایت از پارامتر redir' },
    { query: 'inurl:destination?url=', desc: 'Redirect via destination', descFa: 'هدایت از پارامتر destination' },
    { query: 'inurl:continue?url=', desc: 'Redirect via continue parameter', descFa: 'هدایت از پارامتر continue' },
    { query: 'inurl:url=http://', desc: 'Generic URL parameter redirect', descFa: 'پارامتر URL هدایت عمومی' },
  ],
  'XSS Parameters': [
    { query: 'inurl:q=" &inurl:search', desc: 'Search parameter reflecting input', descFa: 'پارامتر جستجوی منعکس‌کننده ورودی' },
    { query: 'inurl:s=" &inurl:search', desc: 'Search parameter (s) reflecting input', descFa: 'پارامتر جستجوی s' },
    { query: 'inurl:query=', desc: 'Generic query parameter', descFa: 'پارامتر کوئری عمومی' },
    { query: 'inurl:search=', desc: 'Search query parameter', descFa: 'پارامتر جستجو' },
    { query: 'inurl:keyword=', desc: 'Keyword parameter reflecting input', descFa: 'پارامتر کلمه کلیدی' },
    { query: 'inurl:term=', desc: 'Term parameter reflecting input', descFa: 'پارامتر term' },
    { query: 'inurl:name=', desc: 'Name parameter for XSS testing', descFa: 'پارامتر نام برای تست XSS' },
    { query: 'inurl:msg=', desc: 'Message parameter reflecting input', descFa: 'پارامتر پیام' },
    { query: 'inurl:error=', desc: 'Error parameter reflecting input', descFa: 'پارامتر خطا' },
    { query: 'inurl:feedback=', desc: 'Feedback parameter', descFa: 'پارامتر بازخورد' },
    { query: 'inurl:comment=', desc: 'Comment parameter', descFa: 'پارامتر نظر' },
    { query: 'inurl:subject=', desc: 'Subject parameter', descFa: 'پارامتر موضوع' },
    { query: 'inurl:callback=', desc: 'Callback parameter for JSONP XSS', descFa: 'پارامتر callback برای XSS' },
    { query: 'inurl:jsoncallback=', desc: 'JSONP callback XSS vector', descFa: 'بردار XSS callback JSONP' },
    { query: 'inurl:input=', desc: 'Input parameter XSS', descFa: 'پارامتر ورودی XSS' },
  ],
  'Server Status': [
    { query: 'inurl:server-status', desc: 'Apache server status page', descFa: 'صفحه وضعیت سرور آپاچی' },
    { query: 'inurl:server-info', desc: 'Apache server info page', descFa: 'صفحه اطلاعات سرور آپاچی' },
    { query: 'inurl:server-status/', desc: 'Apache status directory', descFa: 'دایرکتوری وضعیت آپاچی' },
    { query: 'intitle:"Apache Status"', desc: 'Apache status title', descFa: 'عنوان وضعیت آپاچی' },
    { query: 'intitle:"Apache Server Information"', desc: 'Apache info title', descFa: 'عنوان اطلاعات سرور آپاچی' },
    { query: 'inurl:nginx_status', desc: 'Nginx status page', descFa: 'صفحه وضعیت Nginx' },
    { query: 'intitle:"Nginx Status"', desc: 'Nginx status title', descFa: 'عنوان وضعیت Nginx' },
    { query: 'intitle:"PHP" "PHP Version"', desc: 'PHP info pages exposed', descFa: 'صفحات اطلاعات PHP' },
    { query: 'inurl:phpinfo.php', desc: 'phpinfo() configuration dump', descFa: 'اطلاعات phpinfo()' },
    { query: 'intitle:"phpinfo" "PHP Version"', desc: 'phpinfo pages', descFa: 'صفحات phpinfo' },
    { query: 'inurl:info.php', desc: 'Generic PHP info pages', descFa: 'صفحات اطلاعات PHP عمومی' },
    { query: 'intitle:"Internet Information Services"', desc: 'IIS server pages', descFa: 'صفحات سرور IIS' },
    { query: 'intitle:"Tomcat" "Administration"', desc: 'Tomcat admin pages', descFa: 'صفحات ادمین Tomcat' },
    { query: 'inurl:/manager/html "Tomcat"', desc: 'Tomcat manager interface', descFa: 'رابط مدیریت Tomcat' },
  ],
  'SSH/Telnet': [
    { query: 'intitle:"SSH" "Secure Shell"', desc: 'SSH interface pages', descFa: 'صفحات رابط SSH' },
    { query: 'inurl:22 "SSH"', desc: 'SSH on port 22 references', descFa: 'ارجاعات SSH روی پورت 22' },
    { query: 'filetype:pem "BEGIN RSA PRIVATE KEY" "ssh"', desc: 'SSH private keys exposed', descFa: 'کلیدهای خصوصی SSH' },
    { query: 'intitle:"Telnet" "login"', desc: 'Telnet login interfaces', descFa: 'رابط‌های ورود Telnet' },
    { query: 'filetype:ssh "key" "ssh-rsa"', desc: 'SSH public/private key files', descFa: 'فایل‌های کلید SSH' },
    { query: '"authorized_keys" filetype:txt', desc: 'SSH authorized keys files', descFa: 'فایل‌های کلید مجاز SSH' },
    { query: '"ssh-rsa" "private"', desc: 'SSH RSA private keys in text', descFa: 'کلیدهای خصوصی RSA' },
    { query: 'inurl:authorized_keys', desc: 'Authorized keys file exposed', descFa: 'فایل کلید مجاز در معرض' },
    { query: 'inurl:id_rsa filetype:txt', desc: 'RSA identity file exposed', descFa: 'فایل هویت RSA' },
    { query: 'inurl:id_dsa', desc: 'DSA identity file exposed', descFa: 'فایل هویت DSA' },
  ],
  'CMS (Drupal, Magento)': [
    { query: 'inurl:node/add', desc: 'Drupal content creation pages', descFa: 'صفحات ایجاد محتوای دروپال' },
    { query: 'inurl:drupal', desc: 'Drupal CMS access', descFa: 'دسترسی CMS دروپال' },
    { query: 'intitle:"Drupal" "login"', desc: 'Drupal login pages', descFa: 'صفحات ورود دروپال' },
    { query: 'inurl:user/register "Drupal"', desc: 'Drupal user registration', descFa: 'ثبت نام کاربر دروپال' },
    { query: 'inurl:magento', desc: 'Magento e-commerce platforms', descFa: 'پلتفرم‌های فروشگاهی Magento' },
    { query: 'inurl:magento/admin', desc: 'Magento admin panel', descFa: 'پنل ادمین Magento' },
    { query: 'intitle:"Magento" "Admin"', desc: 'Magento admin interfaces', descFa: 'رابط‌های ادمین Magento' },
    { query: 'inurl:admin/magento', desc: 'Magento admin directory', descFa: 'دایرکتوری ادمین Magento' },
    { query: 'intitle:"Drupal" "admin"', desc: 'Drupal admin pages', descFa: 'صفحات ادمین دروپال' },
    { query: 'inurl:changelog.txt "magento"', desc: 'Magento version changelog', descFa: 'تغییرات نسخه Magento' },
    { query: 'intitle:"Drupal" "Installation"', desc: 'Drupal installation pages', descFa: 'صفحات نصب دروپال' },
    { query: 'inurl:magento/downloader', desc: 'Magento downloader interface', descFa: 'رابط دانلود Magento' },
  ],
  'Exposed APIs': [
    { query: 'inurl:swagger-ui.html', desc: 'Swagger API documentation UI', descFa: 'رابط مستندات API Swagger' },
    { query: 'inurl:swagger.json', desc: 'Swagger API JSON spec', descFa: 'مشخصات JSON API Swagger' },
    { query: 'inurl:api-docs', desc: 'Generic API documentation', descFa: 'مستندات API عمومی' },
    { query: 'inurl:api/swagger', desc: 'Swagger under API path', descFa: 'Swagger در مسیر API' },
    { query: 'inurl:api/v1', desc: 'API v1 endpoints exposed', descFa: 'نقاط پایانی API v1' },
    { query: 'inurl:api/v2', desc: 'API v2 endpoints exposed', descFa: 'نقاط پایانی API v2' },
    { query: 'inurl:api/rest', desc: 'REST API endpoints', descFa: 'نقاط پایانی REST API' },
    { query: 'inurl:graphql', desc: 'GraphQL endpoints', descFa: 'نقاط پایانی GraphQL' },
    { query: 'inurl:api/graphql', desc: 'GraphQL API endpoints', descFa: 'نقاط پایانی API GraphQL' },
    { query: 'inurl:api-key', desc: 'API key exposure', descFa: 'کلید API در معرض' },
    { query: 'intitle:"API Documentation"', desc: 'API documentation pages', descFa: 'صفحات مستندات API' },
    { query: 'inurl:openapi.json', desc: 'OpenAPI specification files', descFa: 'فایل‌های مشخصات OpenAPI' },
    { query: 'inurl:postman collection', desc: 'Postman API collections exposed', descFa: 'مجموعه‌های Postman API' },
  ],
  'Pastebin/Leaks': [
    { query: 'site:pastebin.com "password"', desc: 'Pastebin entries with passwords', descFa: 'ورودی‌های Pastebin با رمز' },
    { query: 'site:pastebin.com "email" "password"', desc: 'Pastebin with email credentials', descFa: 'Pastebin با اعتبار ایمیل' },
    { query: 'site:pastebin.com "api_key"', desc: 'Pastebin with API keys', descFa: 'Pastebin با کلید API' },
    { query: 'site:pastebin.com "ssh"', desc: 'Pastebin SSH key leaks', descFa: 'نشت کلید SSH در Pastebin' },
    { query: 'site:pastebin.com "credit card"', desc: 'Pastebin credit card leaks', descFa: 'نشت کارت اعتباری در Pastebin' },
    { query: 'site:pastebin.com "DB_PASSWORD"', desc: 'Pastebin with DB passwords', descFa: 'Pastebin با رمز دیتابیس' },
    { query: 'site:pastebin.com "token"', desc: 'Pastebin with auth tokens', descFa: 'Pastebin با توکن احراز هویت' },
    { query: 'site:pastie.org "password"', desc: 'Pastie with password leaks', descFa: 'Pastie با نشت رمز عبور' },
    { query: 'site:gist.github.com "password"', desc: 'GitHub Gist password leaks', descFa: 'Gist GitHub با نشت رمز' },
    { query: 'site:gist.github.com "api" "key"', desc: 'GitHub Gist API key leaks', descFa: 'Gist GitHub با نشت کلید API' },
    { query: 'site:hastebin.com "password"', desc: 'Hastebin with password leaks', descFa: 'Hastebin با نشت رمز عبور' },
    { query: 'site:ghostbin.com "password"', desc: 'Ghostbin password leaks', descFa: 'Ghostbin با نشت رمز عبور' },
  ],
  Firebase: [
    { query: 'site:firebaseio.com ".json"', desc: 'Exposed Firebase database JSON', descFa: 'JSON دیتابیس Firebase در معرض' },
    { query: 'inurl:firebaseio.com', desc: 'Firebase realtime databases', descFa: 'دیتابیس‌های بلادرنگ Firebase' },
    { query: 'intitle:"Firebase" "console"', desc: 'Firebase console pages', descFa: 'صفحات کنسول Firebase' },
    { query: 'inurl:firebase dashboards', desc: 'Firebase dashboard URLs', descFa: 'URLهای داشبورد Firebase' },
    { query: '"firebase" "apiKey"', desc: 'Firebase API keys exposed', descFa: 'کلیدهای API Firebase' },
    { query: 'inurl:firebaseapp.com', desc: 'Firebase hosting apps', descFa: 'برنامه‌های میزبانی Firebase' },
    { query: 'filetype:json "firebase" "databaseURL"', desc: 'Firebase config with database URL', descFa: 'کانفیگ Firebase با URL دیتابیس' },
    { query: '"firebase" "projectId"', desc: 'Firebase project configs', descFa: 'کانفیگ‌های پروژه Firebase' },
  ],
  Kubernetes: [
    { query: 'intitle:"Kubernetes" "Dashboard"', desc: 'Kubernetes dashboard UI', descFa: 'رابط داشبورد Kubernetes' },
    { query: 'inurl:6443 "api" "kubernetes"', desc: 'Kubernetes API server', descFa: 'سرور API Kubernetes' },
    { query: 'inurl:8001 "kubernetes"', desc: 'K8s proxy on port 8001', descFa: 'پراکسی K8s روی پورت 8001' },
    { query: 'intitle:"kube" "login"', desc: 'Kubernetes login pages', descFa: 'صفحات ورود Kubernetes' },
    { query: 'inurl:kubeconfig', desc: 'Kubeconfig files exposed', descFa: 'فایل‌های kubeconfig در معرض' },
    { query: 'filetype:yaml "kubeconfig"', desc: 'YAML kubeconfig files', descFa: 'فایل‌های YAML kubeconfig' },
    { query: 'filetype:json "kubeconfig"', desc: 'JSON kubeconfig files', descFa: 'فایل‌های JSON kubeconfig' },
    { query: 'intitle:"Kubernetes" "nodes"', desc: 'Kubernetes node pages', descFa: 'صفحات گره Kubernetes' },
    { query: 'intitle:"Kubernetes" "pods"', desc: 'K8s pod overview pages', descFa: 'صفحات نمای کلی pods K8s' },
    { query: 'inurl:kibana', desc: 'Kibana dashboards (K8s logging)', descFa: 'داشبوردهای Kibana' },
  ],
  'AWS Buckets': [
    { query: 'site:s3.amazonaws.com "index"', desc: 'S3 bucket listings', descFa: 'لیست باکت‌های S3' },
    { query: 'site:s3.amazonaws.com "s3"', desc: 'AWS S3 bucket root pages', descFa: 'صفحات ریشه باکت S3' },
    { query: 'intitle:"S3" "Bucket" "AWS"', desc: 'AWS S3 bucket administration', descFa: 'مدیریت باکت S3' },
    { query: 'inurl:/.aws/credentials', desc: 'AWS credentials file exposed', descFa: 'فایل اعتبار AWS در معرض' },
    { query: 'filetype:aws "credentials"', desc: 'AWS credential files', descFa: 'فایل‌های اعتبار AWS' },
    { query: 'inurl:.aws/config', desc: 'AWS config file exposed', descFa: 'فایل کانفیگ AWS در معرض' },
    { query: '"AWS_ACCESS_KEY" "AKIA"', desc: 'AWS access key ID leaks', descFa: 'نشت کلید دسترسی AWS' },
    { query: '"aws_access_key_id" filetype:txt', desc: 'AWS keys in text files', descFa: 'کلیدهای AWS در فایل‌های متنی' },
    { query: '"AWS_SECRET_KEY" "filetype:txt"', desc: 'AWS secret keys in text', descFa: 'کلیدهای مخفی AWS در متن' },
    { query: 'site:github.com "AKIA"', desc: 'AWS keys exposed on GitHub', descFa: 'کلیدهای AWS در GitHub' },
    { query: '"s3.amazonaws.com" "backup"', desc: 'S3 backup bucket discovery', descFa: 'کشف باکت پشتیبان S3' },
  ],
  'Session Files': [
    { query: 'filetype:sess "PHPSESSID"', desc: 'PHP session files exposed', descFa: 'فایل‌های نشست PHP' },
    { query: 'inurl:/tmp/sess_', desc: 'PHP session files in tmp', descFa: 'فایل‌های نشست PHP در tmp' },
    { query: 'filetype:session "PHPSESSID"', desc: 'PHP session dumps', descFa: 'dump نشست PHP' },
    { query: 'inurl:/var/lib/php/session', desc: 'PHP sessions in var/lib', descFa: 'نشست‌های PHP در var/lib' },
    { query: 'filetype:txt "PHPSESSID"', desc: 'Session IDs in text files', descFa: 'شناسه‌های نشست در فایل‌های متنی' },
    { query: '"session" "cookie" filetype:txt', desc: 'Session cookies in text', descFa: 'کوکی‌های نشست در متن' },
    { query: 'inurl:"session" "cookie"', desc: 'Session/cookie exposure', descFa: 'نشست/کوکی در معرض' },
  ],
  'IoT Devices': [
    { query: 'intitle:"Printer" "web interface"', desc: 'Printer web interfaces', descFa: 'رابط‌های وب چاپگر' },
    { query: 'intitle:"NAS" "web" "interface"', desc: 'NAS device web panels', descFa: 'پنل‌های وب NAS' },
    { query: 'intitle:"Network Storage" "login"', desc: 'Network storage login pages', descFa: 'صفحات ورود فضای ذخیره شبکه' },
    { query: 'intitle:"Synology" "DSM"', desc: 'Synology DSM admin panels', descFa: 'پنل‌های ادمین Synology DSM' },
    { query: 'intitle:"QNAP" "login"', desc: 'QNAP NAS login pages', descFa: 'صفحات ورود NAS QNAP' },
    { query: 'intitle:"HP" "Printer" "EZ"', desc: 'HP printer control pages', descFa: 'صفحات کنترل چاپگر HP' },
    { query: 'inurl:hp/device/this.LCDispatcher', desc: 'HP printer LCD dispatcher', descFa: 'LCD dispatcher چاپگر HP' },
    { query: 'intitle:"APC" "UPS" "status"', desc: 'APC UPS status pages', descFa: 'صفحات وضعیت UPS APC' },
    { query: 'intitle:"Samsung" "printer"', desc: 'Samsung printer interfaces', descFa: 'رابط‌های چاپگر سامسونگ' },
    { query: 'intitle:"Canon" "printer"', desc: 'Canon printer web interfaces', descFa: 'رابط‌های وب چاپگر کانن' },
    { query: 'intitle:"Epson" "printer"', desc: 'Epson printer web panels', descFa: 'پنل‌های وب چاپگر اپسون' },
    { query: 'intitle:"TP-LINK" "Wireless" "Status"', desc: 'TP-Link wireless status', descFa: 'وضعیت بی‌سیم TP-Link' },
  ],
  'Database Admin': [
    { query: 'inurl:adminer.php', desc: 'Adminer database manager', descFa: 'مدیریت دیتابیس Adminer' },
    { query: 'inurl:adminer', desc: 'Adminer interface pages', descFa: 'صفحات رابط Adminer' },
    { query: 'intitle:"Adminer"', desc: 'Adminer database admin tool', descFa: 'ابزار مدیریت دیتابیس Adminer' },
    { query: 'inurl:phppgadmin', desc: 'phpPgAdmin PostgreSQL admin', descFa: 'مدیریت PostgreSQL' },
    { query: 'intitle:"phpPgAdmin"', desc: 'phpPgAdmin interfaces', descFa: 'رابط‌های phpPgAdmin' },
    { query: 'inurl:sqlite', desc: 'SQLite manager pages', descFa: 'صفحات مدیریت SQLite' },
    { query: 'inurl:sqlite_manager', desc: 'SQLite manager tool', descFa: 'ابزار مدیریت SQLite' },
    { query: 'intitle:"SQLite" "browser"', desc: 'SQLite browser tools', descFa: 'ابزارهای مرورگر SQLite' },
    { query: 'inurl:mysqladmin', desc: 'MySQL admin tools', descFa: 'ابزارهای مدیریت MySQL' },
    { query: 'inurl:webdav', desc: 'WebDAV administration', descFa: 'مدیریت WebDAV' },
    { query: 'inurl:webdav filetype:txt', desc: 'WebDAV text files exposed', descFa: 'فایل‌های متنی WebDAV' },
  ],
};

const catKeys = Object.keys(dorkCategories);
const totalDorks = catKeys.reduce((s, k) => s + dorkCategories[k].length, 0);

const ops = [
  { value: 'intitle:', label: 'intitle:', placeholder: 'page title' },
  { value: 'allintitle:', label: 'allintitle:', placeholder: 'all words in title' },
  { value: 'inurl:', label: 'inurl:', placeholder: 'URL part' },
  { value: 'allinurl:', label: 'allinurl:', placeholder: 'all words in URL' },
  { value: 'intext:', label: 'intext:', placeholder: 'body text' },
  { value: 'allintext:', label: 'allintext:', placeholder: 'all words in body' },
  { value: 'filetype:', label: 'filetype:', placeholder: 'ext (pdf, sql, ...)' },
  { value: 'ext:', label: 'ext:', placeholder: 'extension (pdf, doc, ...)' },
  { value: 'site:', label: 'site:', placeholder: 'domain.com' },
  { value: 'inanchor:', label: 'inanchor:', placeholder: 'anchor text' },
  { value: 'allinanchor:', label: 'allinanchor:', placeholder: 'all anchor words' },
  { value: 'link:', label: 'link:', placeholder: 'URL' },
  { value: 'cache:', label: 'cache:', placeholder: 'URL' },
  { value: 'related:', label: 'related:', placeholder: 'URL' },
  { value: 'info:', label: 'info:', placeholder: 'URL' },
  { value: 'define:', label: 'define:', placeholder: 'word' },
  { value: 'stocks:', label: 'stocks:', placeholder: 'ticker' },
  { value: 'source:', label: 'source:', placeholder: 'news source' },
  { value: 'location:', label: 'location:', placeholder: 'location' },
  { value: 'before:', label: 'before:', placeholder: 'YYYY-MM-DD' },
  { value: 'after:', label: 'after:', placeholder: 'YYYY-MM-DD' },
  { value: 'daterange:', label: 'daterange:', placeholder: 'start-end' },
  { value: 'numrange:', label: 'numrange:', placeholder: 'min-max' },
  { value: 'AROUND', label: 'AROUND(N)', placeholder: 'N (distance)' },
  { value: '"', label: '"exact phrase"', placeholder: 'exact phrase' },
  { value: '-', label: '-exclude', placeholder: 'term to exclude' },
  { value: 'OR', label: 'OR operator', placeholder: 'alternative term' },
  { value: '+', label: '+include', placeholder: 'term to include' },
  { value: '~', label: '~synonym', placeholder: 'word for synonyms' },
  { value: '*', label: '* wildcard', placeholder: 'wildcard term' },
  { value: '%2a', label: '* (URL encoded)', placeholder: 'wildcard in URL' },
];

export default function render(lang) {
  const fa = lang === 'fa';

  const catNames = catKeys;
  const CAT_IDS = catNames.map((_, i) => `gd-cat-${i}`);

  return `
<style>
#google-dorks *{box-sizing:border-box}
#google-dorks .rtl{direction:rtl;text-align:right}
#google-dorks .sec-title{font-size:1.3rem;font-weight:600;margin-bottom:12px;color:var(--primary,#00c8ff)}
#google-dorks .gd-tabs{display:flex;gap:0;margin-bottom:16px;border-bottom:2px solid var(--border,#333)}
#google-dorks .gd-tab{padding:10px 20px;cursor:pointer;background:transparent;border:none;color:var(--text,#ccc);font-size:14px;opacity:.6;transition:all .2s;border-bottom:2px solid transparent;margin-bottom:-2px}
#google-dorks .gd-tab.active{opacity:1;color:var(--primary,#00c8ff);border-bottom-color:var(--primary,#00c8ff)}
#google-dorks .gd-pane{display:none}
#google-dorks .gd-pane.active{display:block}
#google-dorks .gd-search{width:100%;padding:10px 14px;border:1px solid var(--border,#444);border-radius:8px;background:var(--bg-card,#1a1a2e);color:var(--text,#eee);font-size:14px;margin-bottom:12px}
#google-dorks .gd-search::placeholder{color:var(--text-dim,#666)}
#google-dorks .gd-chips{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
#google-dorks .gd-chip{padding:6px 14px;border-radius:20px;border:1px solid var(--border,#444);background:transparent;color:var(--text,#ccc);cursor:pointer;font-size:13px;transition:all .2s;white-space:nowrap}
#google-dorks .gd-chip.active{background:var(--primary,#00c8ff);color:#000;border-color:var(--primary,#00c8ff)}
#google-dorks .gd-chip .badge{display:inline-block;background:rgba(255,255,255,.2);border-radius:10px;padding:0 7px;margin-left:5px;font-size:11px;line-height:18px}
#google-dorks .gd-chip.active .badge{background:rgba(0,0,0,.2)}
#google-dorks .gd-cat{margin-bottom:20px}
#google-dorks .gd-cat.hidden{display:none}
#google-dorks .gd-cat-header{display:flex;align-items:center;gap:10px;margin-bottom:10px;padding:8px 12px;background:var(--bg-card,#1a1a2e);border-radius:8px;border:1px solid var(--border,#333)}
#google-dorks .gd-cat-title{font-weight:600;font-size:15px;flex:1;color:var(--text,#eee)}
#google-dorks .gd-cat-badge{background:var(--primary,#00c8ff);color:#000;border-radius:12px;padding:2px 10px;font-size:12px;font-weight:600}
#google-dorks .gd-cat-copy{background:transparent;border:1px solid var(--border,#444);color:var(--text,#ccc);padding:4px 12px;border-radius:6px;cursor:pointer;font-size:12px;transition:all .2s}
#google-dorks .gd-cat-copy:hover{background:var(--primary,#00c8ff);color:#000;border-color:var(--primary,#00c8ff)}
#google-dorks .gd-item{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;margin-bottom:6px;background:var(--bg-card,#1a1a2e);border-radius:8px;border:1px solid var(--border,#2a2a3e);transition:border-color .2s}
#google-dorks .gd-item:hover{border-color:var(--primary,#00c8ff44)}
#google-dorks .gd-item-code{flex:1;min-width:0}
#google-dorks .gd-item-query{font-family:'Courier New',monospace;font-size:13px;color:var(--primary,#00c8ff);word-break:break-all;line-height:1.4;overflow-wrap:break-word}
#google-dorks .gd-item-desc{font-size:12px;color:var(--text-dim,#888);margin-top:2px}
#google-dorks .gd-item-actions{display:flex;gap:6px;flex-shrink:0;align-items:center}
#google-dorks .gd-item-copy,.gd-item-fav{background:transparent;border:1px solid var(--border,#444);color:var(--text,#ccc);padding:4px 10px;border-radius:6px;cursor:pointer;font-size:12px;transition:all .2s;line-height:1.4}
#google-dorks .gd-item-copy:hover{background:var(--primary,#00c8ff);color:#000;border-color:var(--primary,#00c8ff)}
#google-dorks .gd-item-fav:hover{border-color:var(--warning,#ffc107)}
#google-dorks .gd-item-fav.faved{background:var(--warning,#ffc107);color:#000;border-color:var(--warning,#ffc107)}
#google-dorks .gd-builder-row{display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap}
#google-dorks .gd-builder-row select,.gd-builder-row input{flex:1;min-width:120px;padding:9px 12px;border:1px solid var(--border,#444);border-radius:6px;background:var(--bg-card,#1a1a2e);color:var(--text,#eee);font-size:13px}
#google-dorks .gd-builder-row select option{background:#1a1a2e}
#google-dorks .gd-builder-op{display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:6px;margin-bottom:6px;font-size:13px}
#google-dorks .gd-builder-op .op-text{font-family:'Courier New',monospace;color:var(--primary,#00c8ff);flex:1;word-break:break-all}
#google-dorks .gd-builder-op .op-del{background:transparent;border:none;color:var(--danger,#ff4444);cursor:pointer;font-size:16px;padding:0 4px}
#google-dorks .gd-builder-actions{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
#google-dorks .gd-builder-actions button{padding:9px 20px;border-radius:6px;cursor:pointer;font-size:13px;transition:all .2s}
#google-dorks .gd-btn-primary{background:var(--primary,#00c8ff);color:#000;border:none;font-weight:600}
#google-dorks .gd-btn-primary:hover{filter:brightness(1.1)}
#google-dorks .gd-btn-secondary{background:transparent;border:1px solid var(--border,#444);color:var(--text,#ccc)}
#google-dorks .gd-btn-secondary:hover{border-color:var(--text,#888)}
#google-dorks .gd-result{display:none;margin-top:12px;padding:14px;background:var(--bg-card,#1a1a2e);border:1px solid var(--primary,#00c8ff44);border-radius:8px}
#google-dorks .gd-result.show{display:block}
#google-dorks .gd-result pre{font-family:'Courier New',monospace;font-size:14px;color:var(--primary,#00c8ff);margin:0 0 10px 0;padding:10px;background:rgba(0,0,0,.3);border-radius:6px;overflow-x:auto;white-space:pre-wrap;word-break:break-all}
#google-dorks .gd-summary{font-size:13px;color:var(--text-dim,#888);margin-bottom:12px;padding:8px 12px;background:var(--bg-card,#1a1a2e);border-radius:6px}
#google-dorks .gd-fav-section{margin-bottom:16px;padding:10px 14px;background:var(--bg-card,#1a1a2e);border:1px dashed var(--warning,#ffc10788);border-radius:8px}
#google-dorks .gd-fav-section.empty{display:none}
#google-dorks .gd-fav-title{font-size:14px;font-weight:600;color:var(--warning,#ffc107);margin-bottom:8px;display:flex;align-items:center;gap:8px}
#google-dorks .gd-fav-dorks{display:flex;flex-direction:column;gap:6px}
#google-dorks .gd-fav-tag{padding:2px 8px;background:var(--warning,#ffc10722);color:var(--warning,#ffc107);border-radius:4px;font-size:11px;margin-left:6px}
#google-dorks .gd-ops-ref{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;margin-bottom:20px}
#google-dorks .gd-op-card{padding:10px 14px;background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px}
#google-dorks .gd-op-card .op-name{font-family:'Courier New',monospace;font-size:14px;color:var(--primary,#00c8ff);font-weight:600}
#google-dorks .gd-op-card .op-desc{font-size:12px;color:var(--text-dim,#888);margin-top:4px}
</style>
<div id="google-dorks"${fa ? ' dir="rtl"' : ''}>
  <div class="sec-title">${fa ? 'مرجع کامل جستجوی Google Dork' : 'Complete Google Dork Reference'} <span style="font-size:12px;opacity:.6">(${totalDorks} dorks, 30+ operators)</span></div>
  <div class="gd-tabs" id="gd-tabs">
    <button class="gd-tab active" data-gd-tab="gd-ref">${fa ? 'مرجع Dork' : 'Dork Reference'}</button>
    <button class="gd-tab" data-gd-tab="gd-operators">${fa ? 'عملگرها' : 'Operators'}</button>
    <button class="gd-tab" data-gd-tab="gd-builder">${fa ? 'ساخت جستجو' : 'Search Builder'}</button>
  </div>

  <!-- Reference Tab -->
  <div class="gd-pane active" id="gd-ref">
    <input id="gd-fsearch" class="gd-search" placeholder="${fa ? 'جستجوی dorkها...' : 'Search dorks...'}" spellcheck="false">
    <div class="gd-chips" id="gd-chips">
      <button class="gd-chip active" data-gd-cat="all">${fa ? 'همه' : 'All'} <span class="badge">${totalDorks}</span></button>
      ${catNames.map((n, i) => `<button class="gd-chip" data-gd-cat="${CAT_IDS[i]}">${fa ? getFaCat(n) : n} <span class="badge">${dorkCategories[n].length}</span></button>`).join('')}
    </div>

    <div class="gd-fav-section" id="gd-fav-section">
      <div class="gd-fav-title">&#9733; ${fa ? 'مورد علاقه‌ها' : 'Favorites'} <span id="gd-fav-count" style="font-size:12px;opacity:.6"></span></div>
      <div id="gd-fav-dorks"></div>
    </div>

    <div id="gd-cats">
      ${catNames.map((n, i) => `
      <div class="gd-cat" id="${CAT_IDS[i]}">
        <div class="gd-cat-header">
          <span class="gd-cat-title">${fa ? getFaCat(n) : n}</span>
          <span class="gd-cat-badge">${dorkCategories[n].length}</span>
          <button class="gd-cat-copy" data-gd-copyall="${i}">${fa ? 'کپی همه' : 'Copy All'}</button>
        </div>
        ${dorkCategories[n].map((d, j) => {
          const qEsc = esc(d.query);
          const fkey = `${i}:${j}`;
          return `
        <div class="gd-item" data-gd-idx="${fkey}">
          <div class="gd-item-code">
            <div class="gd-item-query">${qEsc}</div>
            <div class="gd-item-desc">${fa ? d.descFa : d.desc}</div>
          </div>
          <div class="gd-item-actions">
            <button class="gd-item-copy" data-gd-copy="${qEsc}" title="${fa ? 'کپی' : 'Copy'}">${fa ? 'کپی' : 'Copy'}</button>
            <button class="gd-item-fav" data-gd-fav="${qEsc}" title="${fa ? 'مورد علاقه' : 'Favorite'}">&#9733;</button>
          </div>
        </div>`}).join('')}
      </div>`).join('')}
    </div>
  </div>

  <!-- Operators Tab -->
  <div class="gd-pane" id="gd-operators">
    <div class="sec-title" style="font-size:1.1rem">${fa ? 'عملگرهای جستجوی گوگل' : 'Google Search Operators'}</div>
    <div class="gd-ops-ref">
      ${[
        { op: 'intitle:', desc: fa ? 'کلمات مشخص شده را در عنوان صفحه جستجو می‌کند' : 'Finds pages with specific words in the title', eg: 'intitle:"login page"' },
        { op: 'allintitle:', desc: fa ? 'تمام کلمات را در عنوان جستجو می‌کند' : 'Finds all specified words in the title', eg: 'allintitle:admin login' },
        { op: 'inurl:', desc: fa ? 'کلمات را در URL جستجو می‌کند' : 'Finds pages with specific words in the URL', eg: 'inurl:admin.php' },
        { op: 'allinurl:', desc: fa ? 'تمام کلمات را در URL جستجو می‌کند' : 'Finds all specified words in the URL', eg: 'allinurl:admin panel' },
        { op: 'intext:', desc: fa ? 'کلمات را در متن صفحه جستجو می‌کند' : 'Finds pages with specific words in body text', eg: 'intext:"password"' },
        { op: 'allintext:', desc: fa ? 'تمام کلمات را در متن جستجو می‌کند' : 'Finds all words in body text', eg: 'allintext:password username' },
        { op: 'filetype:', desc: fa ? 'فایل‌های با پسوند مشخص را جستجو می‌کند' : 'Searches for files with specific extension', eg: 'filetype:pdf confidential' },
        { op: 'ext:', desc: fa ? 'همان filetype - جستجوی پسوند فایل' : 'Same as filetype - searches file extension', eg: 'ext:sql password' },
        { op: 'site:', desc: fa ? 'نتایج را به یک دامنه خاص محدود می‌کند' : 'Limits results to a specific domain', eg: 'site:example.com' },
        { op: 'inanchor:', desc: fa ? 'متن لینک (anchor) را جستجو می‌کند' : 'Finds pages linked with specific anchor text', eg: 'inanchor:"click here"' },
        { op: 'allinanchor:', desc: fa ? 'تمام کلمات در anchor text' : 'All words in anchor text', eg: 'allinanchor:admin login' },
        { op: 'link:', desc: fa ? 'صفحاتی که به یک URL لینک داده‌اند' : 'Finds pages that link to a URL', eg: 'link:example.com' },
        { op: 'cache:', desc: fa ? 'نمایش نسخه ذخیره شده در حافظه گوگل' : 'Shows Google cached version of a page', eg: 'cache:example.com' },
        { op: 'related:', desc: fa ? 'صفحات مشابه یک URL را پیدا می‌کند' : 'Finds pages similar to a URL', eg: 'related:example.com' },
        { op: 'info:', desc: fa ? 'اطلاعات مربوط به یک URL را نشان می‌دهد' : 'Shows information about a URL', eg: 'info:example.com' },
        { op: 'define:', desc: fa ? 'تعریف یک کلمه را نشان می‌دهد' : 'Shows definition of a word', eg: 'define:phishing' },
        { op: 'stocks:', desc: fa ? 'اطلاعات سهام یک نماد را نشان می‌دهد' : 'Shows stock information for a ticker', eg: 'stocks:aapl' },
        { op: 'source:', desc: fa ? 'اخبار از یک منبع خاص' : 'News from a specific source', eg: 'source:bbc news' },
        { op: 'location:', desc: fa ? 'نتایج مرتبط با یک مکان' : 'Results related to a location', eg: 'location:london' },
        { op: 'before:', desc: fa ? 'نتایج قبل از یک تاریخ' : 'Results before a specific date', eg: 'before:2023-01-01' },
        { op: 'after:', desc: fa ? 'نتایج بعد از یک تاریخ' : 'Results after a specific date', eg: 'after:2023-01-01' },
        { op: 'daterange:', desc: fa ? 'بازه زمانی به صورت جولیان' : 'Date range in Julian format', eg: 'daterange:2459000-2459100' },
        { op: 'numrange:', desc: fa ? 'محدوده اعداد' : 'Number range', eg: 'numrange:100-200' },
        { op: 'AROUND(N)', desc: fa ? 'کلمات در فاصله N از هم' : 'Words within N words of each other', eg: 'password AROUND(5) username' },
        { op: '"exact"', desc: fa ? 'جستجوی عبارت دقیق' : 'Exact phrase search', eg: '"admin password"' },
        { op: '-exclude', desc: fa ? 'حذف یک کلمه از نتایج' : 'Exclude a word from results', eg: 'password -gmail' },
        { op: 'OR', desc: fa ? 'یکی از دو عبارت' : 'Either term (OR logic)', eg: 'admin OR administrator' },
        { op: '+include', desc: fa ? 'اجباری کردن یک کلمه' : 'Force inclusion of a word', eg: '+password login' },
        { op: '~synonym', desc: fa ? 'کلمه و مترادف‌های آن' : 'Word and its synonyms', eg: '~security' },
        { op: '*', desc: fa ? 'جانشین هر کلمه (wildcard)' : 'Wildcard - matches any word', eg: '"password * username"' },
      ].map(o => `
      <div class="gd-op-card">
        <div class="op-name">${esc(o.op)}</div>
        <div class="op-desc">${o.desc}</div>
        <div style="margin-top:6px;font-size:11px;color:var(--text-dim,#666);font-family:monospace">${esc(o.eg)}</div>
      </div>`).join('')}
    </div>
  </div>

  <!-- Builder Tab -->
  <div class="gd-pane" id="gd-builder">
    <div class="gd-builder-row">
      <select id="gd-op-select">
        <option value="">${fa ? 'انتخاب عملگر' : 'Select operator'}</option>
        ${ops.map(o => `<option value="${o.value}" data-place="${o.placeholder}">${o.label}</option>`).join('')}
      </select>
      <input id="gd-op-input" placeholder="${fa ? 'مقدار...' : 'Value...'}">
      <button class="gd-btn-secondary" id="gd-op-add" style="padding:9px 18px;border-radius:6px;cursor:pointer;flex-shrink:0">+ ${fa ? 'افزودن' : 'Add'}</button>
    </div>
    <div id="gd-op-list"></div>
    <div class="gd-builder-actions">
      <button class="gd-btn-primary" id="gd-op-gen">${fa ? 'تولید جستجو' : 'Generate Query'}</button>
      <button class="gd-btn-secondary" id="gd-op-clear">${fa ? 'پاک کردن' : 'Clear'}</button>
    </div>
    <div class="gd-result" id="gd-builder-result">
      <pre id="gd-builder-query"></pre>
      <button class="gd-item-copy" data-gd-copy-from="gd-builder-query">${fa ? 'کپی' : 'Copy'}</button>
    </div>
  </div>
</div>`;
}

export function init(lang) {
  const fa = lang === 'fa';
  const container = document.getElementById('content');

  function getFavs() {
    try { return JSON.parse(localStorage.getItem('gd-favs') || '[]'); } catch { return []; }
  }

  function setFavs(favs) {
    localStorage.setItem('gd-favs', JSON.stringify(favs));
    updateFavsUI(favs);
  }

  function updateFavsUI(favs) {
    const section = document.getElementById('gd-fav-section');
    const list = document.getElementById('gd-fav-dorks');
    const cnt = document.getElementById('gd-fav-count');
    if (!section || !list) return;
    if (!favs || !favs.length) {
      section.classList.add('empty');
      return;
    }
    section.classList.remove('empty');
    cnt.textContent = `(${favs.length})`;
    list.innerHTML = favs.map(q => `
      <div class="gd-item">
        <div class="gd-item-code">
          <div class="gd-item-query">${esc(q)}</div>
        </div>
        <div class="gd-item-actions">
          <span class="gd-fav-tag">&#9733;</span>
          <button class="gd-item-copy" data-gd-copy="${esc(q)}">${fa ? 'کپی' : 'Copy'}</button>
          <button class="gd-item-fav faved" data-gd-fav="${esc(q)}">&#9733;</button>
        </div>
      </div>`).join('');
    list.querySelectorAll('[data-gd-fav]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const q = btn.getAttribute('data-gd-fav');
        let favs = getFavs();
        const idx = favs.indexOf(q);
        if (idx > -1) favs.splice(idx, 1);
        setFavs(favs);
        document.querySelectorAll(`[data-gd-fav="${q}"]`).forEach(b => b.classList.toggle('faved', false));
      });
    });
  }

  function syncFavIcons() {
    const favs = getFavs();
    document.querySelectorAll('[data-gd-fav]').forEach(btn => {
      btn.classList.toggle('faved', favs.indexOf(btn.getAttribute('data-gd-fav')) > -1);
    });
    updateFavsUI(favs);
  }

  container.addEventListener('click', (e) => {
    const target = e.target;

    const tab = target.closest('.gd-tab');
    if (tab && tab.closest('#gd-tabs')) {
      container.querySelectorAll('.gd-tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.gd-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.getElementById(tab.getAttribute('data-gd-tab'));
      if (pane) pane.classList.add('active');
      return;
    }

    const copyBtn = target.closest('[data-gd-copy]');
    if (copyBtn) {
      navigator.clipboard.writeText(copyBtn.getAttribute('data-gd-copy'));
      const orig = copyBtn.textContent;
      copyBtn.textContent = fa ? '✓ کپی شد' : '✓ Copied';
      setTimeout(() => { copyBtn.textContent = orig; }, 1200);
      return;
    }

    const copyFrom = target.closest('[data-gd-copy-from]');
    if (copyFrom) {
      const el = document.getElementById(copyFrom.getAttribute('data-gd-copy-from'));
      if (el) {
        navigator.clipboard.writeText(el.textContent);
        const orig = copyFrom.textContent;
        copyFrom.textContent = fa ? '✓ کپی شد' : '✓ Copied';
        setTimeout(() => { copyFrom.textContent = orig; }, 1200);
      }
      return;
    }

    const copyAll = target.closest('[data-gd-copyall]');
    if (copyAll) {
      const idx = parseInt(copyAll.getAttribute('data-gd-copyall'));
      const cat = catKeys[idx];
      if (cat) {
        const text = dorkCategories[cat].map(d => d.query).join('\n');
        navigator.clipboard.writeText(text);
        const orig = copyAll.textContent;
        copyAll.textContent = fa ? '✓ کپی شد' : '✓ Copied';
        setTimeout(() => { copyAll.textContent = orig; }, 1200);
      }
      return;
    }

    const favBtn = target.closest('[data-gd-fav]');
    if (favBtn) {
      const q = favBtn.getAttribute('data-gd-fav');
      let favs = getFavs();
      const idx = favs.indexOf(q);
      if (idx > -1) {
        favs.splice(idx, 1);
      } else {
        favs.push(q);
      }
      setFavs(favs);
      syncFavIcons();
      return;
    }

    const chip = target.closest('.gd-chip');
    if (chip && chip.closest('#gd-chips')) {
      document.querySelectorAll('#gd-chips .gd-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.getAttribute('data-gd-cat');
      document.querySelectorAll('#gd-cats .gd-cat').forEach(c => {
        if (cat === 'all') {
          c.classList.remove('hidden');
        } else {
          c.classList.toggle('hidden', c.id !== cat);
        }
      });
      return;
    }
  });

  const searchInput = document.getElementById('gd-fsearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('#gd-cats .gd-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? '' : 'none';
      });
      document.querySelectorAll('#gd-cats .gd-cat').forEach(cat => {
        const visible = Array.from(cat.querySelectorAll('.gd-item')).some(i => i.style.display !== 'none');
        cat.style.display = visible ? '' : 'none';
      });
    });
  }

  const opSelect = document.getElementById('gd-op-select');
  const opInput = document.getElementById('gd-op-input');
  const addBtn = document.getElementById('gd-op-add');
  const opList = document.getElementById('gd-op-list');
  const genBtn = document.getElementById('gd-op-gen');
  const clearBtn = document.getElementById('gd-op-clear');
  const result = document.getElementById('gd-builder-result');
  const queryPre = document.getElementById('gd-builder-query');

  const builderOps = [];

  function renderBuilderOps() {
    opList.innerHTML = builderOps.map((item, i) =>
      `<div class="gd-builder-op">
        <span class="op-text">${esc(item)}</span>
        <button class="op-del" data-gd-delop="${i}">&times;</button>
      </div>`
    ).join('');
  }

  if (opSelect && opInput && addBtn && opList) {
    opSelect.addEventListener('change', () => {
      const opt = opSelect.options[opSelect.selectedIndex];
      if (opt && opt.dataset.place) {
        opInput.placeholder = opt.dataset.place;
      }
    });

    addBtn.addEventListener('click', () => {
      const op = opSelect.value;
      const val = opInput.value.trim();
      if (!val) return;
      const combined = op + val;
      builderOps.push(combined);
      renderBuilderOps();
      opInput.value = '';
      opInput.focus();
    });

    opInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addBtn.click();
    });

    opList.addEventListener('click', (e) => {
      const del = e.target.closest('[data-gd-delop]');
      if (del) {
        const idx = parseInt(del.getAttribute('data-gd-delop'));
        builderOps.splice(idx, 1);
        renderBuilderOps();
      }
    });
  }

  if (genBtn && result && queryPre) {
    genBtn.addEventListener('click', () => {
      if (!builderOps.length) return;
      const query = builderOps.join(' ');
      queryPre.textContent = query;
      result.classList.add('show');
    });
  }

  if (clearBtn && opList && result && queryPre) {
    clearBtn.addEventListener('click', () => {
      builderOps.length = 0;
      renderBuilderOps();
      result.classList.remove('show');
      queryPre.textContent = '';
    });
  }

  syncFavIcons();
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getFaCat(en) {
  const map = {
    'SQL Injection': 'SQL Injection',
    'File Upload': 'آپلود فایل',
    'Directory Listing': 'لیست دایرکتوری',
    'Sensitive Files': 'فایل‌های حساس',
    'Login Pages': 'صفحات ورود',
    'Config Files': 'فایل‌های کانفیگ',
    'Database Files': 'فایل‌های دیتابیس',
    'Cameras/IoT': 'دوربین‌ها/IoT',
    WordPress: 'وردپرس',
    Joomla: 'جوملا',
    'Admin Panels': 'پنل‌های ادمین',
    'Error Messages': 'پیام‌های خطا',
    'Log Files': 'فایل‌های لاگ',
    'Backup Files': 'فایل‌های پشتیبان',
    'Email/Info': 'ایمیل/اطلاعات',
    'Network Devices': 'دستگاه‌های شبکه',
    'FTP Servers': 'سرورهای FTP',
    'Git Repositories': 'مخازن Git',
    'Cloud Storage': 'فضای ابری',
    phpMyAdmin: 'phpMyAdmin',
    'CI/CD & DevOps': 'CI/CD و DevOps',
    Docker: 'Docker',
    Elasticsearch: 'Elasticsearch',
    MongoDB: 'MongoDB',
    'Open Redirect': 'هدایت باز',
    'XSS Parameters': 'پارامترهای XSS',
    'Server Status': 'وضعیت سرور',
    'SSH/Telnet': 'SSH/Telnet',
    'CMS (Drupal, Magento)': 'CMS (دروپال، مگنتو)',
    'Exposed APIs': 'APIهای در معرض',
    'Pastebin/Leaks': 'Pastebin/نشت',
    Firebase: 'Firebase',
    Kubernetes: 'Kubernetes',
    'AWS Buckets': 'باکت‌های AWS',
    'Session Files': 'فایل‌های نشست',
    'IoT Devices': 'دستگاه‌های IoT',
    'Database Admin': 'مدیریت دیتابیس',
  };
  return map[en] || en;
}
