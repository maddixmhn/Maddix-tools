export default function(lang) {
  var f = lang === 'fa';
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">💾</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">SQL Formatter</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'فرمت، بهینه‌سازی و اعتبارسنجی کوئری‌های SQL':'Format, beautify, and validate SQL queries')+'</p></div>'+
    '</div>'+
    '<div class="tab-bar" id="sql-tabs" style="margin-bottom:16px">'+
      '<button class="active" data-sqltab="format">'+(f?'فرمت':'Format')+'</button>'+
      '<button data-sqltab="minify">'+(f?'فشرده':'Minify')+'</button>'+
      '<button data-sqltab="keywords">'+(f?'کلمات کلیدی':'Keywords')+'</button>'+
    '</div>'+
    '<div class="sqltab-content" data-sqltab="format">'+
      '<select id="sql-dialect" style="width:100%;padding:9px 12px;border:1px solid var(--border,#444);border-radius:6px;background:var(--bg-card,#1a1a2e);color:var(--text,#eee);font-size:.8125rem;outline:none;margin-bottom:10px">'+
        '<option value="sql">SQL '+(f?'عمومی':'Generic')+'</option>'+
        '<option value="mysql">MySQL</option>'+
        '<option value="postgresql">PostgreSQL</option>'+
        '<option value="sqlite">SQLite</option>'+
        '<option value="mssql">MS SQL Server</option>'+
        '<option value="oracle">Oracle</option>'+
      '</select>'+
      '<textarea id="sql-input" rows="10" placeholder="SELECT * FROM users WHERE id = 1" style="width:100%;padding:10px 14px;border:1px solid var(--border,#444);border-radius:6px;background:var(--bg-card,#1a1a2e);color:var(--text,#eee);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea>'+
      '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">'+
        '<button id="sql-format-btn" style="padding:9px 20px;border:none;border-radius:6px;background:var(--primary,#00c8ff);color:#000;cursor:pointer;font-size:.8125rem;font-weight:600">'+(f?'فرمت کردن':'Format SQL')+'</button>'+
        '<button id="sql-copy-btn" style="padding:9px 20px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text,#ccc);cursor:pointer;font-size:.8125rem">'+(f?'کپی':'Copy')+'</button>'+
        '<button id="sql-clear-btn" style="padding:9px 20px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text,#ccc);cursor:pointer;font-size:.8125rem">'+(f?'پاک کردن':'Clear')+'</button>'+
      '</div>'+
    '</div>'+
    '<div class="sqltab-content" data-sqltab="minify" style="display:none">'+
      '<textarea id="sql-min-input" rows="10" placeholder="SELECT * FROM users" style="width:100%;padding:10px 14px;border:1px solid var(--border,#444);border-radius:6px;background:var(--bg-card,#1a1a2e);color:var(--text,#eee);font-size:.8125rem;outline:none;resize:vertical;font-family:monospace;direction:ltr"></textarea>'+
      '<div style="display:flex;gap:8px;margin-top:8px">'+
        '<button id="sql-minify-btn" style="padding:9px 20px;border:none;border-radius:6px;background:var(--primary,#00c8ff);color:#000;cursor:pointer;font-size:.8125rem;font-weight:600">'+(f?'فشرده کردن':'Minify')+'</button>'+
        '<button id="sql-min-copy-btn" style="padding:9px 20px;border:1px solid var(--border,#444);border-radius:6px;background:transparent;color:var(--text,#ccc);cursor:pointer;font-size:.8125rem">'+(f?'کپی':'Copy')+'</button>'+
      '</div>'+
    '</div>'+
    '<div class="sqltab-content" data-sqltab="keywords" style="display:none">'+
      '<div style="overflow-x:auto">'+
        '<table style="width:100%;border-collapse:collapse;font-size:.8125rem">'+
          '<thead><tr>'+
            '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f?'کلیدواژه':'Keyword')+'</th>'+
            '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f?'نوع':'Type')+'</th>'+
            '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f?'توضیح':'Description')+'</th>'+
          '</tr></thead><tbody>'+
          sqlKeywords.map(function(k){ return '<tr>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border);font-weight:700;font-family:monospace;color:var(--primary,#00c8ff)">'+k[0]+'</td>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border)"><span style="font-size:.6875rem;padding:2px 6px;border-radius:4px;background:'+k[3]+'22;color:'+k[3]+'">'+k[1]+'</span></td>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border);color:var(--text-dim,#888)">'+(f?k[4]:k[2])+'</td>'+
          '</tr>'; }).join('')+
        '</tbody></table>'+
      '</div>'+
      '<div style="margin-top:12px;padding:8px;background:var(--bg-card,#1a1a2e);border-radius:6px;font-size:.75rem;color:var(--text-dim,#888);text-align:center">'+(f?'تعداد: ':'Total: ')+sqlKeywords.length+' '+(f?'کلیدواژه':'keywords')+'</div>'+
    '</div>'+
    '<div id="sql-output" style="margin-top:12px;padding:14px;background:var(--bg-card,#1a1a2e);border:1px solid var(--border,#333);border-radius:8px;font-family:monospace;font-size:.8125rem;line-height:1.6;min-height:60px;white-space:pre-wrap;word-break:break-all;overflow-x:auto;display:none"></div>'+
  '</div>';
}

