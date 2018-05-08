<!DOCTYPE html>
<html>

<head>
    <title>DUET, Pattern Designer</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">
    <script src="/RS-2018/library/google.js" type="text/javascript"></script>
    <script src="/RS-2018/mylibrary/functions.js" type="text/javascript"></script>
    <script src="/RS-2018/mylibrary/colorconversion.js" type="text/javascript"></script>
    <script src="sketch.js" type="text/javascript"></script>
    <script src="app.js" type="text/javascript"></script>

    <script src="inspiration.js" type="text/javascript"></script>
    <script src="palette.js" type="text/javascript"></script>
    <script src="rgb.js" type="text/javascript"></script>
    <script src="stamp.js" type="text/javascript"></script>
    <script src="customer.js" type="text/javascript"></script>
    <script src="customers.js" type="text/javascript"></script>
    <script src="order.js" type="text/javascript"></script>
    <script src="design.js" type="text/javascript"></script>
    <style>
        body {
            font-family: "Poppins", sans-serif;
            user-select: none;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            font-size: 14px;
        }
        
        h1 {
            color: #ff6d78;
        }
        
        h2 {
            color: #ff6d78;
        }
        
        h3 {
            color: #ff6d78;
        }
        
        h4 {
            color: #ff6d78;
        }
        
        body {
            -webkit-touch-callout: none;
            user-select: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            font-size: 14px;
        }
        
        .rs-panel {
            background-color: teal;
            color: white;
            padding: 10px;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 5;
        }
        
        .text-ocean {
            color: teal;
        }
        
        .subitem {
            font-size: 14px;
            margin-left: 30px;
        }
        
        .w3-half img {
            margin-bottom: -6px;
            margin-top: 16px;
            opacity: 0.8;
            cursor: pointer
        }
        
        .rs-red {
            color: #ff6d78;
        }
        
        .w3-half img:hover {
            opacity: 1;
        }
        
        #divmenu {
            padding: 20px;
        }
        
        #panelstamp {
            width: 400px;
        }
        
        #paneldesign {
            border: solid 10px #eaeaea;
            position: relative;
            height: 1000px;
            overflow: auto;
        }
        
        .rs-button {
            background-color: #eaeaea;
            margin-right: 4px;
        }
        
        .selected {
            background: #5d5d5d;
            color: white;
        }
        
        .float {
            float: left;
        }
        
        .rs-frame {
            margin: 10px;
            padding: 1px;
            background-color: #eaeaea;
        }
        
        .info {
            color: wheat;
        }
        
        .rs-hidden {
            display: none;
            -webkit-transition: all 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition: all 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
            height: 0px;
        }
        
        .rs-show {
            display: block;
        }
        
        .hidden {
            visibility: hidden;
            height: 0px;
        }
        
        .view {
            position: absolute;
            z-index: 1;
        }
        
        .rs-right {
            position: absolute;
            right: 0px;
            z-index: 1;
        }
        
        .smallimg {
            margin: 3px;
            width: 100px;
            height: 100px
        }
        
        .xsmallimg {
            margin: 3px;
            width: 70px;
            height: 70px
        }
        
        #mySidebar {
            -webkit-transition: all 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition: all 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    </style>

</head>

