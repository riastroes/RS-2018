 <%

    dim user
    dim useremail
    dim userpassword
    dim show
    dim msg
    dim ischecked
        
    sub checkUser()
        
        set user = Request.Form("inlogname")
        set useremail = Request.Form("inlogemail")
        set userpassword = Request.Form("inlogpassword")
        set show = Request.Form("inlogshow")
        ischecked = False
    
        If StrComp(show,"yes") =0 Then
            Response.write("<br/>Name:       " & user)
            Response.write("<br/>Email:      " & useremail)
            Response.write("<br/>Password:   " & userpassword)
            Response.write("<br/>")
        End If
    
        dim fs, f, pw
    
        If user <> "" Then
            If useremail <> "" And InStr(useremail,"@")>0  Then
                If userpassword <> "" And Len(userpassword)>=5 Then
    
                    set fs=Server.CreateObject("Scripting.FileSystemObject") 
                    If fs.FileExists(Server.MapPath("data/" & useremail & "/" & user & ".txt")) = True Then
                        set f= fs.OpenTextFile(Server.MapPath("data/" & useremail & "/" & user & ".txt"),1,false)
                        pw = CStr(f.ReadLine)
                        
                        If StrComp(pw, userpassword) = 0 Then
                            If StrComp(show,"yes") =0 Then
                                '
                                'Response.write( "<br/>Have Fun designing a DUET-pattern!")
                                
                                'Response.write( "<br/>Welcome " & Session("user"))
                                
                            Else

                                msg = "<p>Welcome " & user & "<br/>Have fun designing a DUET-pattern!<br/> You can now save your designs and create an order.</p>"
                            End If
                            Session("user") = user
                            Session("useremail") = useremail
                            ischecked = True
                        Else 
                            If StrComp(show,"yes") =0 Then
                                Response.write("<br/>" & user & " " & useremail & " " & pw1 & " is a member")
                                Response.write("<br/>but " & pw & " is not a valid password.")
                            Else
        
                                msg = "<p class='rs-red'>Sorry, this password is unknown! Try again.</p>"
                            End If
                        End If
                        f.close
                        set f = nothing
                        set fs = nothing
                    Else
                        If StrComp(show,"yes") =0 Then
                            Response.write("<p class='rs-red'>" & user & " " & useremail & " " & userpassword & " is not a member.</p>")
                        Else
                            msg ="<p class='rs-red'>This member is unknown, fill in the registration form.</p>"
                        End If
                    End If
    
                Else
                    'no password
                    If StrComp(show,"yes") =0 Then
                            Response.write("<br/>" & user & " " & useremail & " " & userpassword & " has not a valid password.")
                    Else
                        msg ="<p class='rs-red'>This is not a valid password.</p>"
                    End If
                    
                End If 
            Else
                'no email
                If StrComp(show,"yes") =0 Then
                            Response.write("<br/>" & user & " " & useremail & " " & userpassword & " has not a valid emailaddress.")
                Else
                    msg ="<p class='rs-red'>This is not a valid emailaddress.</p>"
                End If
            End If 
        Else
            'no name
            If StrComp(show,"yes") =0 Then
                Response.write("<br/>" & user & " " & useremail & " " & userpassword & " has not a name.")
            End If
        End If 

        IF ischecked = True Then
            Response.write("<input type='hidden' id='hiduserischecked' value='true'/>")
        Else
            Response.write("<input type='hidden' id='hiduserischecked' value='false'/>")
        End If
    
    
    End sub

    call checkUser() 

    'open site with a file
    If Request.QueryString("filename") <> "" Then
        Session("file") = "xxx"
        Session("filename") = Request.QueryString("filename")
        'Response.write("<input type='hidden' id='hidfile' value='" & Request.QueryString("filename") & "'/>")
    End If

                    
                    
    %>