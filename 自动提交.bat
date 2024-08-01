@echo off
setlocal enabledelayedexpansion
:: 避免输入中文出现乱码
chcp 65001 >nul

:: 设置你的仓库目录
::以下是set REPO_DIR="C:\Users\86166\Desktop\koa-1"的相对路径
::自动获取文件的路径
set REPO_DIR=%~dp0
::去除最后一个\
if "!REPO_DIR:~-1!" == "\" (
    set "REPO_DIR=!REPO_DIR:~0,-1!"
)
:: 切换到仓库目录
cd /d "%REPO_DIR%"

:: 检查是否有更改
for /f "delims=" %%i in ('git status --porcelain') do (
    if not "%%i" == "" (
        :: 如果有更改，则添加所有文件
        git add .

        :: 获取当前日期作为提交信息的一部分
        for /f "tokens=2-4 delims=/." %%a in ("%date%") do (
            set DATE=%%c/%%a/%%b
        )
        set TIME=%time:~0,8%
        set COMMIT_MSG=自动提交: %DATE% at %TIME%

        :: 提交更改
        git commit -m "!COMMIT_MSG!"

        :: 推送更改到远程仓库
        git push 
    )
)
 
:: 结束脚本
endlocal

:: 通过在 exit 前面加上 echo 命令，你确保了这段中文文本将被正确地输出到控制台，而不会被误认为是一个命令。
echo 提交完成。

::pause 会等待用户按任意键关闭窗口。
::如果没有pause，脚本会在执行完成后自动关闭窗口。
::下面的exit是退出脚本，填了和没填是一样的，因为exit是默认的，所以可以不写。
::exit通常是默认执行的，所以你甚至不需要显式添加它，除非你的脚本中有其他循环或者子命令可能会继续运行。
exit