<body style="width:100%">
    <div>
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
                                Response.write( "<br/>Welcome " & user)
                                Response.write( "<br/>Have Fun designing a DUET-pattern!")
                                Session("imgdata") = ""
                            Else

                                msg = "<p>Welcome " & user & "<br/>Have fun designing a DUET-pattern!<br/> You can now save your designs and create an order.</p>"
                            End If
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
    
    
    End sub
    %>
    </div>
    <!-- Sidebar/menu -->

    <div id="mySidebar" class="rs-panel w3-row" onmouseenter="app.openSidebar()" onmouseleave="app.closeSidebar()"><br>
        <div class="w3-third">
            <!--
            <div id="divmenu" class="rs-show">

                <h1 class="w3-xxxlarge rs-red"><b>DUET</b></h1>
                <% call checkUser() %>
                    <% 
                    If ischecked = False Then
                        Response.write "<div id='divLogin' class='rs-show' style='font-weight:normal'>"
                    Else
                        Response.write "<div id='divLogin' class='rs-hidden' style='font-weight:normal'>"
                    End If
                    %>
                        <p>DUET, Pattern Designer is een tool for you to create your own beautifull patterns in a very easy way. <br/> Just follow the instructions below and play. We wish you a lot of fun!
                        </p>
                        <p>Sign in if you want to save your designs or create an order.</p><br/>
                        <form action="index.asp" method="post">
                            <table style="width:100%; margin:0px;" border="0px">
                                <tr>
                                    <td><label>Name:</label></td>
                                    <td> <input id="inlogname" name="inlogname" type="text" value="<%  =Response.write(user) %>" required></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Email:</label></td>
                                    <td><input id="inlogemail" name="inlogemail" type="text" value="<% =Response.write(useremail) %>" required></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Password:</label></td>
                                    <td><input id="inlogpassword" type="password" name="inlogpassword" value="<% =Response.write(userpassword) %>" required></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><br/>
                                        <input id="inlogshow" name="inlogshow" type="hidden" value="no">
                                        <input id="btnLogin" type="submit" class="w3-center" value="Sign in"></input>
                                    </td>
                                </tr>
                            </table><br/>
                        </form>
                        <label id="response"><% Response.write(msg)%></label>
                        <% Response.write("</div>")%>
            </div>
            <div class="w3-bar-block">
                <p>This is a step-by-step guide:</p>
                <a href="#inspiration" onclick="app.openInspiration()" class="w3-bar-item w3-button w3-hover-white">1.  Inspiration</a>
                <a href="#design" onclick="app.openDesigner()" class="w3-bar-item w3-button w3-hover-white">2.  New Design</a>
                <a href="#design" onclick="app.openStampSettings()" class="w3-bar-item w3-button w3-hover-white">3.  Start Designing</a>
                <a href="#settings" onclick="app.openSettings()" class="w3-bar-item w3-button w3-hover-white">4.  Canvas Settings</a>
                <a href="#designsteps" onclick="app.openDesignSteps()" class="w3-bar-item w3-button w3-hover-white">5.  Your Designsteps</a>
                <a href="#save" onclick="app.openSave()" class="w3-bar-item w3-button w3-hover-white">6.  Save Your Design</a>
                <a href="#yourdesigns" onclick="app.openYourDesigns()" class="w3-bar-item w3-button w3-hover-white">Your Designs</a>
                <a href="#designers" class="w3-bar-item w3-button w3-hover-white">Designers</a>
                <a href="#services" class="w3-bar-item w3-button w3-hover-white">Services</a>
                <a href="#contact" class="w3-bar-item w3-button w3-hover-white">Contact</a>
            </div>
       
        -->

            <div id="divsettings" class="rs-hidden" style="height:100%" onclick="app.closeSettings();">
                <h3>Change the size of your canvas</h3>
                <p>
                    If you change the size of the canvas you will lose your design and your dignstaps.
                </p>
                <table width="100%">
                    <tr>
                        <td><label>design width: </label></td>
                        <td><input type="text" value="0" id="inwidth" /></td>
                    </tr>
                    <tr>
                        <td><label>design height: </label></td>
                        <td><input type="text" value="0" id="inheight" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="button" value="change" onclick="changeCanvasSize();" /></td>
                    </tr>
                </table>
                <div>
                    <h3 class="rs-red">Your palette</h3>
                    <p class="info"><b>Click</b> on the inspiration-canvas to add colors to your palette.</p>
                    <p class="info"><b>Click</b> on the palette to change the backgroundcolor of your design.</p>
                    <canvas id="canvaspalette" onclick="palette.background();"></canvas>
                    <br/><button id="btnclosebgsettings">Close</button>
                </div>
            </div>

            <div id="divstampsettings" class="rs-hidden" onclick="app.closeStampSettings();">
                <h3 class="rs-redrs-red">Your Stamp</h3>
                <p>Create your stamp and click on the inspiration-canvas to fill your stamp</p>
                <img id="stampbutton1" src="" class="xsmallimg" alt="1" onclick="stamp.changeStamp(this.alt)">
                <img id="stampbutton2" src="" class="xsmallimg" alt="2" onclick="stamp.changeStamp(this.alt)">
                <img id="stampbutton3" src="" class="xsmallimg" alt="3" onclick="stamp.changeStamp(this.alt)">
                <img id="stampbutton4" src="" class="xsmallimg" alt="4" onclick="stamp.changeStamp(this.alt)">
                <img id="stampbutton5" src="" class="xsmallimg" alt="5" onclick="stamp.changeStamp(this.alt)">
                <img id="stampbutton6" src="" class="xsmallimg" alt="6" onclick="stamp.changeStamp(this.alt)">
                <img id="stampbutton7" src="" class="xsmallimg" alt="7" onclick="stamp.changeStamp(this.alt)">
                <img id="stampbutton8" src="" class="xsmallimg" alt="8" onclick="stamp.changeStamp(this.alt)">


                <div class="w3-row">
                    <div class="w3-third"><label id="lblstampsize">stamp size: 200px </label></div>
                    <div class="w3-twothird"><input id="instampsize" type="range" min="50" max="400" class="w3-slider" value="200" step="50" onchange="stamp.resize(this.value)" style="width:250px" /></div>
                </div>
                <div class="w3-row">
                    <div class="w3-third"><label id="lblstamptype">stamp type: </label></div>
                    <div class="w3-twothird"><input type="radio" class="w3-radio" name="instamptype" onclick="inspiration.loadStamp(false)" value="hue" checked> hue
                        <input type="radio" class="w3-radio" name="instamptype" onclick="inspiration.loadStamp(false)" value="saturation"> saturation
                        <br/><input type="radio" class="w3-radio" name="instamptype" onclick="inspiration.loadStamp(false)" value="lightness"> lightness
                        <input type="radio" class="w3-radio" name="instamptype" onclick="inspiration.loadStamp(false)" value="copy"> copy
                    </div>
                </div>
                <div class="w3-row">
                    <div class="w3-third"><b>repeat stamp :  </b>
                    </div>
                    <div class="w3-twothird"><input id="inpatternsize" type="range" min="1" max="10" class="w3-slider" value="1" step="1" onchange="design.resizePattern(this.value)" /><label id="lblpatternsize"> 1</label></div>
                </div>
                <div class="w3-row">
                    <div class="w3-third"><b>scale stamp:  </b></div>
                    <div class="w3-twothird"><input id="inscale" type="range" min="0.2" max="3" class="w3-slider" value="1" step=".1" onchange="design.scalePattern(this.value)" /><label id="lblscale"> 1</label></div>
                </div>
                <div class="w3-row">
                    <div class="w3-third"></div>
                    <div class="w3-twothird"></div>
                </div>


                <div id="panelstamp" style="width:100%">
                    <canvas id="canvasstamp"></canvas>
                </div>
            </div>

            <div id="divdesignsteps" class="rs-hidden" style="height:100%" onclick="app.closeDesignSteps();">
                <h3 class="rs-red">Your Designsteps</h3>
                <p class="info"><b>Click</b> on an image to go back to this designstep.</p>
                <div id="designsteps" class="w3-container float"></div>
            </div>
            <div id="divsave" class="rs-hidden" style="height:100%" onclick="app.closeSave();">
                <h2>Save Your Design</h2>
                <p>Save your own design and we can onder some nice fabric for you.</p>

                <% If ischecked = True Then
            Response.write("<div id='save'  >")
            Response.write("<input type='hidden' id='hidischecked' value='true'  />")
           Else
            Response.write("<input type='hidden' id='hidischecked' value='false' />")
            Response.write("<div id='save' >")
           End If
           %>
                    <div>
                        <p class="info">You can save your design with <b>CTRL + Left-Mouse-Button</b> or <b>Right-Mouse-Button</b> as .png image.</p>
                    </div>
                    <div>
                        <p class="info"><b>Send</b> your design to us and we will do you an offer for printing your design on fabric.</p>
                        <form action="sendPattern.asp" method="post" enctype="plain/txt">
                            <input type="hidden" id="inimgemail" name="inimgemail" value="<%Response.write(useremail)%>">
                            <input type="hidden" id="inimgdata" name="inimgdata">
                            <input type="hidden" id="inlendata" name="inlendata">
                            <input type="hidden" id="intime" name="intime">
                            <input type="hidden" id="insave" name="insave">
                            <input type="button" id="btnsendpattern" onclick="javascript:design.sendPattern()" value="Save">
                            <input type="submit" class="hidden" id="btnsend" value="SEND">
                        </form>
                        <label id="duetid" class="w3-xlarge"></label>
                    </div>
            </div>
            -->

        </div>
        <div class="w3-twothird">
            <h1 class="w3-xlarge rs-red"><b>Create your own patterns! Start Now!</b></h1>
            <div id="divinspiration" class="rs-hidden">
                <h2 class="rs-red">Inspiration</h2>
                <h5> Theme: Screenprints on fabric,
                    <br/>inspired by the coral and underwater world of the Caribbean. </h5>


                <img id="inspirationbutton1" src="" class="xsmallimg" alt="1" onclick="inspiration.changeInspiration(this.alt)">
                <img id="inspirationbutton2" src="" class="xsmallimg" alt="2" onclick="inspiration.changeInspiration(this.alt)">
                <img id="inspirationbutton3" src="" class="xsmallimg" alt="3" onclick="inspiration.changeInspiration(this.alt)">
                <img id="inspirationbutton4" src="" class="xsmallimg" alt="4" onclick="inspiration.changeInspiration(this.alt)">
                <img id="inspirationbutton5" src="" class="xsmallimg" alt="5" onclick="inspiration.changeInspiration(this.alt)">
                <img id="inspirationbutton6" src="" class="xsmallimg" alt="6" onclick="inspiration.changeInspiration(this.alt)">
                <img id="inspirationbutton7" src="" class="xsmallimg" alt="7" onclick="inspiration.changeInspiration(this.alt)">
                <img id="inspirationbutton8" src="" class="xsmallimg" alt="8" onclick="inspiration.changeInspiration(this.alt)">
                <img id="inspirationbutton9" src="" class="xsmallimg" alt="9" onclick="inspiration.changeInspiration(this.alt)">
                <p class="info">click on an image to change your inspiration source.<br/></p>

            </div>
            <div id="DIVA" oncontextmenu="return false;">
                <canvas id="canvasinspiration" onclick="inspiration.loadStamp(true);" />
            </div>
        </div>
    </div>
    </div>

    <!-- Top menu 
        on small screens -->
    <header class="w3-container w3-top w3-hide-large rs-red w3-xlarge w3-padding">
        <a href="javascript:void(0)" class="w3-button rs-red w3-margin-right" onclick="rs_open()">☰</a>
        <span>DUET, Pattern Designer</span>
    </header>

    <!-- Overlay effect when opening sidebar on small screens -->
    <div class="w3-overlay w3-hide-large" onclick="rs_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

    <!-- !PAGE CONTENT! -->
    <div id="main" class="w3-main" style="margin-left:40px;margin-right:40px">

        <!-- Designer -->
        <div id="designer" width="100%">


            <div id="DIVB">
                <h2 class="w3-xxxlarge text-ocean" style="margin-top:45px"><b>New Design</b></h2>
                <canvas id="canvasHruler"></canvas>
                <%                       
                    If ischecked = False Then
                        Response.write("<canvas id='canvasdesign' oncontextmenu='javascript:design.addWatermark();return false;'  onclick='design.stamp();'></canvas>")
                    Else
                        Response.write("<canvas id='canvasdesign' onclick='design.stamp();'></canvas>")
                    End If
                    %>
            </div>
        </div>


        <!-- Your Designs -->
        <div id="divyourdesigns" style="margin-top:75px" class="rs-hidden">
            <h1 class="w3-xxxlarge text-ocean"><b>Your Designs</b></h1>
            <% 
                If ischecked = true Then
                    call showAllDesigns(useremail) 
                End If
                %>
                <% 
              'show all the designs of this member

              sub showAllDesigns(email)
              dim fs, fo, f
                set fs=Server.CreateObject("Scripting.FileSystemObject")  
                set fo=fs.GetFolder(Server.MapPath("data/" & email))
                
                'Print the name of all files in the test folder
                Response.write("<table>")
                Response.write("<tr><td>Design</td><td>Created</td><td>Image</td></tr>")
                for each x in fo.Files
                    If InStr(x.Name, "xxDUET") > 0 Then
                        set f= fs.OpenTextFile(Server.MapPath("data/" & email & "/" & x.Name),1,false)
                        Response.write("<tr><td>" & Replace(x.Name, ".txt", "") & "</td><td>" & x.DateCreated & "</td><td><img src='data:image/png;base64," & f.ReadLine & "' alt='" & x.Name & "' class='smallimg' ></td></tr>")
                        f.close
                        set f = nothing
                    Else
                        Response.write("<tr><td>" & Replace(x.Name, ".txt", "") & "</td><td>" & x.DateCreated & "</td><td></td></tr>")
                        
                    End If
                next
                Response.write("</table>")

    
                set fo = nothing
                set fs=nothing
            end sub             
            %>

        </div>

        <!-- Designers -->
        <div class="w3-container" id="designers" style="margin-top:75px">
            <h1 class="w3-xxxlarge text-ocean"><b>Designers.</b></h1>
            <hr style="width:50px;border:5px solid red" class="w3-round">
            <p>The best team in the world.</p>
            <p>We combine the trandition artscraft and the modern digatal art in DUET, het pattern designer. With DUET you can work together with us and develop your one patterns voor textiles, wallpaper, prints, etc. First start designing, this tool will
                help you! It is easty to work with and the results can be fantastic! You can visit the ArtShop of Jolanta Izabela Pawlak at Haarlemmerstraat 100 in AMSTERDAM.
            </p>
            <p><b>DUET, Is a coworkers project of two artist.</b>:</p>
        </div>

        <!-- The Team -->
        <div class="w3-row-padding w3-grayscale w3-container">
            <div class="w3-half w3-margin-bottom">
                <div class="w3-light-grey">
                    <img src="images/jolanta.jpg" alt="John" style="width:100%">
                    <div class="w3-container">
                        <h3>Jolanta Izabela Pawlak</h3>
                        <p class="w3-opacity">Artist, sculture, jewelry, textiles</p>
                        <p>Jolanta is an allround artist, creating sculptures, jewelry and some fine textiles on wich she screenprints her graphics. These graphics are inspired by the beautifull coral world she discovered in the ocean near Curacau. She lived
                            there for eleven year and she dived a lot to her big passion under the water in the ocean and came back with beautifull photo's.<br/> More information: <a href="https://jolantaizabela.com">https://jolantaizabela.com</a> </p>
                    </div>
                </div>
            </div>
            <div class="w3-half w3-margin-bottom">
                <div class="w3-light-grey">
                    <img src="images/ria.jpg" alt="Jane" style="width:100%">
                    <div class="w3-container">
                        <h3>Ria Stroes</h3>
                        <p class="w3-opacity">Artist, creative coder</p>
                        <p>Ria is a creative coder. She is interested in bringing her digital creations to the real world. She is working in designs and 3D-prints.
                            <br/> More information: <a href="https://www.riastroes.nl">https://riastroes.nl</a>
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <!-- Packages / Pricing Tables -->
        <div class="w3-container" id="services" style="margin-top:75px">
            <h1 class="w3-xxxlarge text-ocean"><b>Services.</b></h1>
            <hr style="width:50px;border:5px solid red" class="w3-round">
            <p>Some text our prices. Lorem ipsum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure</p>
        </div>

        <div class="w3-row-padding w3-container">
            <div class="w3-half w3-margin-bottom">
                <ul class="w3-ul w3-light-grey w3-center">
                    <li class="ocean w3-xlarge w3-padding-32">Textile</li>
                    <li class="w3-padding-16">With your own design</li>
                    <li class="w3-padding-16">On a nice jersey</li>
                    <li class="w3-padding-16">Order per meter</li>
                    <li class="w3-padding-16">
                        <h2>30 euro</h2>
                        <span class="w3-opacity">per meter</span>
                    </li>
                    <li class="w3-light-grey w3-padding-24">
                        <button class="w3-button w3-red w3-padding-large w3-hover-black">Sign Up</button>
                    </li>
                </ul>
            </div>

            <div class="w3-half">
                <ul class="w3-ul w3-light-grey w3-center">
                    <li class="ocean w3-xlarge w3-padding-32">Wallpaper</li>
                    <li class="w3-padding-16">With your own design</li>
                    <li class="w3-padding-16">Top quality</li>
                    <li class="w3-padding-16">per 10 meter wallpaper</li>
                    <li class="w3-padding-16">
                        <h2>249 euro</h2>
                        <span class="w3-opacity">per 10 meter</span>
                    </li>
                    <li class="w3-light-grey w3-padding-24">
                        <button class="w3-button w3-red w3-padding-large w3-hover-black">Sign Up</button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="w3-row-padding">
            <div class="w3-half">
                <ul class="w3-ul w3-light-grey w3-center">
                    <li class="ocean w3-xlarge w3-padding-32">Advice</li>
                    <li class="w3-padding-16">We help and create your wishes.</li>
                    <li class="w3-padding-16">Tailor made</li>
                    <li class="w3-padding-16">step 1. Design your Patterns</li>
                    <li class="w3-padding-16">step 2. Send your measures.</li>
                    <li class="w3-padding-16">step 3. Recieve an offer.</li>
                    <li class="w3-padding-16">step 4. Order and pay.</li>

                    <li class="w3-padding-16">
                        <h2>? euro</h2>
                        <span class="w3-opacity">per hour</span>
                    </li>
                    <li class="w3-light-grey w3-padding-24">
                        <button class="w3-button w3-red w3-padding-large w3-hover-black">Sign Up</button>
                    </li>
                </ul>
            </div>
            <div class="w3-half">
                <ul class="w3-ul w3-light-grey w3-center">
                    <li class="ocean w3-xlarge w3-padding-32">Sewing Service</li>
                    <li class="w3-padding-16">Skirt</li>
                    <li class="w3-padding-16">With your own designs</li>
                    <li class="w3-padding-16">Tailor made</li>
                    <li class="w3-padding-16">Top quality</li>
                    <li class="w3-padding-16">Exclusive materials</li>
                    <li class="w3-padding-16">100 euro</li>
                    <li class="w3-padding-16">
                        <h2>100 euro</h2>
                        <span class="w3-opacity">per skirt</span>
                    </li>
                    <li class="w3-light-grey w3-padding-24">
                        <button class="w3-button w3-red w3-padding-large w3-hover-black">Sign Up</button>
                    </li>
                </ul>
            </div>

        </div>

        <!-- Contact -->
        <div class="w3-container" id="contact" style="margin-top:75px">
            <h1 class="w3-xxxlarge text-ocean"><b>Contact.</b></h1>
            <hr style="width:50px;border:5px solid red" class="w3-round">
            <p>Do you want us to style your outfit of your home? Fill out the form and fill me in with the details :) We love meeting new people! Or meet us in the ArtShop at Haarlemmerstraat 100, AMSTERDAM.
            </p>
            <form action="/action_page.php" target="_blank">
                <div class="w3-section">
                    <label>Name</label>
                    <input class="w3-input w3-border" type="text" name="Name" required>
                </div>
                <div class="w3-section">
                    <label>Email</label>
                    <input class="w3-input w3-border" type="text" name="Email" required>
                </div>
                <div class="w3-section">
                    <label>Message</label>
                    <input class="w3-input w3-border" type="text" name="Message" required>
                </div>
                <button type="submit" class="w3-button w3-block w3-padding-large w3-red w3-margin-bottom">Send Message</button>
            </form>
        </div>
        <a href="#register" class="w3-bar-item w3-button w3-hover-white">Register</a>
        <a href="#unsubscribe" class="w3-bar-item subitem w3-button w3-hover-white">Unsubscribe</a>

        <!-- Register -->
        <div id="register" class="w3-container" style="margin-top:75px">
            <h1 class="w3-xxxlarge text-ocean"><b>Registration.</b></h1>
            <hr style="width:50px;border:5px solid red" class="w3-round">
            <p>If you want to save your DUET-pattern or want to order, you have to fill in this registrationform.
                <br/> You can change the data anytime. The changed information is only applied to new orders.
                <br/> If you want to change a current order, please contact us.
            </p>
            <p><label id="msgregistration" class="rs-red"></label></p>
            <form action="javascript:registerCustomer();">
                <div class="w3-section">
                    <label>Name</label>
                    <input class="w3-input w3-border" type="text" id="inname" required>
                </div>
                <div class="w3-section">
                    <label>Email</label>
                    <input class="w3-input w3-border" type="text" id="inemail" required>
                </div>
                <div class="w3-section">
                    <label>Password</label>
                    <input class="w3-input w3-border" type="password" id="inpassword" required>
                </div>
                <div class="w3-section">
                    <label>Check Password</label>
                    <input class="w3-input w3-border" type="password" id="inpassword2" required>
                </div>
                <div class="w3-section">
                    <label>Address</label>
                    <input class="w3-input w3-border" type="text" id="inaddress" required>
                </div>
                <div class="w3-section">
                    <label>Zipcode</label>
                    <input class="w3-input w3-border" type="text" id="inzipcode" required>
                </div>
                <div class="w3-section">
                    <label>City</label>
                    <input class="w3-input w3-border" type="text" id="incity" required>
                </div>
                <div class="w3-section">
                    <label>Country</label>
                    <input class="w3-input w3-border" type="text" id="incountry" required>
                </div>
                <button type="submit" class="w3-button w3-block w3-padding-large w3-red w3-margin-bottom">Register</button>
            </form>
        </div>
        <!-- End page content -->


        <!-- W3.CSS Container -->
        <div class="w3-light-grey w3-container w3-padding-32" style="margin-top:75px;padding-right:58px">
            <p class="w3-right">Powered by <a href="https://www.w3schools.com/w3css/default.asp" title="W3.CSS" target="_blank" class="w3-hover-opacity">w3.css</a></p>
        </div>

    </div>
    <script>
        // Script to open and close sidebar
        // function w3_open() {
        //     document.getElementById("mySidebar").style.display = "block";
        //     document.getElementById("myOverlay").style.display = "block";
        // }

        // function w3_close() {
        //     document.getElementById("mySidebar").style.display = "none";
        //     document.getElementById("myOverlay").style.display = "none";
        // }

        // Modal Image Gallery
        function onClick(element) {
            document.getElementById("img01").src = element.src;
            document.getElementById("modal01").style.display = "block";
            var captionText = document.getElementById("caption");
            captionText.innerHTML = element.alt;
        }
    </script>


</body>

</html>