var sqlKeywords = [
  ['SELECT','DML','Retrieve data from database',3,'var(--success,#22c55e)','بازیابی داده از دیتابیس'],
  ['INSERT','DML','Add new rows to a table',3,'var(--success,#22c55e)','افزودن ردیف جدید به جدول'],
  ['UPDATE','DML','Modify existing data',3,'var(--success,#22c55e)','تغییر داده موجود'],
  ['DELETE','DML','Remove rows from a table',3,'var(--success,#22c55e)','حذف ردیف از جدول'],
  ['CREATE','DDL','Create database objects',3,'var(--warning,#f59e0b)','ایجاد اشیاء دیتابیس'],
  ['ALTER','DDL','Modify database objects',3,'var(--warning,#f59e0b)','تغییر اشیاء دیتابیس'],
  ['DROP','DDL','Remove database objects',3,'var(--danger,#ef4444)','حذف اشیاء دیتابیس'],
  ['TRUNCATE','DDL','Remove all rows quickly',3,'var(--danger,#ef4444)','حذف سریع تمام ردیف‌ها'],
  ['GRANT','DCL','Give user permissions',3,'var(--warning,#f59e0b)','اعطای مجوز به کاربر'],
  ['REVOKE','DCL','Remove user permissions',3,'var(--danger,#ef4444)','حذف مجوز کاربر'],
  ['COMMIT','TCL','Save transaction changes',3,'var(--success,#22c55e)','ذخیره تغییرات تراکنش'],
  ['ROLLBACK','TCL','Undo transaction changes',3,'var(--danger,#ef4444)','برگشت تغییرات تراکنش'],
  ['SAVEPOINT','TCL','Set transaction savepoint',3,'var(--warning,#f59e0b)','تنظیم نقطه ذخیره تراکنش'],
  ['FROM','Clause','Specify source table',3,'var(--primary,#3b82f6)','مشخص کردن جدول مبدا'],
  ['WHERE','Clause','Filter results',3,'var(--primary,#3b82f6)','فیلتر کردن نتایج'],
  ['AND','Operator','Logical AND condition',3,'var(--primary,#3b82f6)','شرط منطقی AND'],
  ['OR','Operator','Logical OR condition',3,'var(--primary,#3b82f6)','شرط منطقی OR'],
  ['NOT','Operator','Logical negation',3,'var(--primary,#3b82f6)','نفی منطقی'],
  ['IN','Operator','Match set membership',3,'var(--primary,#3b82f6)','تطبیق عضویت در مجموعه'],
  ['BETWEEN','Operator','Range comparison',3,'var(--primary,#3b82f6)','مقایسه محدوده'],
  ['LIKE','Operator','Pattern matching',3,'var(--primary,#3b82f6)','تطبیق الگو'],
  ['IS NULL','Operator','Check for null values',3,'var(--primary,#3b82f6)','بررسی مقادیر تهی'],
  ['EXISTS','Operator','Check subquery results',3,'var(--primary,#3b82f6)','بررسی نتایج زیرکوئری'],
  ['JOIN','Clause','Combine tables',3,'var(--primary,#3b82f6)','ترکیب جداول'],
  ['INNER JOIN','Clause','Matching rows only',3,'var(--primary,#3b82f6)','فقط ردیف‌های همسان'],
  ['LEFT JOIN','Clause','All left table rows',3,'var(--primary,#3b82f6)','همه ردیف‌های جدول چپ'],
  ['RIGHT JOIN','Clause','All right table rows',3,'var(--primary,#3b82f6)','همه ردیف‌های جدول راست'],
  ['FULL JOIN','Clause','All rows from both',3,'var(--primary,#3b82f6)','همه ردیف‌های هر دو'],
  ['CROSS JOIN','Clause','Cartesian product',3,'var(--primary,#3b82f6)','ضرب دکارتی'],
  ['ON','Clause','Join condition',3,'var(--primary,#3b82f6)','شرط اتصال'],
  ['GROUP BY','Clause','Group rows',3,'var(--warning,#f59e0b)','گروه‌بندی ردیف‌ها'],
  ['HAVING','Clause','Filter groups',3,'var(--warning,#f59e0b)','فیلتر کردن گروه‌ها'],
  ['ORDER BY','Clause','Sort results',3,'var(--warning,#f59e0b)','مرتب‌سازی نتایج'],
  ['ASC','Keyword','Ascending order',3,'var(--text-dim,#888)','ترتیب صعودی'],
  ['DESC','Keyword','Descending order',3,'var(--text-dim,#888)','ترتیب نزولی'],
  ['LIMIT','Clause','Limit rows returned',3,'var(--warning,#f59e0b)','محدود کردن ردیف‌ها'],
  ['OFFSET','Clause','Skip rows',3,'var(--warning,#f59e0b)','رد کردن ردیف‌ها'],
  ['UNION','Set','Combine query results',3,'var(--primary,#3b82f6)','ترکیب نتایج کوئری'],
  ['UNION ALL','Set','Combine all results',3,'var(--primary,#3b82f6)','ترکیب همه نتایج'],
  ['INTERSECT','Set','Common rows',3,'var(--primary,#3b82f6)','ردیف‌های مشترک'],
  ['EXCEPT','Set','Rows in first only',3,'var(--primary,#3b82f6)','ردیف‌های فقط اولی'],
  ['DISTINCT','Keyword','Remove duplicates',3,'var(--warning,#f59e0b)','حذف تکراری‌ها'],
  ['AS','Keyword','Create alias',3,'var(--text-dim,#888)','ایجاد نام مستعار'],
  ['CASE','Expression','Conditional logic',3,'var(--primary,#3b82f6)','منطق شرطی'],
  ['WHEN','Expression','Case condition',3,'var(--primary,#3b82f6)','شرط CASE'],
  ['THEN','Expression','Case result',3,'var(--primary,#3b82f6)','نتیجه CASE'],
  ['ELSE','Expression','Default case',3,'var(--primary,#3b82f6)','حالت پیش‌فرض'],
  ['END','Expression','End case block',3,'var(--primary,#3b82f6)','پایان بلوک CASE'],
  ['INDEX','DDL','Create performance index',3,'var(--warning,#f59e0b)','ایجاد ایندکس کارایی'],
  ['VIEW','DDL','Create virtual table',3,'var(--warning,#f59e0b)','ایجاد جدول مجازی'],
  ['PROCEDURE','DDL','Create stored procedure',3,'var(--warning,#f59e0b)','ایجاد رویه ذخیره شده'],
  ['FUNCTION','DDL','Create user function',3,'var(--warning,#f59e0b)','ایجاد تابع کاربر'],
  ['TRIGGER','DDL','Create automated action',3,'var(--warning,#f59e0b)','ایجاد عملکرد خودکار'],
  ['CASCADE','Keyword','Propagate changes',3,'var(--danger,#ef4444)','انتشار تغییرات'],
  ['RESTRICT','Keyword','Prevent changes',3,'var(--danger,#ef4444)','جلوگیری از تغییرات'],
  ['PRIMARY KEY','Constraint','Unique row identifier',3,'var(--danger,#ef4444)','شناسه منحصر به فرد ردیف'],
  ['FOREIGN KEY','Constraint','Cross-table reference',3,'var(--warning,#f59e0b)','ارجاع بین جدولی'],
  ['UNIQUE','Constraint','Ensure unique values',3,'var(--warning,#f59e0b)','اطمینان از مقادیر یکتا'],
  ['CHECK','Constraint','Validate column data',3,'var(--warning,#f59e0b)','اعتبارسنجی داده ستون'],
  ['DEFAULT','Constraint','Set default value',3,'var(--text-dim,#888)','تنظیم مقدار پیش‌فرض'],
  ['AUTO_INCREMENT','Keyword','Auto-numbering (MySQL)',3,'var(--success,#22c55e)','شماره‌دهی خودکار'],
  ['SERIAL','Keyword','Auto-numbering (PG)',3,'var(--success,#22c55e)','شماره‌دهی خودکار (PG)'],
  ['IF','Keyword','Conditional execution',3,'var(--primary,#3b82f6)','اجرای شرطی'],
  ['BEGIN','Keyword','Start transaction/block',3,'var(--primary,#3b82f6)','شروع تراکنش/بلوک'],
  ['END','Keyword','End transaction/block',3,'var(--primary,#3b82f6)','پایان تراکنش/بلوک'],
  ['DECLARE','Keyword','Declare variable',3,'var(--primary,#3b82f6)','اعلان متغیر'],
  ['SET','Keyword','Assign value',3,'var(--primary,#3b82f6)','اختصاص مقدار'],
  ['FETCH','Keyword','Retrieve cursor row',3,'var(--primary,#3b82f6)','بازیابی ردیف مکان‌نما'],
  ['OPEN','Keyword','Open cursor',3,'var(--primary,#3b82f6)','باز کردن مکان‌نما'],
  ['CLOSE','Keyword','Close cursor',3,'var(--primary,#3b82f6)','بستن مکان‌نما'],
  ['EXEC','Keyword','Execute procedure',3,'var(--primary,#3b82f6)','اجرای رویه'],
  ['EXPLAIN','Keyword','Show query plan',3,'var(--primary,#3b82f6)','نمایش برنامه کوئری'],
  ['ANALYZE','Keyword','Collect table stats',3,'var(--primary,#3b82f6)','جمع‌آوری آمار جدول'],
  ['VACUUM','Keyword','Reclaim storage (PG)',3,'var(--primary,#3b82f6)','بازیابی فضای ذخیره'],
  ['MERGE','DML','Upsert operation',3,'var(--success,#22c55e)','عملیات درج/به‌روزرسانی'],
  ['REPLACE','DML','Insert or replace (MySQL)',3,'var(--success,#22c55e)','درج یا جایگزینی'],
  ['WITH','Clause','CTE (Common Table Expression)',3,'var(--primary,#3b82f6)','عبارت جدول مشترک'],
  ['RECURSIVE','Keyword','Recursive CTE',3,'var(--primary,#3b82f6)','CTE بازگشتی'],
  ['RETURNING','Clause','Return affected rows (PG)',3,'var(--success,#22c55e)','بازگرداندن ردیف‌های متاثر'],
  ['OUTPUT','Clause','Return affected rows (MSSQL)',3,'var(--success,#22c55e)','بازگرداندن ردیف‌های متاثر'],
  ['TOP','Clause','Limit rows (MSSQL)',3,'var(--warning,#f59e0b)','محدود کردن ردیف‌ها (MSSQL)'],
  ['ROWNUM','Clause','Row number (Oracle)',3,'var(--warning,#f59e0b)','شماره ردیف (Oracle)'],
  ['NOLOCK','Hint','Read uncommitted (MSSQL)',3,'var(--primary,#3b82f6)','خواندن تعهد نشده'],
  ['OPTION','Clause','Query hint (MSSQL)',3,'var(--primary,#3b82f6)','راهنمای کوئری'],
  ['FOR','Clause','Cursor/FOR loop',3,'var(--primary,#3b82f6)','مکان‌نما/حلقه FOR'],
  ['WHILE','Clause','Loop construct',3,'var(--primary,#3b82f6)','ساختار حلقه'],
  ['DO','Clause','Loop body start',3,'var(--primary,#3b82f6)','شروع بدنه حلقه'],
  ['LOOP','Keyword','Infinite loop',3,'var(--primary,#3b82f6)','حلقه بی‌نهایت'],
  ['LEAVE','Keyword','Exit loop',3,'var(--primary,#3b82f6)','خروج از حلقه'],
  ['ITERATE','Keyword','Restart loop',3,'var(--primary,#3b82f6)','شروع مجدد حلقه'],
  ['HANDLER','Keyword','Error handler',3,'var(--danger,#ef4444)','مدیریت خطا'],
  ['SIGNAL','Keyword','Raise error',3,'var(--danger,#ef4444)','ایجاد خطا'],
  ['RESIGNAL','Keyword','Modify error',3,'var(--danger,#ef4444)','تغییر خطا'],
  ['CONDITION','Keyword','Error condition name',3,'var(--danger,#ef4444)','نام شرط خطا'],
  ['CURSOR','Keyword','Row-by-row processing',3,'var(--primary,#3b82f6)','پردازش ردیف به ردیف'],
  ['PACKAGE','DDL','Oracle package',3,'var(--warning,#f59e0b)','پکیج Oracle'],
  ['BODY','DDL','Package body',3,'var(--warning,#f59e0b)','بدنه پکیج'],
  ['SYNONYM','DDL','Database alias (Oracle)',3,'var(--warning,#f59e0b)','نام مستعار دیتابیس'],
  ['SEQUENCE','DDL','Auto-number sequence',3,'var(--warning,#f59e0b)','دنباله شماره‌دهی خودکار'],
  ['MATERIALIZED VIEW','DDL','Cached view (Oracle/PG)',3,'var(--warning,#f59e0b)','نمای ذخیره شده'],
  ['TEMP','Keyword','Temporary table',3,'var(--warning,#f59e0b)','جدول موقت'],
  ['TEMPORARY','Keyword','Temporary table',3,'var(--warning,#f59e0b)','جدول موقت'],
  ['DATABASE','DDL','Create/alter database',3,'var(--warning,#f59e0b)','ایجاد/تغییر دیتابیس'],
  ['SCHEMA','DDL','Database schema',3,'var(--warning,#f59e0b)','شما دیتابیس'],
  ['USE','Keyword','Select database (MySQL)',3,'var(--warning,#f59e0b)','انتخاب دیتابیس'],
  ['SHOW','Keyword','Show objects (MySQL)',3,'var(--warning,#f59e0b)','نمایش اشیاء'],
  ['DESCRIBE','Keyword','Show table structure',3,'var(--warning,#f59e0b)','نمایش ساختار جدول'],
  ['LOAD','DML','Import data',3,'var(--success,#22c55e)','وارد کردن داده'],
  ['INTO','Clause','Target table',3,'var(--primary,#3b82f6)','جدول مقصد'],
  ['VALUES','Clause','Values to insert',3,'var(--primary,#3b82f6)','مقادیر برای درج'],
  ['BY','Keyword','Used in GROUP/ORDER',3,'var(--text-dim,#888)','مورد استفاده در GROUP/ORDER'],
  ['HAVING','Clause','Filter after GROUP BY',3,'var(--warning,#f59e0b)','فیلتر بعد از GROUP BY'],
  ['ALL','Keyword','All rows/values',3,'var(--text-dim,#888)','همه ردیف‌ها/مقادیر'],
  ['ANY','Keyword','Any row in subquery',3,'var(--primary,#3b82f6)','هر ردیف در زیرکوئری'],
  ['SOME','Keyword','Same as ANY',3,'var(--primary,#3b82f6)','مشابه ANY'],
  ['NULL','Keyword','Unknown/missing value',3,'var(--text-dim,#888)','مقدار نامشخص/گمشده'],
  ['TRUE','Keyword','Boolean true',3,'var(--success,#22c55e)','بولی درست'],
  ['FALSE','Keyword','Boolean false',3,'var(--danger,#ef4444)','بولی نادرست'],
  ['ROW','Type','Single database row',3,'var(--text-dim,#888)','یک ردیف دیتابیس'],
  ['ROWS','Keyword','Frame specification',3,'var(--text-dim,#888)','مشخصات فریم'],
  ['RANGE','Keyword','Frame range',3,'var(--text-dim,#888)','محدوده فریم'],
  ['UNBOUNDED','Keyword','Unbounded frame',3,'var(--text-dim,#888)','فریم نامحدود'],
  ['PRECEDING','Keyword','Rows before current',3,'var(--text-dim,#888)','ردیف‌های قبل از جاری'],
  ['FOLLOWING','Keyword','Rows after current',3,'var(--text-dim,#888)','ردیف‌های بعد از جاری'],
  ['CURRENT ROW','Keyword','Current row in frame',3,'var(--text-dim,#888)','ردیف جاری در فریم'],
  ['WINDOW','Clause','Window definition',3,'var(--primary,#3b82f6)','تعریف پنجره'],
  ['PARTITION BY','Clause','Window partition',3,'var(--warning,#f59e0b)','تقسیم‌بندی پنجره'],
  ['OVER','Clause','Window function call',3,'var(--primary,#3b82f6)','فراخوانی تابع پنجره'],
  ['RANK','Function','Rank with gaps',3,'var(--success,#22c55e)','رتبه با شکاف'],
  ['DENSE_RANK','Function','Rank without gaps',3,'var(--success,#22c55e)','رتبه بدون شکاف'],
  ['ROW_NUMBER','Function','Sequential row number',3,'var(--success,#22c55e)','شماره ردیف ترتیبی'],
  ['NTILE','Function','Bucket rows into N',3,'var(--success,#22c55e)','تقسیم ردیف‌ها به N گروه'],
  ['LAG','Function','Access prior row',3,'var(--success,#22c55e)','دسترسی به ردیف قبلی'],
  ['LEAD','Function','Access next row',3,'var(--success,#22c55e)','دسترسی به ردیف بعدی'],
  ['FIRST_VALUE','Function','First value in window',3,'var(--success,#22c55e)','اولین مقدار در پنجره'],
  ['LAST_VALUE','Function','Last value in window',3,'var(--success,#22c55e)','آخرین مقدار در پنجره'],
  ['COUNT','Function','Count rows',3,'var(--success,#22c55e)','شمارش ردیف‌ها'],
  ['SUM','Function','Sum values',3,'var(--success,#22c55e)','جمع مقادیر'],
  ['AVG','Function','Average value',3,'var(--success,#22c55e)','میانگین مقادیر'],
  ['MIN','Function','Minimum value',3,'var(--success,#22c55e)','حداقل مقدار'],
  ['MAX','Function','Maximum value',3,'var(--success,#22c55e)','حداکثر مقدار'],
  ['COALESCE','Function','First non-null',3,'var(--success,#22c55e)','اولین مقدار غیر تهی'],
  ['NULLIF','Function','Null if equal',3,'var(--success,#22c55e)','تهی اگر برابر'],
  ['CAST','Function','Type conversion',3,'var(--success,#22c55e)','تبدیل نوع'],
  ['CONVERT','Function','Type conversion',3,'var(--success,#22c55e)','تبدیل نوع'],
  ['SUBSTRING','Function','Extract part of string',3,'var(--success,#22c55e)','استخراج بخشی از رشته'],
  ['UPPER','Function','Uppercase string',3,'var(--success,#22c55e)','بزرگ کردن حروف'],
  ['LOWER','Function','Lowercase string',3,'var(--success,#22c55e)','کوچک کردن حروف'],
  ['TRIM','Function','Remove whitespace',3,'var(--success,#22c55e)','حذف فضای خالی'],
  ['LENGTH','Function','String length',3,'var(--success,#22c55e)','طول رشته'],
  ['REPLACE','Function','String replacement',3,'var(--success,#22c55e)','جایگزینی رشته'],
  ['CONCAT','Function','Concatenate strings',3,'var(--success,#22c55e)','الحاق رشته‌ها'],
  ['NOW','Function','Current timestamp',3,'var(--success,#22c55e)','زمان کنونی'],
  ['CURDATE','Function','Current date',3,'var(--success,#22c55e)','تاریخ کنونی'],
  ['DATE_FORMAT','Function','Format date (MySQL)',3,'var(--success,#22c55e)','فرمت تاریخ'],
  ['EXTRACT','Function','Extract date part',3,'var(--success,#22c55e)','استخراج بخش تاریخ'],
  ['ABS','Function','Absolute value',3,'var(--success,#22c55e)','مقدار مطلق'],
  ['ROUND','Function','Round number',3,'var(--success,#22c55e)','گرد کردن عدد'],
  ['CEIL','Function','Ceiling value',3,'var(--success,#22c55e)','مقدار سقف'],
  ['FLOOR','Function','Floor value',3,'var(--success,#22c55e)','مقدار کف'],
  ['MOD','Function','Modulo/remainder',3,'var(--success,#22c55e)','باقی‌مانده'],
  ['POWER','Function','Exponentiation',3,'var(--success,#22c55e)','توان'],
  ['SQRT','Function','Square root',3,'var(--success,#22c55e)','ریشه دوم'],
  ['RAND','Function','Random number',3,'var(--success,#22c55e)','عدد تصادفی'],
  ['GREATEST','Function','Maximum among values',3,'var(--success,#22c55e)','حداکثر بین مقادیر'],
  ['LEAST','Function','Minimum among values',3,'var(--success,#22c55e)','حداقل بین مقادیر'],
  ['GROUP_CONCAT','Function','Concatenate grouped (MySQL)',3,'var(--success,#22c55e)','الحاق گروهی'],
  ['STRING_AGG','Function','Concatenate grouped (PG)',3,'var(--success,#22c55e)','الحاق گروهی (PG)'],
  ['ARRAY_AGG','Function','Aggregate to array',3,'var(--success,#22c55e)','تجمع به آرایه'],
  ['JSON_AGG','Function','Aggregate to JSON',3,'var(--success,#22c55e)','تجمع به JSON'],
  ['XMLAGG','Function','Aggregate to XML',3,'var(--success,#22c55e)','تجمع به XML'],
  ['BOOL_AND','Function','Logical AND aggregate',3,'var(--success,#22c55e)','تجمع AND منطقی'],
  ['BOOL_OR','Function','Logical OR aggregate',3,'var(--success,#22c55e)','تجمع OR منطقی'],
  ['EVERY','Function','Same as BOOL_AND',3,'var(--success,#22c55e)','مشابه BOOL_AND'],
  ['CORR','Function','Correlation coefficient',3,'var(--success,#22c55e)','ضریب همبستگی'],
  ['COVAR_POP','Function','Population covariance',3,'var(--success,#22c55e)','کوواریانس جمعیت'],
  ['COVAR_SAMP','Function','Sample covariance',3,'var(--success,#22c55e)','کوواریانس نمونه'],
  ['REGR_SLOPE','Function','Regression slope',3,'var(--success,#22c55e)','شیب رگرسیون'],
  ['REGR_INTERCEPT','Function','Regression intercept',3,'var(--success,#22c55e)','عرض از مبدا رگرسیون'],
  ['STDDEV','Function','Standard deviation',3,'var(--success,#22c55e)','انحراف معیار'],
  ['STDDEV_POP','Function','Population std dev',3,'var(--success,#22c55e)','انحراف معیار جمعیت'],
  ['STDDEV_SAMP','Function','Sample std dev',3,'var(--success,#22c55e)','انحراف معیار نمونه'],
  ['VARIANCE','Function','Variance',3,'var(--success,#22c55e)','واریانس'],
  ['VAR_POP','Function','Population variance',3,'var(--success,#22c55e)','واریانس جمعیت'],
  ['VAR_SAMP','Function','Sample variance',3,'var(--success,#22c55e)','واریانس نمونه'],
  ['PERCENTILE_CONT','Function','Continuous percentile',3,'var(--success,#22c55e)','صدک پیوسته'],
  ['PERCENTILE_DISC','Function','Discrete percentile',3,'var(--success,#22c55e)','صدک گسسته'],
  ['MEDIAN','Function','Median value',3,'var(--success,#22c55e)','میانه'],
  ['MODE','Function','Most frequent value',3,'var(--success,#22c55e)','مقدار بیشترین تکرار'],
  ['CUME_DIST','Function','Cumulative distribution',3,'var(--success,#22c55e)','توزیع تجمعی'],
  ['PERCENT_RANK','Function','Percent rank',3,'var(--success,#22c55e)','رتبه درصدی'],
];

