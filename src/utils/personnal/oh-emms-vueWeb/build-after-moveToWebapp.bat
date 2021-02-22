@Echo Off
For /d /r "..\oh-emms-web\src\main\webapp\oh" %%i in (*) do (Rd /q /s "%%i" 2>nul)
Del /q /a "..\oh-emms-web\src\main\webapp\oh"
xcopy /y ".\oh-production\*.*" "..\oh-emms-web\src\main\webapp" /s /e  
