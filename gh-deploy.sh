#/bin/sh
title Deploy gh-pages files to gh-pages brunch

echo "gh-pages" folder contains will deploy to gh-pages brunch
echo =========================================================
echo please commit all the changes before continue
echo

echo -n "Do you want to continue [Y/N]?"
old_stty_cfg=$(stty -g)
stty raw -echo
answer=$( while ! head -c 1 | grep -i '[ny]' ;do true ;done )
stty $old_stty_cfg
if echo "$answer" | grep -iq "^y" ;then
    echo
	echo Deploying.....
	echo
	git pull
	git subtree push --prefix gh-pages origin gh-pages
	echo
	echo Complete Deploying!
	sleep
else
    echo
	sleep
fi
exit 