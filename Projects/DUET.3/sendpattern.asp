<!DOCTYPE html>
<html>
<style>
    img {
        width: 20%;
    }
</style>

<body>
    <h1>Member DUET Design</h1>

    <%
    dim useremail
    dim data, lendata, atime, dosave
    dim fs,fo, f

    set useremail = Request.Form("inimgemail")
    set lendata = Request.Form("inlendata")
    set data = Request.Form("inimgdata")
    set atime = Request.Form("intime")
    set dosave = Request.Form("insave")
    
	
    
    if useremail <>"" Then
        Response.write("<br/>useremail:" & useremail)
        Response.write("<br/>len data:" & lendata)
        Response.write("<br/>design code: DUET" & atime)
        Response.write("<br/><img oncontextmenu='return false' alt='DUET" & atime & "' src='data:image/png;base64," & data &  "' >")
         
   End if

    if StrComp(dosave,"true") = 0 Then
        set fs=Server.CreateObject("Scripting.FileSystemObject") 
        If fs.FolderExists(Server.MapPath("data/" & useremail)) = True Then
            set fo = fs.getFolder(Server.MapPath("data/" & useremail))
            set f = fo.CreateTextFile("DUET" & atime & ".txt",true)
            f.writeLine(data)

            f.Close 
            set f = nothing
            
        End If
        set fs = nothing
    End if
   
%>


</body>

</html>