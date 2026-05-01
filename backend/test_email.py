import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

smtp_email = os.getenv("SMTP_EMAIL")
smtp_password = os.getenv("SMTP_PASSWORD")

print(f"Testing SMTP for {smtp_email}")

msg = MIMEMultipart()
msg['From'] = smtp_email
msg['To'] = smtp_email
msg['Subject'] = "Vitality SMTP Test"
msg.attach(MIMEText("This is a test email from the Vitality local backend.", 'plain'))

try:
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(smtp_email, smtp_password)
    server.send_message(msg)
    server.quit()
    print("SUCCESS: SMTP works!")
except Exception as e:
    print("ERROR:", e)