export function init(lang) {
  var f = lang === 'fa';
  var container = document.getElementById('content');

  function formatSQL(sql, dialect) {
    var keywords = ['SELECT','INSERT','UPDATE','DELETE','CREATE','ALTER','DROP','TRUNCATE','GRANT','REVOKE','COMMIT','ROLLBACK','SAVEPOINT','FROM','WHERE','AND','OR','NOT','IN','BETWEEN','LIKE','IS','NULL','EXISTS','JOIN','INNER','LEFT','RIGHT','FULL','CROSS','ON','GROUP','BY','HAVING','ORDER','ASC','DESC','LIMIT','OFFSET','UNION','ALL','INTERSECT','EXCEPT','DISTINCT','AS','CASE','WHEN','THEN','ELSE','END','SET','INTO','VALUES','TOP','WITH','RECURSIVE','RETURNING','OUTPUT','MERGE','REPLACE','EXEC','EXPLAIN','ANALYZE','VACUUM','DECLARE','FETCH','OPEN','CLOSE','FOR','WHILE','DO','LOOP','LEAVE','ITERATE','IF','ELSEIF','BEGIN','HANDLER','SIGNAL','RESIGNAL','CONDITION','CURSOR','PACKAGE','BODY','PROCEDURE','FUNCTION','TRIGGER','INDEX','VIEW','SEQUENCE','SYNONYM','MATERIALIZED','TEMP','TEMPORARY','DATABASE','SCHEMA','USE','SHOW','DESCRIBE','LOAD','ROW','ROWS','RANGE','UNBOUNDED','PRECEDING','FOLLOWING','CURRENT','WINDOW','PARTITION','OVER','CASCADE','RESTRICT','PRIMARY','FOREIGN','KEY','UNIQUE','CHECK','DEFAULT','REFERENCES','CONSTRAINT','AUTO_INCREMENT','SERIAL','CHARACTER','VARYING','INTEGER','INT','SMALLINT','BIGINT','NUMERIC','DECIMAL','FLOAT','REAL','DOUBLE','PRECISION','BOOLEAN','TEXT','VARCHAR','CHAR','NCHAR','NVARCHAR','NTEXT','BLOB','CLOB','BINARY','VARBINARY','IMAGE','DATE','TIME','TIMESTAMP','DATETIME','INTERVAL','YEAR','MONTH','DAY','HOUR','MINUTE','SECOND','ZONE','NOCHECK','OPTION','MAXDOP','RECOMPILE','WAITFOR','AT','OF','NEW','WITHIN'];
    var kwSet = {};
    keywords.forEach(function(k) { kwSet[k.toUpperCase()] = true; });
    var lines = sql.split('\n');
    var result = [];
    var indent = 0;
    var indentStr = '  ';
    var increaseIndentWords = ['SELECT','INSERT','UPDATE','DELETE','CREATE','ALTER','DROP','TRUNCATE','GRANT','REVOKE','COMMIT','ROLLBACK','SAVEPOINT','MERGE','REPLACE','EXEC','DECLARE','SET','FETCH','OPEN','CLOSE','FOR','WHILE','DO','LOOP','IF','BEGIN','CASE','WHEN','PACKAGE','BODY','PROCEDURE','FUNCTION','TRIGGER','INDEX','VIEW','SEQUENCE','MATERIALIZED','WITH','WINDOW'];
    var decreaseIndentWords = ['END','LOOP','LEAVE','ITERATE'];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      var upper = line.toUpperCase();
      for (var di = 0; di < decreaseIndentWords.length; di++) {
        if (upper.startsWith(decreaseIndentWords[di])) { indent = Math.max(0, indent - 1); break; }
      }
      result.push(indentStr.repeat(indent) + line);
      for (var ii = 0; ii < increaseIndentWords.length; ii++) {
        if (upper.startsWith(increaseIndentWords[ii])) { indent++; break; }
      }
    }
    return result.join('\n');
  }

  function beautifySQL(sql, dialect) {
    sql = sql.trim();
    var keywords = ['SELECT','INSERT','UPDATE','DELETE','CREATE','ALTER','DROP','TRUNCATE','GRANT','REVOKE','COMMIT','ROLLBACK','SAVEPOINT','FROM','WHERE','AND','OR','NOT','IN','BETWEEN','LIKE','IS','NULL','EXISTS','JOIN','INNER','LEFT','RIGHT','FULL','CROSS','ON','GROUP','BY','HAVING','ORDER','ASC','DESC','LIMIT','OFFSET','UNION','ALL','INTERSECT','EXCEPT','DISTINCT','AS','CASE','WHEN','THEN','ELSE','END','SET','INTO','VALUES','TOP','WITH','RECURSIVE','RETURNING','OUTPUT','MERGE','REPLACE','EXEC','EXPLAIN','ANALYZE','VACUUM','DECLARE','FETCH','OPEN','CLOSE','FOR','WHILE','DO','LOOP','LEAVE','ITERATE','IF','ELSEIF','BEGIN','HANDLER','SIGNAL','RESIGNAL','CONDITION','CURSOR','PACKAGE','BODY','PROCEDURE','FUNCTION','TRIGGER','INDEX','VIEW','SEQUENCE','SYNONYM','MATERIALIZED','TEMP','TEMPORARY','DATABASE','SCHEMA','USE','SHOW','DESCRIBE','LOAD','ROW','ROWS','RANGE','UNBOUNDED','PRECEDING','FOLLOWING','CURRENT','WINDOW','PARTITION','OVER','CASCADE','RESTRICT','PRIMARY','FOREIGN','KEY','UNIQUE','CHECK','DEFAULT','REFERENCES','CONSTRAINT','AUTO_INCREMENT','SERIAL','NOCHECK','OPTION','MAXDOP','RECOMPILE','WAITFOR','AT','OF','NEW','WITHIN'];
    var majorKeywords = ['SELECT','INSERT','UPDATE','DELETE','CREATE','ALTER','DROP','TRUNCATE','GRANT','REVOKE','COMMIT','ROLLBACK','SAVEPOINT','MERGE','REPLACE','EXEC','DECLARE','SET','FETCH','OPEN','CLOSE','FOR','WHILE','DO','IF','BEGIN','CASE','PACKAGE','BODY','PROCEDURE','FUNCTION','TRIGGER','INDEX','VIEW','SEQUENCE','MATERIALIZED','WITH','WINDOW'];
    var majorSet = {}; majorKeywords.forEach(function(k) { majorSet[k] = true; });

    sql = sql.replace(/\s+/g, ' ').trim();
    var tokens = sql.split(/\b/);
    var formatted = [];
    var indent = 0;
    var indentStr = '  ';
    var newLine = true;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      var upper = token.toUpperCase();
      if (majorSet[upper]) {
        if (!newLine) formatted.push('\n' + indentStr.repeat(indent));
        formatted.push(token);
        newLine = false;
        if (upper === 'SELECT' || upper === 'FROM' || upper === 'WHERE' || upper === 'ORDER' || upper === 'GROUP' || upper === 'HAVING' || upper === 'LIMIT' || upper === 'UNION' || upper === 'INTERSECT' || upper === 'EXCEPT' || upper === 'INTO' || upper === 'VALUES' || upper === 'SET' || upper === 'ON' || upper === 'AND' || upper === 'OR') {
          formatted.push('\n' + indentStr.repeat(indent + 1));
          newLine = true;
        }
      } else {
        formatted.push(token);
        newLine = false;
      }
    }

    var result = formatted.join('');
    result = result.replace(/  +/g, ' ').trim();
    result = result.replace(/\n\s+\n/g, '\n');
    result = result.replace(/,/g, ', ');
    result = result.replace(/\(\s/g, '(');
    result = result.replace(/\s\)/g, ')');
    result = result.replace(/=/g, ' = ');
    result = result.replace(/!=/g, ' != ');
    result = result.replace(/<>/g, ' <> ');
    result = result.replace(/>\s=/g, '>=');
    result = result.replace(/<\s=/g, '<=');
    result = result.replace(/\s{2,}/g, ' ');
    return result;
  }

  function minifySQL(sql) {
    return sql.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([(),;=<>!+\-*/])\s*/g, '$1').trim();
  }

  container.addEventListener('click', function(e) {
    var target = e.target;
    var tab = target.closest('[data-sqltab]');
    if (tab && tab.closest('#sql-tabs')) {
      container.querySelectorAll('#sql-tabs button').forEach(function(b) { b.classList.remove('active'); });
      container.querySelectorAll('.sqltab-content').forEach(function(c) { c.style.display = 'none'; });
      tab.classList.add('active');
      var pane = container.querySelector('.sqltab-content[data-sqltab="'+tab.getAttribute('data-sqltab')+'"]');
      if (pane) pane.style.display = 'block';
      return;
    }

    if (target.id === 'sql-format-btn') {
      var input = document.getElementById('sql-input');
      var dialect = document.getElementById('sql-dialect');
      var output = document.getElementById('sql-output');
      if (input && output) {
        var sql = input.value.trim();
        if (!sql) return;
        var formatted = beautifySQL(sql, dialect ? dialect.value : 'sql');
        output.style.display = 'block';
        output.textContent = formatted;
      }
      return;
    }

    if (target.id === 'sql-copy-btn') {
      var output = document.getElementById('sql-output');
      if (output && output.textContent) {
        navigator.clipboard.writeText(output.textContent);
        target.textContent = f ? '✓ کپی شد' : '✓ Copied';
        setTimeout(function() { target.textContent = f ? 'کپی' : 'Copy'; }, 1200);
      }
      return;
    }

    if (target.id === 'sql-clear-btn') {
      var input = document.getElementById('sql-input');
      var output = document.getElementById('sql-output');
      if (input) input.value = '';
      if (output) { output.style.display = 'none'; output.textContent = ''; }
      return;
    }

    if (target.id === 'sql-minify-btn') {
      var input = document.getElementById('sql-min-input');
      var output = document.getElementById('sql-output');
      if (input && output) {
        var sql = input.value.trim();
        if (!sql) return;
        var minified = minifySQL(sql);
        output.style.display = 'block';
        output.textContent = minified;
      }
      return;
    }

    if (target.id === 'sql-min-copy-btn') {
      var output = document.getElementById('sql-output');
      if (output && output.textContent) {
        navigator.clipboard.writeText(output.textContent);
        target.textContent = f ? '✓ کپی شد' : '✓ Copied';
        setTimeout(function() { target.textContent = f ? 'کپی' : 'Copy'; }, 1200);
      }
      return;
    }
  });
}
