export default function(lang) {
  var f = lang === 'fa';
  var ports = [
    {p:20,n:'FTP Data',proto:'TCP',cat:'File Transfer'},
    {p:21,n:'FTP Control',proto:'TCP',cat:'File Transfer'},
    {p:22,n:'SSH / SFTP',proto:'TCP',cat:'Remote Access'},
    {p:23,n:'Telnet',proto:'TCP',cat:'Remote Access'},
    {p:25,n:'SMTP',proto:'TCP',cat:'Email'},
    {p:53,n:'DNS',proto:'UDP/TCP',cat:'Infrastructure'},
    {p:67,n:'DHCP Server',proto:'UDP',cat:'Infrastructure'},
    {p:68,n:'DHCP Client',proto:'UDP',cat:'Infrastructure'},
    {p:69,n:'TFTP',proto:'UDP',cat:'File Transfer'},
    {p:80,n:'HTTP',proto:'TCP',cat:'Web'},
    {p:88,n:'Kerberos',proto:'UDP/TCP',cat:'Authentication'},
    {p:110,n:'POP3',proto:'TCP',cat:'Email'},
    {p:123,n:'NTP',proto:'UDP',cat:'Infrastructure'},
    {p:137,n:'NetBIOS Name',proto:'UDP',cat:'Windows'},
    {p:138,n:'NetBIOS Datagram',proto:'UDP',cat:'Windows'},
    {p:139,n:'NetBIOS Session',proto:'TCP',cat:'Windows'},
    {p:143,n:'IMAP',proto:'TCP',cat:'Email'},
    {p:161,n:'SNMP',proto:'UDP',cat:'Monitoring'},
    {p:162,n:'SNMP Trap',proto:'UDP',cat:'Monitoring'},
    {p:389,n:'LDAP',proto:'UDP/TCP',cat:'Authentication'},
    {p:443,n:'HTTPS',proto:'TCP',cat:'Web'},
    {p:445,n:'SMB',proto:'TCP',cat:'Windows'},
    {p:465,n:'SMTPS',proto:'TCP',cat:'Email'},
    {p:500,n:'IPsec IKE',proto:'UDP',cat:'VPN'},
    {p:514,n:'Syslog',proto:'UDP',cat:'Monitoring'},
    {p:587,n:'SMTP Submission',proto:'TCP',cat:'Email'},
    {p:636,n:'LDAPS',proto:'TCP',cat:'Authentication'},
    {p:993,n:'IMAPS',proto:'TCP',cat:'Email'},
    {p:995,n:'POP3S',proto:'TCP',cat:'Email'},
    {p:1080,n:'SOCKS Proxy',proto:'TCP',cat:'Proxy'},
    {p:1194,n:'OpenVPN',proto:'UDP',cat:'VPN'},
    {p:1433,n:'MSSQL',proto:'TCP',cat:'Database'},
    {p:1521,n:'Oracle DB',proto:'TCP',cat:'Database'},
    {p:2049,n:'NFS',proto:'UDP/TCP',cat:'File Transfer'},
    {p:2082,n:'cPanel',proto:'TCP',cat:'Web'},
    {p:2083,n:'CPanel SSL',proto:'TCP',cat:'Web'},
    {p:2181,n:'ZooKeeper',proto:'TCP',cat:'Infrastructure'},
    {p:2375,n:'Docker API',proto:'TCP',cat:'Container'},
    {p:2376,n:'Docker SSL',proto:'TCP',cat:'Container'},
    {p:3000,n:'Dev Server',proto:'TCP',cat:'Development'},
    {p:3306,n:'MySQL',proto:'TCP',cat:'Database'},
    {p:3389,n:'RDP',proto:'TCP',cat:'Remote Access'},
    {p:3690,n:'SVN',proto:'TCP',cat:'Version Control'},
    {p:4000,n:'Dev Server',proto:'TCP',cat:'Development'},
    {p:4222,n:'NATS',proto:'TCP',cat:'Messaging'},
    {p:4567,n:'Sinatra',proto:'TCP',cat:'Development'},
    {p:5000,n:'Flask / Dev',proto:'TCP',cat:'Development'},
    {p:5222,n:'XMPP Client',proto:'TCP',cat:'Messaging'},
    {p:5269,n:'XMPP Server',proto:'TCP',cat:'Messaging'},
    {p:5432,n:'PostgreSQL',proto:'TCP',cat:'Database'},
    {p:5672,n:'AMQP',proto:'TCP',cat:'Messaging'},
    {p:5850,n:'OpenFire',proto:'TCP',cat:'Messaging'},
    {p:5900,n:'VNC',proto:'TCP',cat:'Remote Access'},
    {p:5984,n:'CouchDB',proto:'TCP',cat:'Database'},
    {p:6379,n:'Redis',proto:'TCP',cat:'Database'},
    {p:6443,n:'K8s API SSL',proto:'TCP',cat:'Container'},
    {p:6660,n:'IRC',proto:'TCP',cat:'Messaging'},
    {p:7077,n:'Spark Master',proto:'TCP',cat:'Big Data'},
    {p:7474,n:'Neo4j',proto:'TCP',cat:'Database'},
    {p:8000,n:'HTTP Alt',proto:'TCP',cat:'Web'},
    {p:8008,n:'HTTP Alt',proto:'TCP',cat:'Web'},
    {p:8080,n:'HTTP Proxy',proto:'TCP',cat:'Web'},
    {p:8443,n:'HTTPS Alt',proto:'TCP',cat:'Web'},
    {p:8500,n:'Consul',proto:'TCP',cat:'Infrastructure'},
    {p:8888,n:'Jupyter',proto:'TCP',cat:'Development'},
    {p:9000,n:'PHP-FPM',proto:'TCP',cat:'Development'},
    {p:9090,n:'Prometheus',proto:'TCP',cat:'Monitoring'},
    {p:9092,n:'Kafka',proto:'TCP',cat:'Messaging'},
    {p:9100,n:'Node Exporter',proto:'TCP',cat:'Monitoring'},
    {p:9200,n:'Elasticsearch',proto:'TCP',cat:'Database'},
    {p:9418,n:'Git',proto:'TCP',cat:'Version Control'},
    {p:9600,n:'Logstash',proto:'TCP',cat:'Monitoring'},
    {p:9999,n:'Admin',proto:'TCP',cat:'Development'},
    {p:11211,n:'Memcached',proto:'TCP',cat:'Database'},
    {p:15672,n:'RabbitMQ UI',proto:'TCP',cat:'Messaging'},
    {p:16010,n:'HBase',proto:'TCP',cat:'Big Data'},
    {p:17017,n:'MongoDB',proto:'TCP',cat:'Database'},
    {p:18080,n:'Spring Boot',proto:'TCP',cat:'Development'},
    {p:20000,n:'DNP3',proto:'TCP',cat:'SCADA'},
    {p:25565,n:'Minecraft',proto:'TCP',cat:'Gaming'},
    {p:27017,n:'MongoDB Alt',proto:'TCP',cat:'Database'},
    {p:32400,n:'Plex',proto:'TCP',cat:'Media'},
    {p:50000,n:'SAP',proto:'TCP',cat:'ERP'},
    {p:61616,n:'ActiveMQ',proto:'TCP',cat:'Messaging'},
  ];
  var cats = {};
  ports.forEach(function(p){ if (!cats[p.cat]) cats[p.cat]=[]; cats[p.cat].push(p); });
  var catKeys = Object.keys(cats).sort();
  return '<div style="padding:16px">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<span style="font-size:2rem">🔌</span>'+
      '<div><h2 style="margin:0;font-size:1.25rem;font-weight:600">'+(f?'پورت‌های معروف':'Port Reference')+'</h2>'+
      '<p style="margin:4px 0 0;color:var(--muted-foreground);font-size:.875rem">'+(f?'۸۵ پورت TCP/UDP معروف':'85 well-known TCP/UDP ports')+'</p></div>'+
    '</div>'+
    '<div style="margin-bottom:16px;display:flex;gap:8px;flex-wrap:wrap">'+
      '<input id="port-filter" type="text" placeholder="'+(f?'جستجوی پورت یا نام...':'Search port or name...')+'" style="flex:1;min-width:200px;padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.875rem;outline:none">'+
      '<select id="port-cat-filter" style="padding:8px 12px;border:1px solid var(--input);border-radius:var(--radius);background:var(--card);color:var(--foreground);font-size:.8125rem;outline:none">'+
        '<option value="">'+(f?'همه دسته‌ها':'All categories')+'</option>'+
        catKeys.map(function(c){ return '<option value="'+c+'">'+c+'</option>'; }).join('')+
      '</select>'+
    '</div>'+
    '<div id="port-table" style="width:100%;overflow-x:auto">'+
      '<table style="width:100%;border-collapse:collapse;font-size:.8125rem">'+
        '<thead><tr>'+
          '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f?'پورت':'Port')+'</th>'+
          '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f?'نام':'Name')+'</th>'+
          '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f?'پروتکل':'Proto')+'</th>'+
          '<th style="padding:8px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--muted-foreground)">'+(f?'دسته':'Category')+'</th>'+
        '</tr></thead><tbody id="port-tbody">'+
          ports.map(function(p){ return '<tr data-port="'+p.p+'" data-cat="'+p.cat+'">'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border);font-weight:600;font-family:monospace">'+p.p+'</td>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border)">'+p.n+'</td>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border)"><span style="padding:1px 8px;border-radius:4px;font-size:.6875rem;background:var(--muted);color:var(--muted-foreground)">'+p.proto+'</span></td>'+
            '<td style="padding:6px 10px;border-bottom:1px solid var(--border);color:var(--muted-foreground)">'+p.cat+'</td>'+
          '</tr>'; }).join('')+
        '</tbody></table>'+
    '</div>'+
    '<div style="margin-top:12px;padding:8px;background:var(--muted);border-radius:var(--radius);font-size:.75rem;color:var(--muted-foreground);text-align:center">'+(f?'تعداد پورت‌ها: ':'Total ports: ')+ports.length+'</div>'+
  '</div>';
}
export function init(lang) {
  var filter = document.getElementById('port-filter');
  var catFilter = document.getElementById('port-cat-filter');
  var tbody = document.getElementById('port-tbody');
  if (!filter||!tbody) return;
  function update() {
    var q = filter.value.toLowerCase();
    var cat = catFilter.value;
    tbody.querySelectorAll('tr').forEach(function(row){
      var port = row.dataset.port;
      var catVal = row.dataset.cat;
      var text = row.textContent.toLowerCase();
      var match = (!q || text.indexOf(q) !== -1) && (!cat || catVal === cat);
      row.style.display = match ? '' : 'none';
    });
  }
  filter.addEventListener('input', update);
  catFilter.addEventListener('change', update);
}
