@Echo Off
For /d /r "..\oh-asm-web\src\main\webapp\oh" %%i in (*) do (Rd /q /s "%%i" 2>nul)
Del /q /a "..\oh-asm-web\src\main\webapp\oh"
xcopy /y ".\oh-production\*.*" "..\oh-asm-web\src\main\webapp" /s /e  
