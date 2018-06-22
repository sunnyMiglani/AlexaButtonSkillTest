# A script that will submit everything in the lambda folder!
rm index.zip
cd lambda
zip -R -X ../index.zip *
cd ..
echo --ZIP-DONE--
aws lambda update-function-code --function-name HelloButtons --zip-file fileb://index.zip
echo --Uploaded--
