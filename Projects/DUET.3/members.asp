<!DOCTYPE html>
<html>

<body>
    <h1>Member Administration</h1>
    <h3>Create New Member</h3>
    <div id="divinlog">
        <form action="membernew.asp" runat="server" method="post">
            <input type="text" id="inname" name="inname" required>
            <input type="text" id="inemail" name="inemail" required>
            <input type="text" id="inpassword" name="inpassword" required>
            <input type="submit" value="new">
        </form>
    </div>
    <h3>Check Member</h3>
    <div id="divcheck">
        <form action="membercheck.asp" runat="server" method="post">
            <input type="text" id="inlogname" name="inlogname" required>
            <input type="text" id="inlogemail" name="inlogemail" required>
            <input type="text" id="inlogpassword" name="inlogpassword" required>
            <input type="text" id="inlogshow" name="inlogshow" required value="yes">
            <input type="submit" value="check">
        </form>
    </div>
    <h3>Delete Member</h3>
    <div id="divdelete">
        <form action="deleteMember.asp" runat="server" method="post">
            <input type="text" id="inemail" name="inemail" required>
            <input type="submit" value="delete">
        </form>
    </div>
    <%

    dim fs, folderdata
    set fs=Server.CreateObject("Scripting.FileSystemObject")  
    set folderdata=fs.GetFolder(Server.MapPath("data"))
    Response.write("<h3>Members</h3>")
    for each x in folderdata.SubFolders
    'Print the name of all subfolders in the test folder
        Response.write("<br/><a href='member.asp?useremail=" & x.Name & "'>" & x.Name & "</a>")
    next

    set folderdata = nothing
    set fs=nothing
 
%>

</body>

</html>