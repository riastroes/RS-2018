<%
    dim fs,f
    set fs=Server.CreateObject("Scripting.FileSystemObject")
    set f=fs.CreateTextFile(Server.MapPath("data/test2.txt"),true)
    f.WriteLine("Hello World 3!")
    f.Close
    set f=nothing
    set fs=nothing
%>
    <!DOCTYPE html>
    <html>

    <body>

    </body>

    </html>