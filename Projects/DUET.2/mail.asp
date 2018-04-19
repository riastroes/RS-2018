<%
Set myMail = CreateObject("CDO.Message")
myMail.Subject = "Sending email with CDO"
myMail.From = "riastroes@gmail.com"
myMail.To = "riastroes@gmail.com"
myMail.TextBody = "Thank you"
myMail.Send
set myMail = nothing
%>