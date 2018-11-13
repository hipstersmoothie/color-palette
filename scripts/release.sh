git config --global user.email "lisowski54@gmail.com"
git config --global user.name "Andrew Lisowski"

npm run build
npm run export
touch out/.nojekyll
push-dir --dir=out --branch=gh-pages --cleanup --verbose