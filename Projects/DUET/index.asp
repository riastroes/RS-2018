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

    <script src="inspiration.js" type="text/javascript"></script>
    <script src="palette.js" type="text/javascript"></script>
    <script src="rgb.js" type="text/javascript"></script>
    <script src="stamp.js" type="text/javascript"></script>
    <script src="customer.js" type="text/javascript"></script>
    <script src="customers.js" type="text/javascript"></script>
    <script src="order.js" type="text/javascript"></script>
    <script src="design.js" type="text/javascript"></script>
    <style>
        body,
        h1,
        h2,
        h3,
        h4,
        h5 {
            font-family: "Poppins", sans-serif
        }
        
        body {
            font-size: 16px;
        }
        
        .ocean {
            background-color: teal;
            color: white;
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
        
        .w3-half img:hover {
            opacity: 1;
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
            color: red;
        }
        
        .hidden {
            visibility: hidden;
            height: 0px;
        }
        
        .view {
            position: absolute;
            z-index: 1;
        }
    </style>
    <script language="JavaScript">
    </script>

</head>

<body onload="start();" style="width:100%">
    
    <!-- Sidebar/menu -->
    <nav class="w3-sidebar ocean w3-collapse w3-top w3-large w3-padding" style="z-index:3;width:330px;font-weight:bold;overflow:hidden" id="mySidebar"><br>
        <a href="javascript:void(0)" onclick="w3_close()" class="w3-button w3-hide-large w3-display-topleft" style="width:100%;font-size:22px">Close Menu</a>
        <div id="menu">
            <div class="w3-container">
                <h1 class="w3-xxxlarge w3-text-red"><b>DUET</b></h1>
            </div>
            <div class="w3-bar-block">
                <a href="#" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Home</a>
                <a href="#designer" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Designer</a>
                <a href="#palette" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Your Palette</a>
                <a href="#design" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">New Design</a>
                <a href="#designsteps" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Your Designsteps</a>
                <a href="#designers" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Designers</a>
                <a href="#services" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Services</a>
                <a href="#contact" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Contact</a>
                <a href="#register" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white">Register</a>
                <a href="#unsubscribe" onclick="unsubscribe()" class="w3-bar-item subitem w3-button w3-hover-white">Unsubscribe</a>
            </div>
            <br/><br/>
            <div id="login" style="font-weight:normal">
                <p>Sign in if you want to save your designs or create an order.</p>
                <form action="index.asp" method="post">
                    <table style="width:100%; margin:0px;" border="0px">
                        <tr>
                            <td><label>Name:</label></td>
                            <td> <input id="inlogname" name="inlogname" type="text"></input>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Email:</label></td>
                            <td><input id="inlogemail" name="inlogemail" type="text" required></input>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                            <td><input id="inlogpassword" type="password" name="inlogpassword" required></input>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><br/><input id="btnLogin" type="submit" class="w3-center" value="Login"></input>
                            </td>
                        </tr>
                    </table><br/><br/>

                </form>

                <%
                
dim user, useremail, userpassword
user=Request.Form("inlogname")
useremail = Request.Form("inlogemail")
userpassword = Request.Form("inlogpassword")

If user<>"" Then
     
     Response.Write("Hello " & user & "!<br>")
     Response.Write("Have fun designing a lovely DUET-pattern today?")
     If( useremail <>"" ) Then
        If( userpassword <>"" ) Then
            dim fs, f
            set fs=Server.CreateObject("Scripting.FileSystemObject")
            set f = fs.OpenTextFile(Server.MapPath("data/log.txt"), 8,true)
            f.WriteLine("<br/>" & user & " " & useremail & " " & userpassword & " " &  Date )
            f.Close

            set f = nothing
            set fs = nothing
        End If
    End If
End If
                
%>
                    <input type="hidden" id="hiduser"></input>
            </div>
            <label id="response"></label>
        </div>
    </nav>

    <!-- Top menu on small screens -->
    <header class="w3-container w3-top w3-hide-large w3-red w3-xlarge w3-padding">
        <a href="javascript:void(0)" class="w3-button w3-red w3-margin-right" onclick="w3_open()">☰</a>
        <span>DUET, Pattern Designer</span>
    </header>

    <!-- Overlay effect when opening sidebar on small screens -->
    <div class="w3-overlay w3-hide-large" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

    <!-- !PAGE CONTENT! -->
    <div id="main" class="w3-main" style="margin-left:340px;margin-right:40px">

        <!-- Designer -->
        <div id="designer" width="100%">
            <h1 class="w3-xxxlarge text-ocean" style="margin-top:45px"><b>DUET, Pattern Designer</b></h1>
            <hr style="width:50px;border:5px solid red" class="w3-round" />
            <p>DUET, Pattern Designer is een tool for you to create your own beautifull patterns in a very easy way. Just follow the instructions below and play. We wish you a lot of fun.
            </p>
            <h1 class="w3-xlarge text-ocean w3-text-red"><b>Create your own patterns! Start Now!</b></h1>
            <div id="row" class="w3-row">
                <div id="panelchooseinspiration" class="w3-twothird w3-padding">
                    <h3 class="text-ocean">Inspiration Theme: Screenprints on fabric, </h3>
                    <h5> inspired by the coral and underwater world of the Caribbean. </h5>
                    <input class="rs-button" type="button" id="btnshowhideinfo" value="hide all info" onclick="toggleInfo()" />

                    <p class="info"><b>Buttons 1 t/m 10</b>: click a button to change your inspiration source.<br/></p>
                    <input type="button" value="1" id="btninspire1" class="rs-button selected" onclick="inspiration.changeInspiration(this.value)" />
                    <input type="button" value="2" id="btninspire2" class="rs-button" onclick="inspiration.changeInspiration(this.value)" />
                    <input type="button" value="3" id="btninspire3" class="rs-button" onclick="inspiration.changeInspiration(this.value)" />
                    <input type="button" value="4" id="btninspire4" class="rs-button" onclick="inspiration.changeInspiration(this.value)" />
                    <input type="button" value="5" id="btninspire5" class="rs-button" onclick="inspiration.changeInspiration(this.value)" />
                    <input type="button" value="6" id="btninspire6" class="rs-button" onclick="inspiration.changeInspiration(this.value)" />
                    <input type="button" value="7" id="btninspire7" class="rs-button" onclick="inspiration.changeInspiration(this.value)" />
                    <input type="button" value="8" id="btninspire8" class="rs-button" onclick="inspiration.changeInspiration(this.value)" />
                    <input type="button" value="9" id="btninspire9" class="rs-button" onclick="inspiration.changeInspiration(this.value)" />
                    <input type="button" value="10" id="btninspire10" class="rs-button" onclick="inspiration.changeInspiration(this.value)" />
                    <br/>
                    <p class="info"><b>Click</b> : Click on the inspiration-canvas to add colors to your background-palette and to fill your stamp.<br/></p>
                    </p>
                    <div id="panelinspiration" oncontextmenu="return false;">
                        <canvas id="canvasinspiration" onclick="inspiration.loadStamp(true);" />
                    </div>

                </div>
                <div id="panelchoosestamp" class="w3-third w3-padding">
                    <h3 class="text-ocean">Stamp</h3>
                    <p class="info"><b>Buttons 1 t/m 8</b>: click on a button to change the shape of your stamp.</p>
                    <input type="button" id="btnstamp1" value="1" class="rs-button selected" onclick="stamp.changeStamp(this.value)" />
                    <input type="button" id="btnstamp2" value="2" class="rs-button" onclick="stamp.changeStamp(this.value)" />
                    <input type="button" id="btnstamp3" value="3" class="rs-button" onclick="stamp.changeStamp(this.value)" />
                    <input type="button" id="btnstamp4" value="4" class="rs-button" onclick="stamp.changeStamp(this.value)" />
                    <input type="button" id="btnstamp5" value="5" class="rs-button" onclick="stamp.changeStamp(this.value)" />
                    <input type="button" id="btnstamp6" value="6" class="rs-button" onclick="stamp.changeStamp(this.value)" />
                    <input type="button" id="btnstamp7" value="7" class="rs-button" onclick="stamp.changeStamp(this.value)" />
                    <input type="button" id="btnstamp8" value="8" class="rs-button" onclick="stamp.changeStamp(this.value)" />
                    <br/>
                    <p class="info"> <b>Slider</b> : Push the slider to the right for a bigger stamp.<br/></p>
                    <label id="lblstampsize">size: 200px </label><input id="instampsize" type="range" min="50" max="400" class="w3-slider" value="200" step="50" onchange="stamp.resize(this.value)" style="width:250px" />
                    <br/>
                    <p class="info"> <b>Selection</b> : Select your type of stamp.</p>

                    <input type="radio" class="w3-radio" name="instamptype" onclick="inspiration.loadStamp(false)" value="hue" checked> hue
                    <input type="radio" class="w3-radio" name="instamptype" onclick="inspiration.loadStamp(false)" value="saturation"> saturation
                    <input type="radio" class="w3-radio" name="instamptype" onclick="inspiration.loadStamp(false)" value="lightness"> lightness
                    <input type="radio" class="w3-radio" name="instamptype" onclick="inspiration.loadStamp(false)" value="copy"> copy
                    <br/><br/>
                    <div id="panelstamp">
                        <canvas id="canvasstamp"></canvas>
                    </div>
                </div>
            </div>
            <div id="palette">
                <h3 class="text-ocean">Your palette</h3>
                <p class="info"><b>Click</b> : Click on the inspiration-canvas to add colors to your palette.</p>
                <p class="info"><b>Click</b> : Click on the palette to change the backgroundcolor of your design.</p>
                <div id="panelpalette" class="rs-frame">
                    <canvas id="canvaspalette" onclick="palette.background();"></canvas>
                </div>
            </div>
            <div id="design">
                <h1 class="w3-xxxlarge text-ocean"><b>New Design</b></h1>
                <table>
                    <tr>
                        <td><label>design width: </label></td>
                        <td><input type="text" value="0" id="inwidth" /></td>
                        <td class="info"> If you change the size of the canvas you will lose your design and dignstaps.</td>
                    </tr>
                    <td><label>design height: </label></td>
                    <td><input type="text" value="0" id="inheight" /></td>
                    <td><input type="button" value="change" onclick="changeCanvasSize()" /></td>
                    </tr>
                </table><br/>

                <div class="w3-row">
                    <div class="w3-half">
                        <b>repeat stamp :  </b><input id="inpatternsize" type="range" min="1" max="10" class="w3-slider" value="1" step="1" onchange="design.resizePattern(this.value)" /><label id="lblpatternsize"> 1</label>
                        <p class="info">push the slider to the right to increase the repetition of the pattern.</p>
                    </div>
                    <div class="w3-half">
                        <b>scale :  </b><input id="inscale" type="range" min="0.2" max="3" class="w3-slider" value="1" step=".1" onchange="design.scalePattern(this.value)" /><label id="lblscale"> 1</label>
                        <p class="info"> push the slider to the right to increase the repetition of the pattern.</p>
                    </div>
                </div>
                <div id="paneldesign" class="rs-frame">
                    <canvas id="canvasdesign" onclick="design.stamp();"></canvas>
                </div>
            </div>
            <div id="save" class="w3-container w3-row">
                <div class="w3-container w3-third">
                    <h5 class="w3-xxxlarge text-ocean"><b>SAVE</b></h5>
                    <p class="info"><b>CTRL + Left-Mouse-Button</b> or <b>Right-Mouse-Button</b>: click to save your design as .png image.</p>
                </div>
                <div class="w3-container w3-twothird">
                    <h5 class="w3-xxxlarge text-ocean"><b>SEND</b> your design to us</h5>
                    <p class="info"><b>Send</b> your design to us and we will do you an offer for printing your design on fabric.</p>
                    <input type="button" id="btnsenddesign" onclick="javascript:sendDesign();" value="SEND"></input>
                </div>
            </div>
            <div id="designsteps" class="w3-container">
                <h1 class="info"><b>click</b> : click on an image to go back to this designstep.</p>

                    <div id="divdesignsteps" class="w3-container float"></div>
            </div>
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
        <!-- Register -->
        <div id="register" class="w3-container" style="margin-top:75px">
            <h1 class="w3-xxxlarge text-ocean"><b>Registration.</b></h1>
            <hr style="width:50px;border:5px solid red" class="w3-round">
            <p>If you want to save your DUET-pattern or want to order, you have to fill in this registrationform.
                <br/> You can change the data anytime. The changed information is only applied to new orders.
                <br/> If you want to change a current order, please contact us.
            </p>
            <p><label id="msgregistration" class="w3-text-red"></label></p>
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
    </div>

    <!-- W3.CSS Container -->
    <div class="w3-light-grey w3-container w3-padding-32" style="margin-top:75px;padding-right:58px">
        <p class="w3-right">Powered by <a href="https://www.w3schools.com/w3css/default.asp" title="W3.CSS" target="_blank" class="w3-hover-opacity">w3.css</a></p>
    </div>

    <script>
        // Script to open and close sidebar
        function w3_open() {
            document.getElementById("mySidebar").style.display = "block";
            document.getElementById("myOverlay").style.display = "block";
        }

        function w3_close() {
            document.getElementById("mySidebar").style.display = "none";
            document.getElementById("myOverlay").style.display = "none";
        }

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