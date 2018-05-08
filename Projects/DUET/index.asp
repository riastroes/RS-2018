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
    <script src="intro.js" type="text/javascript"></script>
    <script src="inspiration.js" type="text/javascript"></script>
    <script src="ruler.js" type="text/javascript"></script>
    <script src="design.js" type="text/javascript"></script>
    <script src="palette.js" type="text/javascript"></script>
    <script src="rgb.js" type="text/javascript"></script>
    <script src="stamp.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="styles/main.css">
    <link rel="stylesheet" type="text/css" href="styles/range.css">
    <link rel="stylesheet" type="text/css" href="styles/radio.css">


    <!--<script src="inspiration.js" type="text/javascript"></script>
    <script src="palette.js" type="text/javascript"></script>
    <script src="rgb.js" type="text/javascript"></script>
    <script src="stamp.js" type="text/javascript"></script>
    <script src="customer.js" type="text/javascript"></script>
    <script src="customers.js" type="text/javascript"></script>
    <script src="order.js" type="text/javascript"></script>
    <script src="design.js" type="text/javascript"></script>
    -->

</head>

<body onload="init()">

    <div id="divdesign">
        <h1>Your Design
            <div id="divinfodesign" class="info" onclick="">Move your stamp, find the right spot and click on the canvas to stamp your design. <br/>Have fun designing. Tip: It will give a nice effect if you randomly stamp anywhere on your canvas for a while. Don't be afraid, just try!</div>
            <button id="btninfodesign" class="info" onclick="">Info</button>
        </h1>
        <div id="divdesignframe">
            <canvas id="canvashruler" oncontextmenu="false"></canvas><br/>
            <canvas id="canvasvruler" oncontextmenu="false"></canvas>
            <canvas id="canvasdesign" oncontextmenu="false"></canvas>
            <canvas id="canvastop" oncontextmenu="false"></canvas>
        </div>
    </div>
    <div id="divdesignsteps">
        <div class="title">YOUR DESIGN</div>
        <div id="divinfodesignsteps" class="info" onclick="">Click on one of the images if you want to go back to this design step!</div>
        <button id="btninfodesignsteps" class="info" onclick="">Info</button>

        <div id="divsteps">

        </div>
    </div>
    <div id="divpanel" class="w3-row">

        <div id="divA" class="w3-third">
            <div id="divbar"></div>
            <div class="title">DUET</div>
            <!-- #include file ="asp/login.inc" -->
            <div id="divlogin" onclick="">
                <p>DUET, Pattern Designer is een tool for you to create your own beautifull patterns in a very easy way. <br/> Just follow the instructions below and play. We wish you a lot of fun!
                </p>
                <p>Sign in if you want to create and save your patterndesigns or order a fabric with your own design.</p><br/>
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
                                <input id="btnlogin" type="submit" class="w3-center" value="Sign in"></input>
                            </td>
                        </tr>
                    </table><br/>
                </form>


            </div>
            <div id="divwelcomeuser">
                <!-- #include file ="asp/welcome.inc" -->
            </div>
            <div id="divmenu" onclick="">
                <ul id="ulmenu">
                    <li type="circle" id="stampsettings" onclick="">Create your stamp</li>
                    <li type="circle" id="canvassettings" onclick="">Change your canvas</li>
                    <li type="circle" id="savedesign" onclick="">Save your design</li>
                </ul>
            </div>
            <div id="divstampsettings" onclick="">
                <h3>Create your stamp
                    <button id="btnstampinfo" class="info" onclick="">Info</button>
                    <div id="divstampinfo" class="info" onclick="">Click on the images to select your type of stamp.</div><br/>
                </h3>
                <div>
                    <div id="divselectstamp">
                        <img id="btnstamp1" src="" class="xsmallimg" alt="1" onclick="">
                        <img id="btnstamp2" src="" class="xsmallimg" alt="2" onclick="">
                        <img id="btnstamp3" src="" class="xsmallimg" alt="3" onclick="">
                        <img id="btnstamp4" src="" class="xsmallimg" alt="4" onclick="">
                        <img id="btnstamp5" src="" class="xsmallimg" alt="5" onclick="">
                        <img id="btnstamp6" src="" class="xsmallimg" alt="6" onclick="">
                        <img id="btnstamp7" src="" class="xsmallimg" alt="7" onclick="">
                        <img id="btnstamp8" src="" class="xsmallimg" alt="8" onclick="">
                    </div>
                    <h4>Stamp size
                        <button id="btnstampsizeinfo" class="info" onclick="">Info</button>
                        <div id="divstampsizeinfo" class="info" onclick="">Attention! The size of your stamp is much smaller then you see in Your Design. Take a look at the rulers in the Designpanel. They show you the actual size. </div>
                    </h4>
                    <br/><label class="left rs-200">width :  </label><input type="range" id="inrangestampwidth" min="1" max="10" step="1" value="3" /><label class="right" id="lblstampwidth"></label><br/>
                    <br/><label class="left rs-200">height: </label><input type="range" id="inrangestampheight" min="1" max="10" step="1" value="3" /><label class="right" id="lblstampheight"></label><br/>
                    <h4>Stamp type</h4>
                    <input type="radio" id="inradiostamptype" name="inradiostamptype" value="color" checked="checked" /><label class="right">color</label>
                    <input type="radio" id="inradiostamptype" name="inradiostamptype" value="lightness" /><label class="right">lightness</label>
                    <input type="radio" id="inradiostamptype" name="inradiostamptype" value="copy" /><label class="right">copy</label><br/>

                    <canvas id="canvasstamp" onclick=""></canvas>
                    <h4>Stamp behaviour
                        <button id="btnstampbehaviourinfo" class="info" onclick="">Info</button>
                        <div id="divstampbehaviourinfo" class="info" onclick="">repeat, is how many time this stamp will be repeated on your design, horizontal and vertical. <br/> scale, is how your stamp will be scaled on the design. </div>
                    </h4>
                    <br/><label class="left rs-200">repeat ( 1 - 10 ): </label><input type="range" id="inrangerepeat" min="1" max="10" step="1" value="1" /><label class="right" id="lblrepeat"></label><br/>
                    <br/><label class="left rs-200">scale ( 1 - 3 ): </label><input type="range" id="inrangescale" min="1" max="3" step="0.1" value="1" /><label class="right" id="lblscale"></label><br/><br/>

                    <div class="btnclose" id="btnstampsettings">Close Stamp Settings</div>

                </div>

            </div>
            <div id="divcanvassettings" onclick="">
                <h3>Change your canvas</h3>
                <h4>Backgroundcolor
                    <button id="btnpaletteinfo" class="info" onclick="">Info</button>
                    <div id="divpaletteinfo" class="info" onclick="">Add colors to your palette by clicking on the Inspiration Image. Click on this palette change the backgroundcolor of Your Design.</div><br/>
                </h4>
                <canvas id="canvaspalette" onclick=""></canvas>
                <h4>Canvas size
                    <button id="btnsizeinfo" class="info" onclick="">Info</button>
                    <div id="divsizeinfo" class="info" onclick="">Attention! The size of your pattern is much smaller then you see in Your Design. Take a look at the rulers in the Designpanel. They show you the actual size. </div><br/>
                </h4><label class="left">width:  </label><input type="range" id="inrangecanvaswidth" min="1" max="40" step="1" value="20" /><label class="right" id="lblcanvaswidth"></label><br/><br/>
                <label class="left">height: </label><input type="range" id="inrangecanvasheight" min="1" max="40" step="1" value="20" /><label class="right" id="lblcanvasheight"></label><br/><br/>
                <button id="btncanvassettings" class="btnclose">Close Canvas Settings</button>
            </div>
            <div id="divsavedesign" onclick="">
                <h3>Save Your Design </h3>
                <p id="saveinstruction"></p>
                <button id="btnsavedesign" class="btnclose">Save your design</button>
                <button id="btnsavedesignclose" class="btnclose">Close this panel</button>
            </div>
        </div>
        <div id="divB" class="w3-twothird">
            <div id="divanimation">
                <div class="title">PATTERN DESIGNER</div>
                <canvas id="canvasanimation"></canvas>
            </div>

            <div id="divinspiration">
                <div class="w3-row">
                    <div class="title w3-half">INSPIRATION</div>
                    <div class="w3-half">
                        <button id="btninspirationinfo" class="info" onclick="">Info</button>
                        <div id="divinspirationinfo" class="info" onclick="">Click on this image to load your stamp.</div><br/>
                    </div>
                </div>
                <div>
                    <canvas id="canvasinspiration" oncontextmenu="false" onclick="" />
                </div>
                <div>
                    <div id="divselectinspiration">
                        <img id="btninspiration1" src="" class="xsmallimg" alt="1" onclick="" oncontextmenu="false">
                        <img id="btninspiration2" src="" class="xsmallimg" alt="2" onclick="" oncontextmenu="false">
                        <img id="btninspiration3" src="" class="xsmallimg" alt="3" onclick="" oncontextmenu="false">
                        <img id="btninspiration4" src="" class="xsmallimg" alt="4" onclick="" oncontextmenu="false">
                        <img id="btninspiration5" src="" class="xsmallimg" alt="5" onclick="" oncontextmenu="false">
                        <img id="btninspiration6" src="" class="xsmallimg" alt="6" onclick="" oncontextmenu="false">
                        <img id="btninspiration7" src="" class="xsmallimg" alt="7" onclick="" oncontextmenu="false">
                        <img id="btninspiration8" src="" class="xsmallimg" alt="8" onclick="" oncontextmenu="false">
                        <img id="btninspiration9" src="" class="xsmallimg" alt="9" onclick="" oncontextmenu="false">
                    </div>
                </div>
            </div>
            <div id="divsaveddesigns">
                <div class="title">YOUR DESIGNS</div>
                <!-- #include file ="asp/saveddesigns.inc" -->
            </div>


        </div>
    </div>
    </div>
</body>
<script>
</script>
<script type="text/javascript">
    window.onload = maxWindow;
    init();

    function maxWindow() {
        window.moveTo(0, 0);


        if (document.all) {
            top.window.resizeTo(screen.availWidth, screen.availHeight);
        } else if (document.layers || document.getElementById) {
            if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
                top.window.outerHeight = screen.availHeight;
                top.window.outerWidth = screen.availWidth;
            }
        }
    }
</script>

</html>