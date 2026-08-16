import glob, os

OLD_ID = 'ca-pub-2485510445228691'
NEW_ID = 'ca-pub-2482510445228691'
META_TAG = '    <meta name="google-adsense-account" content="ca-pub-2482510445228691">'

html_files = glob.glob('c:/xampp/htdocs/input/*.html')
fixed = 0

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    changed = False
    
    if OLD_ID in content:
        content = content.replace(OLD_ID, NEW_ID)
        changed = True
    
    if 'google-adsense-account' not in content:
        content = content.replace('</head>', META_TAG + '\n</head>', 1)
        changed = True
    
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        fixed += 1
        print('Fixed: ' + os.path.basename(filepath))

print('')
print('Total fixed: ' + str(fixed) + ' files')
