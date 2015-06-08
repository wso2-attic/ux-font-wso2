@echo off
title Deploy gh-pages files to gh-pages brunch

echo "gh-pages" folder contains will deploy to gh-pages brunch
echo =========================================================
echo please commit all the changes before continue
echo.

SET /P ANSWER=Do you want to continue (Y/N)? 

if /i {%ANSWER%}=={y} (goto :yes) 
if /i {%ANSWER%}=={yes} (goto :yes) 
goto :no
 
:yes 
echo.
echo Deploying.....
echo.
git pull
git subtree push --prefix gh-pages origin gh-pages
echo.
echo Complete Deploying!
pause
exit /b 0 

:no 
echo.
pause
exit /b 1