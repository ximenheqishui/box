import zipfile
zp = zipfile.ZipFile('zip.zip','r')
zp.extractall('zip')
zp.close()
