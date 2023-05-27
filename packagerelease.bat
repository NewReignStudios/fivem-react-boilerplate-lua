cmd.exe echo /c "cd web && yarn && yarn build"
for %%a in (.) do set currentfolder=%%~na
7z a -tzip %currentfolder%.zip -x@exclude.txt @filelist.txt