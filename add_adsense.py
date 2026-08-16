import os, glob

adsense_line1 = '    <!-- Google AdSense -->'
adsense_line2 = '    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2485510445228691"'
adsense_line3 = '         crossorigin="anonymous"></script>'
adsense_code = adsense_line1 + '\n' + adsense_line2 + '\n' + adsense_line3

html_files = glob.glob('c:/xampp/htdocs/input/*.html')
added = 0
skipped = 0

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    if 'ca-pub-2485510445228691' in content:
        skipped += 1
        continue
    
    if '</head>' in content:
        new_content = content.replace('</head>', adsense_code + '\n</head>', 1)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        added += 1
        print('Added: ' + os.path.basename(filepath))
    else:
        print('WARNING - no </head>: ' + os.path.basename(filepath))

print('')
print('Done! Added: ' + str(added) + ' files, Already had code: ' + str(skipped) + ' files')
